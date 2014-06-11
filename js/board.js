define(["backbone", "cell"], function(Backbone, Cell) {
  return Backbone.View.extend({
    tagName: 'tbody',

    className: 'ms-board',

    template: _.template($('#board-template').html()),

    initialize: function(options) {
      this.listenTo(this.model, 'change:level', this.render);
      this.listenTo(this.model, 'change:state', this.terminate);
      this.listenTo(this.model, 'change:stepsLeft', this.isSolved);
      this.render();
    },

    isSolved: function() {
      var steps = this.model.get('stepsLeft')
        , mines = this.model.get('minesLeft');

      if (steps !== mines) return false;

      var board = this.board
        , rows = board.length
        , cols = board[0].length;

      /** Victory if no flag is marked wrongly. */
      for (var i = 0; i < rows; ++i) {
        for (var j = 0; j < cols; ++j) {
          if (board[i][j].value === '#' && !board[i][j].hasMine) return false;
        }
      }

      for (var i = 0; i < rows; ++i) {
        for (var j = 0; j < cols; ++j) {
          if (board[i][j].value === undefined) {
            if (board[i][j].hasMine) board[i][j].flag();
            else board[i][j].flip();
          }
        }
      }

      this.model.set('state', 'win');
      return true;
    },

    createBoard: function(rows, cols, mines) {
      var model = this.model;

      /** Create a 2-dimension board. */
      var board = new Array(rows);

      for (var i = 0; i < rows; ++i) {
        var row = board[i] = new Array(cols);

        for (var j = 0; j < cols; ++j) {
          row[j] = new Cell({ model: model, row: i, col: j, board: board });
        }
      }

      /** Set mines in the board. */
      while (mines > 0) {
        var idx = Math.floor(Math.random() * cols * rows)
          , row = Math.floor(idx / cols)
          , col = idx % cols;

        if (!board[row][col].hasMine) {
          board[row][col].hasMine = true;
          --mines;
        }
      }

      return board;
    },

    render: function() {
      var model = this.model
        , level = model.get('level')
        , setup = model.getBoardSetup(level);

      var board = this.createBoard(setup.rows, setup.cols, setup.mines);
      this.board = board;
      this.$el.html(this.template(setup));

      _.forEach(this.$("td"), function(td) {
        var row = $(td).data("row");
        var col = $(td).data("col");
        $(td).html(board[row][col].el);
      });
    },

    terminate: function() {
      var state = this.model.get('state');
      if (state === 'ready' || state === 'danger') return;

      var board = this.board;

      for (var i = 0, l = board.length; i < l; ++i) {
        for (var j = 0, m = board[0].length; j < m; ++j) {
          var cell = board[i][j];

          cell.undelegateEvents();

          if (cell.hasMine && state === 'end') cell.flip(true);
        }
      }
    },
  });
});

