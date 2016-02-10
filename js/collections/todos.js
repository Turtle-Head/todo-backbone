// js/collections/todos.js

var app = app || {};

// Todo collections

// The collection of todos is stored localy by 'localStorage'
var TodoList = Backbone.Collection.extend({

  // Reference to the model
  model: app.Todo,

  // Save all of the todos under the "todos-backbone" namespace
  localStorage: new Backbone.localStorage('todos-backbone'),

  // Filter the todos for completed items
  // Returns items with completed = true
  completed: function() {
      return this.filter(function( todo ){
          return todo.get('completed');
      });
  },

  // Filters list of todos for !completed
  remaining: function() {
      return this.without.apply( this, this.completed() );
  },

  // Keeping the todos in sequential order, despite the unordered db. This generates the next order number for new items.
  nextOrder: function() {
      if ( !this.length ) {
          return 1;
      }
  },

  // Todos are sorted by their original order
  comparator: function( todo ) {
    return todo.get('order');
  }
});

// Create the golbal collection of Todos
app.Todos = new TodoList();
