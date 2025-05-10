# Braille Translator Website

A simple and accessible web-based Braille translation tool. This project allows users to:

* Convert standard text to Braille (Unicode and graphical 6-dot form)
* Convert Braille Unicode back to plain text
* Upload `.txt` or `.pdf` documents for translation
* Download the translation results
* Enable High Accessibility Mode for better visual clarity

---

## 🌐 Live Demo

```
https://pakelcomedy.github.io/Braille-Translator/
```

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
│   └── accessibility.js        # Toggle high-contrast mode
├── img/
│   └── braille-examples/       # Optional: Braille image assets
└── assets/
│   └── lang/
│       ├── en.json
│       └── id.json
├── data/
│   └── braille-map.json        # Optional: external character mapping
├── README.md                  # Project documentation
└── LICENSE                    # Optional: license info
```

---

## 🚀 Features

* 🔤 Translate any typed text to Braille in real time
* 🔄 Reverse translator: Braille to text
* 📁 Upload `.txt`/`.pdf` and auto-process to Braille
* 💾 One-click download for results
* ♿ Accessibility mode: high contrast, larger fonts

---

## 📦 Setup & Usage

No build tools or frameworks required.
Simply open `index.html` in a browser or host with GitHub Pages.

### Optional:

* Host with GitHub Pages or Netlify for public access
* Use browser dev tools to inspect and extend functionality

---

## ✅ To-Do / Improvements

* Support for Grade 2 Braille contractions
* Multilingual support

---

## 📜 License

[MIT](./LICENSE)

---

## 🤝 Contributing

Pull requests are welcome! For major changes, please open an issue first to discuss what you would like to change.

---

## 🙏 Acknowledgments

Inspired by the need for accessible learning tools for the visually impaired. Built with ❤️ using vanilla HTML, CSS, and JavaScript.
