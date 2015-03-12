
var mockCredentials = {
    password: {email: "tester@testopia.uk"}
};

var GenericDAOMock = {
    findAllEntities : function() {
        var entities = /recipes\/?$/.test(this.baseUrl) && storageMock.recipes;
        entities = entities || /images\/?$/.test(this.baseUrl) && storageMock.images;
        entities = entities || /beverages\/?$/.test(this.baseUrl) && storageMock.beverages;
        return entities;
    },
    findAll : function(callback) {
        this.findAllEntities().forEach(function(ent) {
            setTimeout(function() { callback(ent); }, 100);
        });
    },
    findById : function (id, callback) {
        if (!id) { callback(null); return; }
        var entity = null;
        this.findAllEntities().forEach(function(item) {
            if (item.$id == id) {
                entity = item;
            }
        });
        setTimeout(function() { callback(entity); }, 100);
    },
    updateOrInsert : function(entity, callback) {
        var entityDB = null;
        if (entity.$id) {
            entityDB = this.findById(entity.$id, function(){});
        } else {
            var entities = this.findAllEntities();
            entityDB = {};
            entities.push(entityDB);
            entity.$id = entityDB.$id = entities.length - 1;
        }
        var dataMap = this.getDataMap(entity);
        Object.keys(dataMap).forEach(function(key) {
            entityDB[key] = dataMap[key];
        });
        setTimeout(function() { callback(null); }, 100);
    }
};

function LoginServiceMock($firebase, fbUrls) {
    debugMsg($firebase + " " + fbUrls);
    this.onAuthCallback = function() {};

    this.loggedInState = function() {
        return /true/.test( window.localStorage["kokogvin.mock.loggedIn"] );
    };
    this.setLoggedInState = function(loggedInState) {
        window.localStorage["kokogvin.mock.loggedIn"] = "" + loggedInState;
    };

    this.loggedIn = function() {
        if (this.loggedInState()) { this.onAuthCallback(mockCredentials); }
        else               { this.onAuthCallback(null); }
        return this.loggedInState();
    };

    this.authWithPassword = function(credentials, callback) {
        debugMsg("Mocked auth");
        var service = this;
        setTimeout(function() {
            service.setLoggedInState(true);
            service.onAuthCallback(mockCredentials);
            callback(null);
        }, 100);
    };

    this.onAuth = function(callback) {
        this.onAuthCallback = callback;
        if (this.loggedInState()) {
            callback(mockCredentials);
        } else {
            callback(null);
        }
    };

    this.logOut = function() {
        this.setLoggedInState(false);
    };
}

function StorageMock() {
    this.recipes = [];
    this.recipes[0] = { $id: '1', name: 'Lasagne', tags: 'pasta',
        ingredients : 'En teskje kardemomme\nEn liter gløgg\n' + INGREDIENTS_COLUMN_BREAK + 'Litt til\nPynt med persille',
        instructions : 'Comme il faut',
        imageId : 'ri0',
        imageData: recipeImageDataMock[0]};
    this.recipes[1] = { $id: '2', name: 'Bacalao', tags: 'fisk tomat',
        ingredients : 'En teskje saft\nEn liter slaggg\n' + INGREDIENTS_COLUMN_BREAK + 'Pynt med hakkede nøtter',
        instructions : 'Just do it',
        imageId : 'ri1',
        imageData: recipeImageDataMock[1]};
    this.recipes[2] = { $id: '3', name: 'Taco', tags: 'meksikansk',
        ingredients : 'To slurker kaffe\nEn hekto gruff\n' + INGREDIENTS_COLUMN_BREAK + 'Passe dose happiness\nJobbe før å få mæ blid',
        instructions : 'Je ne sais pas',
        imageId : 'ri2',
        imageData: recipeImageDataMock[2]};

    this.images = [ { $id : 'ri0',  imageData : recipeImageDataMock[0]},
        { $id : 'ri1',  imageData : recipeImageDataMock[1]},
        { $id : 'ri2',  imageData : recipeImageDataMock[2]} ];

    this.beverages = [];
    this.beverages[0] = { $id: '1', name: 'Wine Dine 69', comments: 'God', imageData: beverageImageDataMock[0]};
    this.beverages[1] = { $id: '2', name: 'Rioja 123', comments: 'Meget', imageData: beverageImageDataMock[0]};
    this.beverages[2] = { $id: '3', name: 'Valpolicella 23', comments: 'Særs', imageData: beverageImageDataMock[0]};
    this.beverages[3] = { $id: '4', name: 'Rioja Majoralis', comments: 'Noget', imageData: beverageImageDataMock[0]};
}

storageMock = new StorageMock();

playController = ['$scope', '$location', 'fbUrls',
    function ($scope, $location, fbUrls) {

        $scope.continueLoop = true;

        $scope.updateRecipes = function() {
            var recipeRef = new Firebase(fbUrls.recipes);
            recipeRef.on("child_added", function(snap) {
                if ($scope.continueLoop) {
                    console.log(snap.key());
                    console.log(snap.val().name);
                    snap.ref().update({ imageTimestamp: Date.now() });
                    $scope.continueLoop = false;
                }
            });
        };
        $scope.updateRecipes();
    }
];

