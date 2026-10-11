// CampusSort AI — connect your exported Teachable Machine image model here.
// Keep the exported model.json, metadata.json and weights file inside ./model/
const MODEL_URL = "./model/";

const input = document.getElementById("imageInput");
const preview = document.getElementById("preview");
const emptyState = document.getElementById("emptyState");
const changePhoto = document.getElementById("changePhoto");
const predictBtn = document.getElementById("predictBtn");
const resetBtn = document.getElementById("resetBtn");
const dropzone = document.getElementById("dropzone");
const modelStatus = document.getElementById("modelStatus");
const resultEmpty = document.getElementById("resultEmpty");
const resultContent = document.getElementById("resultContent");

let model = null;
let selectedFile = null;

const categoryInfo = {
  plastic: { title: "Plastic", icon: "P", subtitle: "Plastic waste", advice: "If your campus accepts this plastic type, empty it and place it in the designated dry-recyclables bin. Check local rules." },
  paper: { title: "Paper", icon: "Pa", subtitle: "Paper and cardboard", advice: "Keep paper clean and dry. Greasy or food-soiled paper may not be accepted with recyclable paper." },
  metal: { title: "Metal", icon: "M", subtitle: "Metal packaging", advice: "Empty the container and use your campus's designated metal or dry-recyclables collection stream." },
  organic: { title: "Organic", icon: "O", subtitle: "Food and plant waste", advice: "Place suitable food scraps in the campus wet-waste or compost bin, where available." }
};

function setStatus(message, type = "loading") {
  modelStatus.className = `status status-${type}`;
  modelStatus.innerHTML = `<span class="status-dot"></span><span>${message}</span>`;
}

function normalizeClass(name) {
  const value = String(name || "").toLowerCase();
  if (value.includes("plastic")) return "plastic";
  if (value.includes("paper") || value.includes("cardboard")) return "paper";
  if (value.includes("metal") || value.includes("can")) return "metal";
  if (value.includes("organic") || value.includes("food") || value.includes("compost")) return "organic";
  return null;
}

async function loadModel() {
  try {
    model = await tmImage.load(MODEL_URL + "model.json", MODEL_URL + "metadata.json");
    setStatus(`Trained model loaded · ${model.getTotalClasses()} classes`, "ready");
    predictBtn.disabled = !selectedFile;
  } catch (error) {
    console.error("Model loading failed:", error);
    setStatus("Model not connected yet. Export your trained model into the /model folder.", "error");
  }
}

function chooseFile(file) {
  if (!file || !file.type.startsWith("image/")) {
    setStatus("Please select a valid image file.", "error");
    return;
  }
  selectedFile = file;
  preview.src = URL.createObjectURL(file);
  preview.hidden = false;
  emptyState.hidden = true;
  changePhoto.hidden = false;
  predictBtn.disabled = !model;
  resultEmpty.hidden = false;
  resultContent.hidden = true;
  if (model) setStatus("Image ready. Click Analyze waste to run the model.", "ready");
}

input.addEventListener("change", event => chooseFile(event.target.files[0]));
["dragenter", "dragover"].forEach(name => dropzone.addEventListener(name, event => {
  event.preventDefault(); dropzone.classList.add("dragover");
}));
["dragleave", "drop"].forEach(name => dropzone.addEventListener(name, event => {
  event.preventDefault(); dropzone.classList.remove("dragover");
}));
dropzone.addEventListener("drop", event => chooseFile(event.dataTransfer.files[0]));

predictBtn.addEventListener("click", async () => {
  if (!model || !selectedFile) {
    setStatus("Load the trained model and select an image first.", "error");
    return;
  }
  predictBtn.disabled = true;
  predictBtn.textContent = "Analyzing…";
  try {
    const predictions = await model.predict(preview);
    predictions.sort((a, b) => b.probability - a.probability);
    const best = predictions[0];
    const confidence = Math.round(best.probability * 100);
    const key = normalizeClass(best.className);
    document.getElementById("categoryName").textContent = best.className;
    document.getElementById("categorySubtitle").textContent = key ? categoryInfo[key].subtitle : "Model prediction — check your class labels";
    document.getElementById("categoryIcon").textContent = key ? categoryInfo[key].icon : "AI";
    document.getElementById("confidencePill").textContent = `${confidence}% confidence`;
    document.getElementById("confidenceText").textContent = `${confidence}%`;
    document.getElementById("confidenceBar").style.width = `${confidence}%`;
    document.getElementById("adviceText").textContent = key
      ? categoryInfo[key].advice
      : "This class is not mapped to a disposal tip yet. Confirm the item and follow local waste-management guidance.";
    document.getElementById("predictionList").innerHTML = predictions.map(item => {
      const pct = Math.round(item.probability * 100);
      return `<div class="prediction-row"><span>${escapeHtml(item.className)}</span><div class="prediction-track"><span style="width:${pct}%"></span></div><strong>${pct}%</strong></div>`;
    }).join("");
    resultEmpty.hidden = true;
    resultContent.hidden = false;
    setStatus("Prediction complete. Check the result before disposing of the item.", "ready");
  } catch (error) {
    console.error(error);
    setStatus("Prediction failed. Check that the model files are present and valid.", "error");
  } finally {
    predictBtn.disabled = !selectedFile || !model;
    predictBtn.innerHTML = 'Analyze waste <span>→</span>';
  }
});

resetBtn.addEventListener("click", () => {
  selectedFile = null;
  input.value = "";
  preview.removeAttribute("src");
  preview.hidden = true;
  emptyState.hidden = false;
  changePhoto.hidden = true;
  resultContent.hidden = true;
  resultEmpty.hidden = false;
  predictBtn.disabled = !model;
  setStatus(model ? "Trained model ready. Choose an image to begin." : "Model not connected yet. Export your trained model into the /model folder.", model ? "ready" : "error");
});

function escapeHtml(value) {
  return String(value).replace(/[&<>"']/g, char => ({
    "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#039;"
  })[char]);
}

loadModel();