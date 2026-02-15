# Rowing for the Gold

A browser game built with JavaScript and p5.js where the player must row as far as possible while avoiding obstacles.  
The game combines keyboard movement with microphone input, creating a small but original interaction challenge.

## Overview

`Rowing for the Gold` is an academic game project focused on real-time gameplay logic, collision handling, and audio input processing in the browser.

The main objective is simple:
- survive a 60-second run,
- avoid rocks and logs,
- maximize traveled distance (score in meters).

## Gameplay

- Press `Space` to start.
- Move the boat with `Left Arrow` and `Right Arrow`.
- Use your voice or any sound picked by the microphone to increase speed.
- Colliding with obstacles reduces speed.
- The final distance is shown when time reaches zero.

## Features

- Real-time endless-style scrolling background.
- Dynamic obstacle spawning based on current speed.
- Two obstacle types with different behavior (rocks and moving logs).
- Circle-based collision detection.
- Microphone-controlled speed boost with smoothed input.
- Sound effects for collisions and background music loop.
- Start and game-over screens with restart flow.

## Tech Stack

- JavaScript (ES6)
- p5.js
- p5.sound
- HTML5 Canvas

## Project Structure

```text
.
|-- index.html
|-- game.js         # Main game loop and state management
|-- player.js       # Player movement and rendering
|-- obstaculos.js   # Obstacle generation, movement, and rendering
|-- background.js   # Infinite scrolling background
|-- colisao.js      # Collision helper function
|-- p5/             # p5.js and p5.sound libraries
`-- media/          # Images, audio, and font assets
```

## Getting Started

### Prerequisites

- A modern browser (Chrome, Edge, Firefox, Safari)
- A local web server (XAMPP, VS Code Live Server, or similar)

## Why This Project Matters

This project demonstrates:
- modular JavaScript organization across multiple files,
- game state management (`start`, `playing`, `gameover`),
- frame-based game loop design,
- responsive input handling (keyboard + microphone),
- balancing gameplay through dynamic difficulty variables.

## Future Improvements

- Add difficulty levels and adaptive AI patterns.
- Improve UI/HUD design and visual polish.
- Add touch/mobile controls.
- Save high scores with local storage or backend integration.

## Author

Eduardo Goncalves  
