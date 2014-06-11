define(['backbone'], function(Backbone) {
  return Backbone.View.extend({
    template: _.template($('#smiley-template').html()),

    events: {
      'click': function() {
        this.model.restart();
      }
    },

    initialize: function() {
      this.listenTo(this.model, 'change:state', this.render);
      this.render();
    },

    render: function() {
      this.$el.html(this.template({
        state: this.model.get('state')
      }));
      return this;
    },
  });
});
