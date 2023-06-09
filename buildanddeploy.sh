#!/bin/bash

read -n1 -p "Edit Directory? [y,n]" inputvar

function isValidDirectory(){
    if [ -d "$1" ]
    then
        return 0
    else 
        return 1
    fi
}
function fileExist(){
    if [ -f "$1" ]; then
        return 0
    else 
        return 1
    fi
}

function run_init() {
    local dir=$(getDirectory);
    echo -e "\nStoring Build Into : $dir";
    if isValidDirectory $dir
    then
        echo -e "\nValid Directory \n"
    else
        echo -e "\nInvalid Directory -- Please Change\n"
        return
    fi

    curDIR=$(pwd)         
    npm run build;
    sleep 5;
    
    echo -e "\nMoving into $dir for a second";
    cd $dir;
    echo -e "\nRunning Git Reset"
    git reset --hard origin/deploy
    git pull
    echo -e "\nGoing back to $curDIR";
    cd $curDIR

    rm -rf $dir/*;
    mv ./dist/* $dir/;
    echo Moved Build to $dir;
    echo -e "\n";
    echo Commiting and Pushing...;
    local dte="$(date +'%m/%d/%y')"
    cd $dir;
    git add .
    git commit -m "$dte - Basic Commit from bash script";
    git push
}



function editDirectory () {
    local newdir
    declare -i result=1
    echo -e "\n";
    while ! isValidDirectory "$newdir"; 
    do
        read -p "Enter a Directory : " newdir;
        if ! isValidDirectory "$newdir"; then
            echo -e "\nInvalid Directory";
        fi
    done    
    if fileExist ".env.bash"; then
        rm .env.bash;
    fi
    echo $newdir > .env.bash;
    run_init;
}

function getDirectory () {
    if !fileExist ".env.bash"; then
        echo -e "\n.env.bash missing... redirecting";
        editDirectory;
    fi
    input=".env.bash";
    local stdout
    while IFS= read -r line; do
        stdout="$line"
    done < "$input"
    echo "$stdout";
}



case $inputvar in
    y|Y) editDirectory ;;
    n|N) run_init;;
    *) echo "Exit" ;;
esac
