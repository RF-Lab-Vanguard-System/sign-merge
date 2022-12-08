@ECHO OFF
@echo Set signs for all .png files of directory "%cd%"
@node "%~dp0/sign.js" "%cd%"
@echo All images signed