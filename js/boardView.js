define(["backbone", "cellView"], function(Backbone, CellView) {
  var BoardView = Backbone.View.extend({
    /** A board is a table. */
    tagName: 'table',

    className: 'table table-bordered',

    template: _.template($('#board-template').html()),

    initialize: function() {
      this.listenTo(this.model, "change:board", this.render);
    },

    render: function() {
      var board = this.model.get('board');
      this.$el.html(this.template(board.toJSON()));

      var cells = board.cells;
      var size = board.get('size');

      _.forEach(this.$("td"), function(td) {
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
