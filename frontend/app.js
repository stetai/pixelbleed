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

const STYLESHEET = document.styleSheets[0];

// --- Initialize ---------------------------------------------

document.addEventListener('DOMContentLoaded', init);

async function init() {

    elSaveSettings.addEventListener('click', renderPainter);

    // Create pixels
    initPixels();

    // Initialize interactive elements here
    renderPainter();

    // Draw pixels
    PIXELS.forEach(element => {
        refreshPixel(element);
    });
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

    while (elCanvas.hasChildNodes()) {
        elCanvas.removeChild(elCanvas.firstChild);
    }

    const height = elCanvasHeight.value;
    const width = elCanvasWidth.value;

    elCanvas.style.setProperty("grid-template-columns", `repeat(${width}, ${pixelSize})`);
    //document.styleSheets[0].insertRule(`.pixel-full {width : ${pixelSize};}`);
    STYLESHEET.insertRule(`.pixel-corner {width : calc(0.5 * ${pixelSize});}`);
    STYLESHEET.insertRule(`.pixel-corner {height : calc(0.5 * ${pixelSize});}`);


    for (let row=0; row<height; row++) {

        for (let col=0; col<width; col++) {
            const elPixel = document.createElement("div");
            elPixel.classList.add('pixel-full');
            elPixel.id = `px-${row}-${col}`;
            elPixel.innerHTML = `${row},${col}`;
            
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
    const colourOff = 'lightblue';

    elPixel.style.setProperty("background", pixel.getState() ? colourOn : colourOff);
}

// --- Load document ------------------------------------------

// --- Save document ------------------------------------------

// --- svg 

// Check if size has been set

// --- png

// Check if size has been set

// --- pxbld

// Save settings

// Save image

// --- Helpers ------------------------------------------------

function handleToggle(row, col) {
    const px = PIXELS[row][col];
    px.toggleState();
    refreshPixel(px);
}