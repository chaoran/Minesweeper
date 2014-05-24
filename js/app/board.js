define(["backbone", "cell"], function(Backbone, Cell) {
  var Board = Backbone.Model.extend({
    initialize: function() {
      var size = this.get('size');
      var nMines = this.get('nMines');
      var cells = [];
      var i, j;

      /** Initialize the first row. */
      var ups, curs = [];
      curs[0] = new Cell();
      cells.push(curs[0]);

      for (j = 1; j < size; j++) {
        curs[j] = new Cell({ neighbors: [ curs[j-1] ] });
        cells.push(curs[j]);
      }

      /** Set last row to current row. Reset current row. */
      ups = curs;
      curs = [];

      /** Initialize the remaining rows. */
      for (var i = 1; i < size; ++i) {
        /** First column doesn't have left and upleft neighbor. */
        curs[0] = new Cell({neighbors: [ ups[0], ups[1] ] });
        cells.push(curs[0]);

        for (j = 1; j < size - 1; ++j) {
          curs[j] = new Cell({
            neighbors: [ ups[j - 1], ups[j], ups[j + 1], curs[j - 1] ]
          });
          cells.push(curs[j]);
        }

        /** Last column doesn't have upright neighbor. */
        curs[j] = new Cell({ neighbors: [ ups[j - 1], ups[j], curs[j - 1] ] });
        cells.push(curs[j]);

        ups = curs;
        curs = [];
      }

      while (nMines > 0) {
        var idx = Math.floor(Math.random() * size * size);
        var cell = cells[idx];

        if (cell.get('hasMine')) continue;

        cell.plantMine();
        nMines--;
      }

      this.cells = cells;
    },
  });

  return Board;
});
