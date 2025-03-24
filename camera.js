/**
 *  Handles webcam access and video stream setup.
 *  Encapsulates logic for requesting camera permissions and displaying the live feed in a <video> element.
 */

export class Camera
{
    constructor()
    {
        this.video = document.getElementById("video"); //selects the <video> element from HTML to display webcame feed
        console.log("Initializing camera...");
    }

    //initializes the webcame feed asynchronously
    async initCamera()
    {
        try
        { //requesting access to user's webcame video stream
            const stream = await navigator.mediaDevices.getUserMedia({video : true});
            
            this.video.srcObject = stream; //assigns video stream to video element, allowing it to display onthe page
            console.log("Camera sucessfully started");
        }
        catch(error)
        {
            console.error("Error accessing webcame:", error);
        }
    }
}