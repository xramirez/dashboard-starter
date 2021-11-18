import Countdown from './src/countdown.js'
import Giphy from './src/giphy.js'

let countdown = new Countdown(1,2);
countdown.render();

let gifpane = new Giphy();
gifpane.render();