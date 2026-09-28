```plaintext
     _________________________________________   
  ,"                                           ",
  |         _         ,_ ,_  ,_          ,_     |
  |    ,__ (_),__, __ | || | | | __  __  | |    |
  |    | .\| |\  // .)| || .\| |/ .)/ .)/. |    |
  |    | ,/\_|/__\\__\\_||__/\_|\__\\__\\__|    |
  |    \_|                                      |
  |                                             |
   "-_________________________________________-" 
```

---

<img align="left" src="images/logoPixelbleed03.1.png" alt="Pixelbleed Logo" width="100">

Custom renderer for pixel art with pixel rounding and rendering as an output.

This repo is not meant to be a public tool to solve a problem that has plagued the artistic community for centuries. Instead, I will use this project as a way to get better at coding by hand and reading documentations. 

Everything in this repo must be hand-written and cannot be AI-generated. Code from forums or tutorials must be fully understood before adding them to the repo.

All information should come primarily from documentations and forums. If I get stuck on a specific problem for over three hours, I allow myself to ask a very targeted question to an LLM to get myself unstuck.

# Features

Pixelbleed is a pixel art editor that allows merging diagonally adjacent pixels and round off corners using _a variety of corner styles_\* with control over which pixels are merged and which ones stay disconnected. You can adjust the canvas size and create pixel art in one colour.

The pixel art can be rendered as an `.svg` _or a transparent `.png`_\* file _or be saved as a `.json` file to save the progress to continue in a later session_\*.

\* Features written in _cursive_ will be implemented by **v1.0.0**.

# Run in browser

In the repo's root, run 
```bash 
python -m http.server 8080
```
then open http://localhost:8080.

# Changelog

- 260928, **v0.1.0-alpha**: Added default auto-merging behaviour when modifying pixels.
- 260927, **v0.0.3-alpha**: Made UI worth lookin at. Pixels respond to interaction.
- 260926, **v0.0.2-alpha**: Structured layout, created official logos.
- 260921, **v0.0.1-alpha**: Setup html file.

---


<div style="text-align:center;">
⢠⡶⠛⠛⠛⠛⣤  <br>
⠻⣦⣴⣿⣤⣤⡀  <br>
⣼⠃⠀⣿⠀⢀⡟  <br>
⠉⠛⠛⣿⠛⠉⣠  <br>
⠀⠀⠀⣿⠀⠀⢶  <br>
</div>