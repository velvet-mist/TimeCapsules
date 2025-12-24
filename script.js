const capsulesDiv = document.getElementById("capsules");

function createCapsule(){
    const title= title.value;
    const message= document.getElementById("message").value;
    const unlockTime= document.getElementById("unlockTime").value;
    const imageInput= document.getElementById("imgaeInput");

    if (!message||!unlockTime) return alert("Message and Time required")

        const reader= new FileReader();
        reader.onload=()=>{
            const capsule={
                title,
                message,
                unlockTime,
                image: reader.result || null
            };
            const capsules = JSON.parse(localStorage.getItem("capsules") || "[]");
            capsules.push(capsule);
            localStorage.setItem("capsules", JSON.stringify(capsules));
            renderCapsules();
        };
    
        if (imageInput.files[0]) {
            reader.readAsDataURL(imageInput.files[0]);
        } else {
            reader.onload();
        }
    }
    
    function renderCapsules() {
        capsulesDiv.innerHTML = "";
        const capsules = JSON.parse(localStorage.getItem("capsules") || "[]");
    
        capsules.forEach(c => {
            const unlockDate = new Date(c.unlockTime);
            const now = new Date();
            const unlocked = now >= unlockDate;
    
            const div = document.createElement("div");
            div.className = "capsule";
    
            div.innerHTML = `
                <h3>${c.title || "Untitled Capsule"}</h3>
                <p class="${unlocked ? "" : "locked"}">${c.message}</p>
                ${c.image && unlocked ? `<img src="${c.image}" width="100%">` : ""}
                <div class="countdown">
                    ${unlocked ? "Opened" : timeLeft(unlockDate)}
                </div>
            `;
    
            capsulesDiv.appendChild(div);
        });
    }
    
    function timeLeft(date) {
        const diff = date - new Date();
        const d = Math.floor(diff / (1000 * 60 * 60 * 24));
        const h = Math.floor((diff / (1000 * 60 * 60)) % 24);
        const m = Math.floor((diff / (1000 * 60)) % 60);
        const s = Math.floor((diff / 1000) % 60);
        return `${d}d ${h}h ${m}m ${s}s remaining`;
    }
    
    setInterval(renderCapsules, 1000);
    renderCapsules();

