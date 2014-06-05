define(
  ["backbone", "game", "boardView", "selectorView", "timer"],
  function(Backbone, Game, BoardView, SelectorView, Timer) {
    var GameView = Backbone.View.extend({
      className: "game",

      template: _.template($("#game-template").html()),

      events: {
        "click .reset": "reset"
      },

      initialize: function() {
        /** Start with a beginner level by default. */
        this.model = new Game({ level: 0 });
      },

      render: function() {
        this.$el.html(this.template(this.model.toJSON()));

        var boardView = new BoardView({ model: this.model });
        this.$(".board").html(boardView.render().el);

        var selectorView = new SelectorView({ model: this.model });
        this.$(".selector").html(selectorView.render().el);

        var timer = new Timer({ model: this.model });
        this.$(".timer").html(timer.render().el);

        return this;
      },

      reset: function() {
        var prev = this.model.previous('level');
        var curr = this.model.get('level');
        this.$('.board').removeClass('level_' + prev).addClass('level_' + curr);
        this.model.reset();
      }
    });

    return GameView;
  }
);
