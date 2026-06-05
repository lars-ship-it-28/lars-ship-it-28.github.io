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
  previousAttempts: "Nog niet uitgevraagd.",
  selectedPreviousSteps: [],
  previousAttemptResult: "",
  priorityPhase: "none",
  canStillWork: null,
  affectedUsers: null,
  impact: "Nog niet bepaald",
  urgency: "Nog niet bepaald",
  priority: null,
  ticketCreated: false
};

const messagesEl = document.querySelector("#messages");
const formEl = document.querySelector("#chatForm");
const inputEl = document.querySelector("#userInput");
const sendButton = document.querySelector("#sendButton");
const resetButton = document.querySelector("#resetButton");
const ticketStatus = document.querySelector("#ticketStatus");
const ticketEmpty = document.querySelector("#ticketEmpty");
const ticketCard = document.querySelector("#ticketCard");

const ticketFields = {
  title: document.querySelector("#ticketTitle"),
  category: document.querySelector("#ticketCategory"),
  impact: document.querySelector("#ticketImpact"),
  urgency: document.querySelector("#ticketUrgency"),
  priority: document.querySelector("#ticketPriority"),
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
      button.addEventListener("click", () => {
        if (state.ticketCreated) return;
        action.onClick();
      });
      actionWrap.appendChild(button);
    });
    message.appendChild(actionWrap);
  }

  messagesEl.appendChild(message);
  messagesEl.scrollTop = messagesEl.scrollHeight;
}

function addChecklistMessage(text, steps, onContinue) {
  const message = document.createElement("div");
  message.className = "message agent";
  message.innerHTML = `<strong>ICT Support Agent</strong>${escapeHtml(text)}`;

  const checklist = document.createElement("div");
  checklist.className = "step-checklist";

  steps.forEach((step, index) => {
    const label = document.createElement("label");
    label.className = "step-option";

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.value = String(index);

    const span = document.createElement("span");
    span.textContent = `${index + 1}. ${step}`;

    label.appendChild(checkbox);
    label.appendChild(span);
    checklist.appendChild(label);
  });

  const actionWrap = document.createElement("div");
  actionWrap.className = "message-actions";

  const continueButton = document.createElement("button");
  continueButton.type = "button";
  continueButton.textContent = "Verder";
  continueButton.addEventListener("click", () => {
    if (state.ticketCreated) return;
    const selectedIndexes = Array.from(checklist.querySelectorAll("input:checked")).map((input) => Number(input.value));
    onContinue(selectedIndexes);
    continueButton.disabled = true;
    checklist.querySelectorAll("input").forEach((input) => {
      input.disabled = true;
    });
  });

  actionWrap.appendChild(continueButton);
  message.appendChild(checklist);
  message.appendChild(actionWrap);
  messagesEl.appendChild(message);
  messagesEl.scrollTop = messagesEl.scrollHeight;
}

function addChoiceMessage(text, choices) {
  addMessage(
    "agent",
    text,
    choices.map((choice) => ({
      label: choice.label,
      secondary: choice.secondary,
      onClick: choice.onClick
    }))
  );
}

function addPriorityBadgeMessage() {
  const message = document.createElement("div");
  message.className = "message agent";
  message.innerHTML = `<strong>ICT Support Agent</strong>${escapeHtml("Ik heb de prioriteit automatisch bepaald.")}`;

  const badge = document.createElement("span");
  badge.className = `priority-badge ${state.priority.level.toLowerCase()}`;
  badge.textContent = `${state.priority.level} ${state.priority.label}`;

  const details = document.createElement("div");
  details.className = "priority-details";
  details.textContent = `Impact: ${state.impact} | Urgentie: ${state.urgency} | Prioriteit: ${state.priority.level} ${state.priority.label}`;

  message.appendChild(badge);
  message.appendChild(details);
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
  state.selectedPreviousSteps = [];
  state.previousAttemptResult = "";
  state.priorityPhase = "none";
  state.canStillWork = null;
  state.affectedUsers = null;
  state.impact = "Nog niet bepaald";
  state.urgency = "Nog niet bepaald";
  state.priority = null;
  state.ticketCreated = false;
  messagesEl.innerHTML = "";
  clearTicket();
  setConversationLocked(false);
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
  if (state.ticketCreated) return;

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
    addMessage(
      "agent",
      "Gebruik de checkboxes bij de stappen en klik daarna op Verder. Dan kan ik de geselecteerde stappen netjes meenemen in het conceptticket."
    );
    return;
  }

  if (state.previousAttemptPhase === "askResult") {
    handlePreviousAttemptResult(text);
    return;
  }

  if (state.priorityPhase !== "none") {
    addMessage("agent", "Gebruik de knoppen bij de impact- en urgentievraag. Dan kan ik de prioriteit betrouwbaar bepalen.");
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
    "Welke stappen heb je al eerder geprobeerd? Vink ze aan en klik op Verder."
  ].join("\n");

  addChecklistMessage(message, state.activeManual.steps, handlePreviousStepSelection);
}

