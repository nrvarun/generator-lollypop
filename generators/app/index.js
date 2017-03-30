'use strict';
var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var yosay = require('yosay');

module.exports = yeoman.generators.Base.extend({
  //Configurations will be loaded here.
  //Ask for user input
  prompting: function() {
    var done = this.async();
    
    this.prompt({
      type: 'input',
      name: 'name',
      message: 'Your project name',
      //Defaults to the project's folder name if the input is skipped
      default: this.appname
    }, function(answers) {
      this.props = answers;
      this.log(answers.name);
      done();
    }.bind(this));
  },

  //Writing Logic here
  writing: {
    //Copy the configuration files
    config: function() {
      this.fs.copyTpl(
        this.templatePath('_package.json'),
        this.destinationPath('package.json'), {
          name: this.props.name
        }
      );
    },

    //Copy application files
    app: function() {
      //Server file
      this.fs.copyTpl(
        this.templatePath('_server.js'),
        this.destinationPath('server.js')
      );
      //Gulp file
      this.fs.copyTpl(
        this.templatePath('_gulpfile.js'),
        this.destinationPath('gulpfile.js')
      );
      //Gitignore file
      this.fs.copyTpl(
        this.templatePath('_.gitignore'),
        this.destinationPath('.gitignore')
      );
      //README file
      this.fs.copyTpl(
        this.templatePath('_README.md'),
        this.destinationPath('README.md')
      );
      // Public/
      this.fs.copy(
        this.templatePath('_src/_index.jade'),
        this.destinationPath('src/index.jade')
      );
      this.fs.copy(
        this.templatePath('_src/_jade/**/*.jade'),
        this.destinationPath('src/jade')
      );
      // Styles
      this.fs.copy(
        this.templatePath('_src/_css/**/*.scss'),
        this.destinationPath('src/css')
      );
      // Js/
      this.fs.copy(
        this.templatePath('_src/_js/**/*.js'),
        this.destinationPath('src/js')
      );
      // Images/
      this.fs.copy(
        this.templatePath('_src/_img/**/*.*'),
        this.destinationPath('src/img')
      );
      //Fonts/
      this.fs.copy(
        this.templatePath('_src/_fonts/**/*.*'),
        this.destinationPath('src/fonts')
      );
    }
  },

  install: function() {
    this.installDependencies();
  }

});
