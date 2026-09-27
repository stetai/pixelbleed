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

const STYLESHEET = document.styleSheets[0];

// --- Initialize ---------------------------------------------

document.addEventListener('DOMContentLoaded', init);

async function init() {

    elSaveSettings.addEventListener('click', renderPainter);

    elSaveAsJson.addEventListener('click', saveJson);

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
            //elPixel.innerHTML = `${row},${col}`; // debug
            
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

            //elPxNE.innerHTML = `${col}, ${row}`;
            //elPxNW.innerHTML = `${col}, ${row}`;
            //elPxSW.innerHTML = `${col}, ${row}`;

            elPixel.appendChild(elPxSE);
            elPixel.appendChild(elPxNE);
            elPixel.appendChild(elPxNW);
            elPixel.appendChild(elPxSW);
            elPixel.appendChild(elPxCenter);

            elCanvas.appendChild(elPixel);

            elPixel.addEventListener("click", (e) => {handleToggle(row, col)});

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

    elPixel.style.setProperty("background", pixel.getState() ? colourOn : colourOff);
}

// --- Load document ------------------------------------------

function loadDocumentJson(path) {
    
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

    for( const px of PIXELS) {
        jsonImage += px.toString() + ", ";
    }

    jsonImage += "}";

    return jsonImage;
}

// --- Helpers ------------------------------------------------

function handleToggle(row, col) {
    const px = PIXELS[row][col];
    px.toggleState();
    refreshPixel(px);
}