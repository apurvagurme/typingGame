const process = require('process');
const { stdin, stdout } = process;
stdin.setEncoding('utf8');
stdin.setRawMode('true');
stdin.on('data', data => console.log(data));
let randomAlphabets = [];
let randomAlphabet = '';
const alphabets = 'abcdefghijklmnopqrstuvwxyz'.split('');
const chalk = require('chalk');
const {
  red,
  green,
  yellow,
  blue,
  magenta,
  cyan,
  white,
  blackBright,
  redBright,
  greenBright,
  yellowBright,
  blueBright,
  magentaBright,
  cyanBright,
  whiteBright
} = chalk;

const colors = [
  'red',
  'green',
  'yellow',
  'blue',
  'magenta',
  'cyan',
  'white',
  'blackBright',
  'redBright',
  'greenBright',
  'yellowBright',
  'blueBright',
  'magentaBright',
  'cyanBright',
  'whiteBright'
];

const chooseRandomElement = function(list) {
  let randomIndex = Math.floor(Math.random() * (list.length - 1));
  return list[randomIndex];
};

const getCharInfo = function(randomAlphabet) {
  charObj = { alphabet: randomAlphabet, y: 2 };
  let randomXCoordinate = Math.ceil(Math.random() * stdout.columns);
  charObj['x'] = randomXCoordinate;
  return charObj;
};

const quitGame = function() {
  process.exit(0);
};

const displayAlphabets = function() {
  stdout.cursorTo(0, 1);
  stdout.clearScreenDown();
  randomAlphabets.forEach(char => {
    let color = chooseRandomElement(colors);
    stdout.cursorTo(char.x, char.y);
    console.log(chalk[color](char['alphabet']));
    char['y'] += 1;
    if (char.y == stdout.rows) {
      quitGame();
    }
  });
  stdout.cursorTo(0, stdout.rows);
};

const saveCharInfo = function() {
  randomAlphabet = chooseRandomElement(alphabets);
  charObj = getCharInfo(randomAlphabet);
  randomAlphabets.push(charObj);
};

stdin.on('data', function(data) {
  randomAlphabets.forEach(charObj => {
    if (data == charObj['alphabet']) {
      randomAlphabets.splice(charObj, 1);
    }
  });
});

const main = function() {
  setInterval(saveCharInfo, 700);
  setInterval(displayAlphabets, 500);
};

main();
