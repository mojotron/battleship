# Battleship Game

The goal of this project was learning about Test Driven Development. Project is built by following rules of TDD. Write test first, describe what code is suppose to do. Make it pass with bare minimum logic. Refactor logic to make it more reusable. For this project only game logic was tested. Appearance of a webpage is not tested.

This project is part of [The Odin Project](https://www.theodinproject.com/lessons/node-path-javascript-battleship) Curriculum.

[Play Battleship](https://mojotron-battleship.netlify.app/). Try out and end result of the project.

## How to play

Battleship is a strategy type guessing game for two players (in case of this game implementation one player, playing against ai). It is played on ruled grids on which each player's fleet of warships are marked. The locations of the fleets are concealed from the other player. Players alternate turns calling "shots" at the other player's ships, and the objective of the game is to destroy the opposing player's fleet (learn more on the [wikipedia](<https://en.wikipedia.org/wiki/Battleship_(game)>)).

### Game stages

1. Start new game - simply press 'New Game' button.
2. Ship placement - hover over the grid and place ships (see ship type table) and click on cell to place ship. To change direction of the ship press button with arrow on it. After placing all ships (one of each) battle stage is starting.
3. Battle - click on the cell of the enemy grid (right or bottom one, depending on screen size) to make attack at that spot. Wait for enemy to make his attack. Repeat until one player sink all ships of the opponent player.

| Ship type        | length |
| ---------------- | :----: |
| aircraft carrier |   5    |
| battleship       |   4    |
| destroyer        |   3    |
| submarine        |   3    |
| patrol boat      |   2    |

AI Player is simulating how would human player play the game to give more challenge.

## What have I learned

- general idea what is testing and how TDD works, implementing TDD approach, writing test first then solution
- installing and configuration Jest test runner for vanilla js project
- how to write test (what to test and what not to test), pure functions test result, impure functions test side effects
- simplify code by splitting it up in modules to reduce tightly coupled objects, and make it more testable
- adding sound effects using JS

## Resources

Sound effects downloaded from [soundfishing](https://www.soundfishing.eu/) webpage.
