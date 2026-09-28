/*  ##############################################
    #####   Only handwritten code allowed.   #####
    ########################################### */

import Pixel from './pixel.js';

// --- State variables ----------------------------------------

const PIXELS = [];

// --- DOM References -----------------------------------------

const $ = id => document.getElementById(id)

const elCanvas          = $("canvas");
const elCanvasWidth     = $("setting-width");
const elCanvasHeight    = $("setting-height");
const elSaveSettings    = $("save-settings");

const elSaveAsJson      = $("saving-json");

const elTester          = $("tester"); //DEBUG
const elTesterResult    = $("tester-result"); //DEBUG

const STYLESHEET = document.styleSheets[0];

// --- Initialize ---------------------------------------------

document.addEventListener('DOMContentLoaded', init);

async function init() {

    elSaveSettings.addEventListener('click', renderPainter);

    elSaveAsJson.addEventListener('click', saveJson);

    elTester.addEventListener('click', runTest); //DEBUG

    // Initialize interactive elements here
    renderPainter();
}

function initPixels() {
    PIXELS.length = 0;
    const height = elCanvasHeight.value;
    const width = elCanvasWidth.value;
    for (let row=0; row<height; row++) {
        PIXELS.push([]);
        for (let col=0; col<width; col++) {
            const px = new Pixel([row, col]);
            PIXELS[row].push(px);

            // Set corner neighbours
            if (row !== 0) {
                const pxTop = PIXELS[row-1][col];
                // Set top neighbours of current pixel
                px.getCorner(2).setNeighbours(pxTop, null);
                px.getCorner(1).setNeighbours(null, pxTop);

                // Set bottom neighbours of top pixel
                pxTop.getCorner(0).setNeighbours(px, null);
                pxTop.getCorner(3).setNeighbours(null, px);
            }

            if (col !== 0) {
                const pxLeft = PIXELS[row][col-1];
                // Set left neighbours of current pixel
                px.getCorner(2).setNeighbours(null, pxLeft);
                px.getCorner(3).setNeighbours(pxLeft, null);

                // Set right neighbours of left pixel
                pxLeft.getCorner(1).setNeighbours(px, null);
                pxLeft.getCorner(0).setNeighbours(null, px);
            }
        }
    }
}

// --- Settings -----------------------------------------------

// --- Painter ------------------------------------------------

function renderPainter() {

    const pixelSize = '60px';

    // Create pixels
    initPixels();

    while (elCanvas.hasChildNodes()) {
        elCanvas.removeChild(elCanvas.firstChild);
    }

    const height = elCanvasHeight.value;
    const width = elCanvasWidth.value;

    elCanvas.style.setProperty("grid-template-columns", `repeat(${width}, ${pixelSize})`);
    STYLESHEET.insertRule(`.pixel-full {width : ${pixelSize};}`);
    STYLESHEET.insertRule(`.pixel-full {height : ${pixelSize};}`);
    STYLESHEET.insertRule(`.pixel-corner {width : calc(0.5 * ${pixelSize});}`);
    STYLESHEET.insertRule(`.pixel-corner {height : calc(0.5 * ${pixelSize});}`);
    STYLESHEET.insertRule(`.pixel-center {width : ${pixelSize};}`);
    STYLESHEET.insertRule(`.pixel-center {height : ${pixelSize};}`);


    for (let row=0; row<height; row++) {

        for (let col=0; col<width; col++) {
            const elPixel = document.createElement("div");
            elPixel.classList.add('pixel-full');
            elPixel.id = `px-${row}-${col}`;
            
            const elPxSE = document.createElement("div");
            const elPxNE = document.createElement("div");
            const elPxNW = document.createElement("div");
            const elPxSW = document.createElement("div");
            const elPxCenter = document.createElement("div");

            elPxSE.classList.add('pixel-corner', 'pixel-corner-SE');
            elPxNE.classList.add('pixel-corner', 'pixel-corner-NE');
            elPxNW.classList.add('pixel-corner', 'pixel-corner-NW');
            elPxSW.classList.add('pixel-corner', 'pixel-corner-SW');
            elPxCenter.classList.add('pixel-center');

            elPixel.appendChild(elPxSE);
            elPixel.appendChild(elPxNE);
            elPixel.appendChild(elPxNW);
            elPixel.appendChild(elPxSW);
            elPixel.appendChild(elPxCenter);

            elCanvas.appendChild(elPixel);

            elPxSE.addEventListener("click", (e) => {handleToggle(e, row, col)});
            elPxNE.addEventListener("click", (e) => {handleToggle(e, row, col)});
            elPxNW.addEventListener("click", (e) => {handleToggle(e, row, col)});
            elPxSW.addEventListener("click", (e) => {handleToggle(e, row, col)});

            refreshPixel(PIXELS[row][col]);
        }
    }    
}

// --- Gridlines

// --- Colour

