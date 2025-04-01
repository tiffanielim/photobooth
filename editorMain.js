/**
 *  Supports editor.js
 *  Handles navigation for editor files (frameEditor and filterEditor).
 */

import { PhotoUtils } from "./photoUtils.js";
import { Navigation } from "./navigation.js";
import { Editor } from "./editor.js";

document.addEventListener("DOMContentLoaded", () => {
    let photos = new PhotoUtils();
    console.log("Calling PhotoUtils.displayPhotos()");
    photos.displayPhotos();
    console.log("Finished PhotoUtils.displayPhotos()");

    const mode = document.body.dataset.editorMode;
    if (mode) {
        new Editor(mode);
    }

    new Navigation();
});
