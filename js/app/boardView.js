define(["backbone", "cellView"], function(Backbone, CellView) {
  var BoardView = Backbone.View.extend({
    /** A board is a table. */
    tagName: 'table',

    className: 'board',

    template: _.template($('#board-template').html()),

    initialize: function() {
      this.render();
    },

    render: function() {
      this.$el.html(this.template(this.model.toJSON()));

      var cells = this.model.cells;
      var size = this.model.get('size');

      _.forEach(this.$el.find("td"), function(td) {
        var coord = $(td).attr('id').split('x');
        var idx = parseInt(coord[0]) * size + parseInt(coord[1]);
        var cell = new CellView({ model: cells[idx] });
        $(td).html(cell.render().el);
      });

      return this;
    },
  });
  return BoardView;
});
