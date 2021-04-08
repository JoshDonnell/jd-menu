"use strict";

function _instanceof(left, right) { if (right != null && typeof Symbol !== "undefined" && right[Symbol.hasInstance]) { return !!right[Symbol.hasInstance](left); } else { return left instanceof right; } }

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!_instanceof(instance, Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

;

(function (factory) {
  if (typeof define === 'function' && define.amd) {
    define(['jquery'], factory);
  } else if (typeof module !== 'undefined' && module.exports) {
    module.exports = factory(require('jquery'));
  } else {
    factory(jQuery);
  }
})(function ($) {
  var JdMenu = /*#__PURE__*/function () {
    function JdMenu(element) {
      var customOptions = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

      _classCallCheck(this, JdMenu);

      // Settings
      this.settings = _objectSpread(_objectSpread({}, this.defaults), customOptions); // Init and Custom Actions

      if (_typeof(customOptions) === 'object' || customOptions == 'startmenu') {
        this.init(element);
      } else {
        switch (customOptions) {
          case 'up':
            this.up(element);
            break;

          case 'down':
            this.down(element);
            break;

          case 'removemenu':
            this.removeMenu(element);
            break;
        }
      }
    } // Init 


    _createClass(JdMenu, [{
      key: "defaults",
      get: // Default Settings
      function get() {
        return {
          arrows: true,
          animation: 'slide',
          duration: 300,
          customArrow: '<i class="jdmenu-arrow  fa fa-chevron-right"></i>',
          customBack: '<i class="fa fa-chevron-left"></i> Back',
          theme: 'default'
        };
      }
    }, {
      key: "init",
      value: function init(element) {
        this.menu = element;
        var menu = this.menu,
            settings = this.settings; // Check If Theme

        if (settings.theme == 'default') {
          menu.addClass('jd-menu');
        } // Set Current Menu Item (Default is the first ul)


        this.currentLevel = menu.find('> ul'); // Set Left Value

        this.left = 0; // Add Back Buttons

        menu.find('li > ul').prepend("<li class=\"jdmenu-back  js-back\"><span>".concat(settings.customBack, "</span></li>")); // Add Arrows

        menu.find('li').each(function (index, value) {
          if ($(this).children('ul').length > 0) {
            $(this).addClass('hasChild');
            if (!settings.customArrow) return;
            $(this).append(settings.customArrow);
          }
        }); // If no animation set duration to 0

        if (settings.animation == false) {
          this.settings.duration = 0;
        } // Click Events


        this.clickEvents(); // Trigger

        this.trigger();
      } // Move

    }, {
      key: "_move",
      value: function _move(ammount, callback) {
        var menu = this.menu,
            settings = this.settings; // Animate

        menu.find('>ul').animate({
          left: ammount
        }, settings.duration, callback);
      } // Menu Click and Slide / Animate

    }, {
      key: "clickEvents",
      value: function clickEvents() {
        var menu = this.menu,
            settings = this.settings;

        var _ = this;

        $('li', this.currentLevel).click(function (e) {
          // Check last clicked time
          if (this._clicked + settings.duration > Date.now()) return;
          if (menu.find('>ul').is(':animated')) return; // Set Date Now

          this._clicked = Date.now();
          e.stopPropagation(); // Cache Click Event

          var $this = $(this);
          var target = $(e.target);

          if ($(this).is('.hasChild')) {
            if (target.is('.jdmenu-back') || $(this).hasClass('.jdmenu-back') || target.parents('.jdmenu-back').length || target.is('a') && target.attr('href') != '#') return;
            _.left = _.left - 100;

            _._move("".concat(_.left, "%"));

            this.currentLevel = $this.find('> a').next();
            this.currentLevel.show();
          }

          if ($(this).is('.jdmenu-back')) {
            _.left = _.left + 100;

            _._move("".concat(_.left, "%"), function () {
              this.currentLevel = $this.parent();
              this.currentLevel.hide();
            });
          }
        });
      } // Trigger

    }, {
      key: "trigger",
      value: function trigger() {
        var menu = this.menu,
            settings = this.settings;

        var _ = this;

        if (settings.trigger) {
          var $trigger = settings.trigger;
          $trigger.click(function () {
            if (!menu.hasClass('isActive')) {
              menu.addClass('isActive');
              _.left = 0;
              menu.find('>ul').animate({
                left: _.left
              }, 0);
              menu.find('ul >li ul').hide();
            } else {
              menu.removeClass('isActive');
            }

            menu.slideToggle();
          });
        }
      } // Up

    }, {
      key: "up",
      value: function up($menu) {
        var menu = $menu;
        $menu.slideUp();
      } // Down

    }, {
      key: "down",
      value: function down($menu) {
        var menu = $menu;
        $menu.slideDown();
      } // Remove Menu

    }, {
      key: "removeMenu",
      value: function removeMenu($menu) {
        var menu = $menu;
        menu.removeClass('jd-menu');
        menu.find('.jdmenu-arrow').remove();
        menu.find('.jdmenu-back').remove();
      }
    }]);

    return JdMenu;
  }(); // Jquery Plugin


  $.fn.jdMenu = function ($customOptions) {
    var jdMenu = new JdMenu($(this), $customOptions);
    return jdMenu;
  };
});