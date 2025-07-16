const starField = document.getElementById('starField');

for (let i = 0; i < 200; i++) {
  const star = document.createElement('div');
  star.classList.add('star');
  star.style.top = `${Math.random() * 100}%`;
  star.style.left = `${Math.random() * 100}%`;
  star.style.animationDelay = `${Math.random() * 5}s`;
  starField.appendChild(star);
}

const relaxText = document.getElementById("relaxText");
const bgMusic = document.getElementById("bgMusic");

const relaxSteps = [
  "Gently close your eyes...",
  "Take a slow deep breath in...",
  "And slowly breathe out...",
  "Bring awareness to your toes and feet...",
  "Relax your legs and knees...",
  "Soften your belly and lower back...",
  "Drop your shoulders and relax your arms...",
  "Let your face soften completely...",
  "Feel your body sinking into calm...",
  "You are safe. You are calm. You are enough. 🌿"
];

let index = 0;

bgMusic.volume = 0.3;
bgMusic.play();

function speakText(text) {
  const synth = window.speechSynthesis;
  const utterance = new SpeechSynthesisUtterance(text);

  utterance.rate = 0.9;
  utterance.pitch = 1.2;
  utterance.volume = 1;

  const voices = synth.getVoices();
  const softVoice = voices.find(v =>
    v.name.includes("Female") ||
    v.name.includes("Google UK English Female") ||
    v.name.includes("Microsoft Zira") ||
    v.lang === "en-GB"
  );

  if (softVoice) {
    utterance.voice = softVoice;
  }

  synth.speak(utterance);
}

if (speechSynthesis.getVoices().length === 0) {
  speechSynthesis.onvoiceschanged = () => {
    showStep();
  };
} else {
  showStep();
}

let stepTimeout;
let skipPromptShown = false;

function showStep() {
  if (index < relaxSteps.length) {
    const step = relaxSteps[index];
    relaxText.textContent = step;
    speakText(step);
    index++;

    // Show skip prompt only once at step 1
    if (index === 1 && !skipPromptShown) {
      skipPromptShown = true; // mark as shown
      setTimeout(() => {
        const skip = confirm("Do you want to skip the relaxation session and go directly to exploration?");
        if (skip) {
          bgMusic.pause();
          speakText("Redirecting you to the explore phase.");
          window.location.href = "/explore";
          return;
        }
      }, 10000);
    }

    stepTimeout = setTimeout(() => {
      showStep();
    }, 12000);

  } else {
    relaxText.textContent += "\n\n🌈 Session Complete. Redirecting to Explore phase...";
    speakText("Your relaxation session is complete. Redirecting you to the explore phase.");
    bgMusic.pause();

    setTimeout(() => {
      window.location.href = "/explore";
    }, 4000);
  }
}
