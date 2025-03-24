/**
 *  Class for managing the photo capture experience.
 *  Handles webcam access, image capture, and navigation to editor page.
 */

import { Camera } from "./camera.js";

export class Photobooth
{
    constructor()
    {
        this.camera = new Camera(); //creates new camera instance & handles webcame access

        // DOM elements for user interaction
        this.lensButton = document.getElementById("lens"); // gets us the lens button
        this.counterDisplay = document.getElementById("counter"); // gets us the counter
        this.canvas = document.getElementById("canvas") // used to capcture images from video. like a clipboard
        this.ctx = this.canvas.getContext("2d"); // tells the browser we want to draw in 2D mode. this.ctx now stores the context, which allows us to draw.
        
        // track photos taken and store them for future use
        this.photoCount = 0;
        this.maxPhotos = 4;
        this.photos = []; // array data structure because we are aware of the max number of photos we want stored

        this.init();
        console.log("Photobooth initialized");
    }

    //initializes the webcam feed and sets up event listeners.
    async init()
    {
        await this.camera.initCamera(); // start the camera feed

        this.lensButton.addEventListener("click", () => this.capturePhoto());
    }

    capturePhoto() {
        if (this.photoCount < this.maxPhotos)
        {
            // set the canvas size to match the video dimensions
            this.canvas.width = this.camera.video.videoWidth;
            this.canvas.height = this.camera.video.videoHeight;

            this.ctx.drawImage(this.camera.video, 0, 0, this.canvas.width, this.canvas.height);

            const imageUrl = this.canvas.toDataURL("image.png"); // converts image to a data url which is basically a string representation of the image

            this.photos.push(imageUrl);
            this.photoCount ++;
            this.counterDisplay.textContent = this.photoCount+'/4'; // update the counter display (so it goes to "1/4", "2/4", etc.)

            if (this.photoCount === this.maxPhotos)
            {
                setTimeout(() => {
                    // save photos array to localStorage so they can be used on next page
                    localStorage.setItem("photos", JSON.stringify(this.photos));
                    window.location.href = "frameEditor.html"; // directs user to editor page where photos are also displayed

                }, 500); // wait 500ms or 0.5 second before executing code in timeout
            }
        }
    }
}