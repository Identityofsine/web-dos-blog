@echo off

setlocal
:PROMPT
SET /P CHANGEDIR="Edit Directory? [y,n]"
IF /I "%CHANGEDIR%" NEQ "y" IF /I "%CHANGEDIR%" NEQ "Y" GOTO INIT ELSE GOTO EDIT

:EDIT
SET /P newDIR="New Directory: "
set does_exist=0
CALL :DIREXIST %newDIR%, does_exist
if %does_exist% equ 0 (
	echo Invalid Directory
	goto :EDIT
)
IF "%CD%"=="%newDIR%" (
	echo You cannot use this directory as your target
	GOTO :EDIT
) ELSE (
	IF "%newDIR%"=="." (
	echo You cannot use this directory as your target
	GOTO :EDIT
	)
)

set does_exist=0
CALL :DOESEXIST %does_exist%
if %does_exist% equ 1 rm .env.batch
echo %newDIR%> .env.batch
goto :INIT


:DIREXIST
if exist %~1 (
	set "%~2=1"	
) else (
	set "%~2=0"
)
goto :EOF

:INIT
set does_exist=0
CALL :DOESEXIST does_exist
if %does_exist% equ 0 GOTO EDIT

set /p dir=<.env.batch

IF "%CD%"=="%newDIR%" (
	echo You cannot use this directory as your target
	GOTO :EDIT
) ELSE (
	IF "%newDIR%"=="." (
	echo You cannot use this directory as your target
	GOTO :EDIT
	)
)


set curpath=%cd%

cd %dir%
echo Running Git Reset
git reset --hard origin/deploy
git pull
cd %curpath%

echo Going back to %curpath%

call npm run build
echo Removing Old Contents from %dir%...
del /Q /F dir\* 
echo Moving New Build to %dir%...
xcopy /E /H /C /I /Y .\dist\* %dir%\ 
cd %dir%
echo Pushing to GitHub

git add .
git commit -m "%data% - Auto Commit"
git push

echo Commited...

goto :EOF

:DOESEXIST
if exist .env.batch (
	set %1=1
) else (
	set %1=0
)
goto :EOF

	
