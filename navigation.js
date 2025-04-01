/**
 * 
 *  Handles page navigation for the Photobooth project.
 * 
 *      It sets up click event listeners on buttons that navigate between:
 *          - Frame Editor page (frameEditor.html)
 *          - Filter Editor page (filterEditor.html)
 *          - Save page (save.html)
 *
 */


export class Navigation
{
    constructor () {
        this.setUpNavigation();
        console.log("Navigation constructor running");
    }

    setUpNavigation()
    {
        const goToFilterButtons = document.querySelectorAll(".goToFilterEditor");
        goToFilterButtons.forEach(button => {
            button.addEventListener("click", () => {
                window.location.href = "filterEditor.html";
                console.log("Pressed goToFilterButton")
            });
        });

        const goToFrameButtons = document.querySelectorAll(".goToFrameEditor");
        goToFrameButtons.forEach(button => {
            button.addEventListener("click", () => {
                window.location.href = "frameEditor.html";
            });
        });

        const goToSaveButtons = document.querySelectorAll(".goToSave");
        goToSaveButtons.forEach (button => {
            button.addEventListener("click", ()=> {
                window.location.href = "save.html";
            });
        });
    }
}