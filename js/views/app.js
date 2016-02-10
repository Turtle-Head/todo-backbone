// js/views/app.js

var app = app || {};

// The Application

  // AppView is the top-level of the UI
app.AppView = Backbone.view.extend({

    // Bind to the skeleton in the HTML
    el: '#todoapp',

    // the template for stats at the bottom of the page
    statsTemplate: _.template( $('#stats-template').html() ),

    // Events for items
    events: {
        'keypress #new-todo': 'createOnEnter',
        'click #clear-completed': 'clearCompleted',
        'click #toggle-all': 'toggleAllComplete'
    },

    // At initialization binds to the relevant events on the 'Todos' collection, when items are added or changed
    initialize: function() {
        this.allCheckbox = this.$('#toggle-all')[0];
        this.$input = this.$('new-todo');
        this.$footer = this.$('#footer');
        this.$main = this.$('#main');

        this.listenTo(app.Todos, 'add', this.addOne);
        this.listenTo(app.Todos, 'reset', this.addAll);

        this.listenTo(app.Todos, 'change:completed', this.filterOne);
        this.listenTo(app.Todos, 'filter', this.filterAll);
        this.listenTo(app.Todos, 'all', this.render);

        app.Todos.fetch();
    },

    // Render statistics
    render: function() {
        var completed = app.Todos.completed().length;
        var remaining = app.Todos.remaining().length;

        if ( app.Todos.length ) {
            this.$main.show();
            this.$footer.show();

            this.$footer.html(this.statsTemplate({
                completed: completed,
                remaining: remaining
            }));

            this.$('#filters li a')
                .removeClass('selected')
                .filter('[href="#/' + ( app.TodoFilter || '' ) + '"]')
                .addClass('selected');
        } else {
            this.$main.hide();
            this.$footer.hide();
        }

        this.allCheckbox.checked = !remaining;
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
    },

    // Shows an item when added
    filterOne: function( todo ) {
        todo.trigger('visible');
    },

    // Shows all items
    filterAll: function() {
        app.Todos.each(this.filterOne, this);
    },

    // Generates attributs for the new items
    newAttributes: function() {
        return {
            title: this.$input.val().trim(),
            order: app.Todos.nextOrder(),
            completed: false
        };
    },

    // Create a new Todo model if you hit return in the main input field, store it in local storage
    createOnEnter: function( event ) {
        if ( event.which !== ENTER_KEY || !this.$input.val().trim() ) {
            return;
        }
        app.Todos.create( this.newAttributes() );
        this.$input.val('');
    },

    // Clear all completed todo items, destroy the models
    clearCompleted: function() {
        _invoke(app.Todos.completed(), 'destroy');
        return false;
    },

    toggleAllComplete: function() {
        var completed = this.allCeckbox.checked;

        app.Todos.each(function( todo ) {
            todo.save({
                'completed': completed
            });
        });
    }
});
