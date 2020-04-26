[![ko-fi](https://www.ko-fi.com/img/githubbutton_sm.svg)](https://ko-fi.com/Y8Y81N7G8)

![Deploy live-server](https://github.com/dsaltares/doodle/workflows/Deploy%20live-server/badge.svg)
![Deploy web-app](https://github.com/dsaltares/doodle/workflows/Deploy%20web-app/badge.svg)

# Doodle

Doodle is a crazy drawing & guessing chain game I made as a side project during the covid-19 confinement.

[![brainstorming](/img/brainstorming.png)](/img/brainstorming.png)

## How to play

* 💻 Go to [doodle.saltares.com](https://doodle.saltares.com)
* 🎮 Enter your name and start a game
* 👪 Share the link with your friends for them to join. The game is for between 4 and 8 players.
* 📹 Remember, Doodle is best played over video conferencing so you can laugh together.
* 🤫 Each player picks a concept. Don't share it, it's a secret.
* ✏️ Draw the concept you picked.
* 🕵️ On the next round the next player will try guess what you drew.
* ✏️ After that, you will draw what other players guessed.
* 🤔 Once everyone is done, each player will pick their favorite entry for their concept.

[![covid19](/img/covid19.png)](/img/covid19.png)

## Want to contribute?

There's many ways to contribute top the project:

1. 👏 Open an [issue](https://github.com/dsaltares/doodle/issues) if you find a bug.
2. 🙌 Send a [PR](https://github.com/dsaltares/doodle/pulls) to improve something or add new [concepts](https://github.com/dsaltares/doodle/blob/master/live-server/src/concepts.ts) to the game.
3. ☕ [Buy me a coffee](https://ko-fi.com/dsaltares) to help cover the server costs.


## Technical stuff

Doodle is entirely written in Typescript. Disclaimer: I used this project to learn the language so forgive me if I didn't adhere to best patterns the first time round 🙏.

### web-app

React client-side rendering web application. Deployed to Github pages.

### live-server

Websocket server built on Express. Deployed to an EC2 machine.
