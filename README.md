# LibJS
LibJS is a little framework for javascript designed to simplify and elavate the functionality of your code to a new level.
LibJS is still in a very early stage of development so you might encounter some bugs. 
LibJS is made for coders of all skill in mind. 
It is completly free to use. Happy coding :)

How to setup:
1. Download the framework and place it in your project's directory
2. Create an html file
3. Create a script file in which you will use libJS
4. Link the script file to the html with the <script src='your_file.js'></script>
5. Link the libJS file to the html using the script element with the src & defer attribute
6. Create your setup() and draw() functions
7. In your setup() create your canvas using createCanvas(width,height)

In the end it should look something like this:
In the html file:
<header>
  ...
  <script src='example.js'></script>
  <script src='libJS.js' defer></script>
</header>
In example.js:
function setup() {
  createCanvas(400,600);
  // your setup code goes here
}

function draw() {
  // your drawing code goes here
}

For the list of functions you can check the functions.md file
Any suggestions, bugs and feedback will be appriciated.
