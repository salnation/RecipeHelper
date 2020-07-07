$("#searchBtn").click(function () {
    /*Recipe Search API*/
    var appId_RSA = "3adbf29f";
    var appKey_RSA = "edb57596dcb58fff67450bf3379f2078";
    var foodDesc = $("#recipeSearch").val();
    var queryUrl = "https://api.edamam.com/search?q=" + foodDesc + "&app_id=" + appId_RSA + "&app_key=" + appKey_RSA + "&from=0&to=5";
    var settings = {
        "url": queryUrl,
        "method": "GET"
    };
    $.ajax(settings).done(function (response) {
        console.log(response);
        var container = $(".container");
        $("#welcome").empty();
        container.empty();
        var resultsTitle = $("<h1>");
        resultsTitle.text("Recipe Helper. Showing Results for: " + foodDesc)
        resultsTitle.addClass("text-center");
        $("#welcome").append(resultsTitle);
        var refreshLink = $("<a>");
        refreshLink.attr("href", "index.html").text("Click here to do another search");
        refreshLink.addClass("text-center");
        $("#welcome").append(refreshLink);
        var objHits = response.hits;
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
            var calories = $("<div>").text("Calories: " + element.recipe.calories);
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
});
