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
  priorityReason: "Nog niet bepaald",
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
  state.ticketCreated = false;
  currentTicketJson = null;
  messagesEl.innerHTML = "";
  clearTicket();
  setConversationLocked(false);
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
    "Is het probleem opgelost? Antwoord met 'ja' als het opgelost is of 'nee' als ik je melding moet voorbereiden.",
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
      onClick: () => addMessage("agent", "Fijn, dan is er geen TOPdesk-ticket nodig.")
    },
    {
      label: "Nee, melding voorbereiden",
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
  createTicket();
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

  const manual = state.activeManual;
  const description = buildCompactTicketDescription(manual);

  currentTicketJson = {
    title: `${manual.name} - niet opgelost`,
    category: manual.category,
    impact: state.impact,
    urgency: state.urgency,
    priority: state.priority ? `${state.priority.level} ${state.priority.label}` : "Nog niet bepaald",
    description,
    source: manual.source,
    answers: [...state.answers],
    stepsAlreadyTried: [...state.selectedPreviousSteps],
    proposedSteps: [...manual.steps],
    canStillWork: formatWorkStatus(),
    affectedUsers: formatAffectedUsers(),
    priorityReason: state.priorityReason,
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
    : "geen voorgestelde stappen als eerder geprobeerd geselecteerd";

  return [
    `${manual.name} is niet opgelost tijdens de intake.`,
    `De melder kan ${formatWorkStatus().toLowerCase()} werken; getroffen gebruikers: ${formatAffectedUsers().toLowerCase()}.`,
    `Classificatie: ${state.priority ? `${state.priority.level} ${state.priority.label}` : "nog niet bepaald"} (${state.impact}, ${state.urgency}).`,
    `Eerdere acties: ${triedSummary}.`,
    "Servicedeskactie nodig om oorzaak te onderzoeken en vervolgstap te bepalen."
  ].join("\n");
}

function formatProblemName(manual) {
  return manual.name.replace("Handleiding ", "");
}

function formatFriendlySource(source) {
  return source.split(",")[0];
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
  const answers = ticket.answers.length ? ticket.answers.map((answer) => `<li>${escapeHtml(answer)}</li>`).join("") : "<li>Geen antwoorden vastgelegd.</li>";
  const triedSteps = ticket.stepsAlreadyTried.length ? ticket.stepsAlreadyTried.map((step) => `<li>${escapeHtml(step)}</li>`).join("") : "<li>Geen stappen geselecteerd als eerder geprobeerd.</li>";
  const proposedSteps = ticket.proposedSteps.length ? ticket.proposedSteps.map((step) => `<li>${escapeHtml(step)}</li>`).join("") : "<li>Geen oplossingsstappen beschikbaar.</li>";

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
        grid-template-columns: minmax(0, 1fr) 340px;
        gap: 22px;
        padding: 24px;
      }

      .card {
        border: 1px solid var(--line);
        border-radius: 10px;
        background: var(--panel);
        box-shadow: 0 8px 22px rgba(31, 41, 51, 0.08);
        overflow: hidden;
      }

      .card-header {
        border-bottom: 1px solid var(--line);
        padding: 18px 20px;
      }

      h1, h2 {
        margin: 0;
        letter-spacing: 0;
      }

      h1 { font-size: 24px; }
      h2 { font-size: 18px; }

      .meta {
        color: var(--muted);
        margin-top: 6px;
      }

      .content {
        padding: 20px;
      }

      .grid {
        display: grid;
        grid-template-columns: repeat(2, minmax(0, 1fr));
        gap: 14px;
      }

      .field {
        border: 1px solid var(--line);
        border-radius: 8px;
        background: #fafafa;
        padding: 12px;
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

      ul {
        margin: 10px 0 0;
        padding-left: 20px;
      }

      li {
        margin: 6px 0;
      }

      .stack {
        display: grid;
        gap: 16px;
      }

      @media (max-width: 900px) {
        .layout {
          grid-template-columns: 1fr;
          padding: 14px;
        }

        .grid {
          grid-template-columns: 1fr;
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

    <main class="layout">
      <section class="card">
        <div class="card-header">
          <h1>${escapeHtml(ticket.title)}</h1>
          <div class="meta">Aangemaakt: ${escapeHtml(formatTicketDate(ticket.createdAt))}</div>
        </div>
        <div class="content stack">
          <div class="grid">
            <div class="field">
              <div class="label">Categorie</div>
              <div class="value">${escapeHtml(ticket.category)}</div>
            </div>
            <div class="field">
              <div class="label">Prioriteit</div>
              <div class="value"><span class="badge ${priorityLevel}">${escapeHtml(ticket.priority)}</span></div>
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

      <aside class="stack">
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
          <div class="content">
            <ul>${answers}</ul>
          </div>
        </section>

        <section class="card">
          <div class="card-header">
            <h2>Al geprobeerd</h2>
          </div>
          <div class="content">
            <ul>${triedSteps}</ul>
          </div>
        </section>

        <section class="card">
          <div class="card-header">
            <h2>Voorgestelde stappen</h2>
          </div>
          <div class="content">
            <ul>${proposedSteps}</ul>
          </div>
        </section>

        <section class="card">
          <div class="card-header">
            <h2>Bron</h2>
          </div>
          <div class="content">
            ${escapeHtml(ticket.source)}
          </div>
        </section>
      </aside>
    </main>
  </body>
</html>`;
}

function formatTicketDate(value) {
  return new Intl.DateTimeFormat("nl-NL", {
    dateStyle: "medium",
    timeStyle: "short"
  }).format(new Date(value));
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
viewTicketButton.addEventListener("click", viewConceptTicket);

resetConversation();