function refreshPixel(pixel) {
    const position = pixel.getPosition();
    // colour pixel corners
    const corners = pixel.getCorners();
    for(let i = 0; i<4; i++) {
        const state = corners[i].getState();
        // determine full-pixel div
        // get its corner divs
        // update colour of corner divs
    }

    // update colour of pixel center
    const row = position[0];
    const col = position[1];
    const elPixel = document.getElementById(`px-${row}-${col}`);

    const colourOn = '#AB0808';
    const colourOff = 'white';

    const elPxSE = elPixel.children.item(0);
    const elPxNE = elPixel.children.item(1);
    const elPxNW = elPixel.children.item(2);
    const elPxSW = elPixel.children.item(3);
    const elPxCenter = elPixel.children.item(4);

    elPxSE.style.setProperty("background", pixel.getCorner(0).getState() ? colourOn : colourOff);
    elPxNE.style.setProperty("background", pixel.getCorner(1).getState() ? colourOn : colourOff);
    elPxNW.style.setProperty("background", pixel.getCorner(2).getState() ? colourOn : colourOff);
    elPxSW.style.setProperty("background", pixel.getCorner(3).getState() ? colourOn : colourOff);
    elPxCenter.style.setProperty("background", pixel.getState() ? colourOn : colourOff);
}

// --- Load document ------------------------------------------

function loadDocumentJson(path) {
    
    // checks
    assertSizeMatch(null, null);
    // set pixel's neighbours
}

function assertSizeMatch(size, image) {

}

// --- Save document ------------------------------------------

// --- svg 

// Check if size has been set

// --- png

// Check if size has been set

// --- json

function saveJson() {
    const jsonSettings = toJsonSettings();
    const jsonImage = toJsonImage();

    const json = JSON.stringify(jsonSettings + jsonImage, null, "  ");

    // save at path
    console.log(json); // dummy 
}

// Save settings

function toJsonSettings() {
    const jsonSettings = "";
    return jsonSettings;
}

// Save image

function toJsonImage() {
    let jsonImage = "{";

    for( let px of PIXELS) {
        jsonImage += px.toString() + ", ";
    }

    jsonImage += "}";

    return jsonImage;
}

// --- Helpers ------------------------------------------------

function handleToggle(e, row, col) {

    const px = PIXELS[row][col];
    
    const cornerCSSClass = e.currentTarget.classList[1];
    let orientation = null;
    switch(cornerCSSClass) {
        case ('pixel-corner-SE'):
            orientation = 0;
            break;
        case ('pixel-corner-NE'):
            orientation = 1;
            break;
        case ('pixel-corner-NW'):
            orientation = 2;
            break;
        case ('pixel-corner-SW'):
            orientation = 3;
            break;
    }

    if (e.shiftKey) { // Toggle corner mode
        console.log(px.getCorner(orientation).getNeighboursStates()); //debug
        px.getCorner(orientation).toggleState();
    } else if (e.ctrlKey) { // Toggle individual corners
        px.getCorner(orientation).toggleState();
    } else { // Toggle center
        px.toggleState();
        for (let o=0;o>4;o++) {
            const c = px.getCorners()[o];
            autoMerge(c);
            const nbc = c.getNeighboursCorners();
            for (let p=0;p>3;p++) {
                autoMerge(nbc[p]);
            }
        }
    }

    refreshPixel(px);
}

function autoMerge(corner) {
    const nbR = corner.getNeighboursStates()[0];
    const nbM = corner.getNeighboursStates()[1];
    const nbL = corner.getNeighboursStates()[2];

    corner.setState(false);

    const isOn = corner.getPixel().getState();
    if (isOn && (nbR || nbM || nbL)) {
        corner.setState(true);
    }
    if (nbR && nbL) {
        corner.setState(true);
    }

    refreshPixel(corner.getPixel());
}

function runTest() { //DEBUG
    const px = PIXELS[3][3];
    /*px.getCorner(0).setNeighbours(PIXELS[2][1], PIXELS[1][2]);
    px.getCorner(0).setNeighbours(PIXELS[2][2], null);*/
    //const neighbours = px.getCorner(2).getNeighboursStates();
    //const neighbours = c.getNeighbours()[0]?.getCorner((c.getOrientation() + 1) % 4).getNeighbours()[0]?.getState();
    for (let row=0;row<8;row++) {
        for(let col=0;col<8;col++) {
            const pix = PIXELS[row][col];
            for (let o = 0; o<4; o++) {
                const c = pix.getCorner(o); 
                const state = c.getNeighbours()[0]?.getCorner((o+1)%4).getNeighbours()[0]?.getState();
                if (state) {
                    //c.toggleState();
                }

                if (c.getNeighboursStates()[1]) {
                    c.toggleState();
                }
            }
        }
    }
    /*for (let o = 0; o<4; o++) {
        const c = px.getCorner(o%4);
        const dg = c.getNeighbours()[0].getCorner((o+1)%4).getNeighbours()[0];
        const state = dg.getState();
        if (state) c.toggleState();

        //if (c.getNeighboursStates()) c.toggleState();
    }*/

    PIXELS.forEach(e => e.forEach(refreshPixel));

    //const result = neighbours ?? "nothing.";

    // Display result
    //elTesterResult.textContent = result;

}