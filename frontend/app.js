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

// --- Initialize ---------------------------------------------

document.addEventListener('DOMContentLoaded', init);

async function init() {

    elSaveSettings.addEventListener('click', renderPainter);

    // Initialize interactive elements here
    renderPainter();
    // create pixels

    const px = document.getElementById("px-0-0");
    px.innerHTML="this";
}

function initPixels() {
    PIXELS.length = 0;
    const height = elCanvasHeight.value;
    const width = elCanvasWidth.value;
    for (let row=0; row<height; row++) {
        PIXELS.push([]);
        for (let col=0; col<width; col++) {
            const pixel = new Pixel([col, row]);
            PIXELS[row].push(pixel);
        }
    }
}

// --- Settings -----------------------------------------------

// --- Painter ------------------------------------------------

function renderPainter() {
    while (elCanvas.hasChildNodes()) {
        elCanvas.removeChild(elCanvas.firstChild);
    }

    initPixels();

    const height = elCanvasHeight.value;
    const width = elCanvasWidth.value;

    elCanvas.style.setProperty("grid-template-columns", `repeat(${width}, 40px)`);

    for (let row=0; row<height; row++) {
        //const elRow = document.createElement("div");

        for (let col=0; col<width; col++) {
            const elPixel = document.createElement("div");
            elPixel.classList.add('pixel-full');
            elPixel.id = `px-${row}-${col}`;
            elPixel.innerHTML = `${row}, ${col}`;
            elPixel.addEventListener("click", handleToggle(row, col));
            
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

            /*elPxNE.innerHTML = `${col}, ${row}`;
            elPxNW.innerHTML = `${col}, ${row}`;
            elPxSW.innerHTML = `${col}, ${row}`;*/

            elPixel.appendChild(elPxSE);
            elPixel.appendChild(elPxNE);
            elPixel.appendChild(elPxNW);
            elPixel.appendChild(elPxSW);
            elPixel.appendChild(elPxCenter);

            elCanvas.appendChild(elPixel);
        }

        //elCanvas.appendChild(elRow);
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
    elPixel.setProperty("background", parseInt(pixel.state));
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
    //refreshPixel(px);
}