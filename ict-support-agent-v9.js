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

const serviceCategories = [
  {
    name: "Werkplek",
    items: [
      { label: "Computer traag", manualId: "slow-laptop", categoryPath: "ICT > Werkplek > Computer" },
      { label: "Beeldscherm werkt niet", categoryPath: "ICT > Werkplek > Beeldscherm" },
      { label: "Muis of toetsenbord werkt niet", categoryPath: "ICT > Werkplek > Randapparatuur" },
      { label: "Dockingstation probleem", categoryPath: "ICT > Werkplek > Dockingstation" },
      { label: "Computer start niet op", categoryPath: "ICT > Werkplek > Computer" },
      { label: "Overig werkplekprobleem", categoryPath: "ICT > Werkplek > Overig" }
    ]
  },
  {
    name: "Mobiele telefoon",
    items: [
      { label: "Pincode vergeten", categoryPath: "ICT > Mobiele telefoon > Pincode" },
      { label: "Outlook werkt niet", categoryPath: "ICT > Mobiele telefoon > Outlook" },
      { label: "Teams werkt niet", categoryPath: "ICT > Mobiele telefoon > Teams" },
      { label: "OneDrive werkt niet", categoryPath: "ICT > Mobiele telefoon > OneDrive" },
      { label: "Contacten synchroniseren niet", categoryPath: "ICT > Mobiele telefoon > Contacten" },
      { label: "Nieuwe telefoon instellen", categoryPath: "ICT > Mobiele telefoon > Installatie" },
      { label: "Overig telefoonprobleem", categoryPath: "ICT > Mobiele telefoon > Overig" }
    ]
  },
  {
    name: "Accounts & Toegang",
    items: [
      { label: "Wachtwoord vergeten", manualId: "password", categoryPath: "ICT > Accounts & Toegang > Wachtwoord" },
      { label: "MFA werkt niet", categoryPath: "ICT > Accounts & Toegang > MFA" },
      { label: "Account geblokkeerd", categoryPath: "ICT > Accounts & Toegang > Account" },
      { label: "Toegang aanvragen", categoryPath: "ICT > Accounts & Toegang > Autorisatie" },
      { label: "Overig accountprobleem", categoryPath: "ICT > Accounts & Toegang > Overig" }
    ]
  },
  {
    name: "Microsoft 365",
    items: [
      { label: "Teams audio probleem", manualId: "teams-audio", categoryPath: "ICT > Microsoft 365 > Teams" },
      { label: "Outlook werkt niet", categoryPath: "ICT > Microsoft 365 > Outlook" },
      { label: "OneDrive synchroniseert niet", categoryPath: "ICT > Microsoft 365 > OneDrive" },
      { label: "Excel of Word probleem", categoryPath: "ICT > Microsoft 365 > Office-apps" },
      { label: "Overig Microsoft 365 probleem", categoryPath: "ICT > Microsoft 365 > Overig" }
    ]
  },
  {
    name: "Netwerk & VPN",
    items: [
      { label: "VPN werkt niet", manualId: "vpn", categoryPath: "ICT > Netwerk & VPN > VPN" },
      { label: "Geen internet", categoryPath: "ICT > Netwerk & VPN > Internet" },
      { label: "Wifi probleem", categoryPath: "ICT > Netwerk & VPN > Wifi" },
      { label: "Netwerkschijf niet bereikbaar", categoryPath: "ICT > Netwerk & VPN > Netwerkschijf" },
      { label: "Overig netwerkprobleem", categoryPath: "ICT > Netwerk & VPN > Overig" }
    ]
  },
  {
    name: "Printers",
    items: [
      { label: "Printer werkt niet", manualId: "printer", categoryPath: "ICT > Printers > Printer" },
      { label: "Papierstoring", categoryPath: "ICT > Printers > Papierstoring" },
      { label: "Printer niet zichtbaar", categoryPath: "ICT > Printers > Beschikbaarheid" },
      { label: "Scannen werkt niet", categoryPath: "ICT > Printers > Scannen" },
      { label: "Overig printerprobleem", categoryPath: "ICT > Printers > Overig" }
    ]
  },
  {
    name: "Overig",
    items: [
      { label: "Ander ICT-probleem", categoryPath: "ICT > Overig > Ander ICT-probleem" }
    ]
  }
];

const genericQuestions = [
  "Beschrijf kort wat er gebeurt.",
  "Wanneer is het probleem begonnen?",
  "Krijg je een foutmelding of zie je bijzonder gedrag?"
];

