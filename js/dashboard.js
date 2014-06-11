define(['backbone'], function(Backbone) {
  var SMILEYS = {
    ready:  'smile-o',
    danger: 'meh-o',
    end:    'frown-o',
    win:    'thumbs-o-up'
  };

  return Backbone.View.extend({
    tagName: 'thead',

    className: 'ms-dashboard',

    template: _.template($('#dashboard-template').html()),

    events: {
      'click .level': function(e) {
        this.model.set('level', $(e.target).data('level'));
        return false;
      },
      'click .smiley': function() {
        this.model.restart();
        return false;
      }
    },

    initialize: function() {
      this.listenTo(this.model, 'change:minesLeft', this.renderCounter);
      this.listenTo(this.model, 'change:elapsedSeconds', this.renderTimer);
      this.listenTo(this.model, 'change:state', this.renderSmiley);
      this.render();
    },

    renderCounter: function() {
      var nMines = this.model.get('minesLeft')
        , text = '';

      if (nMines < 0) {
        nMines = -nMines;
        text = '-';
      } else {
        text = '0';
      }

      if (nMines < 10) {
        text += '0' + nMines;
      } else if (nMines < 100) {
        text += '' + nMines;
      } else {
        text += '99';
      }

      this.$('.counter').html(text);
      return this;
    },

    renderTimer: function() {
      var elapsed = this.model.get('elapsedSeconds');
      var text;

      if (elapsed < 10) {
        text = '00' + elapsed;
      } else if (elapsed < 100) {
        text = '0' + elapsed;
      } else if (elapsed < 1000) {
        text = '' + elapsed;
      } else {
        text = '999';
      }

      this.$('.timer').html(text);
      return this;
    },

    renderSmiley: function() {
        var state = this.model.get('state')
          , smiley = SMILEYS[state];

        this.$('.smiley').html('<i class="fa fa-lg fa-' + smiley + '"></i>');
    },

    render: function() {
      this.$el.html(this.template());

      this.$('.level').val(this.model.get('level'));

      this.renderCounter();
      this.renderTimer();
      this.renderSmiley();

      return this;
    }
  });
});
