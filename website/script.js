const dumpBtn = document.getElementById("dumpBtn");
const thoughtInput = document.getElementById("thoughtInput");
const output = document.getElementById("output");
const quote = document.getElementById("quote");
const ytFrame = document.getElementById("ytFrame");
const breatheText = document.getElementById("breatheText");
const moodSelector = document.getElementById("moodSelector");
const moodButtons = document.querySelectorAll(".mood-btn");
const auraText = document.getElementById("auraText");

const moodAudio = {
  rain: "cljv53Wvnx4",
  fireplace: "eyU3bRy2x44",
  forest: "1wn-OSiNVjE"
};

let selectedMood = "rain"; 

moodButtons.forEach(btn => {
  btn.addEventListener("click", () => {
    moodButtons.forEach(b => b.classList.remove("selected"));
    btn.classList.add("selected");
    selectedMood = btn.dataset.mood;
  });
});


const phases = ["Inhale...", "Hold...", "Exhale...", "Hold..."];
let phaseIndex = 0;


const quotes = [
  "Breathe in peace. Breathe out chaos.",
  "You did something good for yourself today.",
  "Every thought dumped is a step to clarity.",
  "Letting go is healing.",
  "Storms don’t last forever. Neither do thoughts."
];

function getRandomQuote() {
  return quotes[Math.floor(Math.random() * quotes.length)];
}

function displayQuoteAnimated(text) {
  quote.innerHTML = "";
  text.split(" ").forEach((word, idx) => {
    const span = document.createElement("span");
    span.textContent = word + " ";
    span.style.opacity = "0";
    span.style.animation = `fadeIn 0.5s forwards`;
    span.style.animationDelay = `${idx * 0.3}s`;
    quote.appendChild(span);
  });
}


function askForBodyScan() {
  const confirmBox = document.createElement("div");
  confirmBox.classList.add("modal");
  confirmBox.innerHTML = `
    <div style="background: white; padding: 20px; border-radius: 10px; text-align: center;">
      <p style="font-size: 1.2rem; color: #333;">Would you like to continue with a mini body relaxation session?</p>
      <button id="yesBtn" style="margin: 10px;">Yes</button>
      <button id="noBtn" style="margin: 10px;">No</button>
    </div>
  `;
  document.body.appendChild(confirmBox);

  document.getElementById("yesBtn").addEventListener("click", () => {
    window.location.href = "relax.html"; // Redirect to relax page
  });

  document.getElementById("noBtn").addEventListener("click", () => {
    confirmBox.remove();
  });
}

dumpBtn.addEventListener("click", () => {
  const thought = thoughtInput.value.trim();
  if (!thought) {
    alert("Please write something first.");
    return;
  }

  document.getElementById("expressHeading").style.display = "none";

  moodSelector.style.display = "none";
  auraText.style.display = "none";

 
  const videoId = moodAudio[selectedMood];
  ytFrame.src = `https://www.youtube.com/embed/${videoId}?autoplay=1&loop=1&playlist=${videoId}`;

  thoughtInput.style.animation = "fadeOut 1s forwards";

  setTimeout(() => {
    document.body.classList.add("calm");
    thoughtInput.classList.add("hidden");
    dumpBtn.classList.add("hidden");
    output.classList.remove("hidden");

    displayQuoteAnimated(getRandomQuote());

    let breatheCount = 0;
    const breatheInterval = setInterval(() => {
      breatheText.textContent = phases[phaseIndex];
      phaseIndex = (phaseIndex + 1) % phases.length;
      breatheCount++;

      if (breatheCount === 20) { 
        clearInterval(breatheInterval);
        askForBodyScan(); 
      }
    }, 3000);
  }, 1000);
});