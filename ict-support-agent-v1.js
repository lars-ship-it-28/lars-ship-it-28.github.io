const manuals = [
  {
    id: "vpn",
    name: "Handleiding VPN werkt niet",
    category: "ICT > Netwerk > VPN",
    keywords: ["vpn", "remote", "thuiswerken", "verbinding", "netwerk"],
    questions: [
      "Werk je thuis, op kantoor of via een andere locatie?",
      "Welke foutmelding zie je bij het verbinden?",
      "Heb je de VPN-client en je laptop al opnieuw gestart?"
    ],
    steps: [
      "Controleer of je internetverbinding werkt door een gewone website te openen.",
      "Start de VPN-client opnieuw en meld opnieuw aan met MFA.",
      "Herstart je laptop als de verbinding blijft hangen of direct verbreekt."
    ],
    source: "Mock-handleiding: VPN werkt niet, paragraaf 2.1 t/m 2.3"
  },
  {
    id: "printer",
    name: "Handleiding Printer werkt niet",
    category: "ICT > Werkplek > Printen",
    keywords: ["printer", "print", "afdrukken", "papier", "toner", "wachtrij"],
    questions: [
      "Welke printer probeer je te gebruiken?",
      "Zie je een foutmelding op je laptop of op de printer?",
      "Kunnen collega's wel printen op dezelfde printer?"
    ],
    steps: [
      "Controleer of de printer online is en geen papier- of tonermelding toont.",
      "Verwijder vastgelopen printopdrachten uit de wachtrij.",
      "Kies de printer opnieuw als standaardprinter en probeer een testpagina."
    ],
    source: "Mock-handleiding: Printer werkt niet, paragraaf 1.4 t/m 1.7"
  },
  {
    id: "password",
    name: "Handleiding Wachtwoord vergeten",
    category: "ICT > Account > Wachtwoord",
    keywords: ["wachtwoord", "password", "inloggen", "login", "vergeten", "account"],
    questions: [
      "Gaat het om je Windows-, Microsoft 365- of applicatiewachtwoord?",
      "Heb je toegang tot je MFA-methode?",
      "Krijg je een melding dat je account geblokkeerd is?"
    ],
    steps: [
      "Ga naar de selfservice wachtwoord-resetpagina van de organisatie.",
      "Bevestig je identiteit met je MFA-methode.",
      "Kies een nieuw wachtwoord en wacht enkele minuten voordat je opnieuw inlogt."
    ],
    source: "Mock-handleiding: Wachtwoord vergeten, paragraaf 3.1 t/m 3.4"
  },
  {
    id: "slow-laptop",
    name: "Handleiding Laptop traag",
    category: "ICT > Werkplek > Laptop",
    keywords: ["laptop traag", "traag", "langzaam", "vastlopen", "performance", "sloom"],
    questions: [
      "Sinds wanneer is de laptop traag?",
      "Is de laptop vooral traag bij opstarten, internet of specifieke apps?",
      "Heb je de laptop de afgelopen dag al opnieuw gestart?"
    ],
    steps: [
      "Herstart de laptop volledig en wacht tot alle updates klaar zijn.",
      "Sluit zware apps die je niet gebruikt, zoals grote spreadsheets of browservensters.",
      "Controleer of er Windows-updates of bedrijfsupdates klaarstaan en rond die af."
    ],
    source: "Mock-handleiding: Laptop traag, paragraaf 4.2 t/m 4.5"
  },
  {
    id: "teams-audio",
    name: "Handleiding Teams audio probleem",
    category: "ICT > Applicaties > Microsoft Teams",
    keywords: ["teams", "audio", "geluid", "microfoon", "speaker", "koptelefoon", "headset"],
    questions: [
      "Hoor jij anderen niet, horen anderen jou niet, of allebei?",
      "Gebruik je een headset, laptopmicrofoon of externe speaker?",
      "Werkt audio wel buiten Teams, bijvoorbeeld in de browser?"
    ],
    steps: [
      "Open Teams-instellingen en kies bij Apparaten de juiste microfoon en speaker.",
      "Test je audio met de testoproep in Teams.",
      "Sluit Teams volledig af en open Teams opnieuw als het apparaat niet verschijnt."
    ],
    source: "Mock-handleiding: Teams audio probleem, paragraaf 5.1 t/m 5.3"
  }
];

