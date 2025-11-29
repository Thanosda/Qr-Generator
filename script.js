const generateBtn = document.getElementById("generateBtn");
const downloadBtn = document.getElementById("downloadBtn");
const qrText = document.getElementById("qrText");
const qrImage = document.getElementById("qrImage");

// A variable to store the final QR code URL accessible by both functions
let currentQrUrl = ''; 

generateBtn.addEventListener("click", () => {
  const text = qrText.value.trim();
  if (!text) {
    alert("Please enter text or URL");
    return;
  }

  // Encode text for URL
  const encoded = encodeURIComponent(text);

  // Use the full URL, which will now be stored
  currentQrUrl = `https://quickchart.io/qr?text=${encoded}&size=200`;

  // Set image src to display the code
  qrImage.src = currentQrUrl;

  // Show download button
  downloadBtn.classList.remove('hidden');
});

// --- NEW DOWNLOAD LOGIC ---
downloadBtn.addEventListener("click", async (e) => {
  // Prevent the default navigation action of the <a> tag
  e.preventDefault(); 
  
  if (!currentQrUrl) {
    alert("Please generate a QR code first!");
    return;
  }

  try {
    // 1. Fetch the image data from the QuickChart URL
    const response = await fetch(currentQrUrl);
    
    // 2. Get the response as a Blob (binary file data)
    const imageBlob = await response.blob();
    
    // 3. Create a temporary URL for the Blob (this is a local, downloadable object)
    const objectURL = URL.createObjectURL(imageBlob);

    // 4. Temporarily set the href and click the link to trigger the download
    const link = document.createElement('a');
    link.href = objectURL;
    link.download = `qrcode_${Date.now()}.png`; // Suggested file name
    
    // Append link to the body, click it, and remove it immediately
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    // 5. Clean up the temporary object URL
    URL.revokeObjectURL(objectURL);

  } catch (error) {
    console.error("Download failed:", error);
    alert("Sorry, the download could not be completed.");
  }
});
// --------------------------

// Allow Enter key to generate QR code
qrText.addEventListener('keypress', (e) => {
  if (e.key === 'Enter') {
    generateBtn.click();
  }
});