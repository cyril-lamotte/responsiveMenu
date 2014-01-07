(function( $ ) {
"use strict";

  $.responsiveMenu = function(element, options) {

    // Default options
    var defaults = {
      triggerText: 'Menu ',
      breakpoint: '(max-width: 767px)',
      onShow: function() {},
      onHide: function() {}
    };

    var plugin = this,
        $element = $(element),
        element = element;

    plugin.settings = {}



    plugin.init = function() {

      plugin.settings = $.extend({}, defaults, options);

      plugin.settings.$menu = $element.find('> ul');
      plugin.settings.$listItems = $element.find('> ul > li');
      plugin.settings.$links = plugin.settings.$listItems.find('a');

      initWidget();

      setEvents();

    }


    var initWidget = function() {

      setARIA();

      // Set the active menu
      // It's defined by the "active" class on <li> tag

      var $activeItem = plugin.settings.$listItems.filter('.active');
      plugin.settings.currentMenu = $activeItem.text();


      // Insert toggle button
      $element.prepend('<button type="button" role="button" aria-haspopup="true" aria-expanded="false" class="responsive-menu-trigger"><span class="responsive-menu-arrow">'+ plugin.settings.triggerText +'<span class="responsive-menu-value">'+ plugin.settings.currentMenu +'</span></span></button>');
      plugin.settings.$trigger = $element.find('> button.responsive-menu-trigger');

    }


    var setARIA = function() {

      plugin.settings.$menu.attr({
        'role': 'menu',
        'aria-hidden' : 'false'
      });


      // Popup can only be "aria-hidden" within breakpoint

      if('matchMedia' in window) {

        if(window.matchMedia( plugin.settings.breakpoint ).matches)
          plugin.settings.$menu.setARIA('hidden', true)

      }


        plugin.settings.$listItems.attr({
          'role': 'presentation'
        });


          plugin.settings.$links.each(function(i, el) {

              $(this).attr({
                'role': 'menu-item'
              }).setARIAFocusable(false);

            });


          var $focusableLink = plugin.settings.$listItems.filter('.active').find('a');
          if ( ! $focusableLink.length )
            plugin.settings.$listItems.first().find('a').setARIAFocusable(true);

          $focusableLink.setARIAFocusable(true);

    }



    var setEvents = function() {

      // Close on click out
      $('html').click(function() {
        closePopup();
      });


      // Toggle menu on click
      plugin.settings.$trigger.on('click', function(event)
      {

        event.stopPropagation();
        $element.toggleClass('responsive-menu-expanded');
        plugin.settings.$trigger.toggleARIA('expanded');
        plugin.settings.$menu.toggleARIA('hidden');
        plugin.settings.$listItems.find('a[tabindex="0"]').focus();

      });


      // Link's click update trigger value & close the popup
      plugin.settings.$links.on('click', function(event) {

        event.stopPropagation();
        selectAndClose( $(this) );

      });



      // Keyboard events
      plugin.settings.$links.keydown(function(event) {

        var $this = $(this);

        switch ( event.keyCode ) {

          case $.accessUI.keyCode.RIGHT :
          case $.accessUI.keyCode.DOWN :
            $this.moveFocusTo('next');
            return false;
          break;

          case $.accessUI.keyCode.UP :
          case $.accessUI.keyCode.LEFT :
            $this.moveFocusTo('prev');
            return false;
          break;

          case $.accessUI.keyCode.ESCAPE :
          case $.accessUI.keyCode.TAB :
            closePopup();
          break;

        }

      });


    }


    var selectAndClose = function( $link ) {

      plugin.settings.$listItems.removeClass('active');
      plugin.settings.$links.setARIAFocusable(false);

      // Select new value
      $link.setARIAFocusable(true);
      $link.parent().addClass('active');

      plugin.settings.$trigger.find('.responsive-menu-value')
        .text( $link.text() );

      // Close popup
      closePopup();

    }


    var closePopup = function() {

      // Close popup
      $element.removeClass('responsive-menu-expanded');
      plugin.settings.$menu.setARIA('hidden', true);

      // Return focus
      plugin.settings.$trigger.focus();

    }

    plugin.init();

  }



  $.fn.responsiveMenu = function(options) {

    return this.each(function() {

      if (undefined == $(this).data('responsiveMenu')) {

        var plugin = new $.responsiveMenu(this, options);
        $(this).data('responsiveMenu', plugin);

      }

    });

  };


})( jQuery );