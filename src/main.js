var settings = 
  JSON.parse(sessionStorage.getItem('settings')) || { timer: '1000' };


// handlers
//
const notesDiv = document.querySelector('#notes');
const btnStart = document.querySelector('#btn--start');
const btnStop = document.querySelector('#btn--stop');
const inputTimer = document.querySelector('#timer');
const selectedNotes = document.querySelector('#selectedNotes');


// defaults
//
var loop = true;
var allNotes = [...selectedNotes.selectedOptions].map(e => e.value);
inputTimer.value = settings.timer;


// event listeners
//
selectedNotes.addEventListener('input', () => {
  stopLoop();
  window.setTimeout(function() {
    allNotes = [...selectedNotes.selectedOptions].map(e=>e.value);
  }, 1);
});

inputTimer.addEventListener('input', () => {
  // timeout is to make sure new value is registered
  window.setTimeout(function() {
    stopLoop();

    if (validateTimer(inputTimer.value)) {
      settings.timer = inputTimer.value;
      save();
    } 
    else {
      alert('Invalid Number: choose between 0 and 10000');
      inputTimer.value = 1000;
      settings.timer = inputTimer.value;
      save();
    }
  }, 1);
});

btnStop.addEventListener('click', async () => {
  stopLoop();
});

btnStart.addEventListener('click', async () => {
  loop = true;
  var notes = allNotes.slice();

  while (notes.length) {
    if (!loop) {
      render('-');
      break; 
    }

    const randomIndex = Math.floor(Math.random()*notes.length);
    const note = notes.splice(randomIndex, 1);

    render(note);
    settings.timer ? await sleep(settings.timer) : await sleep(1000);

    if (!notes.length) {
      notes = allNotes.slice();
    }
  }
});

function render(note) {
  notesDiv.innerHTML = note;
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

function save() {
  sessionStorage.setItem('settings', JSON.stringify(settings));
}

function stopLoop() {
  loop = false;
}

function validateTimer(x) {
    if (isNaN(x) || x < 0 || x > 10000) {
      return false;
    } 
    else {
      return true;
    }
}
