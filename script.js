/*Triggered when 'Search Button' is clicked, this event will then decides which function (API) will be called, based on the selected radio button*/
$("#searchBtn").click(function () {
    if (!$("#searchInput").val()) {
        alert("Please, type something to be searched!");
    } else if ($("#recipeSearchRadio").prop("checked")) {
        recipeSearch();
    } else {
        foodSearch();
    }
});
/*This function uses the Recipe Search API from edaman and fill container div with 5 recipes based on what the user have type in the search input*/
function recipeSearch() {
    var appId_RSA = "3adbf29f";
    var appKey_RSA = "edb57596dcb58fff67450bf3379f2078";
    var searchInput = $("#searchInput").val();
    var queryUrl = "https://api.edamam.com/search?q=" + searchInput + "&app_id=" + appId_RSA + "&app_key=" + appKey_RSA + "&from=0&to=5";
    var settings = {
        "url": queryUrl,
        "method": "GET"
    };
    $("#welcomeImg").hide(3000);
    $.ajax(settings).done(function (response) {
        var container = $(".container");
        $("#welcome").empty();
        container.empty();
        var resultsTitle = $("<h1>");
        resultsTitle.text("Recipe search. Showing results for: " + searchInput);
        resultsTitle.addClass("text-center");
        $("#welcome").append(resultsTitle);
        var refreshLink = $("<a>");
        refreshLink.attr("href", "index.html").text("Click here to do another search");
        refreshLink.addClass("text-center");
        $("#welcome").append(refreshLink);
        var objHits = response.hits;
        if (objHits.length === 0) {
            var errMessage = $("<div>");
            errMessage.addClass("text-danger display-4");
            errMessage.text("Nothing was found! Please try again!");
            container.append(errMessage);
            return;
        }
        objHits.forEach(element => {
            //Recipe Title (Row)
            var h1 = $("<h3>").text(element.recipe.label);
            h1.addClass("text-center");
            container.append(h1);
            //Column 1 (Recipe Image, calories and link to recipe)
            var newRow = $("<div>");
            newRow.addClass("row");
            container.append(newRow);
            var newCol = $("<div>");
            newCol.addClass("col");
            newRow.append(newCol);
            var img = $("<img>").attr("src", element.recipe.image);
            newCol.append(img);
            var calories = $("<div>").text("Calories: " + Math.floor(element.recipe.calories, 2));
            newCol.append(calories);
            var a = $("<a>").attr("href", element.recipe.url).text("Click here for the complete recipe");
            newCol.append(a);
            //Column 2 (Health Labels and Cautions)
            var newCol = $("<div>");
            newCol.addClass("col");
            newRow.append(newCol);
            var newUL = $("<ul>").text("Health Labels");
            newCol.append(newUL);
            var hLabels = element.recipe.healthLabels;
            hLabels.forEach(element => {
                var li = $("<li>").text(element);
                newUL.append(li);
            });
            var cautions = element.recipe.cautions.toString();
            if (cautions) {
                cautions = $("<div>").text("Cautions: " + cautions);
                cautions.addClass("text-center text-danger");
                newCol.append(cautions);
            }
            //Column 3 (ingredients)
            var newCol = $("<div>");
            newCol.addClass("col");
            newRow.append(newCol);
            var newUL = $("<ul>").text("Ingredients");
            newCol.append(newUL);
            var ingreds = element.recipe.ingredientLines;
            ingreds.forEach(element => {
                var li = $("<li>").text(element);
                newUL.append(li);
            });
            container.append("<hr>");
        });
    });
}
/*This function uses the Food Database Search API from edaman and fill container div with detailed nutrients information*/
function foodSearch() {
    var appId_FDA = "a8e0eb85";
    var appKey_FDA = "f696fd92e5f6ee3ba12d0d190084dd1e";
    var searchInput = $("#searchInput").val();
    var queryUrl = "https://api.edamam.com/api/food-database/v2/parser?ingr=" + searchInput + "&app_id=" + appId_FDA + "&app_key=" + appKey_FDA;
    var settings = {
        "url": queryUrl,
        "method": "GET"
    };
    $("#welcomeImg").slideUp(3000);
    $.ajax(settings).done(function (response) {
        var container = $(".container");
        $("#welcome").empty();
        container.empty();
        var resultsTitle = $("<h1>");
        resultsTitle.text("Food search. Showing results for: " + searchInput)
        resultsTitle.addClass("text-center");
        $("#welcome").append(resultsTitle);
        var refreshLink = $("<a>");
        refreshLink.attr("href", "index.html").text("Click here to do another search");
        refreshLink.addClass("text-center");
        $("#welcome").append(refreshLink);
        if (response.hints.length === 0) {
            var errMessage = $("<div>");
            errMessage.addClass("text-danger display-4");
            errMessage.text("Nothing was found! Please try again!");
            container.append(errMessage);
            return;
        }
        var objInfo = response.hints[0];
        //Column 1 (Food Image and category)
        var newRow = $("<div>");
        newRow.addClass("row");
        container.append(newRow);
        var newCol = $("<div>");
        newCol.addClass("col");
        newRow.append(newCol);
        var img = $("<img>").attr("src", objInfo.food.image);
        newCol.append(img);
        var category = $("<div>").text("Category: " + objInfo.food.category);
        newCol.append(category);
        var foodId = $("<div>").text("Food ID: " + objInfo.food.foodId);
        newCol.append(foodId);
        var brand = objInfo.food.brand;
        if (brand) {
            var brand = $("<div>").text("Brand: " + brand);
            newCol.append(brand);
        }
        //Column 2 (nutrients / calories)
        var newCol = $("<div>");
        newCol.addClass("col");
        newRow.append(newCol);
        var newUL = $("<ul>").text("Nutrients for " + objInfo.food.label);
        newCol.append(newUL);
        var nutrients = objInfo.food.nutrients;
        var liEnergy = $("<li>").text("Energy: " + nutrients.ENERC_KCAL + "kcal");
        newUL.append(liEnergy);
        var liCarbs = $("<li>").text("Carbs: " + nutrients.CHOCDF + "g");
        newUL.append(liCarbs);
        var liProtein = $("<li>").text("Protein: " + nutrients.PROCNT + "g");
        newUL.append(liProtein);
        var liProtein = $("<li>").text("Fat: " + nutrients.FAT + "g");
        newUL.append(liProtein);
        container.append("<hr>");
    });
}
