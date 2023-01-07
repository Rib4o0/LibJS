# LibJS
LibJS is a little framework for javascript designed to simplify and elavate the functionality of your code to a new level.
LibJs is still in a very early stage of development so you might encounter some bugs. 
It is completly free to use. Happy coding :)

How to setup:
1. Download the framework and place it in your project's directory
2. // way 1 ----------------------------------------------------------------------------------------------------------------
3. in your html link the libJS.js file below your main script file using the <script/> src attribute ( add the defer attribute )
4. !!!for that you will need to use the noExport version of libJS!!! // after version 0.0.2 works with every version :)
5. create a setup function which will be called by default
6. Create a draw loop by creating a function and calling it 'draw' ( it will be called by itself so dont call it)
7. And you are done!
8. // way 2 -works with version 0.0.2 and older :(--------------------------------------------------------------------------
9. In your javascript file use "import * as libJs from './Lib.js'"
10. Create a canvas using the createCanvas() function which takes a width and a height
11. Create a draw loop by creating a function and using requestAnimationFrame(draw) inside of it and call it.
12. To draw first change the background color using backgroundColor() function then call the coresponding function in the draw loop
13. And you are done!
