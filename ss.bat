@ECHO OFF
@IF "%1"=="-r" GOTO REVERSE
@IF "%1"=="-s" GOTO SERIALS
@echo Set signs for all .png files of directory "%cd%"
@node "%~dp0/sign.js" "%cd%"
@echo All images signed
GOTO END
:REVERSE
@echo Restore files from "%cd%\source"
@node "%~dp0/restore.js" "%cd%"
@echo All images restored.
GOTO END
:SERIALS
@echo Set signs for all .png files of directory "%cd%"
@node "%~dp0/sign.js" "-serial" "%cd%"
@echo All images signed
GOTO END
:END