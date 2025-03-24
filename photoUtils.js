import { Photobooth } from "./photobooth.js";

/**
 *  Loads and displays captured photos from localStorage.
 *  Dynamically appends image elements to the editor pages.
 *  Acts as a helper class for rendering the photo strip.
 */

export class PhotoUtils
{
    constructor() //so each photoUtils object will do this
    {
        this.photos = document.getElementById("photos"); //selects the <video> element from HTML to display webcame feed
        console.log("Initializing photos...");
    }

    displayPhotos()
    {
        let photos = localStorage.getItem("photos"); //grabs string version of the photo array from my browser's LOCAL STORAGE
        if (photos == null)
        {
            console.log("Photos array is null. Try again.");
            return;
        }

        let photosArray = JSON.parse(photos); //turns the string version back into images i can use

        for (let i=0; i< photosArray.length; i++) //in JS, you don't declare int like in C++, instead you use let, const, or var to define a variable
        {
            let imgElement = document.createElement("img");
            imgElement.src = photosArray[i];
            imgElement.classList.add("photoDetails");
            console.log(imgElement);
            console.log(photosArray[0]);
            this.photos.appendChild(imgElement);
        }
    }
}