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
  tagName: 'li',
  className: 'list-group-item', 

  // template: _.template('<h4 class="name"><%= name %></h4>'), 

  events: {
    'click' : 'sugarContent'
  },

  sugarContent: function() {
    this.model.getInfoById();
  },

  render: function() {
    return this.$el.text(this.model.get('name'));
  }
});

var FoodItemsView = Backbone.View.extend({
  tagName: 'ul', 
  className: 'list-group', 

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
  className: 'sugarDescription',

  template: _.template('<h4 class="center"><%= name %> has <%= sugar %> grams of sugar. That is equivalent to around <strong><%= cubes %></strong> sugar cubes.</h4>'),

  initialize: function() {
    this.model.on('change', this.render, this);
  }, 

  render: function(){
    this.$el.children().detach();
    return this.$el.append(this.template(this.model.attributes));
  }
});

var cubesView = Backbone.View.extend({
  tagName: 'div', 
  className: 'sugarCubes', 

  initialize: function(){
    this.model.on('change', this.render, this);
  }, 

  render: function(){
    this.$el.children().detach();

    var numCubes = Math.floor(this.model.get('cubes'));
    var fractionCube = this.model.get('cubes') - numCubes;
    for(var i = 0; i < numCubes; i++) {
      this.$el.append('<img class="cube" src="assets/sugar_cube1_white.png"/>');
    }

    this.$el.append('<img class="fraction" src="assets/sugar_cube1_white.png"/>');
    $('.fraction').css({
      height: fractionCube*15 + '%', 
      width: fractionCube*15 + '%'
    });
  }
});


/************************************************
      Helper methods
*************************************************/

var getResults = function(query, collection) {
  // $.ajax({
  //   url: 'https://api.nutritionix.com/v1_1/brand/search',
  //   method: 'GET',
  //   crossDomain: true,
  //   data: {
  //     appId: apiId, 
  //     appKey: apiKey, 
  //     query: query
  //   },
  //   dataType: 'json',  
  //   success: function(data) {
  //     collection.reset();
  //     data.hits.forEach(function(hit) {
  //       console.log('single hit', hit);
  //       var params = hit.fields;
  //       var item = new FoodItem(params);
  //       collection.add(item);
  //     });
  //   }, 
  //   error: function(err) {
  //     console.error(err);
  //   }
  // });
  var items = {
    item1 : new FoodItem({name: 'Coke'}),
    item2 : new FoodItem({name: 'Candy'}),
    item3 : new FoodItem({name: 'Mountain Dew'}),
    item4 : new FoodItem({name: 'Hello there'}),
    item5 : new FoodItem({name: 'Placeholder'})
  };

  collection.reset();
  for(var item in items) {
    collection.add(items[item]);
  }
};

var getInfo = function(brandItem, nutritionInfo) {
  // $.ajax({
  //   url: 'https://api.nutritionix.com/v1_1/search/' + brandItem.get('name'), 
  //   method: 'GET', 
  //   crossDomain: true, 
  //   data: {
  //     appId: apiId, 
  //     appKey: apiKey, 
  //     brand_id: nutritionInfo.get('id'),
  //     fields: 'nf_sugars',
  //     results: '0:50' 
  //   }, 
  //   dataType: 'json', 
  //   success: function(data) {
  //     var hits = data.hits;
  //     var sugars = 0;
  //     for(var i = 0; i < hits.length; i++) {
  //       var hitSugar = hits[i].fields.nf_sugars;
  //       if(hitSugar !== null && hitSugar > sugars) {
  //         sugars = hits[i].fields.nf_sugars;
  //       }
  //     }

  //     nutritionInfo.set({
  //       name: brandItem.get('name'), 
  //       sugar: sugars, 
  //       cubes: Math.round(sugars/4*1000)/1000
  //     });
  //   }, 
  //   error: function(err) {
  //     console.error(err);
  //   } 
  // });
  nutritionInfo.set({
        name: 'This item', 
        sugar: 103, 
        cubes: Math.round(103/4*1000)/1000
      });
};

/************************************************
      Instantiation of everything
*************************************************/

$(function(){
  var foodResults = new FoodItems();

  new searchInput({ el: $('#searchForm'), collection: foodResults });

  var foodResultsView = new FoodItemsView({ collection: foodResults });

  $('.resultsContainer').append(foodResultsView.$el);

  var nutritionInfo = new SugarModel({
    name: 'asdf', 
    sugar: 2, 
    cubes: 3
  });

  var nutritionView = new SugarView({model: nutritionInfo});
  var sugarCubeView = new cubesView({model: nutritionInfo});

  foodResults.on('getInfoById', function(item) {
    getInfo(item, nutritionInfo);
  }, this);

  $('.sugarContainer').append(nutritionView.$el);
  $('.sugarContainer').append(sugarCubeView.$el);
  
});

