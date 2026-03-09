# QR Code Generator

A sleek, premium‑styled QR code generator built with vanilla HTML, CSS, and JavaScript. It features:

- **Glass‑morphism UI** with animated background orbs and subtle micro‑animations.
- **Dynamic size selector** (S – XL) and real‑time character counter.
- **Clear button** to reset the input instantly.
- **Loading spinner** while the QR image is being generated.
- **Download button** that fetches the QR image as a PNG.
- **Responsive layout** that works beautifully on mobile and desktop.

## Demo
Open [index.html](file:///d:/project/Qr-Generator/index.html) in a browser. Type any text or URL, pick a size, and click **Generate QR Code**. Once the QR appears, click **Download PNG** to save it.

## Installation & Usage
1. Clone or copy the repository.
2. Ensure the three files are in the same folder:
   - [index.html](file:///d:/project/Qr-Generator/index.html)
   - [style.css](file:///d:/project/Qr-Generator/style.css)
   - [script.js](file:///d:/project/Qr-Generator/script.js)
3. Open [index.html](file:///d:/project/Qr-Generator/index.html) in a modern browser (Chrome, Edge, Firefox, Safari).

No build step or dependencies are required – everything runs client‑side.

## Customisation
- **Colors & gradients** – edit the CSS variables in [style.css](file:///d:/project/Qr-Generator/style.css) under `:root`.
- **QR size options** – modify the `data-size` attributes on the size buttons in [index.html](file:///d:/project/Qr-Generator/index.html) and adjust the `selectedSize` handling in [script.js](file:///d:/project/Qr-Generator/script.js).
- **Background animation** – tweak the `@keyframes orb-drift` animation in [style.css](file:///d:/project/Qr-Generator/style.css).

## License
MIT – feel free to use, remix, and share.
