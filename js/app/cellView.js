define(["backbone"], function(Backbone) {
  var CellView = Backbone.View.extend({
    className: 'cell',

    render: function() {
      var cell = this.model;

      if (cell.get("hasMine")) {
        this.$el.html("*");
      } else {
        this.$el.html(cell.get('value'));
      }

      return this;
    }
  });

  return CellView;
});
