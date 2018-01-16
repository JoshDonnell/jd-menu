(function($) {
    module.exports = function jdMenu() {

        class JdMenu {

            // Default Settings
            get defaults() {
                return {
                    arrows: true,
                    animation: 'slide',
                    duration: 300,
                    customArrow:'<i class="fa fa-chevron-right"></i>',
                    customBack: `<li class="js-back"><span><i class="fa fa-chevron-left"></i> Back</span></li>`,
                    'theme': 'default'
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
            }
            

            // Move
            _move(ammount, callback) {
                const { menu ,settings } = this
                // Animate
                menu.animate({
                    left: ammount
                }, settings.duration, callback)
            }


            // Menu Click and Slide / Animate
            clickEvents() {
                const { menu, settings } = this
                var _ = this
                var clickTime = null

                $("li", this.currentLevel).click(function(e) {
                    // Check last clicked time
                    if (this._clicked + settings.duration > Date.now()) return
                    if (menu.is(':animated')) return

                    // Set Date Now
                    this._clicked = Date.now()

                    e.stopPropagation()

                    // Cache Click Event
                    var $this = $(this)
                    var target = $(e.target)

                    if ($(this).is('.hasChild')) {
                        if(target.is('.js-back') || target.parents('.js-back').length || target.is('a')) return
                        _._move('-=100%')
                        this.currentLevel = $this.find("> a").next()
                        this.currentLevel.show()
                    } 

                    if ($(this).is('.js-back')) {
                        _._move('+=100%', function(){
                            this.currentLevel = $this.parent()
                            this.currentLevel.hide()
                        })
                    }
                })
            }

        }

        // Jquery Plugin
        var mobileMenu = $.fn.mobileMenu = function($customOptions) {
            new JdMenu($(this), $customOptions)
        }

    }
})