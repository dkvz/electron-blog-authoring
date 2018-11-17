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

## TODO
- [ ] Quand on ouvre la fenêtre de recherche, qu'on trouve un élément, et qu'on fait Ctrl+S à ce moment-là, le focus se place sur la boîte de recherche. Ce qui n'est pas normal.
- [ ] Très embêtant: quand on cherche dans un gros fichier, on dirait que la surbrillance de l'élément trouvé laisse le scroll où il était plutôt que de centrer la vue sur ce qui est trouvé.
- [ ] Closing the search box should focus the active editor.
- [ ] Change cursor for the editors, it shouldn't be the pointer.
- [ ] We can't Ctrl + Z the insert paragraph thing. We should be able to. Maybe by sending an editor event?
- [ ] We should style disabled inputs, they appear the same right now.
- [ ] I should change all my uses of the name elsewhere by a call to app.getName().
- [ ] Pressing escape in the search box should call the onClose event to hide it.
- [ ] Since searching uses regex, determining the length of the search string is erratic, so I use the length of the regex string to highlight the text, but that might be the wrong size. We may want to think on that one day.
- [x] Add a Save As menu item.
- [ ] Main.js doesn't have semicolons (copied it from elsewhere) - Can prettier do something for me there?
- [ ] There is a flash before the main page is rendered, it appears white for a few seconds. I can probably do something in index.jsx to have a starter content and replace it when the Preact stuff is ready.
- [ ] Fix a minimum window width and height. The modals max-width must be adapted in consequence.
- [ ] For the moment, saving doesn't reset state.modified to false in App.jsx. It should.
- [ ] Once I reconcile the previous point I can add a marker for modified article in the status bar or application title.
- [ ] Make it so that you can open JSON encoded in something else than utf-8.
- [ ] When comparing boolean values I should always use === or JS is actually casting or looking for "falsy" which is less effective.