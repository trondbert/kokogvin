export class FirebaseFactory {

    static refs:{[key:string]:Object} = {};

    static dataService = null;

    public static getFirebaseRef(url) {
        if (FirebaseFactory.dataService == null) {
            var config = {
                apiKey: "AIzaSyCIO8byvnKVyB7fC-9KPySuSFvrJUdfk6w",
                authDomain: "test-heroes-9b13f.firebaseapp.com",
                databaseURL: "https://test-heroes-9b13f.firebaseio.com",
                storageBucket: "test-heroes-9b13f.appspot.com",
            };

            FirebaseFactory.dataService = window['_firebase'].initializeApp(config);
            this.dataService.auth().signInWithEmailAndPassword("trondvalen@gmail.com", "password")
                .catch(function (error) {
                    var errorCode = error.code;
                    var errorMessage = error.message;
                    console.log(errorCode + " " + errorMessage);
            });
        }
        return FirebaseFactory.dataService.database().ref(url);
    }
}