const state = {
  activeManual: null,
  answers: [],
  questionIndex: 0,
  solutionShown: false,
  solutionScore: 0,
  previousAttemptPhase: "none",
  previousAttempts: "Nog niet uitgevraagd."
};

const messagesEl = document.querySelector("#messages");
const formEl = document.querySelector("#chatForm");
const inputEl = document.querySelector("#userInput");
const resetButton = document.querySelector("#resetButton");
const ticketStatus = document.querySelector("#ticketStatus");
const ticketEmpty = document.querySelector("#ticketEmpty");
const ticketCard = document.querySelector("#ticketCard");

const ticketFields = {
  title: document.querySelector("#ticketTitle"),
  category: document.querySelector("#ticketCategory"),
  impact: document.querySelector("#ticketImpact"),
  urgency: document.querySelector("#ticketUrgency"),
  description: document.querySelector("#ticketDescription"),
  source: document.querySelector("#ticketSource")
};

function addMessage(role, text, actions = []) {
  const message = document.createElement("div");
  message.className = `message ${role}`;
  message.innerHTML = `<strong>${role === "user" ? "Gebruiker" : role === "system" ? "Systeem" : "ICT Support Agent"}</strong>${escapeHtml(text)}`;

  if (actions.length) {
    const actionWrap = document.createElement("div");
    actionWrap.className = "message-actions";
    actions.forEach((action) => {
      const button = document.createElement("button");
      button.type = "button";
      button.textContent = action.label;
      button.className = action.secondary ? "secondary" : "";
      button.addEventListener("click", action.onClick);
      actionWrap.appendChild(button);
    });
    message.appendChild(actionWrap);
  }

  messagesEl.appendChild(message);
  messagesEl.scrollTop = messagesEl.scrollHeight;
}

function escapeHtml(value) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function recognizeProblem(text) {
  const normalized = text.toLowerCase();
  const scored = manuals
    .map((manual) => ({
      manual,
      score: manual.keywords.reduce((sum, keyword) => {
        return normalized.includes(keyword) ? sum + keyword.length : sum;
      }, 0)
    }))
    .sort((a, b) => b.score - a.score);

  return scored[0].score > 0 ? scored[0].manual : null;
}

function calculateSolutionScore(manual) {
  const answerText = state.answers.join(" ").toLowerCase();
  const matchedKeywords = manual.keywords.filter((keyword) => answerText.includes(keyword)).length;
  const answeredQuestions = Math.min(state.answers.length, manual.questions.length + 1);
  const keywordScore = Math.min(35, matchedKeywords * 9);
  const contextScore = Math.min(30, answeredQuestions * 8);
  return Math.min(96, 45 + keywordScore + contextScore);
}

function resetConversation() {
  state.activeManual = null;
  state.answers = [];
  state.questionIndex = 0;
  state.solutionShown = false;
  state.solutionScore = 0;
  state.previousAttemptPhase = "none";
  state.previousAttempts = "Nog niet uitgevraagd.";
  messagesEl.innerHTML = "";
  clearTicket();
  addMessage(
    "agent",
    "Hallo, beschrijf je ICT-probleem. Ik herken het onderwerp, stel maximaal drie vragen, controleer wat je al geprobeerd hebt en geef daarna een oplossing uit de mock-handleiding."
  );
  inputEl.focus();
}

function clearTicket() {
  ticketStatus.textContent = "Nog niet nodig";
  ticketEmpty.classList.remove("hidden");
  ticketCard.classList.add("hidden");
  Object.values(ticketFields).forEach((field) => {
    field.textContent = "";
  });
}

