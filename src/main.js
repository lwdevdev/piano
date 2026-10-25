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
var allNotes = [...selectedNotes.selectedOptions].map(e=>e.value);
inputTimer.value = settings.timer;

console.log(allNotes);

// event listeners
//
selectedNotes.addEventListener('change', () => {
  stopLoop();
  window.setTimeout(function() {
    allNotes = [...selectedNotes.selectedOptions].map(e=>e.value);
    console.log(allNotes);
  }, 1);
});

inputTimer.addEventListener('change', () => {
  stopLoop();

  // timeout is to make sure new value is registered
  window.setTimeout(function() {
    settings.timer = inputTimer.value;
    save();
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
    await sleep(settings.timer);

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
  console.log('saved');
}

function stopLoop() {
  loop = false;
}
