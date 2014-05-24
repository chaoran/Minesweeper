requirejs.config({
  baseUrl: 'js/app',
  paths: {
    backbone: '../lib/backbone/backbone',
    underscore: '../lib/underscore/underscore',
    jquery: '//ajax.googleapis.com/ajax/libs/jquery/2.1.1/jquery.min'
  },
});

require(['board', 'boardView'], function(Board, BoardView) {
  var board = new Board({ size: 8, nMines: 10 });
  var boardView = new BoardView({ model: board });
  $('body').html(boardView.el);
});
