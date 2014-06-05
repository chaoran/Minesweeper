define(["backbone"], function(Backbone) {
  var CellView = Backbone.View.extend({
    className: 'cell',

    template: _.template($('#cell-template').html()),

    render: function() {
      this.$el.html(this.template(this.model.toJSON()));
      return this;
    }
  });

  return CellView;
});
