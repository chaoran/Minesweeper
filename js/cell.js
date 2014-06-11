define(['backbone'], function(Backbone) {
  return Backbone.View.extend({
    className: 'ms-cell',

    template: function(value) {
      switch (value) {
        case undefined: return '<a class="btn btn-default tile"></a>';
        case '#': return '<a class="btn btn-default tile">' +
                            '<i class="fa fa-flag"></i>'    +
                         '</a>';
        case '*': return '<div><i class="fa fa-bomb"></i></div>';
        default: return '<div><span>' + value + '</span></div>';
      }
    },

    initialize: function(options) {
      this.row = options.row;
      this.col = options.col;
      this.board = options.board;
      this.render();
    },

    render: function() {
      this.$el.html(this.template(this.value));
      return this;
    },

    events: {
      'contextmenu': function() {
        switch (this.value) {
          case undefined: return this.flag();
          case '#': return this.unflag();
          case '*':
          case 0: return false;
          default: return this.flipNeighbors();
        }
      },
      'mousedown': function(e) {
        if (e.which === 1 && this.value === undefined) {
          this.model.set('state', 'danger');
        } else if (e.which === 3 && this.value >= 0 && this.value <= 9) {
          this.neighbors.forEach(function(nb) {
            if (nb.value === undefined) {
              nb.$('.tile').addClass('active');
            }
          });
        }
      },
      'mouseup': function(e) {
        if (e.which === 1 && this.value === undefined) {
          return this.flip();
        } else if (e.which === 3 && this.value >= 0 && this.value <= 9) {
          this.neighbors.forEach(function(nb) {
            if (nb.value === undefined) {
              nb.$('.tile').removeClass('active');
            }
          });
        }
      },
    },

    flag: function() {
      var model = this.model;
      var steps = model.get('stepsLeft');
      var mines = model.get('minesLeft');
      model.set('stepsLeft', steps - 1);
      model.set('minesLeft', mines - 1);

      this.value = '#';
      this.render();
      return false;
    },

    unflag: function() {
      var model = this.model;
      var steps = model.get('stepsLeft');
      var mines = model.get('minesLeft');
      model.set('stepsLeft', steps + 1);
      model.set('minesLeft', mines + 1);

      delete this.value;
      this.render();
      return false;
    },

    flip: function(ended) {
      var game = this.model;

      if (this.hasMine) {
        this.value = '*';
        this.render();

        if (!ended) {
          this.$el.addClass('explode');
          game.set('state', 'end');
        }

        return false;
      }

      /** Find how many mines are in the neighboring cells. */
      var board = this.board
        , x = this.row
        , y = this.col
        , i_end = x < board.length - 1 ? x + 1 : x
        , j_end = y < board[0].length - 1 ? y + 1 : y
        , neighbors = []
        , mines = 0;

      for (var i = x > 0 ? x - 1 : x; i <= i_end; ++i) {
        for (var j = y > 0 ? y - 1 : y; j <= j_end; ++j) {
          if (i !== x || j !== y) neighbors.push(board[i][j]);
        }
      }

      /** Cache neighbors */
      this.neighbors = neighbors;

      for (var i = 0, l = neighbors.length; i < l; ++i) {
        if (neighbors[i].hasMine) ++mines;
      }

      this.value = mines;
      this.render();
      if (game.get('state') !== 'win') game.set('state', 'ready');

      var left = game.get('stepsLeft');
      game.set('stepsLeft', left - 1);

      if (mines == 0) {
        neighbors.forEach(function(nb) {
          if (nb.value === undefined) nb.flip();
        });
      }

      return false;
    },

    flipNeighbors: function() {
      var neighbors = []
        , flags = 0;

      this.neighbors.forEach(function(nb) {
        switch (nb.value) {
          case undefined: neighbors.push(nb); break;
          case '#': ++flags; break;
        }
      });

      /**
       * Only flip neighbors when the number of neighbor flags
       * equals the number of mines. */
      if (flags === this.value) {
        neighbors.forEach(function(nb) { nb.flip(); });
      }

      return false;
    },
  });
});
