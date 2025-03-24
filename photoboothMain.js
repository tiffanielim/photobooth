/**
 *  Entry script for the Photobooth homepage (index.html).
 *  Waits for DOM to load, then initializes the Photobooth class.
 *  Sets up the camera and handles the capture process.
 */

import { Photobooth } from "./photobooth.js";

document.addEventListener("DOMContentLoaded", () => {
    new Photobooth ();
    console.log("Photobooth page script loaded!");
});