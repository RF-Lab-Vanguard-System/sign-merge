@ECHO OFF
@echo Merge 2 channel images to one for all .png files of directory "%cd%"
@node "%~dp0/index1.js" "%cd%"
@echo All images merged