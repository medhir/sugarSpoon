/************************************************
      Models
*************************************************/

// var appModel = Backbone.Model.extend({
//   initialize: function(params) {
//     this.set('searchInput', )
//   }
// });

var FoodItem = Backbone.Model.extend({
  defaults: {
    id: '',
    name: ''
  }
});

var SugarModel = Backbone.Model.extend({

});

/************************************************
      Collections
*************************************************/

var FoodItems = Backbone.Collection.extend({
  model: app.FoodItem
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
    app.foodResults($input.val(), this.collection);
    $input.val('')
  }
});

var FoodItemView = Backbone.View.extend({
  tagName: 'div',
  className: 'foodItem', 

  template: _.template('<h4 class="name"><%= name %></h4>'), 

  events: {
    'click .name' : 'sugarContent'
  },

  sugarContent: function() {
    console.log('should get sugarContent');
  }

  render: function() {
    this.$el.html(this.template(this.model.attributes));
  }
});

var FoodItemsView = Backbone.View.extend({
  tagName: 'div', 
  className: 'results', 

  render: function(){
    //detach previous items
    this.$el.children.detach();


    this.$el.append(
      this.collection.map(function(item) {
        return new FoodItemView({model: item}).render();
        })
      );
  }
});

var SugarView = Backbone.View.extend({

});


/************************************************
      Helper methods
*************************************************/

var foodResults = function(query, collection) {
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
      var hits = data.hits;
      hits.forEach(function(hit) {
        var params = hit.fields;
        var item = new FoodItem({
          id : fields._id,
          name : fields.name
        });
        collection.add(item);
      });
    }, 
    error: function(err) {
      console.error(err);
    }
  });
};

var itemById = function(id) {

};

/************************************************
      Instantiation of everything
*************************************************/

new app.searchInput({el: $('#searchForm')});
