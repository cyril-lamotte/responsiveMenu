(function( $ ) {

  $.accessUI = {};

  $.extend( $.accessUI, {
    version: '1.0.0',

    keyCode: {
      BACKSPACE: 8,
      COMMA: 188,
      DELETE: 46,
      DOWN: 40,
      END: 35,
      ENTER: 13,
      ESCAPE: 27,
      HOME: 36,
      LEFT: 37,
      NUMPAD_ADD: 107,
      NUMPAD_DECIMAL: 110,
      NUMPAD_DIVIDE: 111,
      NUMPAD_ENTER: 108,
      NUMPAD_MULTIPLY: 106,
      NUMPAD_SUBTRACT: 109,
      PAGE_DOWN: 34,
      PAGE_UP: 33,
      PERIOD: 190,
      RIGHT: 39,
      SPACE: 32,
      TAB: 9,
      UP: 38
    },

    skipLinks: function() {

      $(this).bind('focus blur', function() {

          $( this.hash )
            .toggleClass('target')
            .attr('tabindex', '-1');
        });

    },

    // Set element focusable & aria-selected
    setARIAFocusable: function(bool) {

      var tabindex = (bool === true) ? '0' : '-1';

      $(this).attr({
        'aria-selected' : bool,
        'tabindex' : tabindex
      });

    },

    toggleARIA: function(attr) {

      var $this = $(this);

      if( $this.attr('aria-'+ attr) == 'false' )
        $this.setARIA(attr, true);
      else
        $this.setARIA(attr, false);

    },

    setARIA: function(attr, bool) {
      $(this).attr('aria-'+ attr, bool);
    },


    moveFocusTo: function(direction) {

      var $this = $(this);
      var $focusedElmt = $this;
      var $focusTarget = ( direction == 'next' ) ? $this.parent().next().find('a') : $this.parent().prev().find('a');

      $focusTarget
        .attr('tabindex', '0')
        .focus();

      $focusedElmt
        .attr('tabindex', '-1');

    }


  });


  $.extend( $.fn, $.accessUI);

})( jQuery );