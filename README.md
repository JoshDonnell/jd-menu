
# JD Menu

<br>

> A lightweight, simple to use sliding menu.

<br>

## Installation

<br>

#### NPM

```
npm install jd-menu --save
```

<br>

#### Yarn

```
yarn add jd-menu
```

<br>

#### Bower
```
bower install jd-menu --save
```

<br>

## Usage 

```
$(".some-menu).jdMenu({'duration': 500, 'trigger': $('js-menu-trigger')});
```

> Require (NPM / Yarn)

```javascript
let jdMenu = require('jd-menu');
```

> Import (NPM / Yarn)

```javascript
import jdMenu from 'jd-menu';
```

> Require (Bower)

```javascript
let jdMenu require('SomePath/bower_components/jd-menu');
```

> CSS

```css
@import 'SomePath/bower_components/jd-menu/dist/css/master.css';
@import 'SomePath/node_modules/jd-menu/dist/css/master.css';
```

> SASS (NPM / Yarn)

```css
@import 'SomePath/node_modules/jd-menu/src/css/master.scss';
```

> SASS (Bower)

```css
@import 'SomePath/bower_components/jd-menu/src/css/master.scss';
```

> SASS Default Variables ( Override in your variables )

```css
$JD-bg-color: #455A64 !default;
$JD-text-color: #fff !default;
$JD-border-color: $JD-text-color !default;
```

<br>

## Options

> All of the differnet options with there default values.

```javascript
{    
  arrows: true,
  animation: 'slide',
  duration: 300,
  customArrow:'<i class="fa fa-chevron-right"></i>',
  customBack: `<li class="js-back"><span><i class="fa fa-chevron-left"></i> Back</span></li>`,
  theme: 'default',
  trigger: ''  
}
```
 
<br>

#### Arrows

```javascript
{
  arrows: true, // Default
  arrows: flase
}
```

<br>

#### Trigger

```javascript
{
  trigger: '', // Default
  trigger: $(".js-menu-trigger") // Example
}
```

<br>

#### Duration

```javascript
{
  duration: 300, // Default
  arrows: 500 // Example
}
```

<br>

#### Arrows Content

```javascript
{
  customArrow: '<i class="fa fa-chevron-right"></i>', // Default (Font Awesome)
  customArrow: '<i class="material-icons">keyboard_arrow_right</i>' // Example (Material Icons)
}
```

<br>

#### Back Button Content

> You need to keep the jdmenu-back class :)

```javascript
{
  customBack: '<li class="jdmenu-back"><span><i class="fa fa-chevron-left"></i> Back</span></li>', // Default
  customBack: <li class="jdmenu-back"><span><i class="material-icons">keyboard_arrow_left</i></span></li> // Example
}
```

<br>

#### Theme

> More base themes coming soon !

```javascript
{
  theme: 'default', // Default
  theme: 'custom' // Example
}
```

<br>

#### Menu Events

> There are some simple events that can be called on resize for example

```javascript
$(".some-menu").jdMenu('up'); // Slides up the menu
$(".some-menu").jdMenu('down'); // Slides down the menu
$(".some-menu").jdMenu('removemenu'); // Removes JdMenu from a active menu
$(".some-menu").jdMenu('startmenu'); // Restart a menu when the removemenu event has been called

// Example Usage
$(window).on('resize', function(){
    $(".some-menu").jdMenu('up');
});
```

<br>

## Dependencies

<br>

#### Font Awesome (For Arrows)

<br>

#### jQuery