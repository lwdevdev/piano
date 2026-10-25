var settings = 
  JSON.parse(sessionStorage.getItem('settings')) || { timer: '1000' };

var loop = true;
const allNotes = ['Ab', 'A', 'Bb', 'B', 'C', 'Db', 'D', 'Eb', 'E',
  'F', 'Gb', 'G'];
var notes = allNotes.slice();


const notesDiv = document.querySelector('#notes');
const btnStart = document.querySelector('#btn--start');
const btnStop = document.querySelector('#btn--stop');
const inputTimer = document.querySelector('#timer');

inputTimer.value = settings.timer;

inputTimer.addEventListener('change', () => {
  loop = false;

  // timeout is to make sure new value is registered
  window.setTimeout(function() {
    settings.timer = inputTimer.value;
    save();
  }, 1);
});

btnStop.addEventListener('click', async () => {
  loop = false;
});

btnStart.addEventListener('click', async () => {
  loop = true;

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
