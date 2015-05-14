// This is a manifest file that'll be compiled into application.js, which will include all the files
// listed below.
//
// Any JavaScript/Coffee file within this directory, lib/assets/javascripts, vendor/assets/javascripts,
// or any plugin's vendor/assets/javascripts directory can be referenced here using a relative path.
//
// It's not advisable to add code directly here, but if you do, it'll appear at the bottom of the
// compiled file.
//
// Read Sprockets README (https://github.com/sstephenson/sprockets#sprockets-directives) for details
// about supported directives.
//
//= require jquery
//= require jquery_ujs
//= require turbolinks
//= require_tree .

$(function() {
  var $recipesCon = $("#recipes-con");

  $.get("/recipes.json")
    .done(function(recipes) {
      console.log("All Recipes:", recipes);
      recipes.forEach(function(recipe) {
        $recipesCon.append(recipe.title + "<br>" + 
           recipe.instructions + "<br>" + 
           recipe.image + "<br>" + 
           "<button class\"edit\">Edit</button>" + 
                          "<button class=\"delete\">Delete</button>");
      });
    });
    var $recipeForm = $("#new_recipe");
    $recipeForm.on("submit", function(event) {
      event.preventDefault();
      console.log("Form submitted", $(this).serialize());
      var content = $("#recipe_title").val();
      var instructions = $("#recipe_instructions").val();
      var image = $("#recipe_image").val();
      $.post("/recipes.json", {
        recipe: {
                  title: content,
                  instructions: instructions,
                  image: image
                }
      }).done(function(createdRecipe) {
        var $recipe = $(createdRecipe.content +
                      createdRecipe.instructions +
                      createdRecipe.image);
        $recipesCon.append($recipe);
      });
      this.reset();
    });
   
});