function askPreviousAttemptsBeforeTicket() {
  if (state.previousAttempts !== "Nog niet uitgevraagd." || state.selectedPreviousSteps.length) {
    askCanStillWork();
    return;
  }

  state.previousAttemptPhase = "askTried";
  addChecklistMessage(
    "Voordat ik een TOPdesk-conceptticket maak: welke stappen heb je al eerder geprobeerd? Vink ze aan en klik op Verder.",
    state.activeManual.steps,
    handlePreviousStepSelection
  );
}

function handlePreviousStepSelection(selectedIndexes) {
  state.selectedPreviousSteps = selectedIndexes.map((index) => state.activeManual.steps[index]);
  state.previousAttemptPhase = "none";
  state.previousAttempts = formatPreviousAttempts();

  if (selectedIndexes.length === state.activeManual.steps.length) {
    addMessage(
      "agent",
      "Je hebt alle voorgestelde stappen geselecteerd. Ik sla de oplossing over en bepaal nu eerst impact en urgentie voor het TOPdesk-conceptticket."
    );
    askCanStillWork();
    return;
  }

  if (selectedIndexes.length === 0) {
    addMessage("agent", "Je hebt nog geen voorgestelde stappen geselecteerd. Ik toon daarom de oplossing uit de mock-handleiding.");
    showSolution();
    return;
  }

  state.previousAttemptPhase = "askResult";
  addMessage("agent", "Wat was het resultaat van de stappen die je al geprobeerd hebt?");
}

function handlePreviousAttemptResult(text) {
  state.previousAttemptResult = text;
  state.previousAttemptPhase = "none";
  state.previousAttempts = formatPreviousAttempts();

  showSolution();
}

function formatPreviousAttempts() {
  if (!state.selectedPreviousSteps.length) {
    return "Geen voorgestelde stappen geselecteerd als eerder geprobeerd.";
  }

  const lines = state.selectedPreviousSteps.map((step) => `- ${step}`);
  if (state.previousAttemptResult) {
    lines.push(`Resultaat van deze stappen: ${state.previousAttemptResult}`);
  }

  return lines.join("\n");
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
      onClick: () => {
        if (state.previousAttempts === "Nog niet uitgevraagd." && !state.selectedPreviousSteps.length) {
          askPreviousAttemptsBeforeTicket();
          return;
        }

        askCanStillWork();
      }
    }
  ];
}

function askCanStillWork() {
  state.priorityPhase = "askCanWork";
  addChoiceMessage("Kun je nog werken?", [
    {
      label: "Ja",
      secondary: true,
      onClick: () => handleCanStillWork(true)
    },
    {
      label: "Nee",
      onClick: () => handleCanStillWork(false)
    }
  ]);
}

function handleCanStillWork(canWork) {
  state.canStillWork = canWork;
  state.priorityPhase = "askAffectedUsers";
  addChoiceMessage("Hoeveel gebruikers hebben last van het probleem?", [
    {
      label: "Alleen ik",
      secondary: true,
      onClick: () => handleAffectedUsers("single")
    },
    {
      label: "Meerdere gebruikers",
      secondary: true,
      onClick: () => handleAffectedUsers("multiple")
    },
    {
      label: "Hele afdeling/organisatie",
      onClick: () => handleAffectedUsers("many")
    }
  ]);
}

