const video = document.getElementById('video');
const play = document.getElementById('play');
const stop= document.getElementById('stop');
const progress = document.getElementById('progress');
const timestamp = document.getElementById('timestamp');

//  Play & pause video
function toggleVideoStatus() {
    if (video.paused) {
        video.play();
    }   else {
        video.pause();
    }
}

// Update icon
function updatePlayIcon() {
    if (video.paused) {
        play.innerHTML = '<i class="fa fa-play fa-2x"></i>'
    } else {
        play.innerHTML = '<i class="fa fa-pause fa-2x"></i>';
    }
}

// Update progress & timestamp
function updateTimestamp() {
    // progress value by percentage
    progress.value = (video.currentTime / video.duration) * 100;

    let mins = Math.floor(video.currentTime / 60);
    if (mins < 10) {
        mins = '0' + String(mins);
    }
    let secs = Math.floor(video.currentTime % 60);
    if (secs < 10) {
        secs = '0' + String(secs);
    }
    timestamp.innerHTML = `${mins}:${secs}`;
}

// Set video time to progress
function setVideoProgress() {
    video.currentTime = (+progress.value * video.duration) / 100;
}

// Stop video
function stopVideo() {
    video.currentTime = 0;
    video.pause();
}

// Event Listeners
video.addEventListener('click', toggleVideoStatus);
video.addEventListener('play', updatePlayIcon);
video.addEventListener('pause', updatePlayIcon);
play.addEventListener('click', toggleVideoStatus);
stop.addEventListener('click', stopVideo);

video.addEventListener('timeupdate', updateTimestamp);

progress.addEventListener('change', setVideoProgress);
