# Braille Translator Website

A simple and accessible web-based Braille translation tool. This project allows users to:

- Convert standard text to Braille (Unicode and graphical 6-dot form)
- Convert Braille Unicode back to plain text
- Translate between English and Indonesian
- Upload `.txt` or `.pdf` documents for translation
- Download the translation results
- Enable High Accessibility Mode for better visual clarity

---

## 🌐 Live Demo

[Text To Braille](https://t2b.my.id)

---

## 📁 Project Structure

```

braille-translator-website/
├── index.html                  # Main page: Text → Braille
├── pages/
│   ├── reverse.html            # Braille → Text
│   ├── upload.html             # Upload document for translation
│   └── learn.html              # Learn Braille (education)
├── css/
│   └── styles.css              # Styling for all pages
├── js/
│   ├── convert.js              # Logic for text → Braille
│   ├── reverse.js              # Logic for Braille → text
│   ├── upload.js               # File reader and document parsing
│   ├── download.js             # Download helper functions
│   ├── accessibility.js        # Toggle high-contrast mode
│   └── translate.js            # Logic for English ↔ Indonesian translation
├── img/
│   ├── braille-examples/       # Optional: Braille image assets
│   └── screenshot.png          # Screenshot of the live interface
├── assets/
│   └── lang/
│       ├── en.json
│       └── id.json
├── data/
│   └── braille-map.json        # Optional: external character mapping
├── README.md                   # Project documentation
└── LICENSE                     # License info

````

---

## 🚀 Features

- 🔤 Translate any typed text to Braille in real time
- 🔄 Reverse translator: Braille to text
- 🌐 Translate English to Indonesian and vice versa
- 📁 Upload `.txt` / `.pdf` and auto-process to Braille
- 💾 One-click download for results
- ♿ Accessibility mode: high contrast, larger fonts

---

## 📷 Screenshot
![Screenshot (260)](https://github.com/user-attachments/assets/53eb5f91-3447-4c25-940c-80027757304e)
![Screenshot (261)](https://github.com/user-attachments/assets/515ebe62-5d88-4a94-9aae-5bd6e709dc18)
![Screenshot (262)](https://github.com/user-attachments/assets/3858cf92-2fb8-452a-94fa-c3a9eb3d02e4)
![Screenshot (263)](https://github.com/user-attachments/assets/fe704a7f-c18a-4db7-855f-9160296fbdd6)
![Screenshot (264)](https://github.com/user-attachments/assets/5d45c957-c7b7-4ba8-9680-93ee5abb56d4)
![Screenshot (265)](https://github.com/user-attachments/assets/684e6b24-cc77-4ea7-ae80-7b13268b59ef)
---

## 📦 Setup & Usage

No build tools or frameworks required.  
Simply clone or download the repository, then open `index.html` (and other HTML files in `pages/`) in a modern browser. For best results, host via GitHub Pages or Netlify.

1. **Clone the repo**  
   ```bash
   git clone https://github.com/your-username/braille-translator-website.git
   cd braille-translator-website
````

2. **Open in Browser**

   * Double-click `index.html` (Text → Braille).
   * Navigate to `reverse.html` to convert Braille back to plain text.
   * Navigate to `upload.html` to upload `.txt` or `.pdf` files.
   * Navigate to `learn.html` to see educational resources about Braille.

3. **Using Translation (English ↔ Indonesian)**

   * On any editor page (e.g., index.html), select “English → Indonesian” or “Indonesian → English” from the language dropdown.
   * Type or paste text, then click **Translate**. The translated text appears in the output area. You can then convert that to Braille or vice versa as needed.

4. **Enable High Accessibility Mode**

   * Click the “Accessibility” toggle (usually a button or switch icon).
   * The interface will switch to high-contrast colors and larger fonts for better readability.

5. **Download Results**

   * After translation or Braille conversion, click the **Download** button.
   * Choose `.txt` or `.pdf` format. The file will be generated client-side and automatically downloaded.

---

## 📝 To-Do / Improvements

* Support for Grade 2 Braille contractions
* Multilingual support beyond English/Indonesian (e.g., Spanish, French, Bahasa)
* OCR integration for scanned documents
* Dark mode toggle (in addition to high-contrast mode)

---

## 📜 License

[MIT](./LICENSE)

---

## 🤝 Contributing

Pull requests are welcome! For major changes or feature requests, please open an issue first to discuss what you’d like to change.

---

## 🙏 Acknowledgments

Inspired by the need for accessible learning tools for the visually impaired. Built with ❤️ using HTML, CSS, and JavaScript.

```
