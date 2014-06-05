define(["backbone"], function(Backbone) {
  var Cell = Backbone.Model.extend({
    defaults: {
      neighbors: [],
      hasMine: false,
      value: 0
    },
    initialize: function() {
      var self = this;
      var neighbors = this.get('neighbors');
      neighbors.forEach(function(neighbor) {
        var neighborneighbors = neighbor.get('neighbors');
        neighborneighbors.push(self);
      });
    },
    plantMine: function() {
      var silent = { silent: true };
      var neighbors = this.get('neighbors');

      this.set('hasMine', true, silent);

      neighbors.forEach(function(neighbor) {
        var value = neighbor.get('value');
        neighbor.set('value', value + 1, silent);
      })
    }
  });

  return Cell;
});