const state = {
  activeManual: null,
  selectedProblem: null,
  selectedMainCategory: null,
  selectedSubCategory: null,
  selectedCategoryPath: null,
  intakeStarted: false,
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
  priorityReason: "Nog niet bepaald",
  additionalInfoPhase: "none",
  additionalInfoAsked: false,
  additionalInfo: "",
  selfServiceResolved: false,
  resolvedButReport: false,
  resolvedReportReason: "",
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
const viewTicketButton = document.querySelector("#viewTicketButton");
const mainCategoryMenu = document.querySelector("#mainCategoryMenu");
const mainCategoryGrid = document.querySelector("#mainCategoryGrid");
const subProblemMenu = document.querySelector("#subProblemMenu");
const subProblemGrid = document.querySelector("#subProblemGrid");
const subProblemTitle = document.querySelector("#subProblemTitle");
const backToMainButton = document.querySelector("#backToMainButton");

const ticketFields = {
  problem: document.querySelector("#summaryProblem"),
  status: document.querySelector("#summaryStatus"),
  priority: document.querySelector("#summaryPriority"),
  nextStep: document.querySelector("#summaryNextStep"),
  source: document.querySelector("#summarySource")
};

let currentTicketJson = null;

function addMessage(role, text, actions = []) {
  archiveVisibleSteps();
  const message = document.createElement("div");
  message.className = `message ${role} wizard-card`;
  message.innerHTML = `<strong>${role === "user" ? "Invoer" : role === "system" ? "Status" : "Stap"}</strong>${escapeHtml(text)}`;

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
  archiveVisibleSteps();
  const message = document.createElement("div");
  message.className = "message agent wizard-card";
  message.innerHTML = `<strong>Stap</strong>${escapeHtml(text)}`;

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
  archiveVisibleSteps();
  const message = document.createElement("div");
  message.className = "message agent wizard-card";
  message.innerHTML = `<strong>Stap</strong>${escapeHtml(text)}`;

  const actionWrap = document.createElement("div");
  actionWrap.className = "message-actions choice-actions";

  choices.forEach((choice) => {
    const button = document.createElement("button");
    button.type = "button";
    button.textContent = choice.label;
    button.className = "choice-button";
    button.addEventListener("click", () => {
      if (state.ticketCreated || button.disabled || actionWrap.dataset.answered === "true") return;

      actionWrap.dataset.answered = "true";

      actionWrap.querySelectorAll(".choice-button").forEach((choiceButton) => {
        choiceButton.classList.remove("selected");
        choiceButton.disabled = true;
      });

      button.classList.add("selected");
      button.disabled = false;
      choice.onClick();
    });
    actionWrap.appendChild(button);
  });

  message.appendChild(actionWrap);
  messagesEl.appendChild(message);
  messagesEl.scrollTop = messagesEl.scrollHeight;
}

function addAdditionalInfoMessage() {
  archiveVisibleSteps();
  state.additionalInfoPhase = "ask";
  state.additionalInfoAsked = true;

  const message = document.createElement("div");
  message.className = "message agent wizard-card";
  message.innerHTML = `<strong>Aanvullende informatie (optioneel)</strong>${escapeHtml("Heb je nog aanvullende informatie die kan helpen bij het oplossen van dit probleem?")}`;

  const fieldWrap = document.createElement("div");
  fieldWrap.className = "additional-info-field";

  const textarea = document.createElement("textarea");
  textarea.maxLength = 250;
  textarea.rows = 4;
  textarea.placeholder = "Typ hier eventueel extra informatie...";

  const counter = document.createElement("div");
  counter.className = "character-counter";
  counter.textContent = "0/250";

  textarea.addEventListener("input", () => {
    counter.textContent = `${textarea.value.length}/250`;
  });

  const actionWrap = document.createElement("div");
  actionWrap.className = "message-actions";

  const continueButton = document.createElement("button");
  continueButton.type = "button";
  continueButton.textContent = "Verder";
  continueButton.addEventListener("click", () => {
    if (state.ticketCreated || state.additionalInfoPhase !== "ask") return;
    state.additionalInfo = textarea.value.trim();
    state.additionalInfoPhase = "none";
    textarea.disabled = true;
    continueButton.disabled = true;
    createTicket();
  });

  fieldWrap.appendChild(textarea);
  fieldWrap.appendChild(counter);
  actionWrap.appendChild(continueButton);
  message.appendChild(fieldWrap);
  message.appendChild(actionWrap);
  messagesEl.appendChild(message);
  messagesEl.scrollTop = messagesEl.scrollHeight;
  textarea.focus();
}

function addPriorityBadgeMessage() {
  archiveVisibleSteps();
  const message = document.createElement("div");
  message.className = "message agent wizard-card";
  message.innerHTML = `<strong>Prioriteit</strong>${escapeHtml("De prioriteit is automatisch bepaald.")}`;

  const badge = document.createElement("span");
  badge.className = `priority-badge ${state.priority.level.toLowerCase()}`;
  badge.textContent = `${state.priority.level} ${state.priority.label}`;

  const details = document.createElement("div");
  details.className = "priority-details";
  details.textContent = `${state.priority.level} ${state.priority.label}. ${state.priorityReason}`;

  message.appendChild(badge);
  message.appendChild(details);
  messagesEl.appendChild(message);
  messagesEl.scrollTop = messagesEl.scrollHeight;
}

function archiveVisibleSteps() {
  document.querySelectorAll(".messages .message").forEach((message) => {
    message.classList.add("archived-step");
  });
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
  state.selectedProblem = null;
  state.selectedMainCategory = null;
  state.selectedSubCategory = null;
  state.selectedCategoryPath = null;
  state.intakeStarted = false;
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
  state.priorityReason = "Nog niet bepaald";
  state.additionalInfoPhase = "none";
  state.additionalInfoAsked = false;
  state.additionalInfo = "";
  state.selfServiceResolved = false;
  state.resolvedButReport = false;
  state.resolvedReportReason = "";
  state.ticketCreated = false;
  currentTicketJson = null;
  messagesEl.innerHTML = "";
  clearTicket();
  setConversationLocked(false);
  resetProblemMenu();
  sendButton.textContent = "Volgende";
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
  currentTicketJson = null;
}

function handleUserInput(text) {
  if (state.ticketCreated) return;

  addMessage("user", text);

  if (!state.selectedProblem) {
    addMessage("agent", "Kies eerst een hoofdcategorie en daarna een probleemtype in het menu bovenaan.");
    return;
  }

  if (state.previousAttemptPhase === "askTried") {
    addMessage(
      "agent",
      "Gebruik de checkboxes bij de stappen en klik daarna op Verder. Dan kan ik de geselecteerde stappen netjes meenemen in je melding."
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

  if (state.additionalInfoPhase === "ask") {
    addMessage("agent", "Gebruik het tekstvak voor aanvullende informatie of klik op Verder om dit over te slaan.");
    return;
  }

  if (!state.solutionShown && state.questionIndex <= state.activeManual.questions.length) {
    state.answers.push(`${state.activeManual.questions[state.questionIndex - 1]} ${text}`);

    if (state.questionIndex < state.activeManual.questions.length) {
      addMessage("agent", state.activeManual.questions[state.questionIndex]);
      state.questionIndex += 1;
      return;
    }

    if (state.activeManual.isGeneric) {
      addMessage("agent", "Dank je. Ik heb genoeg informatie om je melding voor te bereiden. Ik stel nog twee vragen over prioriteit.");
      askCanStillWork();
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
    "Is het probleem opgelost? Antwoord met 'ja' als het opgelost is of 'nee' als ik je melding moet voorbereiden.",
    ticketActions()
  );
}

function setSelectedProblem(manual) {
  if (state.ticketCreated || state.selectedProblem) return false;

  state.selectedProblem = manual;
  state.activeManual = manual;
  return true;
}

function renderMainCategories() {
  mainCategoryGrid.innerHTML = "";
  serviceCategories.forEach((category) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "menu-card";
    button.textContent = category.name;
    button.addEventListener("click", () => {
      if (state.ticketCreated || state.intakeStarted || state.selectedProblem) return;
      showSubProblems(category);
    });
    mainCategoryGrid.appendChild(button);
  });
}

function showSubProblems(category) {
  state.selectedMainCategory = category.name;
  subProblemTitle.textContent = `${category.name}: kies een probleem`;
  subProblemGrid.innerHTML = "";

  category.items.forEach((item) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "menu-card";
    button.textContent = item.label;
    button.addEventListener("click", () => {
      if (state.ticketCreated || state.intakeStarted || state.selectedProblem) return;
      startIntakeFromSubProblem(category, item);
    });
    subProblemGrid.appendChild(button);
  });

  mainCategoryMenu.classList.add("hidden");
  subProblemMenu.classList.remove("hidden");
}

function resetProblemMenu() {
  renderMainCategories();
  subProblemGrid.innerHTML = "";
  subProblemTitle.textContent = "Kies een probleem";
  mainCategoryMenu.classList.remove("hidden");
  subProblemMenu.classList.add("hidden");
}

function startIntakeFromSubProblem(category, item) {
  const manual = createManualForSubProblem(category, item);
  state.selectedMainCategory = category.name;
  state.selectedSubCategory = item.label;
  state.selectedCategoryPath = item.categoryPath;
  state.intakeStarted = true;
  setSelectedProblem(manual);
  lockProblemMenuSelection(item.label);
  state.answers.push(`Eerste melding: ${item.label}`);
  addMessage("agent", `Gekozen probleem: ${category.name} > ${item.label}\n\n${manual.questions[0]}`);
  state.questionIndex = 1;
}

function createManualForSubProblem(category, item) {
  const baseManual = item.manualId ? manuals.find((manual) => manual.id === item.manualId) : null;
  const manual = baseManual
    ? { ...baseManual, questions: [...baseManual.questions], steps: [...baseManual.steps] }
    : {
        id: `generic-${category.name}-${item.label}`.toLowerCase().replaceAll(/[^a-z0-9]+/g, "-"),
        name: `Handleiding ${item.label}`,
        category: item.categoryPath,
        keywords: [item.label.toLowerCase(), category.name.toLowerCase()],
        questions: [...genericQuestions],
        steps: [],
        source: `Algemene intake: ${item.label}`,
        isGeneric: true
      };

  manual.mainCategory = category.name;
  manual.subCategory = item.label;
  manual.categoryPath = item.categoryPath;
  if (baseManual) {
    manual.name = `Handleiding ${item.label}`;
  }
  return manual;
}

function lockProblemMenuSelection(label) {
  mainCategoryMenu.classList.add("hidden");
  subProblemMenu.classList.remove("hidden");
  Array.from(subProblemGrid.querySelectorAll("button")).forEach((button) => {
    const isSelected = button.textContent === label;
    button.classList.toggle("selected-problem", isSelected);
    button.disabled = !isSelected;
  });
  backToMainButton.disabled = true;
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
    "Voordat ik je melding voorbereid: welke stappen heb je al eerder geprobeerd? Vink ze aan en klik op Verder.",
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
      "Je hebt alle voorgestelde stappen geselecteerd. Ik sla de oplossing over en stel nog twee vragen om je melding goed te kunnen doorzetten."
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
      onClick: handleSelfServiceResolved
    },
    {
      label: "Nee, nog niet opgelost",
      onClick: () => {
        if (state.previousAttempts === "Nog niet uitgevraagd." && !state.selectedPreviousSteps.length) {
          askPreviousAttemptsBeforeTicket();
          return;
        }

        askCanStillWork();
      }
    },
    {
      label: "Opgelost, maar toch melding maken",
      secondary: true,
      onClick: askResolvedReportReason
    }
  ];
}

