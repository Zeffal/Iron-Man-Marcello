// Hide or show video
document.getElementById("intro-video").addEventListener("ended", function () {
  // Hide intro video and show loop video
  document.getElementById("intro-video").style.display = "none";
  document.getElementById("loop-video").style.display = "block";

  // Show idle bot
  document.getElementById("idle-bot-canvas").classList.add("show");
  document.getElementById("talking-bot-canvas").classList.add("show");

  // Show chatbox
  document.getElementById("chat-container").classList.add("show");
});

// Remove Green Background for idle bot
const idleBox = document.getElementById("idle-bot-canvas");
const idleVideo = document.getElementById("idle-bot");
const idleCanvas = document.getElementById("idle-canvas");
let idleWidth = idleVideo.clientWidth;
let idleHeight = idleVideo.clientHeight;
const idleCtx = idleCanvas.getContext("2d");
idleVideo.addEventListener("play", drawIdleVid);

function drawIdleVid() {
  idleCtx.drawImage(idleVideo, 0, 0, idleWidth, idleHeight);
  // Remove Green
  let frame = idleCtx.getImageData(0, 0, idleWidth, idleHeight);
  for (let i = 0; i < frame.data.length; i += 4) {
    let r = frame.data[i]; // red
    let g = frame.data[i + 1]; // green
    let b = frame.data[i + 2]; // blue
    if ((r < 100) & (g > 130) & (b < 100)) {
      frame.data[i + 3] = 0; // alpha
    }
  }
  idleCtx.putImageData(frame, 0, 0);
  requestAnimationFrame(drawIdleVid);
}

// Remove Green Background for talking bot
const talkingBox = document.getElementById("talking-bot-canvas");
const talkingVideo = document.getElementById("talking-bot");
const talkingCanvas = document.getElementById("talking-canvas");
let talkingWidth = talkingVideo.clientWidth;
let talkingHeight = talkingVideo.clientHeight;
const talkingCtx = talkingCanvas.getContext("2d");
talkingVideo.addEventListener("play", drawTalkingVid);

function drawTalkingVid() {
  talkingCtx.drawImage(talkingVideo, 0, 0, talkingWidth, talkingHeight);
  // Remove Green
  let frame = talkingCtx.getImageData(0, 0, talkingWidth, talkingHeight);
  for (let i = 0; i < frame.data.length; i += 4) {
    let r = frame.data[i]; // red
    let g = frame.data[i + 1]; // green
    let b = frame.data[i + 2]; // blue
    if ((r < 100) & (g > 130) & (b < 100)) {
      frame.data[i + 3] = 0; // alpha
    }
  }
  talkingCtx.putImageData(frame, 0, 0);
  requestAnimationFrame(drawTalkingVid);
}

// Handle sendButton click
const sendButton = document.getElementById("sendButton");
const idleBot = document.getElementById("idle-bot-canvas");
const talkingBot = document.getElementById("talking-bot-canvas");
const chatContainer = document.getElementById("chat-container");
const botResponseBg = document.querySelector(".bot-response-bg");

sendButton.addEventListener("click", function () {
  // Hide idle bot and inputText
  idleBot.style.display = "none";
  chatContainer.style.display = "none";

  // Show talking bot and add class to bot-response-bg
  talkingBot.style.display = "block";
  botResponseBg.classList.add("bot-response-shown");

  // After a period of time, switch back to idle and show inputText
  setTimeout(function () {
    talkingBot.style.display = "none";
    idleBot.style.display = "block";
    chatContainer.style.display = "flex";
    botResponseBg.classList.remove("bot-response-shown");
  }, 5000);
});
