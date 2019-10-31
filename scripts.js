// Получить наши элементы
const player = document.querySelector('.player'),
    video = player.querySelector('.viewer'),
    progress = player.querySelector('.progress'),
    progressBar = player.querySelector('.progress__filled'),
    toggle = player.querySelector('.toggle'),
    skipButtons = player.querySelectorAll('[data-skip]'),
    ranges = player.querySelectorAll('.player__slider');

// Строим функцию

// Проверка паузы и продолжения
function togglePlay() {
    const method = video.paused ? 'play' : 'pause';
    video[method]();
}

// Изменение иконки кнопки при продолжений либо паузы.
function updateButton() {
    const icon = this.paused ? '►' : '❚ ❚';
    toggle.textContent = icon;
}
// Перемотка вперед либо назад
function skip(){
    video.currentTime += parseFloat(this.dataset.skip);
}

// Регулировка звука и скорости воспроизведения видео
function handleRangeUpdate() {
    video[this.name] = this.value;
}

// Video Bar. Показывает продолжительность видео в прогресс баре.
function handleProgress() {
    const percent = (video.currentTime / video.duration) * 100;
    progressBar.style.flexBasis = `${percent}%`;
}

function scrub(e) {
    const scrubTime = (e.offsetX / progress.offsetWidth) * video.duration;
    video.currentTime = scrubTime;
}

// Подключить событие


// При нажатий на кнопку либо на экран видео, то мультфильм будет останавливаться, либо продолжатся.
video.addEventListener('click', togglePlay);
video.addEventListener('play', updateButton);
video.addEventListener('pause', updateButton);
video.addEventListener('timeupdate', handleProgress);

toggle.addEventListener('click', togglePlay);
skipButtons.forEach(button => button.addEventListener('click', skip));
ranges.forEach(range => range.addEventListener('change', handleRangeUpdate));
ranges.forEach(range => range.addEventListener('mousemove', handleRangeUpdate));

let mousedown = false;
progress.addEventListener('click', scrub);
progress.addEventListener('mousemove', (e) => mousedown && scrub(e));
progress.addEventListener('mousedown', () => mousedown = true);
progress.addEventListener('mouseup', () => mousedown = false);