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
    name: ''
  }, 

  getInfoById: function() {
    this.trigger('getInfoById', this);
  }
});

var SugarModel = Backbone.Model.extend({});

/************************************************
      Collections
*************************************************/

var FoodItems = Backbone.Collection.extend({
  model: FoodItem
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
    //TODO: remove previous items from collection
    getResults($input.val(), this.collection);
    $input.val('');
  }
});

var FoodItemView = Backbone.View.extend({
  tagName: 'div',
  className: 'item', 

  template: _.template('<h4 class="name"><%= name %></h4>'), 

  events: {
    'click .name' : 'sugarContent'
  },

  sugarContent: function() {
    this.model.getInfoById();
  },

  render: function() {
    return this.$el.html(this.template(this.model.attributes));
  }
});

var FoodItemsView = Backbone.View.extend({
  tagName: 'div', 
  className: 'results', 

  initialize: function() {
    this.collection.on('add', this.render, this);
    this.render();
  },

  render: function(){
    //detach previous items
    this.$el.children().detach();

    this.$el.append(
      this.collection.map(function(item) {
        return new FoodItemView({model: item}).render();
        })
      );
  }
});

var SugarView = Backbone.View.extend({
  tagName: 'div',
  className: 'sugarContent',

  template: _.template('<h4><%= name %> has <%= sugar %> grams of sugar. This is equivalent to <strong><%= spoons %></strong> teaspoons.</h4>'),

  initialize: function() {
    this.model.on('change', this.render, this);
  }, 

  render: function(){
    this.$el.children().detach();
    return this.$el.append(this.template(this.model.attributes));
  }
});


/************************************************
      Helper methods
*************************************************/

var getResults = function(query, collection) {
  $.ajax({
    url: 'https://api.nutritionix.com/v1_1/brand/search',
    method: 'GET',
    crossDomain: true,
    data: {
      appId: apiId, 
      appKey: apiKey, 
      query: query
    },
    dataType: 'json',  
    success: function(data) {
      collection.reset();
      data.hits.forEach(function(hit) {
        console.log('single hit', hit);
        var params = hit.fields;
        var item = new FoodItem(params);
        collection.add(item);
      });
    }, 
    error: function(err) {
      console.error(err);
    }
  });
};

var getInfo = function(brandItem, nutritionInfo) {
  $.ajax({
    url: 'https://api.nutritionix.com/v1_1/search/' + brandItem.get('name'), 
    method: 'GET', 
    crossDomain: true, 
    data: {
      appId: apiId, 
      appKey: apiKey, 
      brand_id: nutritionInfo.get('id'),
      fields: 'nf_sugars',
      results: '0:50' 
    }, 
    dataType: 'json', 
    success: function(data) {
      var hits = data.hits;
      var sugars = 0;
      for(var i = 0; i < hits.length; i++) {
        var hitSugar = hits[i].fields.nf_sugars;
        if(hitSugar !== null && hitSugar > sugars) {
          sugars = hits[i].fields.nf_sugars;
        }
      }

      nutritionInfo.set({
        name: brandItem.get('name'), 
        sugar: sugars, 
        spoons: sugars/6
      });
    }, 
    error: function(err) {
      console.error(err);
    } 
  });
};

/************************************************
      Instantiation of everything
*************************************************/

$(function(){
  var foodResults = new FoodItems();

  new searchInput({ el: $('#searchForm'), collection: foodResults });

  var foodResultsView = new FoodItemsView({ collection: foodResults });

  $('body').append(foodResultsView.$el);

  var nutritionInfo = new SugarModel({
    name: 'asdf', 
    sugar: 2, 
    spoons: 3
  });

  var nutritionView = new SugarView({model: nutritionInfo});

  foodResults.on('getInfoById', function(item) {
    getInfo(item, nutritionInfo);
  }, this);

  $('body').append(nutritionView.render());
  
});

