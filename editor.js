/**
 *  Manages the editing interface for the photo strip.
 *  Supports two modes: frame editor and filter editor.
 *  Handles UI interaction, color updates, and filter application.
 */

/**
 * Used these resources:
 * - https://developer.mozilla.org/en-US/docs/Learn_web_development/Howto/Solve_HTML_problems/Use_data_attributes
 * 
*/

import { PhotoUtils } from "./photoUtils.js";

// console.log("DOMContentLoaded fired");
// console.log("Page mode:", document.body.dataset.editorMode);

// document.addEventListener("DOMContentLoaded", () => {
    // let photos = new PhotoUtils();
    // console.log("Calling PhotoUtils.displayPhotos()");
    // photos.displayPhotos();
    // console.log("Finished PhotoUtils.displayPhotos()");

    // determine which editor mode to initialize (frame or filter)
//     const mode = document.body.dataset.editorMode;
//         if (mode) {
//             new Editor(mode);
//         }
// });

//// moved the above to editorMain.js to be more modular


export class Editor 
{
     /**
     *  mode - "frame" or "filter" to indicate which editor to initialize
     */
    constructor (mode)
    {
        this.photoStrip = document.getElementById("photos"); //container to display photo strip
        this.images = this.photoStrip.querySelectorAll("img");  //because the photos are already stored from photoUtils into my #photos (and thus photoStrip)
        console.log("Initializing Editor with mode:", mode);
        console.log("Images found:", this.images.length);  

        this.mode = mode; //make sure to call restoreSavedStyles AFTER this so that mode is already set.

         // initialize based on mode
        if (this.mode === "frame")
        {
            this.initializeFrameEditor();
        }
        else if (this.mode === "filter")
        {
            this.initializeFilterEditor();
        }
        this.restoreSavedStyles(); //restore saved frame color and filter if previously chosen

    }

    restoreSavedStyles()
    {
        const savedFrame = localStorage.getItem("frameColor");
        if (savedFrame)
            this.changeFrameColor(savedFrame);

        const savedFilter = localStorage.getItem("photoFilter");
        if (savedFilter)
            this.changeFilter(savedFilter);
    }

    // initializes frame editing features
    initializeFrameEditor()
    {
        this.frameButtons = document.querySelectorAll(".frame-button"); //get all the buttons. make sure we're getting buttons from the document!
        this.setFrameColors();
        this.addFrameColorListeners();

        const savedFrame = localStorage.getItem("frameColor");
        if (savedFrame)
        {
            this.changeFrameColor(savedFrame);
            console.log("Restoring saved frame color from localStorage");
        }
    }

    // initializes filter editing features
    initializeFilterEditor()
    {
        this.filterButtons = document.querySelectorAll(".filter-button");
        // this.setFilterCover(); //i decided to manually set up the covers of the filtes using CSS
        this.addFilterListeners();

        const savedFilter = localStorage.getItem("photoFilter");
        if (savedFilter)
        {
            this.changeFilter(savedFilter);
            console.log("Restoring saved filter from localStorage");
        }

    }

    // set up button background colors based on its data-color attribute
    setFrameColors()
    {
        this.frameButtons.forEach (frameButton =>{
            frameButton.style.backgroundColor = frameButton.dataset.color;
        });
    }
    
    addFrameColorListeners()
    {
        this.frameButtons.forEach (frameButton =>{
            frameButton.addEventListener("click", () =>{
                this.changeFrameColor(frameButton.dataset.color);
            });
        });
    }

    // changes the photo strip background color to match selected frame color
    changeFrameColor(color)
    {
        this.photoStrip.style.backgroundColor = color;

        localStorage.setItem("frameColor", color);
    }

    setFilterCover()
    {
        this.filterButtons.forEach (filterButton =>{
            const filter = filterButton.dataset.filter; //css can't access HTML elemetns like JS so i can't set it like I did with the frame buttons
            filterButton.style.filter = filterButton.dataset.filter;
        });
        console.log("Filter button covers have been added.")
    }

    addFilterListeners()
    {
        this.filterButtons.forEach (filterButton =>{
            filterButton.addEventListener("click", () =>{
                this.changeFilter(filterButton.dataset.filter); //data-* are special attributes
                //filterButton.dataset gets me an object like
                // {
                //  filter: "grayscale(100%)"
                // }
                // data-* in HTML becomes .dataset.* in JS
                console.log("Adding event listeners to each filter button.")
            });
        });
    }

    changeFilter(filter)
    {
        //const becasue i don't plan on reassigning it
        const images = this.photoStrip.querySelectorAll("img"); //because the photos are already stored from photoUtils into my #photos (and thus photoStrip)

        images.forEach(img =>{
            img.style.filter = filter;
            console.log("Applying filter:", filter);
        })

        localStorage.setItem("photoFilter", filter);
        console.log("Saving filter to local storage.")
    }
}