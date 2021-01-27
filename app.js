const dataContainerEl = document.getElementById("cardContainer");
const voiceListEl = document.getElementById("voiceList");
const speakTextEl = document.getElementById("speakText");
const readTextEl = document.getElementById("readText");

let dataList = [
  {
    image: "./img/happy.jpg",
    text: "I'm Happy",
  },
  {
    image: "./img/mountain.jpg",
    text: "Let's climb the mountain",
  },
  {
    image: "./img/playing.jpg",
    text: "I like to play",
  },
  {
    image: "./img/river.jpg",
    text: "Dive into the river",
  },
  {
    image: "./img/travelling.jpg",
    text: "Make plan to travel",
  },
  {
    image: "./img/trouble.jpg",
    text: "I'm in trouble",
  },
];

dataList.forEach(data => {
    const dataElement = document.createElement("div");
    dataElement.classList.add("col-md-4", "pointer","mt-3");
    dataElement.innerHTML = `
        <div class="card shadow-lg">
            <img src="${data.image}" alt="happy" class="img-fluid" style="height: 15rem">
            <div class="card-footer bg-primary">
                <h4 class="text-center text-light">${data.text}</h4>
            </div>
        </div>
    `;
  dataElement.addEventListener("click", () => {
    setTextMessage(data.text);
    speakTest();
    })
    dataContainerEl.appendChild(dataElement);
})

let message = new SpeechSynthesisUtterance();

function setTextMessage(text) {
    message.text = text;
}

function speakTest() {
    speechSynthesis.speak(message);
}

let voices = speechSynthesis.getVoices();

function populateVoiceList() {
    if (typeof speechSynthesis === "undefined") {
        return "Sorry! it is not supported";
    }
    console.log(voices);
    voices.forEach(voice => {
        let option = document.createElement("option");

        option.value = voice.name;
        option.innerText = `${voice.name} ${voice.lang}`;
        voiceListEl.appendChild(option);
    })
}

populateVoiceList();

voiceListEl.addEventListener("change", (e) => {
  message.voice = voices.find(voice => voice.name === e.target.value)
})

readTextEl.addEventListener("click", () => {
  setTextMessage(speakTextEl.value);
  speakTest();
})

document.addEventListener("DOMContentLoaded", () => {
  speakTextEl.value = " ";
})