function handleSelfServiceResolved() {
  if (state.ticketCreated || state.selfServiceResolved) return;

  state.selfServiceResolved = true;
  addMessage("agent", "Fijn, het probleem is opgelost. Er is geen ticket aangemaakt.");
  lockSelfServiceConversation();
}

function lockSelfServiceConversation() {
  setConversationLocked(true);
  document.querySelectorAll(".menu-card, .back-button").forEach((button) => {
    button.disabled = true;
  });
  document.querySelectorAll(".message-actions button").forEach((button) => {
    button.disabled = true;
  });
  document.querySelectorAll(".step-checklist input").forEach((input) => {
    input.disabled = true;
  });
}

function askResolvedReportReason() {
  if (state.ticketCreated || state.selfServiceResolved) return;

  state.resolvedButReport = true;
  addChoiceMessage("Waarom wil je dit toch melden?", [
    {
      label: "Het probleem komt vaker terug",
      secondary: true,
      onClick: () => handleResolvedReportReason("Het probleem komt vaker terug")
    },
    {
      label: "Mogelijk meerdere gebruikers hebben hier last van",
      secondary: true,
      onClick: () => handleResolvedReportReason("Mogelijk meerdere gebruikers hebben hier last van")
    },
    {
      label: "Ik wil dat ICT dit controleert",
      secondary: true,
      onClick: () => handleResolvedReportReason("Ik wil dat ICT dit controleert")
    },
    {
      label: "Anders",
      secondary: true,
      onClick: () => handleResolvedReportReason("Anders")
    }
  ]);
}

function handleResolvedReportReason(reason) {
  state.resolvedButReport = true;
  state.resolvedReportReason = reason;
  state.answers.push(`Waarom toch melden? ${reason}`);
  askCanStillWork();
}

function askCanStillWork() {
  state.priorityPhase = "askCanWork";
  addChoiceMessage("Kun je nog werken?", [
    {
      label: "Ja",
      secondary: true,
      onClick: () => handleCanStillWork("yes")
    },
    {
      label: "Beperkt",
      secondary: true,
      onClick: () => handleCanStillWork("limited")
    },
    {
      label: "Nee",
      onClick: () => handleCanStillWork("no")
    }
  ]);
}

function handleCanStillWork(canWork) {
  if (state.ticketCreated || state.priorityPhase !== "askCanWork") return;

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
  if (state.ticketCreated || state.priority || state.priorityPhase !== "askAffectedUsers") return;

  state.affectedUsers = affectedUsers;
  state.priorityPhase = "none";
  if (!hasPriorityInputs()) {
    addMessage("agent", "Ik mis nog een antwoord voor impact en urgentie. Daarom maak ik nog geen ticket aan.");
    return;
  }

  determinePriority();
  addPriorityBadgeMessage();
  addAdditionalInfoMessage();
}

function determinePriority() {
  if (!hasPriorityInputs()) return;

  const matrix = {
    yes: {
      single: "P3",
      multiple: "P2",
      many: "P2"
    },
    limited: {
      single: "P2",
      multiple: "P2",
      many: "P1"
    },
    no: {
      single: "P2",
      multiple: "P1",
      many: "P1"
    }
  };

  const priorityLevel = matrix[state.canStillWork][state.affectedUsers];
  const labels = {
    P1: "Kritiek",
    P2: "Hoog",
    P3: "Normaal"
  };

  state.impact = getImpactFromAffectedUsers(state.affectedUsers);
  state.urgency = getUrgencyFromWorkStatus(state.canStillWork);
  state.priority = { level: priorityLevel, label: labels[priorityLevel] };
  state.priorityReason = `Prioriteit ${priorityLevel} omdat ${getWorkReason(state.canStillWork)} en ${getAffectedUsersReason(state.affectedUsers)}.`;
}

