```text
   _________________________________________
 ,"                                         ",
|         _         ,_ ,_  ,_          ,_     |
|    ,__ (_),__, __ | || | | | __  __  | |    |
|    | .\| |\  // .)| || .\| |/ .)/ .)/. |    |
|    | ,/\_|/__\\__\\_||__/\_|\__\\__\\__|    |
|    \_|                                      |
|                                             |
 "-_________________________________________-"
```
---

Custom renderer for pixel art

# Features

Pixelbleed is a pixel art editor that allows merging diagonally adjacent pixels using rounded corners _or other corner styles_\* with control over which pixels are merged and which ones stay disconnecte. You can create pixel art in one colour.

The pixel art can be rendered as an `.svg` _or a transparent `.png`_\* file _or be saved as a local `.pxbld` file to save the progress to continue in a later session_\*.

\* Features written in _cursive_ will be implemented in the future.

# Run in browser

In the repo's root, run 
```bash 
python -m http.server 8080
```
then open http://localhost:8080.

# Changelog

- 260926, **v0.0.2-alpha**: 
- 260921, **v0.0.1-alpha**: Setup html file.