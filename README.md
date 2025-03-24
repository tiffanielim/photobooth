# 📸 Photobooth Web App 📸 

A fun and interactive web app that turns your webcam into a personal photobooth! Capture a series of four photos, customize the frame, apply filters (coming soon), and create a downloadable photo strip — all from your browser.

## 🖼️ Features

- 🖼️ Live webcam preview with video
- 📷 Take 4 photos with a single click interface
- 🎨 Choose a frame color for your photo strip
- 🎛️ Apply aesthetic filters like grayscale, sepia, and more
- 📱 Fully responsive design for mobile and desktop

## 📂 Project Structure
photobooth/
├── index.html               # homepage where user takes 4 photos
├── frameEditor.html         # page to select the frame color
├── filterEditor.html        # page to apply image filters (coming soon)
├── style.css                # shared stylesheet for all pages
├── photoboothMain.js        # initializes Photobooth on index.html
├── photobooth.js            # class that handles photo capture & logic
├── camera.js                # handles webcam setup and access
├── editor.js                # manages both frame and filter editing modes
├── photoUtils.js            # loads photos from localStorage into DOM
├── README.md                # project overview, setup, and documentation

## 📱 Try It Live
https://tiffanielim.github.io/photobooth/
