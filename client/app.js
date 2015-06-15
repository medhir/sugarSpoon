/************************************************
      Models
*************************************************/

var FoodItem = Backbone.Model.extend({

});

var SugarModel = Backbone.Model.extend({

});

/************************************************
      Collections
*************************************************/

var FoodItems = Backbone.Collection.extend({

});

/************************************************
      Views
*************************************************/

var searchInput = Backbone.View.extend({
  events: {
    'submit' : 'runQuery'
  }, 

  runQuery : function(e) {
    e.preventDefault();
    //run query on DB
    //on success
      //remove failure thing 
      //add models to collection
    //on failure
      //append failure thing
  }
});

var FoodItemView = Backbone.View.extend({

});

var FoodItemsView = Backbone.View.extend({

});

var SugarView = Backbone.View.extend({

});



/************************************************
      Instantiation of everything
*************************************************/

new searchInput({el: $('#searchForm')});