function handleAffectedUsers(affectedUsers) {
  if (state.ticketCreated || state.priority) return;

  state.affectedUsers = affectedUsers;
  state.priorityPhase = "none";
  determinePriority();
  addPriorityBadgeMessage();
  createTicket();
}

function determinePriority() {
  if (state.affectedUsers === "many" || (state.canStillWork === false && state.affectedUsers === "multiple")) {
    state.impact = state.affectedUsers === "many" ? "Organisatie of afdeling" : "Meerdere gebruikers";
    state.urgency = "Kritiek";
    state.priority = { level: "P1", label: "Kritiek" };
    return;
  }

  if (state.canStillWork === false || state.affectedUsers === "multiple") {
    state.impact = state.affectedUsers === "multiple" ? "Meerdere gebruikers" : "Individuele gebruiker";
    state.urgency = "Hoog";
    state.priority = { level: "P2", label: "Hoog" };
    return;
  }

  state.impact = "Individuele gebruiker";
  state.urgency = "Normaal";
  state.priority = { level: "P3", label: "Normaal" };
}

function createTicket() {
  if (state.ticketCreated) return;

  if (!state.activeManual) {
    addMessage("system", "Er is nog geen herkend probleem om een ticket van te maken.");
    return;
  }

  if (!state.priority) {
    askCanStillWork();
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
    "Impact/urgentie:",
    `- Kun je nog werken: ${state.canStillWork === null ? "Niet ingevuld" : state.canStillWork ? "Ja" : "Nee"}`,
    `- Aantal gebruikers met last: ${formatAffectedUsers()}`,
    `- Impact: ${state.impact}`,
    `- Urgentie: ${state.urgency}`,
    `- Prioriteit: ${state.priority ? `${state.priority.level} ${state.priority.label}` : "Nog niet bepaald"}`,
    "",
    "Voorgestelde oplossing geprobeerd:",
    ...manual.steps.map((step) => `- ${step}`),
    "",
    "Status: niet opgelost volgens gebruiker."
  ].join("\n");

  ticketFields.title.textContent = `${manual.name} - niet opgelost`;
  ticketFields.category.textContent = manual.category;
  ticketFields.impact.textContent = state.impact;
  ticketFields.urgency.textContent = state.urgency;
  ticketFields.priority.innerHTML = "";
  ticketFields.priority.appendChild(createPriorityBadge());
  ticketFields.description.textContent = description;
  ticketFields.source.textContent = manual.source;

  ticketStatus.textContent = "Concept klaar";
  ticketEmpty.classList.add("hidden");
  ticketCard.classList.remove("hidden");
  addMessage(
    "agent",
    "Ik heb een TOPdesk-conceptticket voorbereid. Controleer het ticket rechts in beeld. Start een nieuwe melding als je nog iets anders wilt registreren."
  );
  state.ticketCreated = true;
  lockCompletedConversation();
}

function lockCompletedConversation() {
  setConversationLocked(true);
  document.querySelectorAll(".message-actions button").forEach((button) => {
    button.disabled = true;
  });
  document.querySelectorAll(".step-checklist input").forEach((input) => {
    input.disabled = true;
  });
}

function setConversationLocked(isLocked) {
  inputEl.disabled = isLocked;
  sendButton.disabled = isLocked;
  inputEl.placeholder = isLocked ? "Conceptticket is aangemaakt" : "Beschrijf je ICT-probleem...";
  resetButton.classList.toggle("primary-reset", isLocked);
}

function formatAffectedUsers() {
  if (state.affectedUsers === "single") return "Alleen de melder";
  if (state.affectedUsers === "multiple") return "Meerdere gebruikers";
  if (state.affectedUsers === "many") return "Hele afdeling of organisatie";
  return "Niet ingevuld";
}

function createPriorityBadge() {
  const badge = document.createElement("span");
  const priority = state.priority || { level: "P3", label: "Normaal" };
  badge.className = `priority-badge ${priority.level.toLowerCase()}`;
  badge.textContent = `${priority.level} ${priority.label}`;
  return badge;
}

formEl.addEventListener("submit", (event) => {
  event.preventDefault();
  if (state.ticketCreated) return;
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
