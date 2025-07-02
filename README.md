# AI CV Builder (English & Somali)

This is a **minimal viable product (MVP)** web-based résumé / CV generator that supports both **English** and **Somali** content.

Users can:

1. Fill in their personal details, professional summary, education, experience, skills, languages, and references.
2. See a live preview of the final CV.
3. Download the CV instantly as a **PDF**.

No server setup or database is required – everything runs completely in the browser.

---

## Getting Started

1. Clone or download this repository to your computer.
2. Open `index.html` in any modern web browser (Chrome, Edge, Firefox, Safari).

That's it! The page will load and you can start building your CV right away.

> NOTE: If you double-click **index.html** and the preview does not load due to browser security policies, you can instead serve the folder with a small web server:
>
> ```bash
> # Using Python 3 (already installed on most systems)
> cd path/to/project
> python3 -m http.server 8000
> # visit http://localhost:8000 in your browser
> ```

---

## Features

* **Bilingual fields** – Enter content in both English and Somali.
* **Dynamic sections** – Add as many education, experience, language, and reference blocks as you need.
* **Instant preview** – Click *Generate CV Preview* to see the compiled résumé before downloading.
* **PDF export** – Click *Download PDF* to save an A4-formatted PDF generated entirely in the browser via `html2canvas` + `jsPDF`.

---

## Roadmap / Possible Enhancements

* AI-powered translation and text suggestions using OpenAI / GPT models.
* Theme/Template switching (modern, classic, minimal, etc.).
* Persistent storage (localStorage or backend) for saving and sharing CVs.
* Image / profile photo support.

---

### License

This MVP is released under the MIT License – free for personal and commercial use.
