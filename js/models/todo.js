// js/models.todo.js

var app = app || {};

// Todo Model: has 'title' and 'completed' attributes

app.Todo = Backbone.Model.extend({

    // Sets defaults
    defaults: {
        title: '',
        completed: false
    },

    // Toggle for the completed state
    toggle: function() {
        this.save({
            completed: !this.get('completed')
        });
    }
});
