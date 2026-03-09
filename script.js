// ===== DOM REFERENCES =====
const generateBtn = document.getElementById("generateBtn");
const downloadBtn = document.getElementById("downloadBtn");
const clearBtn = document.getElementById("clearBtn");
const qrText = document.getElementById("qrText");
const qrImage = document.getElementById("qrImage");
const qrBox = document.getElementById("qrBox");
const qrPlaceholder = document.getElementById("qrPlaceholder");
const qrLoading = document.getElementById("qrLoading");
const charCount = document.getElementById("charCount");
const sizeBtns = document.querySelectorAll(".size-btn");

// ===== STATE =====
let currentQrUrl = "";
let selectedSize = 200;

// ===== SIZE SELECTOR =====
sizeBtns.forEach(btn => {
  btn.addEventListener("click", () => {
    sizeBtns.forEach(b => b.classList.remove("active"));
    btn.classList.add("active");
    selectedSize = parseInt(btn.dataset.size, 10);
  });
});

// ===== CHARACTER COUNTER =====
qrText.addEventListener("input", () => {
  const len = qrText.value.length;
  charCount.textContent = `${len} character${len !== 1 ? "s" : ""}`;
  charCount.classList.toggle("warn", len > 300);
  clearBtn.classList.toggle("visible", len > 0);
});

// ===== CLEAR BUTTON =====
clearBtn.addEventListener("click", () => {
  qrText.value = "";
  charCount.textContent = "0 characters";
  charCount.classList.remove("warn");
  clearBtn.classList.remove("visible");
  qrText.focus();
});

// ===== HELPERS =====
function showState(state) {
  qrPlaceholder.classList.add("hidden");
  qrImage.classList.add("hidden");
  qrLoading.classList.add("hidden");

  if (state === "placeholder") qrPlaceholder.classList.remove("hidden");
  else if (state === "image") qrImage.classList.remove("hidden");
  else if (state === "loading") qrLoading.classList.remove("hidden");
}

// ===== GENERATE =====
generateBtn.addEventListener("click", () => {
  const text = qrText.value.trim();
  if (!text) {
    qrText.focus();
    qrText.classList.add("shake");
    setTimeout(() => qrText.classList.remove("shake"), 500);
    return;
  }

  // Show loading
  showState("loading");
  qrBox.classList.remove("has-qr");
  downloadBtn.classList.add("hidden");

  const encoded = encodeURIComponent(text);
  currentQrUrl = `https://quickchart.io/qr?text=${encoded}&size=${selectedSize * 2}&margin=1`;

  const img = new Image();
  img.crossOrigin = "anonymous";
  img.src = currentQrUrl;

  img.onload = () => {
    qrImage.src = currentQrUrl;
    showState("image");
    qrBox.classList.add("has-qr");
    downloadBtn.classList.remove("hidden");
  };

  img.onerror = () => {
    showState("placeholder");
    alert("Failed to generate QR code. Please check your connection.");
  };
});

// ===== DOWNLOAD =====
downloadBtn.addEventListener("click", async (e) => {
  e.preventDefault();
  if (!currentQrUrl) return;

  const originalText = downloadBtn.innerHTML;
  downloadBtn.innerHTML = `
    <svg class="btn-icon" viewBox="0 0 20 20" fill="none">
      <circle cx="10" cy="10" r="7" stroke="currentColor" stroke-width="2" stroke-dasharray="22" stroke-dashoffset="22" style="animation:spin .7s linear infinite"/>
    </svg>
    Downloading…`;

  try {
    const response = await fetch(currentQrUrl);
    if (!response.ok) throw new Error("Network error");
    const imageBlob = await response.blob();
    const objectURL = URL.createObjectURL(imageBlob);

    const link = document.createElement("a");
    link.href = objectURL;
    link.download = `qrcode_${Date.now()}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(objectURL);
  } catch (err) {
    console.error("Download failed:", err);
    alert("Download could not be completed. Please try again.");
  } finally {
    downloadBtn.innerHTML = originalText;
  }
});

// ===== ENTER KEY =====
qrText.addEventListener("keydown", (e) => {
  if (e.key === "Enter") generateBtn.click();
});

// ===== SHAKE ANIMATION (injected) =====
const style = document.createElement("style");
style.textContent = `
  @keyframes shake {
    0%,100% { transform: translateX(0); }
    20%      { transform: translateX(-6px); }
    40%      { transform: translateX(6px); }
    60%      { transform: translateX(-4px); }
    80%      { transform: translateX(4px); }
  }
  .shake { animation: shake 0.45s var(--ease-smooth) both; }
`;
document.head.appendChild(style);