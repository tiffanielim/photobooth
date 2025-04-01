/**
 * 
 *  Controls the logic for the save page
 * 
 *       - Loads the saved photos into the page
 *       - Restores the frame color and filter from localStorage
 *       - Lets the user download the full photostrip as a PNG
 *       - Sets up the navigation buttons
 * 
 *  * Related files:
 *      - photoUtils.js – handles loading images into the DOM
 *      - navigation.js – handles navigation buttons between pages
 */

/**
 * Used these resources:
 * - https://dontpaniclabs.com/blog/post/2023/08/31/using-html2canvas/ 
 * - 
*/


import { PhotoUtils } from "./photoUtils.js";
import { Navigation } from "./navigation.js";

document.addEventListener("DOMContentLoaded", () => {
    let photos = new PhotoUtils();
    console.log("Calling PhotoUtils.displayPhotos()");
    photos.displayPhotos();
    console.log("Finished PhotoUtils.displayPhotos()");


    new Navigation();

    const photoStrip = document.getElementById ("photos");
    
    //restore savedFrame
    const savedFrame = localStorage.getItem("frameColor");
    if (savedFrame)
        photoStrip.style.backgroundColor = savedFrame;

    //restore savedFilter
    const savedFilter = localStorage.getItem("photoFilter");
    const images = photoStrip.querySelectorAll("img"); //because the photos are already stored from photoUtils into my #photos (and thus photoStrip)
    if (savedFilter)
    {
        images.forEach(img =>{
            img.style.filter = savedFilter;
            console.log("Applying filter:", savedFilter);
        })
    }

    console.log("Save view loaded with restored styles.");

    const downloadButton = document.getElementById("downloadButton");
    downloadButton.addEventListener("click", () => {
        downloadPhotostrip(savedFilter);
    });
});

// html2canvas does not save the CSS filters into the "screenshot"
// this is because html2canvas is a library that takes a screenshot of your webpage by rendering it into a <canvas> element. 
// it does this by rebuilding each DOM element, using CSS, layout, and content, but CSS filters are not reliably capturued by html2canvas and are not properly represented in the final "screenshot"
// by baking the filter into the image, i am applying the filter on the <canvas> before drawing the image and then converting that into a new image
function bakeFiltersIntoImages(photostrip, filter)
{
    const images = photostrip.querySelectorAll("img");
    images.forEach(img => {
        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");

        canvas.width = img.width;
        canvas.height = img.height;
        ctx.translate(canvas.width, 0);
        ctx.scale(-1, 1);

        // apply the filter before drawing the image
        ctx.filter = filter;
        ctx.drawImage(img, 0, 0, img.width, img.height);

        // convert the canvas into a new image
        const filteredImage = new Image();
        filteredImage.src = canvas.toDataURL("image/png");
        filteredImage.width = img.width;
        filteredImage.height = img.height;

        // replace the original image in the DOM
        img.replaceWith(filteredImage);
    });
}

//turns my #photos into a downloadable image
function downloadPhotostrip(filter)
{
    console.log ("Download button pressed.");
    const photostrip = document.getElementById("photos");

    if (filter) 
        bakeFiltersIntoImages(photostrip, filter);
    

    html2canvas(photostrip).then((canvas) => { //using library html2canvas to take a screenshot of the photostrip DOM element and renders it into a canvas 
        const image = canvas.toDataURL('photostrip/png'); //converts canvas to an image string in PNG format. aka the image stored as an URL
        const link = document.createElement('a'); //creates <a> aka a link 
        link.download = 'photostrip.png'; //tells browswer that when link is clicked, download it as photostrip.png
        link.href = image; //points to the data URL from earlier
        link.click(); //JS triggers clicks 
      });
      console.log ("Download successful.");
}