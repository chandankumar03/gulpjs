
sudo npm install gulp-concat gulp-rename gulp-uglify --save-dev
These steps need to be done inside your project's directory so that the packages and configuration files are available to Gulp. 

	1.npm init

For grunt steps:
Installing Node,NPM and Grunt CLI:
sudo apt-get install node
sudo apt-get install nodejs-legacy
sudo apt-get install npm
sudo npm install -g grunt-cli

Create Folder to store grunt files and browse to that location:
npm init
npm install grunt --save

Install 3rd Party Packages to concat and minify:
npm install grunt-contrib-concat --save-dev
npm install grunt-contrib-cssmin --save-dev
npm install grunt-contrib-uglify --save-dev
npm install grunt-watcher --save-dev

Execute Grunt:
grunt

default grunt file :
gruntfile.js

