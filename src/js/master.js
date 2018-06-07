;(function(factory) {
    if (typeof define === 'function' && define.amd) {
        define(['jquery'], factory);
    } else if (typeof module !== 'undefined' && module.exports) {
        module.exports = factory(require('jquery'));
    } else {
        factory(jQuery);
    }
}(function($) {
    class JdMenu {

        // Default Settings
        get defaults() {
            return {
                arrows: true,
                animation: 'slide',
                duration: 300,
                customArrow:'<i class="fa fa-chevron-right"></i>',
                customBack: `<li class="js-back"><span><i class="fa fa-chevron-left"></i> Back</span></li>`,
                theme: 'default'
            }
        }


        constructor(element, customOptions = {}) {
            // Settings
            this.settings = {
                ...this.defaults,
                ...customOptions
            }

            // Init
            this.init(element)
        }


        // Init 
        init(element) {
            this.menu = element

            const { menu, settings } = this

            // Check If Theme
            if (settings.theme == 'default') {
                menu.addClass('jd-menu')
            }

            // Set Current Menu Item (Default is the first ul)
            this.currentLevel = menu.find("> ul")

            // Set Left Value
            this.left = 0

            // Add Back Buttons
            menu.find("li > ul").prepend(settings.customBack)

            // Add Arrows
            menu.find("li").each(function(index, value){
                if ($(this).children('ul').length > 0) {
                    $(this).addClass('hasChild')
                    if (!settings.customArrow) return
                    $(this).append(settings.customArrow)
                }
            })

            // If no animation set duration to 0
            if (settings.animation == false) {
                this.settings.duration = 0
            }

            // Click Events
            this.clickEvents()

            // Trigger
            this.trigger()
        }
        

        // Move
        _move(ammount, callback) {
            const { menu ,settings } = this
            // Animate
            menu.animate({
                marginLeft: ammount
            }, settings.duration, callback)
        }


        // Menu Click and Slide / Animate
        clickEvents() {
            const { menu, settings } = this
            let _ = this
            let clickTime = null

            $("li", this.currentLevel).click(function(e) {
                // Check last clicked time
                if (this._clicked + settings.duration > Date.now()) return
                if (menu.is(':animated')) return

                // Set Date Now
                this._clicked = Date.now()

                e.stopPropagation()

                // Cache Click Event
                let $this = $(this)
                let target = $(e.target)

                if ($(this).is('.hasChild')) {
                    if(target.is('.js-back') || $(this).hasClass('.js-back') || target.parents('.js-back').length || target.is('a')) return
                    _.left = _.left - 100
                    _._move(`${_.left}%`)
                    this.currentLevel = $this.find("> a").next()
                    this.currentLevel.show()
                } 

                if ($(this).is('.js-back')) {
                    _.left = _.left + 100
                    _._move(`${_.left}%`, function(){
                        this.currentLevel = $this.parent()
                        this.currentLevel.hide()
                    })
                }
            })
        }


        // Trigger
        trigger() {
            const { menu, settings } = this
            let _ = this

            if (settings.trigger) {
                let $trigger = settings.trigger
                $trigger.click(function() {
                    if (!menu.hasClass('isActive')) {
                        menu.addClass('isActive')

                        _.left = 0

                        menu.animate({
                            marginLeft: _.left
                        }, 0)

                        menu.find('ul >li ul').hide()
                    } else {
                        menu.removeClass('isActive')
                    }

                    menu.slideToggle()
                })

            }
        }

    }


    // Jquery Plugin
    $.fn.jdMenu = function ($customOptions) {
        const jdMenu = new JdMenu($(this), $customOptions);
        return jdMenu;
    }

}));