function handleUserInput(text) {
  addMessage("user", text);

  if (!state.activeManual) {
    const manual = recognizeProblem(text);
    if (!manual) {
      addMessage(
        "agent",
        "Ik herken dit probleem nog niet in de mock-handleidingen. Probeer bijvoorbeeld VPN, printer, wachtwoord, laptop traag of Teams audio."
      );
      return;
    }

    state.activeManual = manual;
    state.answers.push(`Eerste melding: ${text}`);
    addMessage("agent", `Ik herken dit als: ${manual.name}.\n\n${manual.questions[0]}`);
    state.questionIndex = 1;
    return;
  }

  if (state.previousAttemptPhase === "askTried") {
    handlePreviousAttemptAnswer(text);
    return;
  }

  if (state.previousAttemptPhase === "askDetails") {
    handlePreviousAttemptDetails(text);
    return;
  }

  if (!state.solutionShown && state.questionIndex <= state.activeManual.questions.length) {
    state.answers.push(`${state.activeManual.questions[state.questionIndex - 1]} ${text}`);

    if (state.questionIndex < state.activeManual.questions.length) {
      addMessage("agent", state.activeManual.questions[state.questionIndex]);
      state.questionIndex += 1;
      return;
    }

    askPreviousAttempts();
    return;
  }

  const normalized = text.toLowerCase();
  if (normalized.includes("nee") || normalized.includes("niet") || normalized.includes("ticket")) {
    askPreviousAttemptsBeforeTicket();
    return;
  }

  if (normalized.includes("ja") || normalized.includes("opgelost")) {
    addMessage("agent", "Mooi, dan laat ik het ticket achterwege. Je kunt een nieuwe chat starten als je nog iets wilt testen.");
    return;
  }

  addMessage(
    "agent",
    "Is het probleem opgelost? Antwoord met 'ja' als het opgelost is of 'nee' als ik een TOPdesk-conceptticket moet maken.",
    ticketActions()
  );
}

function askPreviousAttempts() {
  state.solutionScore = calculateSolutionScore(state.activeManual);
  state.previousAttemptPhase = "askTried";

  const message = [
    `Ik heb een mogelijke oplossing gevonden. Oplossingsscore: ${state.solutionScore}%.`,
    "",
    "Heb je deze stappen al eerder geprobeerd?",
    ...state.activeManual.steps.map((step, index) => `${index + 1}. ${step}`),
    "",
    "Antwoord bijvoorbeeld met 'nee', 'ja, allemaal' of 'ja, stap 1 en 2'."
  ].join("\n");

  addMessage("agent", message);
}

function askPreviousAttemptsBeforeTicket() {
  if (state.previousAttempts !== "Nog niet uitgevraagd.") {
    createTicket();
    return;
  }

  state.previousAttemptPhase = "askTried";
  addMessage(
    "agent",
    "Voordat ik een TOPdesk-conceptticket maak: heb je deze stappen al eerder geprobeerd?\n\n" +
      state.activeManual.steps.map((step, index) => `${index + 1}. ${step}`).join("\n") +
      "\n\nAntwoord met wat je al geprobeerd hebt."
  );
}

function handlePreviousAttemptAnswer(text) {
  const normalized = text.toLowerCase();

  if (meansAllStepsTried(normalized)) {
    state.previousAttempts = `Gebruiker geeft aan dat alle voorgestelde stappen al zijn uitgevoerd. Details: ${text}`;
    state.previousAttemptPhase = "none";
    addMessage(
      "agent",
      "Helder. Omdat je alle voorgestelde stappen al hebt uitgevoerd, sla ik de oplossing over en maak ik direct een TOPdesk-conceptticket."
    );
    createTicket();
    return;
  }

  if (meansNoStepsTried(normalized)) {
    state.previousAttempts = `Gebruiker geeft aan deze stappen nog niet eerder geprobeerd te hebben. Antwoord: ${text}`;
    state.previousAttemptPhase = "none";
    showSolution();
    return;
  }

  if (normalized.includes("ja") || normalized.includes("stap") || normalized.includes("geprobeerd")) {
    state.previousAttemptPhase = "askDetails";
    addMessage("agent", "Wat heb je precies geprobeerd? Noem eventueel de stapnummers of beschrijf kort wat er is gedaan.");
    return;
  }

  state.previousAttempts = `Gebruiker gaf dit antwoord op de vraag wat al geprobeerd is: ${text}`;
  state.previousAttemptPhase = "none";
  showSolution();
}