function hasPriorityInputs() {
  return Boolean(state.canStillWork && state.affectedUsers);
}

function createTicket() {
  if (state.ticketCreated) return;

  if (!state.activeManual) {
    addMessage("system", "Er is nog geen herkend probleem om een ticket van te maken.");
    return;
  }

  if (!hasPriorityInputs()) {
    addMessage("agent", "Ik moet eerst weten of je nog kunt werken en hoeveel gebruikers last hebben. Daarna kan ik de prioriteit bepalen en het ticket maken.");
    if (state.priorityPhase === "none") {
      askCanStillWork();
    }
    return;
  }

  if (!state.priority) {
    determinePriority();
  }

  if (!state.priority) {
    addMessage("agent", "De prioriteit kon nog niet worden bepaald. Ik maak daarom nog geen ticket aan.");
    return;
  }

  if (!state.additionalInfoAsked) {
    addAdditionalInfoMessage();
    return;
  }

  const manual = state.selectedProblem || state.activeManual;
  state.activeManual = manual;
  const description = buildCompactTicketDescription(manual);

  currentTicketJson = {
    ticketNumber: generateTicketNumber(),
    titleBase: manual.subCategory || formatProblemName(manual),
    title: `${manual.subCategory || formatProblemName(manual)} - niet opgelost`,
    melder: "Testgebruiker",
    category: manual.categoryPath || manual.category,
    hoofdCategorie: manual.mainCategory || state.selectedMainCategory || "Niet ingevuld",
    subCategorie: manual.subCategory || state.selectedSubCategory || formatProblemName(manual),
    categoriePad: manual.categoryPath || state.selectedCategoryPath || manual.category,
    impact: state.impact,
    urgency: state.urgency,
    priority: state.priority ? `${state.priority.level} ${state.priority.label}` : "Nog niet bepaald",
    description,
    source: manual.source,
    answers: [...state.answers],
    answerDetails: buildAnswerDetails(manual),
    stepsAlreadyTried: [...state.selectedPreviousSteps],
    proposedSteps: [...manual.steps],
    canStillWork: formatWorkStatus(),
    affectedUsers: formatAffectedUsers(),
    priorityReason: state.priorityReason,
    additionalInfo: state.additionalInfo,
    resolvedButReport: state.resolvedButReport,
    resolvedReportReason: state.resolvedReportReason,
    status: "Nieuw",
    behandelaar: "Nog niet toegewezen",
    sla: getSlaIndicator(state.priority),
    resolvedAt: null,
    createdAt: new Date().toISOString()
  };

  ticketFields.problem.textContent = formatProblemName(manual);
  ticketFields.status.textContent = "Niet opgelost met de voorgestelde stappen";
  ticketFields.priority.innerHTML = "";
  ticketFields.priority.appendChild(createPriorityBadge());
  ticketFields.nextStep.textContent = "De servicedesk onderzoekt de melding";
  ticketFields.source.textContent = formatFriendlySource(manual.source);

  ticketStatus.textContent = "Voorbereid";
  ticketEmpty.classList.add("hidden");
  ticketCard.classList.remove("hidden");
  addMessage(
    "agent",
    `Je melding is voorbereid.\n\nPrioriteit: ${currentTicketJson.priority}\nVolgende stap: de servicedesk onderzoekt de melding.\n\nJe kunt rechts de samenvatting bekijken of het ICT-ticket openen.`
  );
  state.ticketCreated = true;
  lockCompletedConversation();
}

function buildCompactTicketDescription(manual) {
  const triedSummary = state.selectedPreviousSteps.length
    ? `${state.selectedPreviousSteps.length} voorgestelde stap(pen) al geprobeerd`
    : manual.isGeneric
      ? "algemene intake uitgevoerd"
      : "geen voorgestelde stappen als eerder geprobeerd geselecteerd";

  const summaryLines = [
    `${manual.subCategory || formatProblemName(manual)} is niet opgelost tijdens de intake.`,
    `${getWorkStatusSentence()} Getroffen gebruikers: ${formatAffectedUsers().toLowerCase()}.`,
    `Classificatie: ${state.priority ? `${state.priority.level} ${state.priority.label}` : "nog niet bepaald"} (${state.impact}, ${state.urgency}).`,
    `Eerdere acties: ${triedSummary}.`,
    "Servicedeskactie nodig om oorzaak te onderzoeken en vervolgstap te bepalen."
  ];

  if (state.resolvedButReport) {
    summaryLines[0] = `${manual.subCategory || formatProblemName(manual)} is opgelost via de voorgestelde stappen, maar de gebruiker wil dit toch melden.`;
    summaryLines.splice(1, 0, `Reden melding: ${state.resolvedReportReason}.`);
  }

  return summaryLines.join("\n");
}

function generateTicketNumber() {
  const year = new Date().getFullYear();
  const storageKey = `ict-support-ticket-counter-${year}`;
  const currentValue = Number(localStorage.getItem(storageKey) || "0") + 1;
  localStorage.setItem(storageKey, String(currentValue));
  return `INC-${year}-${String(currentValue).padStart(4, "0")}`;
}

function getSlaIndicator(priority) {
  const level = priority?.level || "P3";
  if (level === "P1") {
    return { label: "SLA overschreden", level: "sla-red" };
  }
  if (level === "P2") {
    return { label: "Nog minder dan 2 uur", level: "sla-orange" };
  }
  return { label: "Binnen SLA", level: "sla-green" };
}

function buildAnswerDetails(manual) {
  return state.answers.map((answer) => {
    if (answer.startsWith("Eerste melding:")) {
      return {
        question: "Probleemmelding",
        answer: answer.replace("Eerste melding:", "").trim()
      };
    }

    if (answer.startsWith("Waarom toch melden?")) {
      return {
        question: "Waarom toch melden",
        answer: answer.replace("Waarom toch melden?", "").trim()
      };
    }

    const matchedQuestion = manual.questions.find((question) => answer.startsWith(question));
    if (matchedQuestion) {
      return {
        question: getAnswerFieldLabel(manual, matchedQuestion),
        answer: answer.slice(matchedQuestion.length).trim()
      };
    }

    return {
      question: "Aanvullende informatie",
      answer
    };
  });
}

function getAnswerFieldLabel(manual, question) {
  const questionIndex = manual.questions.indexOf(question);
  const labelsByManual = {
    vpn: ["Werkplek", "Foutmelding", "VPN-client opnieuw gestart"],
    printer: ["Printer", "Foutmelding", "Collega's kunnen printen"],
    password: ["Accounttype", "MFA beschikbaar", "Account geblokkeerd"],
    "slow-laptop": ["Sinds wanneer", "Waar traag", "Laptop opnieuw gestart"],
    "teams-audio": ["Audioprobleem", "Audioapparaat", "Audio buiten Teams"]
  };

  return labelsByManual[manual.id]?.[questionIndex] || question.replace(/\?$/, "");
}

