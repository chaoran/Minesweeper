define(
  ['backbone', 'board', 'dashboard'],
  function(Backbone, Board, Dashboard) {
    var CONFIG = [
      { rows:  9, cols:  9, mines: 10 },
      { rows: 16, cols: 16, mines: 40 },
      { rows: 16, cols: 30, mines: 99 }
    ];

    var Game = Backbone.Model.extend({
      initialize: function() {
        this.set('elapsedSeconds', 0);
        this.set('state', 'ready');

        var setup = this.getBoardSetup(this.get('level') || 0);
        this.set('stepsLeft', setup.rows * setup.cols);
        this.set('minesLeft', setup.mines);

        var board = new Board({ model: this, });
        var dashboard = new Dashboard({ model: this });

        $('.ms-root').empty();
        $('.ms-root').append(dashboard.el);
        $('.ms-root').append(board.el);

        this.on('change:state', function() {
          var state = this.get('state');

          if (state === 'end' || state === 'win') {
            this.stopTimer();
          }
        }, this);

        this.on('change:level', function() {
          this.restart();
        });

        this.startTimer();
      },

      startTimer: function() {
        var self = this;

        this.timer = setInterval(function() {
          var seconds = self.get('elapsedSeconds');
          self.set('elapsedSeconds', ++seconds);

          if (seconds === 999) {
            self.stopTimer();
          }
        }, 1000);
      },

      stopTimer: function() {
        clearInterval(this.timer);
      },

      restart: function() {
        return new Game({ level: this.get('level') });
      },

      getBoardSetup: function(level) {
        return CONFIG[level];
      },
    });

    return Game;
  }
);
