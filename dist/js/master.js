(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

(function ($) {
    module.exports = function jdMenu() {
        var JdMenu = function () {
            _createClass(JdMenu, [{
                key: 'defaults',


                // Default Settings
                get: function get() {
                    return {
                        arrows: true,
                        animation: 'slide',
                        duration: 300,
                        customArrow: '<i class="fa fa-chevron-right"></i>',
                        customBack: '<li class="js-back"><span><i class="fa fa-chevron-left"></i> Back</span></li>',
                        'theme': 'default'
                    };
                }
            }]);

            function JdMenu(element) {
                var customOptions = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

                _classCallCheck(this, JdMenu);

                // Settings
                this.settings = _extends({}, this.defaults, customOptions);

                // Init
                this.init(element);
            }

            // Init 


            _createClass(JdMenu, [{
                key: 'init',
                value: function init(element) {
                    this.menu = element;

                    var menu = this.menu,
                        settings = this.settings;

                    // Check If Theme

                    if (settings.theme == 'default') {
                        menu.addClass('jd-menu');
                    }

                    // Set Current Menu Item (Default is the first ul)
                    this.currentLevel = menu.find("> ul");

                    // Add Back Buttons
                    menu.find("li > ul").prepend(settings.customBack);

                    // Add Arrows
                    menu.find("li").each(function (index, value) {
                        if ($(this).children('ul').length > 0) {
                            $(this).addClass('hasChild');
                            if (!settings.customArrow) return;
                            $(this).append(settings.customArrow);
                        }
                    });

                    // If no animation set duration to 0
                    if (settings.animation == false) {
                        this.settings.duration = 0;
                    }

                    // Click Events
                    this.clickEvents();
                }

                // Move

            }, {
                key: '_move',
                value: function _move(ammount, callback) {
                    var menu = this.menu,
                        settings = this.settings;
                    // Animate

                    menu.animate({
                        left: ammount
                    }, settings.duration, callback);
                }

                // Menu Click and Slide / Animate

            }, {
                key: 'clickEvents',
                value: function clickEvents() {
                    var menu = this.menu,
                        settings = this.settings;

                    var _ = this;
                    var clickTime = null;

                    $("li", this.currentLevel).click(function (e) {
                        // Check last clicked time
                        if (this._clicked + settings.duration > Date.now()) return;
                        if (menu.is(':animated')) return;

                        // Set Date Now
                        this._clicked = Date.now();

                        e.stopPropagation();

                        // Cache Click Event
                        var $this = $(this);
                        var target = $(e.target);

                        if ($(this).is('.hasChild')) {
                            if (target.is('.js-back') || target.parents('.js-back').length || target.is('a')) return;
                            _._move('-=100%');
                            this.currentLevel = $this.find("> a").next();
                            this.currentLevel.show();
                        }

                        if ($(this).is('.js-back')) {
                            _._move('+=100%', function () {
                                this.currentLevel = $this.parent();
                                this.currentLevel.hide();
                            });
                        }
                    });
                }
            }]);

            return JdMenu;
        }();

        // Jquery Plugin


        var mobileMenu = $.fn.mobileMenu = function ($customOptions) {
            new JdMenu($(this), $customOptions);
        };
    };
});

},{}]},{},[1])

//# sourceMappingURL=master.js.map
