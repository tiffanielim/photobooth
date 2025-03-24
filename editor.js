/**
 *  Manages the editing interface for the photo strip.
 *  Supports two modes: frame editor and filter editor.
 *  Handles UI interaction, color updates, and filter application.
 */

import { PhotoUtils } from "./photoUtils.js";

document.addEventListener("DOMContentLoaded", () => {
    let photos = new PhotoUtils();
    photos.displayPhotos();

    // set up navigation to the Filter Editor page
    const goToFilterButton = document.getElementById("goToFilterEditor");
    if (goToFilterButton) {
      goToFilterButton.addEventListener("click", () => {
        window.location.href = "filterEditor.html";
      });
    }

    // determine which editor mode to initialize (frame or filter)
    const mode = document.body.dataset.editorMode;
        if (mode) {
            new Editor(mode);
        }
});

export class Editor 
{
     /**
     *  mode - "frame" or "filter" to indicate which editor to initialize
     */

    constructor (mode)
    {
        this.photoStrip = document.getElementById("photos"); //container to display photo strip
        this.mode = mode;

         // initialize based on mode
        if (this.mode === "frame")
        {
            this.initializeFrameEditor();
        }
        else if (this.mode === "filter")
        {
            this.initializeFilterEditor();
        }

    }

    // initializes frame editing features
    initializeFrameEditor()
    {
        this.frames = document.querySelectorAll(".frame-button"); //get all the buttons. the .frame-button is NEEDED because we're selecting by class, #s for ID (but if selecting id, use getElementByID)
        this.setFrameColors();
        this.addFrameColorListeners();
    }

    // initializes filter editing features
    initializeFilterEditor()
    {
        this.filters = document.querySelectorAll(".filter-buttons");
        this.setFilterCover();
        this.addFilterListeners();
    }

    // set up button background colors based on its data-color attribute
    setFrameColors()
    {
        this.frames.forEach (frame =>{
            frame.style.backgroundColor = frame.dataset.color;
        });
    }
    
    addFrameColorListeners()
    {
        this.frames.forEach (frame =>{
            frame.addEventListener("click", () =>{
                this.changeFrameColor(frame.dataset.color);
            });
        });
    }

    // changes the photo strip background color to match selected frame color
    changeFrameColor(color)
    {
        this.photoStrip.style.backgroundColor = color;
    }

    setFilterCover()
    {
        this.filters.forEach (filter =>{
            // TODO: change covers to reflect changes
        });
    }

    addFilterListeners()
    {
        this.filters.forEach (filter =>{
            filter.addEventListener("click", () =>{
                this.changeFilter(filter.dataset.filter);
            });
        });
    }

    changeFilter(filter)
    {
        // TODO: implement CSS filter logic
    }
}