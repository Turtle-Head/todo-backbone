// js/views/app.js

var app = app || {};

// The Application

// AppView is the top-level of the UI
app.AppView = Backbone.view.extend({

  // Bind to the skeleton in the HTML
  el: '#todoapp',

  // the template for stats at the bottom of the page
  statsTemplate: _.template( $('#stats-template').html() ),

  // At initialization binds to the relevant events on the 'Todos' collection, when items are added or changed
  initialize: function() {
      this.allCheckbox = this.$('#toggle-all')[0];
      this.$input = this.$('new-todo');
      this.$footer = this.$('#footer');
      this.$main = this.$('#main');

      this.listenTo(app.Todos, 'add', this.addOne);
      this.listenTo(app.Todos, 'reset', this.addAll);
  },

  // Add a todo item to the list by creating a view for it and appending it to the list
  addOne: function( todo ){
      var view = new app.TodoView({
        model: todo
      });
      $('#todo-list').append( view.render().el);
  },

  // Add all items in the Todos collection at once
  addAll: function() {
    this.$('#todo-list').html('');
    app.Todos.each(this.addOne, this);
  }
});
