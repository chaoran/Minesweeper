requirejs.config({
  baseUrl: 'js',
  paths: {
    backbone: '../lib/backbone/backbone',
    bootstrap: '../lib/bootstrap/dist/js/bootstrap.min',
    underscore: '../lib/underscore/underscore',
    jquery: '../lib/jquery/dist/jquery.min'
  },
  shim: {
    'backbone': {
      deps: [ "jquery", "underscore" ],
    },
    'bootstrap': {
      deps: [ 'jquery' ],
    },
    'underscore': {
      exports: "_",
    }
  }
});

requirejs(['game', 'bootstrap'], function(Game) {
  new Game({ level: 0 });
});
