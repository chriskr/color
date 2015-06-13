# color

Color library

````javascript
var color = new Color('lime')
undefined
color.rgb.toCss()
"rgb(0, 255, 0)"
color.hsl.toCss()
"hsl(120, 100%, 50%)"
color.hsv.toCss()
"hsl(120, 100%, 50%)"
color.hex.toCss()
"#00ff00"

color.rgb.r = 255
255
color.rgb.toCss()
"rgb(255, 255, 0)"
````

https://chriskr.github.io/color/examples/color-picker.html
