@ECHO OFF
@echo Set signs for all .png files of directory "%cd%"
@node "%~dp0/index.js" "%cd%"
@echo All images signed