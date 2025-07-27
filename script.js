const chat = document.getElementById("chat");
const userInput = document.getElementById("userInput");
const results = document.getElementById("results");
const meterBar = document.getElementById("meterBar");
const resultText = document.getElementById("resultText");

function calculateLove() {
  const names = userInput.value.trim();
  if (!names) return;

  const nameParts = names.split(" ");
  if (nameParts.length < 2) {
    addMessage("Please enter two names separated by space.", "received");
    return;
  }

  const name1 = nameParts[0];
  const name2 = nameParts[1];

  addMessage(`Calculate love between ${name1} and ${name2}`, "sent");
  addMessage("Calculating love score... 🔍", "received");

  setTimeout(() => {
    const score = generateLoveScore(name1, name2);
    results.style.display = "block";

    setTimeout(() => {
      meterBar.style.width = `${score}%`;
      meterBar.textContent = `${score}%`;

      const message = getResultMessage(score, name1, name2);
      resultText.textContent = message;
      addMessage(`Result: ${message}`, "received");
    }, 300);
  }, 1500);

  userInput.value = "";
}

function generateLoveScore(name1, name2) {
  const [a, b] = [name1.toLowerCase(), name2.toLowerCase()].sort();
  const combined = (a + b).replace(/[^a-z]/g, "");
  let hash = 0;
  for (let i = 0; i < combined.length; i++) {
    hash = (hash << 5) - hash + combined.charCodeAt(i);
    hash |= 0;
  }
  return 50 + Math.abs(hash) % 51; // score between 50-100
}

function getResultMessage(score, name1, name2) {
  if (score >= 90) {
    return `${name1} and ${name2} are soulmates! 💘`;
  } else if (score >= 75) {
    return `${name1} and ${name2} have an amazing connection! 💕`;
  } else if (score >= 60) {
    return `${name1} and ${name2} have good chemistry! ✨`;
  } else if (score >= 50) {
    return `${name1} and ${name2} might just be friends. 🤷‍♂️`;
  } else {
    return `${name1} and ${name2} should probably stay friends. 😅`;
  }
}

function addMessage(text, type) {
  const message = document.createElement("div");
  message.className = `message ${type}`;
  message.textContent = text;
  chat.appendChild(message);
  chat.scrollTop = chat.scrollHeight;
}

function handleKeyPress(e) {
  if (e.key === "Enter") {
    calculateLove();
  }
}
userInput.addEventListener("keypress", handleKeyPress); 
document.getElementById("calculateButton").addEventListener("click", calculateLove);
