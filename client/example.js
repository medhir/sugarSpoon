/*
Page for laying out all ideas and examples of code to create app

-------------------------------------------------
TODO
-------------------------------------------------
-handle API requests
-create input field for making queries
  ---> Backbone view that takes in input, has a submit event listener
        -on submit, make a query, add items to Results collection
-create backbone model for food item 
  --->this will store all the relevant information about each food item
-create backbone collection for food search results
  --->this will store FoodItems

-------------------------------------------------
How to make an API request
-------------------------------------------------

Send a JSON object for the request, Content-Type header = "application/json"

{
 "appId":"YOUR_API_ID",
 "appKey":"YOUR_API_KEY",
 "query":"Cookies `n Cream"
}
*/