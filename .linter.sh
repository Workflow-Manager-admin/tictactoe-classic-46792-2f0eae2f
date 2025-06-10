#!/bin/bash
cd /home/kavia/workspace/code-generation/tictactoe-classic-46792-2f0eae2f/tic_tac_toe_game
npm run build
EXIT_CODE=$?
if [ $EXIT_CODE -ne 0 ]; then
   exit 1
fi

