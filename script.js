let strings;
let wordList;
let dieRolls = [];
let password = "";
const dieFaces = ['1','2','3','4','5','6'];

function preload() {
  strings = loadStrings("eff_large_wordlist.txt");
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  initializeWordList();
  noLoop();
}

function draw() {
  background('white');
  const rollsString = dieRolls.join(', ');
  const rsw = textWidth(rollsString);
  text(rollsString, width/2 - rsw/2, 0.33*height);
  const pw = textWidth(password);
  text(password, width/2 - pw/2, 0.67*height)
}

function keyPressed() {
  dieRolls.push(random(dieFaces));
  while( dieRolls.length > 5 ) dieRolls.shift()
  password = getWordForKey( dieRolls.join('') );
  redraw();
}

function getWordForKey(key) {
  if( isValidKey(key) ) {
    return wordList[key];
  } else {
    return "";
  }
}

function isValidKey(key) {
  if( key.length === 5 ) {
    for( const digit of key ) {
      if( !dieFaces.includes(digit) ) return false;
    }
    return true;
  } else {
    return false;
  }
}

function initializeWordList() {
  wordList = new Array(66667);
  loadStringsIntoList();
  strings = null;
}

function loadStringsIntoList() {
  for( let line of strings ) {
    let [i, string] = line.split(' ');
    i = parseInt(i);
    wordList[i] = string;
  }
}

