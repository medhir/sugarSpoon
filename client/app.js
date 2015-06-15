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
    var $input = $('#searchInput');
    foodResults($input.val());
    $input.val('')
    //run query on DB
    //on success
      //remove failure thing 
      //add models to collection
      //clear input field
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
      Helper methods
*************************************************/

var foodResults = function(query) {
  $.ajax({
    url: 'https://api.nutritionix.com/v1_1/brand/search',
    method: 'GET',
    crossDomain: true,
    data: {
      appId: apiId, 
      appKey: apiKey, 
      query: query, 
      'content-type': 'application/json'
    }, 
    success: function(data) {
      debugger;
      console.log(data);
    }, 
    error: function(err) {
      console.log(err);
    }
  });
};

var itemById = function(id) {

};

/************************************************
      Instantiation of everything
*************************************************/

new searchInput({el: $('#searchForm')});

