
const foodData = {
  "apfel": 52, "banane": 89, "brot": 265, "reis": 130, "kartoffel": 77,
    "nudeln": 131, "haferflocken": 389, "butter": 717, "käse": 402, "milch": 64,
    "joghurt": 59, "quark": 68, "eier": 155, "huhn": 165, "rindfleisch": 250,
    "schweinefleisch": 242, "fisch": 206, "lachs": 208, "thunfisch": 132, "brotweizen": 270,
    "vollkornbrot": 247, "croissant": 406, "margarine": 717, "öl": 884, "olivenöl": 884,
    "zucker": 387, "honig": 304, "schokolade": 546, "keks": 502, "chips": 536,
    "popcorn": 387, "nüsse": 607, "mandeln": 579, "haselnüsse": 628, "erdnüsse": 567,
    "walnüsse": 654, "cashews": 553, "kokosnuss": 354, "ananas": 50, "mango": 60,
    "birne": 57, "trauben": 69, "erdbeeren": 32, "heidelbeeren": 57, "kirschen": 63,
    "pfirsich": 39, "pflaume": 46, "kiwi": 41, "melone": 34, "wassermelone": 30,
    "gurke": 16, "tomate": 18, "paprika": 20, "karotte": 41, "brokkoli": 34,
    "blumenkohl": 25, "spinat": 23, "salat": 14, "zwiebel": 40, "knoblauch": 149,
    "pilze": 22, "bohnen": 347, "linsen": 353, "erbsen": 81, "mais": 96,
    "zucchini": 17, "aubergine": 25, "spargel": 20, "avocado": 160, "süßkartoffel": 86,
    "rucola": 25, "feldsalat": 14, "radieschen": 16, "rote bete": 43, "kohlrabi": 27,
    "weißkohl": 25, "rotkohl": 31, "chinakohl": 13, "grünkohl": 49, "bratwurst": 297,
    "leberwurst": 326, "salami": 407, "schinken": 145, "bockwurst": 282, "frikadelle": 251,
    "pommes": 312, "pizza": 266, "burger": 295, "döner": 215, "falafel": 333,
    "hummus": 237, "curry": 110, "sushi": 143, "wrap": 232, "lasagne": 135,
    "auflauf": 172, "ketchup": 112, "mayonnaise": 680, "senf": 66, "sojasauce": 53,
    "cola": 42, "limonade": 44, "eistee": 30, "saft": 47, "wasser": 0,
    "bier": 43, "wein": 85, "kaffee": 2, "tee": 1, "kakao": 77,
    "müsli": 379, "cornflakes": 357, "toast": 265, "brötchen": 272, "baguette": 270,
    "pita": 275, "tortilla": 237, "pfannkuchen": 227, "waffel": 291, "kuchen": 390,
    "muffin": 377, "donut": 452, "eis": 207, "pudding": 130, "jelly": 60,
    "marmelade": 250, "nutella": 539, "ketchup-light": 55, "fruchtjoghurt": 105, "sojamilch": 54,
    "mandelmilch": 21, "hafermilch": 43, "kokosmilch": 230, "reisdrink": 48, "proteinshake": 120,
    "proteinriegel": 350, "energieriegel": 450, "isodrink": 26, "sportgel": 260, "milchreis": 120,
    "grießbrei": 115, "couscous": 112, "bulgur": 110, "quinoa": 120, "amaranth": 371,
    "gerste": 354, "dinkel": 335, "roggen": 338, "hirse": 356, "buchweizen": 343,
    "tofu": 76, "tempeh": 193, "seitan": 143, "vegane wurst": 230, "sojaschnetzel": 320,
    "vegane burger": 210, "algen": 43, "chiasamen": 486, "leinsamen": 534, "sonnenblumenkerne": 584,
    "kürbiskerne": 559, "hanfsamen": 553, "weintrauben": 69, "blaubeeren": 57, "grapefruit": 42,
    "orange": 47, "zitrone": 29, "limette": 30, "feige": 74, "dattel": 277,
    "rosinen": 299, "getrocknete aprikosen": 241, "getrocknete pflaumen": 240, "kichererbsen": 164, "edamame": 121,
    "sojabohnen": 446, "okraschoten": 33, "pak choi": 13, "wasabi": 292, "kimchi": 15, "müsli-schoko": 410, "müsli-frucht": 370, "haferflocken": 389,

    
};
function showSuggestions() {
  const input = document.getElementById("food");
  const suggestionsBox = document.getElementById("suggestions");
  const query = input.value.toLowerCase();

  suggestionsBox.innerHTML = "";

  if (!query || query.length < 1) return;

  const matches = Object.keys(foodData).filter(item =>
    item.toLowerCase().startsWith(query)
  ).slice(0, 6); // Zeige max. 6 Vorschläge

  matches.forEach(match => {
    const div = document.createElement("div");
    div.textContent = match;
    div.style.padding = "8px";
    div.style.cursor = "pointer";
    div.style.borderBottom = "1px solid #eee";

    div.addEventListener("click", () => {
      input.value = match;
      suggestionsBox.innerHTML = "";
    });

    suggestionsBox.appendChild(div);
  });
}

let totalCalories = 0;
let entries = [];

function addFood() {
  const foodInput = document.getElementById("food").value.toLowerCase();
  const amountInput = parseFloat(document.getElementById("amount").value);

  if (!foodData[foodInput]) {
    alert("Lebensmittel nicht gefunden.");
    return;
  }

  if (isNaN(amountInput) || amountInput <= 0) {
    alert("Bitte gültige Menge eingeben.");
    return;
  }

  const calories = (foodData[foodInput] / 100) * amountInput;

  const entry = {
    name: foodInput,
    amount: amountInput,
    calories: calories
  };

  entries.push(entry);
  totalCalories += calories;
  updateDisplay();
}

function updateDisplay() {
  const list = document.getElementById("food-list");
  const total = document.getElementById("total");
  list.innerHTML = "";

  entries.forEach((entry, index) => {
    const item = document.createElement("li");
    item.innerHTML = `${entry.name} (${entry.amount}g) - ${entry.calories.toFixed(1)} kcal 
      <span class="delete-btn" onclick="deleteEntry(${index})">✕</span>`;
    list.appendChild(item);
  });

  total.innerText = totalCalories.toFixed(1);
}

function deleteEntry(index) {
  totalCalories -= entries[index].calories;
  entries.splice(index, 1);
  updateDisplay();
}
