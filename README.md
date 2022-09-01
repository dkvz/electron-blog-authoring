# Electron Blog Authoring
Mostly an experiment about using Electron. And Preact, because React is very hip right now, I don't like it, and I want to change my mind.

## About Photon
I downloaded the pre-compiled Photon release. I have very little interest in processing SASS for this project.

I then copied the whole thing into my "assets" directory as is.

Quick link to available components: http://photonkit.com/components/

## Menus
Default menu roles here: https://electronjs.org/docs/api/menu-item#roles

I pretty much used their default menu from here: https://electronjs.org/docs/api/menu#examples
But added File and put it in a separate file (which requires a few imports).

## App name
The app name is currently all over the place.

The recommended way is to add a key called "productName" in package.json which is allowed to contain spaces etc. (unlike "name").

Then you can access that using app.getName();

## Styling
There are component-specific styles in base.css.

### Notes
* Buttons in the toolbar can receive the "active" classe.
* I think I need to register a hook in editor-events to check if the article was modified. Could be a boolean and the first on-change is triggering it. Now for the two Editor components I'll need something else (maybe register an event to on-input at first, then unregister it at first occurence).

## Issues

### Searching and cursor position
It looks like the cursor positioning works fine when you close the search box. So the search box is doing something that prevents the editor to scroll.

-> The problem seems to just be related to when focus() is called, it has to be called **after** setting the cursor position.

We need to set selectionStart and End to the **same** value first, then set the selection. I don't know why that is but that exact sequence of events has to happen. Using of setInterval is not needed.

For instance, this code works for the forward lookup:
```js
const relativePos = currentEditor.selectionEnd + pos;
currentEditor.selectionStart = relativePos;
currentEditor.selectionEnd = relativePos;
currentEditor.focus();
currentEditor.setSelectionRange(
  relativePos, 
  relativePos + e.detail.query.length
);
```

Backwards has to have a similar sequence of operations as well.

## TODO
- [ ] Add a shortcut to go to bottom of article (and another one for top).
- [ ] Add a way to set the article ID and a clear mention of its presence or absence.
- [ ] Le raccourci pour ajouter une image standard est le même que texte en italique.
- [ ] Pourquoi y a des TODO en français et en anglais, il s'est passé quoi ici?
- [ ] Pourrait être pas mal d'utiliser un éditeur riche qui existe déjà comme Monaco ou un plus léger, voire même avoir l'option pour changer de natif à "enhanced".
- [ ] Ajouter un moyen d'ouvrir rapidement le dernier fichier qui était ouvert.
- [ ] L'insertion d'image devrait montrer une boite de dialogue pour toutes les options - Ce qui pourrait être modulaire pour d'autres bidules d'insertion.
- [ ] Quand on ouvre la fenêtre de recherche, qu'on trouve un élément, et qu'on fait Ctrl+S à ce moment-là, le focus se place sur la boîte de recherche. Ce qui n'est pas normal.
- [x] Très embêtant: quand on cherche dans un gros fichier, on dirait que la surbrillance de l'élément trouvé laisse le scroll où il était plutôt que de centrer la vue sur ce qui est trouvé.
- [ ] Faire en sorte que Ctrl+Z fonctionne quand on utilise les éléments du menu "Insert". Si j'ajoute une fonction de search/replace ça, Ctrl+Z risque de ne pas fonctionner non plus.
- [ ] Vérifier quelle est la dernière version d'Electron, et s'ils travaillent toujours avec electron/main.js. On dirait qu'il est désormais déconseillé d'interargir avec Electron depuis les vues (voir console dans les dev tools).
- [ ] Add .env so that we can use npm start on both Unix-based and Windows platforms and get rid of the "start-win" script.
- [x] Closing the search box should focus the active editor.
- [x] Change cursor for the editors, it shouldn't be the pointer.
- [ ] We should style disabled inputs, they appear the same right now.
- [ ] I should change all my uses of the name elsewhere by a call to app.getName().
- [x] Pressing escape in the search box should call the onClose event to hide it.
- [ ] Since searching uses regex, determining the length of the search string is erratic, so I use the length of the regex string to highlight the text, but that might be the wrong size. We may want to think on that one day.
- [x] Add a Save As menu item.
- [ ] Main.js doesn't have semicolons (copied it from elsewhere) - Can prettier do something for me there?
- [ ] There is a flash before the main page is rendered, it appears white for a few seconds. I can probably do something in index.jsx to have a starter content and replace it when the Preact stuff is ready.
- [ ] Fix a minimum window width and height. The modals max-width must be adapted in consequence.
- [ ] Make it so that you can open JSON encoded in something else than utf-8.