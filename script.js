// ------------------- Login Logic ------------------- //
if (window.location.pathname.includes("index.html") || window.location.pathname.endsWith('/')) {
  document.getElementById("loginForm").addEventListener("submit", function (e) {
    e.preventDefault();
    const username = document.getElementById("username").value.trim();
    const password = document.getElementById("password").value.trim();

    if (username === "admin" && password === "1234") {
      // Get the current directory path
      const currentPath = window.location.pathname.substring(0, window.location.pathname.lastIndexOf('/') + 1);
      // Construct absolute path to app.html
      window.location.href = currentPath + "app.html";
    } else {
      alert("Invalid credentials! Try admin / 1234");
    }
  });
}

// ------------------- TTS Logic ------------------- //
if (window.location.pathname.includes("app.html")) {
  const speakBtn = document.getElementById("speakBtn");
  const stopBtn = document.getElementById("stopBtn");
  const voiceSelect = document.getElementById("voiceSelect");
  const textInput = document.getElementById("textInput");
  const pitchInput = document.getElementById("pitch");
  const rateInput = document.getElementById("rate");
  const volumeInput = document.getElementById("volume");
  const themeToggle = document.getElementById("themeToggle");

  const synth = window.speechSynthesis;
  let voices = [];
  let utterance;

  function populateVoices() {
    voices = synth.getVoices();
    voiceSelect.innerHTML = "";
    voices.forEach((voice, index) => {
      const option = document.createElement("option");
      option.value = index;
      option.textContent = `${voice.name} (${voice.lang})`;
      voiceSelect.appendChild(option);
    });
  }

  // Load voices
  if (synth.onvoiceschanged !== undefined) {
    synth.onvoiceschanged = populateVoices;
  }

  speakBtn.addEventListener("click", () => {
    const text = textInput.value.trim();
    if (!text) {
      alert("Please enter some text.");
      return;
    }

    utterance = new SpeechSynthesisUtterance(text);
    utterance.voice = voices[voiceSelect.value];
    utterance.pitch = parseFloat(pitchInput.value);
    utterance.rate = parseFloat(rateInput.value);
    utterance.volume = parseFloat(volumeInput.value);

    synth.speak(utterance);
  });

  stopBtn.addEventListener("click", () => {
    synth.cancel();
  });

  themeToggle.addEventListener("click", () => {
    document.body.classList.toggle("dark-mode");
    themeToggle.textContent = document.body.classList.contains("dark-mode") ? "☀️" : "🌙";
  });

  // Initial setup
  populateVoices();
}