function formatProblemName(manual) {
  return manual.name.replace("Handleiding ", "");
}

function formatFriendlySource(source) {
  return source.split(",")[0];
}

function lockCompletedConversation() {
  setConversationLocked(true);
  document.querySelectorAll(".menu-card, .back-button").forEach((button) => {
    button.disabled = true;
  });
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
  sendButton.textContent = isLocked ? "Melding voorbereid" : "Volgende";
  inputEl.placeholder = isLocked ? "Melding voorbereid" : "Beschrijf je ICT-probleem...";
  resetButton.classList.toggle("primary-reset", isLocked);
}

function formatAffectedUsers() {
  if (state.affectedUsers === "single") return "Alleen de melder";
  if (state.affectedUsers === "multiple") return "Meerdere gebruikers";
  if (state.affectedUsers === "many") return "Hele afdeling of organisatie";
  return "Niet ingevuld";
}

function formatWorkStatus() {
  if (state.canStillWork === "yes") return "Ja";
  if (state.canStillWork === "limited") return "Beperkt";
  if (state.canStillWork === "no") return "Nee";
  return "Niet ingevuld";
}

function getWorkStatusSentence() {
  if (state.canStillWork === "yes") return "De melder kan normaal werken.";
  if (state.canStillWork === "limited") return "De melder kan beperkt werken.";
  if (state.canStillWork === "no") return "De melder kan niet werken.";
  return "Werkstatus is niet ingevuld.";
}

function getImpactFromAffectedUsers(affectedUsers) {
  if (affectedUsers === "single") return "Individuele gebruiker";
  if (affectedUsers === "multiple") return "Meerdere gebruikers";
  return "Hele afdeling of organisatie";
}

function getUrgencyFromWorkStatus(canStillWork) {
  if (canStillWork === "yes") return "Normaal";
  if (canStillWork === "limited") return "Hoog";
  return "Kritiek";
}

function getWorkReason(canStillWork) {
  if (canStillWork === "yes") return "de gebruiker nog kan werken";
  if (canStillWork === "limited") return "de gebruiker beperkt kan werken";
  return "de gebruiker niet kan werken";
}

function getAffectedUsersReason(affectedUsers) {
  if (affectedUsers === "single") return "alleen de melder getroffen is";
  if (affectedUsers === "multiple") return "meerdere gebruikers getroffen zijn";
  return "een hele afdeling of organisatie getroffen is";
}

function createPriorityBadge() {
  const badge = document.createElement("span");
  const priority = state.priority || { level: "P3", label: "Normaal" };
  badge.className = `priority-badge ${priority.level.toLowerCase()}`;
  badge.textContent = `${priority.level} ${priority.label}`;
  return badge;
}

function viewConceptTicket() {
  if (!currentTicketJson) return;

  const ticketWindow = window.open("", "_blank");
  if (!ticketWindow) {
    addMessage("system", "De browser heeft het openen van een nieuwe tab geblokkeerd. Sta pop-ups toe om het ICT-ticket te bekijken.");
    return;
  }

  ticketWindow.document.write(buildTicketViewHtml(currentTicketJson));
  ticketWindow.document.close();
}

