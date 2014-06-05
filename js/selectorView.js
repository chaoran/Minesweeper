define(["backbone"], function(Backbone) {
  var SelectorView = Backbone.View.extend({
    className: "btn-group",

    template: _.template($("#selector-template").html()),

    events: {
      "click .level": "select"
    },

    initialize: function() {
      this.listenTo(this.model, 'change:level', this.render);
    },

    render: function() {
      this.$el.html(this.template(this.model.toJSON()));
      return this;
    },

    select: function(ev) {
      var level = parseInt($(ev.target).data('level'));
      this.model.set("level", level);
    }
  });
  return SelectorView;
});
