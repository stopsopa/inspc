#!/bin/bash

exec 3<> /dev/null
function red {
    printf "\e[91m$1\e[0m\n"
}
function green {
    printf "\e[32m$1\e[0m\n"
}
set -e

set -x

ORIGIN="origin"
LOCALBRANCH="master"
REMOTEBRANCH="master"

trim() {
    local var="$*"
    # remove leading whitespace characters
    var="${var#"${var%%[![:space:]]*}"}"
    # remove trailing whitespace characters
    var="${var%"${var##*[![:space:]]}"}"
    echo -n "$var"
}

if [ "$(git rev-parse --abbrev-ref HEAD)" != $LOCALBRANCH ]; then

    { red "switch first branch to <$LOCALBRANCH>"; } 2>&3

    exit 1;
fi

{ green "\ncurrent branch: $LOCALBRANCH"; } 2>&3

DIFF="$(git diff --numstat)"

DIFF="$(trim "$DIFF")"

if [ "$DIFF" != "" ]; then

    { red "\n\n    Error: First commit changes ...\n\n"; } 2>&3

    exit 2;
fi

DIFF="$(git diff --numstat $LOCALBRANCH $ORIGIN/$REMOTEBRANCH)"

DIFF="$(trim "$DIFF")"

if [ "$DIFF" != "" ] || [ "$1" = "force" ]; then

    git push $ORIGIN $REMOTEBRANCH --tags

    if [ "$?" != "0" ]; then

        { red "\n\nCan't git push - stop bumping version\n"; } 2>&3

        exit 3;
    fi

    npm version patch

    # make umd
    # cat comment.txt dist/spvalidation.js > dist/test.js
    # mv dist/test.js dist/spvalidation.js
    # cat comment.txt dist/spvalidation.min.js > dist/test.js
    # mv dist/test.js dist/spvalidation.min.js

                            #node update-badge.js
                            #git add README.md

                            # git add dist
                            # git add examples.es5.js
                            #git commit --amend --no-edit

    git push $ORIGIN $REMOTEBRANCH

    if [ "$?" = "0" ]; then

        npm publish

        if [ "$?" != "0" ]; then

            { red "\n\nCan't npm publish\n    try to run 'npm login'\n"; } 2>&3

            exit 4;
        fi

        git push $ORIGIN $REMOTEBRANCH --tags

        #git push origin master --tags

    else

        { red "\n\nCan't git push\n"; } 2>&3

        exit 5
    fi

else

    { red "\n\n    Nothing new to publish, \n        run 'make uf' if you're sure that there is still something that should be published\n\n"; } 2>&3
fi
