requirejs.config({
  baseUrl: 'js',
  paths: {
    backbone: 'lib/backbone/backbone',
    bootstrap: 'lib/bootstrap/dist/js/bootstrap.min',
    underscore: 'lib/underscore/underscore',
    jquery: '//ajax.googleapis.com/ajax/libs/jquery/2.1.1/jquery.min'
  },
  shim: {
    'bootstrap': [ 'jquery' ]
  }
});

require(['gameView', 'bootstrap'], function(GameView) {
  var gameView = new GameView();
  $("#main").html(gameView.render().el);
});
