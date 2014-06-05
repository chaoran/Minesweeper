define(["backbone"], function(Backbone) {
  var Timer = Backbone.View.extend({
    tagName: 'span',

    initialize: function() {
      this.listenTo(this.model, "change:elapsed", this.render);
    },

    render: function() {
      var elapsed = this.model.get('elapsed');
      var value;

      if (elapsed < 10) {
        value = '00' + elapsed;
      } else if (elapsed < 100) {
        value = '0' + elapsed;
      } else if (elapsed < 1000) {
        value = '' + elapsed;
      } else {
        value = '999';
      }

      this.$el.html(value);
      return this;
    }
  });

  return Timer;
});
