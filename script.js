const UNLOCK_DATE = new Date("2025-12-29T21:34:00")

if (!localStorage.getItem("capsule")){
    const capsule={
        unlockDate: UNLOCK_DATE.toISOString(),
        cards: [
            {
                title: "Card One",
                messages:[
                    "Message 1",
                    "Message 2",
                    "Message 3",
                    "Message 4",
                    "Message 5"
                ]
            },
            {
                title: "Card Two",
                messages:[
                    "Message 6",
                    "Message 7",
                    "Message 8",
                    "Message 9",
                    "Message 10"
                ]
            },
            {
                title: "Card Three",
                messages:[
                    "Message 11",
                    "Message 12",
                    "Message 13",
                    "Message 14",
                    "Message 15"
                ]
            },
            {
                title: "Card Four",
                messages:[
                    "Message 16",
                    "Message 17",
                    "Message 18",
                    "Message 19",
                    "Message 20"
                ]
            }
        ]
    }

    localStorage.setItem("capsule", JSON.stringify(capsule))
}

function getCapsule(){
    return JSON.parse(localStorage.getItem("capsule"));
}

function isUnlocked(){
    const capsule = getCapsule();
    return new Date()>= new Date(capsule.unlockDate);
}

function updateTimer(){
    const timer = document.getElementById("timer");
  const capsule = getCapsule();
  const unlockDate = new Date(capsule.unlockDate);
  const now = new Date();

  const diff = unlockDate - now;

  if (diff <= 0) {
    timer.textContent = "Unlocked";
    renderCards();
    return;
  }

  const days = Math.floor(diff / 86400000);
  const hours = Math.floor((diff / 3600000) % 24);
  const minutes = Math.floor((diff / 60000) % 60);
  const seconds = Math.floor((diff / 1000) % 60);

  timer.textContent = `${days}d ${hours}h ${minutes}m ${seconds}s`;
}
function renderCards() {
    const capsule = getCapsule();
    const grid = document.getElementById("cardGrid");
  
    grid.innerHTML = "";
  
    capsule.cards.forEach((card, index) => {
      const div = document.createElement("div");
      div.className = "card";
  
      div.innerHTML = `
        <h3>${card.title}</h3>
        <p>${isUnlocked() ? "Click to open" : "Locked"}</p>
      `;
  
      if (isUnlocked()) {
        div.addEventListener("click", () => openCard(index));
      } else {
        div.style.opacity = "0.6";
        div.style.cursor = "not-allowed";
      }
  
      grid.appendChild(div);
    });
  }
  
  /***********************
   * OPEN CARD → LOAD 5 MESSAGES
   ***********************/
  function openCard(cardIndex) {
    const capsule = getCapsule();
    const cardGrid = document.getElementById("cardGrid");
    const messageView = document.getElementById("messageView");
    const messagesDiv = document.getElementById("messages");
  
    messagesDiv.innerHTML = "";
  
    const selectedCard = capsule.cards[cardIndex];
  
    selectedCard.messages.forEach((msg, i) => {
      const div = document.createElement("div");
      div.className = "message";
      div.textContent = msg;
  
      // subtle staggered reveal
      div.style.opacity = "0";
      setTimeout(() => {
        div.style.opacity = "1";
      }, i * 150);
  
      messagesDiv.appendChild(div);
    });
  
    cardGrid.classList.add("hidden");
    messageView.classList.remove("hidden");
  }
 
  function closeMessages() {
    document.getElementById("messageView").classList.add("hidden");
    document.getElementById("cardGrid").classList.remove("hidden");
  }
  renderCards();
  updateTimer();
  setInterval(updateTimer, 1000);