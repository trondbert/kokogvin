<!DOCTYPE html>
<html>
	<head>
		<meta name="layout" content="main"/>				
	</head>
	<body>
    <div ng-controller="RecipeListCtrl">
    	 <ul>
        <li ng-repeat="recipe in recipes">
          <span>{{recipe.name}}</span>
        </li>
      </ul>
    </div>
	</body>
</html>