function handlePreviousAttemptDetails(text) {
  state.previousAttempts = text;
  state.previousAttemptPhase = "none";

  if (meansAllStepsTried(text.toLowerCase())) {
    addMessage(
      "agent",
      "Dank je. Je geeft aan dat alle voorgestelde stappen al zijn gedaan. Ik maak daarom direct een TOPdesk-conceptticket."
    );
    createTicket();
    return;
  }

  showSolution();
}

function meansAllStepsTried(text) {
  const allWords = ["alle", "alles", "allemaal", "volledig", "alle stappen"];
  const doneWords = ["gedaan", "geprobeerd", "uitgevoerd", "al gedaan", "al geprobeerd"];
  const mentionsAllStepNumbers = ["1", "2", "3"].every((stepNumber) => text.includes(stepNumber));
  const saysYesToAll = text.includes("ja") && allWords.some((word) => text.includes(word));
  const explicitlyAllDone = allWords.some((word) => text.includes(word)) && doneWords.some((word) => text.includes(word));
  return saysYesToAll || explicitlyAllDone || mentionsAllStepNumbers;
}

function meansNoStepsTried(text) {
  return text.includes("nee") || text.includes("nog niet") || text.includes("niet geprobeerd");
}

function showSolution() {
  state.solutionShown = true;
  const manual = state.activeManual;
  if (!state.solutionScore) {
    state.solutionScore = calculateSolutionScore(manual);
  }

  const solution = [
    `Oplossingsscore: ${state.solutionScore}%`,
    "",
    "Probeer deze stappen:",
    ...manual.steps.map((step, index) => `${index + 1}. ${step}`),
    "",
    `Bron: ${manual.source}`,
    "",
    "Is het probleem hiermee opgelost?"
  ].join("\n");

  addMessage("agent", solution, ticketActions());
}

function ticketActions() {
  return [
    {
      label: "Ja, opgelost",
      secondary: true,
      onClick: () => addMessage("agent", "Fijn, dan is er geen TOPdesk-ticket nodig.")
    },
    {
      label: "Nee, maak conceptticket",
      onClick: createTicket
    }
  ];
}

function createTicket() {
  if (!state.activeManual) {
    addMessage("system", "Er is nog geen herkend probleem om een ticket van te maken.");
    return;
  }

  const manual = state.activeManual;
  const description = [
    `Probleemtype: ${manual.name}`,
    "",
    "Verzamelde informatie:",
    ...state.answers.map((answer) => `- ${answer}`),
    "",
    "Al eerder geprobeerd door gebruiker:",
    state.previousAttempts,
    "",
    "Voorgestelde oplossing geprobeerd:",
    ...manual.steps.map((step) => `- ${step}`),
    "",
    "Status: niet opgelost volgens gebruiker."
  ].join("\n");

  ticketFields.title.textContent = `${manual.name} - niet opgelost`;
  ticketFields.category.textContent = manual.category;
  ticketFields.impact.textContent = "Individuele gebruiker";
  ticketFields.urgency.textContent = "Normaal";
  ticketFields.description.textContent = description;
  ticketFields.source.textContent = manual.source;

  ticketStatus.textContent = "Concept klaar";
  ticketEmpty.classList.add("hidden");
  ticketCard.classList.remove("hidden");

  addMessage(
    "agent",
    "Ik heb een TOPdesk-conceptticket voorbereid. Controleer het ticket rechts in beeld voordat je het zou indienen."
  );
}

formEl.addEventListener("submit", (event) => {
  event.preventDefault();
  const text = inputEl.value.trim();
  if (!text) return;
  inputEl.value = "";
  handleUserInput(text);
});

document.querySelectorAll("[data-example]").forEach((button) => {
  button.addEventListener("click", () => {
    inputEl.value = button.dataset.example;
    formEl.requestSubmit();
  });
});

resetButton.addEventListener("click", resetConversation);

resetConversation();