function buildTicketViewHtml(ticket) {
  const priorityLevel = ticket.priority.split(" ")[0].toLowerCase();
  const titleBase = ticket.titleBase || ticket.subCategorie || ticket.title.replace(/ - (niet opgelost|opgelost)$/i, "");
  const ticketState = {
    titleBase,
    status: ticket.status || "Nieuw",
    behandelaar: ticket.behandelaar || "Nog niet toegewezen",
    resolvedAt: ticket.resolvedAt || null
  };
  const ticketStateJson = JSON.stringify(ticketState).replaceAll("<", "\\u003c");
  const ticketStateKey = `ict-support-ticket:${ticket.createdAt}:${titleBase}`;
  const answerDetails = ticket.answerDetails && ticket.answerDetails.length
    ? ticket.answerDetails.map((item) => `
            <div class="qa-row">
              <div class="qa-label">${escapeHtml(item.question)}</div>
              <div class="qa-value">${escapeHtml(item.answer || "Niet ingevuld")}</div>
            </div>`).join("")
    : `<div class="qa-row"><div class="qa-label">Status</div><div class="qa-value">Geen antwoorden vastgelegd.</div></div>`;
  const triedSteps = ticket.stepsAlreadyTried.length ? ticket.stepsAlreadyTried.map((step) => `<li>${escapeHtml(step)}</li>`).join("") : "<li>Geen stappen geselecteerd als eerder geprobeerd.</li>";
  const proposedSteps = ticket.proposedSteps.length ? ticket.proposedSteps.map((step) => `<li>${escapeHtml(step)}</li>`).join("") : "<li>Geen oplossingsstappen beschikbaar.</li>";
  const triedMatchesProposed = arraysMatch(ticket.stepsAlreadyTried, ticket.proposedSteps);
  const additionalInfoSection = ticket.additionalInfo ? `
        <section class="card">
          <div class="card-header">
            <h2>Aanvullende informatie gebruiker</h2>
          </div>
          <div class="content">
            ${escapeHtml(ticket.additionalInfo)}
          </div>
        </section>` : "";
  const proposedStepsSection = triedMatchesProposed ? "" : `
        <section class="card">
          <div class="card-header">
            <h2>Voorgestelde stappen</h2>
          </div>
          <div class="content">
            <ul>${proposedSteps}</ul>
          </div>
        </section>`;

  return `<!doctype html>
<html lang="nl">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>TOPdesk conceptticket</title>
    <style>
      :root {
        --bg: #f4f6f8;
        --panel: #ffffff;
        --line: #d7dde5;
        --text: #1f2933;
        --muted: #667085;
        --blue: #2563eb;
        --p1: #c50f1f;
        --p2: #f7630c;
        --p3: #107c10;
      }

      * { box-sizing: border-box; }

      body {
        margin: 0;
        background: var(--bg);
        color: var(--text);
        font-family: "Segoe UI", Arial, sans-serif;
      }

      .topbar {
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 16px;
        border-bottom: 1px solid var(--line);
        background: #ffffff;
        padding: 14px 24px;
      }

      .ticket-actions-bar {
        display: flex;
        flex-wrap: wrap;
        gap: 10px;
        border-bottom: 1px solid var(--line);
        background: #ffffff;
        padding: 12px 24px;
      }

      .ticket-actions-bar button {
        min-height: 34px;
        border: 1px solid var(--blue);
        border-radius: 6px;
        background: var(--blue);
        color: #fff;
        cursor: pointer;
        font-weight: 700;
        padding: 7px 12px;
      }

      .ticket-actions-bar button.secondary {
        border-color: var(--line);
        background: #fff;
        color: var(--text);
      }

      .internal-comment-box {
        display: grid;
        gap: 8px;
        position: relative;
      }

      .internal-comment-box textarea {
        width: 100%;
        min-height: 82px;
        border: 1px solid var(--line);
        border-radius: 8px;
        font: inherit;
        padding: 10px;
        resize: vertical;
      }

      .mention-suggestions {
        display: none;
        position: absolute;
        right: 0;
        bottom: 46px;
        left: 0;
        z-index: 2;
        border: 1px solid var(--line);
        border-radius: 8px;
        background: #fff;
        box-shadow: 0 8px 22px rgba(31, 41, 51, 0.12);
        overflow: hidden;
      }

      .mention-suggestions button {
        display: block;
        width: 100%;
        border: 0;
        border-bottom: 1px solid var(--line);
        background: #fff;
        color: var(--text);
        cursor: pointer;
        font: inherit;
        padding: 8px 10px;
        text-align: left;
      }

      .mention-suggestions button:last-child {
        border-bottom: 0;
      }

      .mention-suggestions button:hover {
        background: #f4f6f8;
      }

      .comment-list {
        display: grid;
        gap: 8px;
        margin-top: 12px;
      }

      .comment-item {
        border: 1px solid var(--line);
        border-radius: 8px;
        background: #fafafa;
        padding: 10px;
      }

      .comment-meta {
        color: var(--muted);
        font-size: 12px;
        font-weight: 700;
        margin-bottom: 5px;
      }

      .mention {
        border-radius: 999px;
        background: #e8f0fe;
        color: #174ea6;
        font-weight: 800;
        padding: 1px 6px;
      }

      .brand {
        display: flex;
        align-items: center;
        gap: 12px;
        font-weight: 800;
      }

      .mark {
        display: grid;
        place-items: center;
        width: 36px;
        height: 36px;
        border-radius: 8px;
        background: var(--blue);
        color: #fff;
      }

      .layout {
        display: grid;
        grid-template-columns: minmax(0, 0.66fr) minmax(430px, 0.34fr);
        gap: 18px;
        padding: 20px 24px;
      }

      .main-ticket-card {
        grid-column: 1;
        grid-row: 1;
      }

      .side-panel {
        grid-column: 2;
        grid-row: 1 / span 2;
      }

      .comments-card {
        grid-column: 1;
        grid-row: 2;
      }

      .card {
        border: 1px solid var(--line);
        border-radius: 10px;
        background: var(--panel);
        box-shadow: 0 8px 22px rgba(31, 41, 51, 0.08);
        overflow: hidden;
      }

      .embedded-card {
        box-shadow: none;
      }

      .card-header {
        border-bottom: 1px solid var(--line);
        padding: 13px 16px;
      }

      h1, h2 {
        margin: 0;
        letter-spacing: 0;
      }

      h1 { font-size: 24px; }
      h2 { font-size: 17px; }

      .meta {
        color: var(--muted);
        margin-top: 6px;
      }

      .content {
        padding: 14px 16px;
      }

      .grid {
        display: grid;
        grid-template-columns: repeat(2, minmax(0, 1fr));
        gap: 10px;
      }

      .field {
        border: 1px solid var(--line);
        border-radius: 8px;
        background: #fafafa;
        padding: 10px;
      }

      .label {
        color: var(--muted);
        font-size: 12px;
        font-weight: 700;
        text-transform: uppercase;
      }

      .value {
        margin-top: 5px;
        line-height: 1.45;
        white-space: pre-wrap;
      }

      .badge {
        display: inline-flex;
        align-items: center;
        min-height: 30px;
        border-radius: 999px;
        color: #fff;
        font-weight: 800;
        padding: 6px 12px;
      }

      .badge.p1 { background: var(--p1); }
      .badge.p2 { background: var(--p2); }
      .badge.p3 { background: var(--p3); }

      .sla-badge {
        display: inline-flex;
        align-items: center;
        min-height: 28px;
        border-radius: 999px;
        font-weight: 800;
        padding: 5px 10px;
      }

      .sla-badge.sla-green {
        background: #e6f4ea;
        color: #137333;
      }

      .sla-badge.sla-orange {
        background: #fff4e5;
        color: #b45309;
      }

      .sla-badge.sla-red {
        background: #fce8e6;
        color: #c50f1f;
      }

      .status-badge {
        display: inline-flex;
        align-items: center;
        min-height: 28px;
        border-radius: 999px;
        background: #e8f0fe;
        color: #174ea6;
        font-weight: 800;
        padding: 5px 10px;
      }

      .status-badge.resolved {
        background: #e6f4ea;
        color: #137333;
      }

      ul {
        margin: 6px 0 0;
        padding-left: 18px;
      }

      li {
        margin: 3px 0;
        line-height: 1.35;
      }

      .qa-list {
        display: grid;
        gap: 7px;
      }

      .qa-row {
        display: grid;
        grid-template-columns: minmax(150px, 0.48fr) minmax(0, 0.52fr);
        gap: 10px;
        align-items: start;
        border-bottom: 1px solid #edf0f3;
        padding-bottom: 7px;
      }

      .qa-row:last-child {
        border-bottom: 0;
        padding-bottom: 0;
      }

      .qa-label {
        color: var(--muted);
        font-size: 14px;
        font-weight: 700;
      }

      .qa-value {
        font-size: 14px;
        line-height: 1.35;
        word-break: break-word;
      }

      .additional-info-field {
        display: grid;
        gap: 6px;
        margin-top: 14px;
      }

      .additional-info-field textarea {
        width: 100%;
        resize: vertical;
      }

      .character-counter {
        color: var(--muted);
        font-size: 12px;
        text-align: right;
      }

      .stack {
        display: grid;
        gap: 10px;
      }

      @media (max-width: 900px) {
        .layout {
          grid-template-columns: 1fr;
          padding: 14px;
        }

        .main-ticket-card,
        .side-panel,
        .comments-card {
          grid-column: 1;
          grid-row: auto;
        }

        .grid {
          grid-template-columns: 1fr;
        }
      }

      @media (max-width: 768px) {
        body {
          min-width: 0;
          font-size: 15px;
        }

        .topbar {
          align-items: flex-start;
          flex-direction: column;
          padding: 12px 14px;
        }

        .ticket-actions-bar {
          gap: 8px;
          padding: 10px 14px;
        }

        .ticket-actions-bar button {
          flex: 1 1 180px;
          min-width: 0;
          font-size: 14px;
        }

        .layout {
          gap: 12px;
          padding: 12px;
          width: 100%;
          overflow-x: hidden;
        }

        .card {
          width: 100%;
        }

        .content,
        .card-header {
          padding: 12px;
        }

        h1 {
          font-size: 20px;
          line-height: 1.25;
          overflow-wrap: anywhere;
        }

        h2 {
          font-size: 16px;
        }

        .field {
          padding: 9px;
        }

        .value,
        .qa-label,
        .qa-value,
        li,
        .comment-item,
        .internal-comment-box textarea {
          font-size: 15px;
        }

        .qa-row {
          grid-template-columns: 1fr;
          gap: 4px;
        }
      }
    </style>
  </head>
  <body>
    <header class="topbar">
      <div class="brand">
        <span class="mark">TD</span>
        <span>TOPdesk conceptticket</span>
      </div>
      <span class="badge ${priorityLevel}">${escapeHtml(ticket.priority)}</span>
    </header>

    <div class="ticket-actions-bar">
      <button id="claimTicketButton" type="button">In behandeling nemen</button>
      <button id="assignTicketButton" class="secondary" type="button">Toewijzen aan mij</button>
      <button id="releaseTicketButton" class="secondary" type="button">Vrijgeven</button>
      <button id="resolveTicketButton" class="secondary" type="button">Markeer als opgelost</button>
    </div>

    <main class="layout">
      <section class="card main-ticket-card">
        <div class="card-header">
          <div class="meta">${escapeHtml(ticket.ticketNumber)}</div>
          <h1 id="ticketTitleHeading">${escapeHtml(formatTicketTitle(titleBase, ticketState.status))}</h1>
          <div class="meta">Servicedesk-ticket voor ICT-behandeling</div>
        </div>
        <div class="content stack">
          <div class="grid">
            <div class="field">
              <div class="label">Ticketnummer</div>
              <div class="value">${escapeHtml(ticket.ticketNumber)}</div>
            </div>
            <div class="field">
              <div class="label">Melder</div>
              <div class="value">${escapeHtml(ticket.melder)}</div>
            </div>
            <div class="field">
              <div class="label">Status</div>
              <div class="value"><span class="status-badge" id="ticketStatusValue">${escapeHtml(ticketState.status)}</span></div>
            </div>
            <div class="field">
              <div class="label">Behandelaar</div>
              <div class="value" id="ticketAssigneeValue">${escapeHtml(ticketState.behandelaar)}</div>
            </div>
            <div class="field">
              <div class="label">Prioriteit</div>
              <div class="value"><span class="badge ${priorityLevel}">${escapeHtml(ticket.priority)}</span></div>
            </div>
            <div class="field">
              <div class="label">SLA</div>
              <div class="value"><span class="sla-badge ${ticketState.status === "Opgelost" ? "sla-green" : escapeHtml(ticket.sla.level)}" id="ticketSlaValue">${escapeHtml(ticketState.status === "Opgelost" ? "SLA afgerond" : ticket.sla.label)}</span></div>
            </div>
            <div class="field">
              <div class="label">Aangemaakt op</div>
              <div class="value">${escapeHtml(formatTicketDate(ticket.createdAt))}</div>
            </div>
            <div class="field ${ticketState.resolvedAt ? "" : "hidden"}" id="resolvedAtField">
              <div class="label">Opgelost op</div>
              <div class="value" id="resolvedAtValue">${ticketState.resolvedAt ? escapeHtml(ticketState.resolvedAt) : ""}</div>
            </div>
            <div class="field">
              <div class="label">Hoofdcategorie</div>
              <div class="value">${escapeHtml(ticket.hoofdCategorie)}</div>
            </div>
            <div class="field">
              <div class="label">Subcategorie</div>
              <div class="value">${escapeHtml(ticket.subCategorie)}</div>
            </div>
            <div class="field">
              <div class="label">Categoriepad</div>
              <div class="value">${escapeHtml(ticket.categoriePad)}</div>
            </div>
            <div class="field">
              <div class="label">Impact</div>
              <div class="value">${escapeHtml(ticket.impact)}</div>
            </div>
            <div class="field">
              <div class="label">Urgentie</div>
              <div class="value">${escapeHtml(ticket.urgency)}</div>
            </div>
          </div>

          <div class="field">
            <div class="label">Reden van classificatie</div>
            <div class="value">${escapeHtml(ticket.priorityReason)}</div>
          </div>

          <div class="field">
            <div class="label">Managementsamenvatting</div>
            <div class="value">${escapeHtml(ticket.description)}</div>
          </div>
        </div>
      </section>

      <aside class="stack side-panel">
        <section class="card">
          <div class="card-header">
            <h2>Classificatie</h2>
          </div>
          <div class="content stack">
            <div class="field">
              <div class="label">Kan nog werken</div>
              <div class="value">${escapeHtml(ticket.canStillWork)}</div>
            </div>
            <div class="field">
              <div class="label">Getroffen gebruikers</div>
              <div class="value">${escapeHtml(ticket.affectedUsers)}</div>
            </div>
            <div class="field">
              <div class="label">Reden</div>
              <div class="value">${escapeHtml(ticket.priorityReason)}</div>
            </div>
          </div>
        </section>

        <section class="card">
          <div class="card-header">
            <h2>Verzamelde antwoorden</h2>
          </div>
          <div class="content qa-list">
            ${answerDetails}
          </div>
        </section>

        ${additionalInfoSection}

        <section class="card">
          <div class="card-header">
            <h2>AI geprobeerd</h2>
          </div>
          <div class="content">
            <ul>${triedSteps}</ul>
          </div>
        </section>

        ${proposedStepsSection}

        <section class="card">
          <div class="card-header">
            <h2>Bron</h2>
          </div>
          <div class="content">
            ${escapeHtml(ticket.source)}
          </div>
        </section>

      </aside>

      <section class="card comments-card">
        <div class="card-header">
          <h2>Opmerkingen / Reacties</h2>
        </div>
        <div class="content">
          <div class="internal-comment-box">
            <textarea id="internalCommentInput" placeholder="Voeg een interne opmerking of reactie toe..."></textarea>
            <div class="mention-suggestions" id="mentionSuggestions"></div>
            <button id="addInternalCommentButton" type="button">Reactie toevoegen</button>
          </div>
          <div class="comment-list" id="internalCommentList"></div>
        </div>
      </section>
    </main>
    <script>
      const claimButton = document.querySelector("#claimTicketButton");
      const assignButton = document.querySelector("#assignTicketButton");
      const releaseButton = document.querySelector("#releaseTicketButton");
      const resolveButton = document.querySelector("#resolveTicketButton");
      const statusValue = document.querySelector("#ticketStatusValue");
      const assigneeValue = document.querySelector("#ticketAssigneeValue");
      const resolvedAtField = document.querySelector("#resolvedAtField");
      const resolvedAtValue = document.querySelector("#resolvedAtValue");
      const ticketTitleHeading = document.querySelector("#ticketTitleHeading");
      const ticketSlaValue = document.querySelector("#ticketSlaValue");
      const ticketStateKey = ${JSON.stringify(ticketStateKey)};
      const ticketState = loadTicketState();
      const internalCommentInput = document.querySelector("#internalCommentInput");
      const addInternalCommentButton = document.querySelector("#addInternalCommentButton");
      const internalCommentList = document.querySelector("#internalCommentList");
      const mentionSuggestions = document.querySelector("#mentionSuggestions");
      const mentionOptions = ["@Jan", "@Fatima", "@Peter", "@Beheerteam"];

      function formatNow() {
        return new Intl.DateTimeFormat("nl-NL", {
          dateStyle: "medium",
          timeStyle: "short"
        }).format(new Date());
      }

      function loadTicketState() {
        const fallback = ${ticketStateJson};
        try {
          return { ...fallback, ...JSON.parse(localStorage.getItem(ticketStateKey) || "{}") };
        } catch {
          return fallback;
        }
      }

      function saveTicketState() {
        localStorage.setItem(ticketStateKey, JSON.stringify(ticketState));
      }

      function getTitleForStatus(status) {
        return ticketState.titleBase + (status === "Opgelost" ? " - opgelost" : " - niet opgelost");
      }

      function renderTicketState() {
        statusValue.textContent = ticketState.status;
        statusValue.classList.toggle("resolved", ticketState.status === "Opgelost");
        assigneeValue.textContent = ticketState.behandelaar;
        ticketTitleHeading.textContent = getTitleForStatus(ticketState.status);
        resolvedAtValue.textContent = ticketState.resolvedAt || "";
        resolvedAtField.classList.toggle("hidden", !ticketState.resolvedAt);
        if (ticketState.status === "Opgelost") {
          ticketSlaValue.textContent = "SLA afgerond";
          ticketSlaValue.className = "sla-badge sla-green";
        } else {
          ticketSlaValue.textContent = ${JSON.stringify(ticket.sla.label)};
          ticketSlaValue.className = ${JSON.stringify(`sla-badge ${ticket.sla.level}`)};
        }
      }

      function escapeCommentHtml(value) {
        return value
          .replaceAll("&", "&amp;")
          .replaceAll("<", "&lt;")
          .replaceAll(">", "&gt;")
          .replaceAll('"', "&quot;")
          .replaceAll("'", "&#039;");
      }

      function renderMentions(value) {
        return escapeCommentHtml(value).replace(/@(Jan|Fatima|Peter|Beheerteam)\\b/g, '<span class="mention">@$1</span>');
      }

      function showMentionSuggestions() {
        mentionSuggestions.innerHTML = "";
        mentionOptions.forEach((mention) => {
          const button = document.createElement("button");
          button.type = "button";
          button.textContent = mention;
          button.addEventListener("click", () => {
            const value = internalCommentInput.value;
            const atIndex = value.lastIndexOf("@");
            internalCommentInput.value = atIndex >= 0 ? value.slice(0, atIndex) + mention + " " : value + mention + " ";
            mentionSuggestions.style.display = "none";
            internalCommentInput.focus();
          });
          mentionSuggestions.appendChild(button);
        });
        mentionSuggestions.style.display = "block";
      }

      internalCommentInput.addEventListener("input", () => {
        const value = internalCommentInput.value;
        const atIndex = value.lastIndexOf("@");
        const afterAt = atIndex >= 0 ? value.slice(atIndex + 1) : "";
        if (atIndex >= 0 && !afterAt.includes(" ") && afterAt.length <= 12) {
          showMentionSuggestions();
        } else {
          mentionSuggestions.style.display = "none";
        }
      });

      addInternalCommentButton.addEventListener("click", () => {
        const text = internalCommentInput.value.trim();
        if (!text) return;

        const comment = document.createElement("div");
        comment.className = "comment-item";
        comment.innerHTML = '<div class="comment-meta">ICT medewerker · ' + escapeCommentHtml(formatNow()) + '</div><div>' + renderMentions(text) + '</div>';
        internalCommentList.prepend(comment);
        internalCommentInput.value = "";
        mentionSuggestions.style.display = "none";
      });

      claimButton.addEventListener("click", () => {
        ticketState.status = "In behandeling";
        ticketState.behandelaar = "ICT medewerker";
        ticketState.resolvedAt = null;
        saveTicketState();
        renderTicketState();
      });

      assignButton.addEventListener("click", () => {
        ticketState.behandelaar = "ICT medewerker";
        saveTicketState();
        renderTicketState();
      });

      releaseButton.addEventListener("click", () => {
        ticketState.behandelaar = "Nog niet toegewezen";
        saveTicketState();
        renderTicketState();
      });

      resolveButton.addEventListener("click", () => {
        ticketState.status = "Opgelost";
        ticketState.behandelaar = ticketState.behandelaar === "Nog niet toegewezen" ? "ICT medewerker" : ticketState.behandelaar;
        ticketState.resolvedAt = formatNow();
        saveTicketState();
        renderTicketState();
      });

      renderTicketState();
    </script>
  </body>
</html>`;
}

function arraysMatch(first, second) {
  if (!Array.isArray(first) || !Array.isArray(second)) return false;
  if (first.length !== second.length || first.length === 0) return false;
  return first.every((item, index) => item === second[index]);
}

function formatTicketDate(value) {
  return new Intl.DateTimeFormat("nl-NL", {
    dateStyle: "medium",
    timeStyle: "short"
  }).format(new Date(value));
}

function formatTicketTitle(titleBase, status) {
  return `${titleBase} - ${status === "Opgelost" ? "opgelost" : "niet opgelost"}`;
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
    const manual = recognizeProblem(button.dataset.example);

    if (state.ticketCreated) return;

    if (state.selectedProblem) {
      if (manual && manual.id === state.selectedProblem.id && canCancelSelectedProblem()) {
        resetConversation();
      }
      return;
    }

    inputEl.value = button.dataset.example;
    formEl.requestSubmit();
  });
});

resetButton.addEventListener("click", resetConversation);
viewTicketButton.addEventListener("click", viewConceptTicket);
backToMainButton.addEventListener("click", () => {
  if (state.ticketCreated || state.intakeStarted || state.selectedProblem) return;
  state.selectedMainCategory = null;
  resetProblemMenu();
});

resetConversation();
