/*get elements*/

const player = document.querySelector(".player");
const video = player.querySelector(".viewer");
const progress = player.querySelector(".progress");
const progressBar = player.querySelector(".progress__filled");
const toggle = player.querySelector(".toggle");
const skipButtons = player.querySelectorAll("[data-skip]");
const ranges = player.querySelectorAll(".player__slider");

/*Build functions*/
/*play*/
function togglePlay() {
  //   if (video.paused) {
  //     video.play();
  //   } else {
  //     video.pause();
  //   }
  video[video.paused ? "play" : "pause"]();
}

function updateButton() {
  const icon = this.paused ? "►" : "█ █";
  toggle.textContent = icon;
}

/*skip*/
function skip() {
  video.currentTime += parseFloat(this.dataset.skip);
}

/*ranges update */
function handleRangeUpdate() {
  video[this.name] = this.value;
}

/*progress */
function handleProgress() {
  const percent = (video.currentTime / video.duration) * 100;
  progressBar.style.flexBasis = `${percent}%`;
}

function scrub(e) {
  const scrubTime = (e.offsetX / progress.offsetWidth) * video.duration;
  video.currentTime = scrubTime;
}

/*Hook up event listeners*/
/*play pause*/
video.addEventListener("click", togglePlay);
toggle.addEventListener("click", togglePlay);
/*button play */
video.addEventListener("play", updateButton);
video.addEventListener("pause", updateButton);
/*skip*/
skipButtons.forEach((button) => button.addEventListener("click", skip));
/*ranges */
ranges.forEach((range) => range.addEventListener("change", handleRangeUpdate));
ranges.forEach((range) =>
  range.addEventListener("mousemove", handleRangeUpdate)
);
/*progress */
video.addEventListener("timeupdate", handleProgress);
progress.addEventListener("click", scrub);

let mousedown = false;
progress.addEventListener("mousemove", (e) => mousedown && scrub(e));
progress.addEventListener("mousedown", () => (mousedown = true));
progress.addEventListener("mouseup", () => (mousedown = false));
