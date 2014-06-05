define(['backbone', 'board'], function(Backbone, Board) {
  var BOARD_CONFIG = [
    { size:  9, nMines: 10 },
    { size: 16, nMines: 40 },
    { size: 22, nMines: 99 }
  ];

  var Game = Backbone.Model.extend({
    initialize: function() {
      var self = this;

      this.reset();
      this.timer = setInterval(function() {
        var elapsed = self.get('elapsed');
        if (elapsed < 999) {
          self.set('elapsed', elapsed + 1);
        } else {
          clearInterval(self.timer);
        }
      }, 1000);
    },

    reset: function() {
      var config = BOARD_CONFIG[this.get('level')];
      this.set('board', new Board(config));
      this.set('elapsed', 0);
    },
  });

  return Game;
});
