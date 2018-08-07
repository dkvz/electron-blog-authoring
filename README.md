# Electron Blog Authoring
Mostly an experiment about using Electron. And Preact, because React is very hip right now, I don't like it, and I want to change my minde.

## About Photon
I downloaded the pre-compiled Photon release. I have very little interest in processing SASS for this project.

I then copied the whole thing into my "assets" directory as is.

Quick link to available components: http://photonkit.com/components/

## Styling
There are component-specific styles in base.css.

### Notes
* Buttons in the toolbar can receive the "active" classe.
* I think I need to register a hook in editor-events to check if the article was modified. Could be a boolean and the first on-change is triggering it. Now for the two Editor components I'll need something else (maybe register an event to on-input at first, then unregister it at first occurence).

## TODO
- [ ] Main.js doesn't have semicolons (copied it from elsewhere) - Can prettier do something for me there?
- [ ] I'm implementing the W3C modal lul: https://www.w3schools.com/howto/tryit.asp?filename=tryhow_css_modal2
- [ ] There is a flash before the main page is rendered, it appears white for a few seconds. I can probably do something in index.jsx to have a starter content and replace it when the Preact stuff is ready.
- [ ] Fix a minimum window width and height. The modals max-width must be adapted in consequence.
- [ ] For the moment, saving doesn't reset state.modified to false in App.jsx. It should.
- [ ] Once I reconcile the previous point I can add a marker for modified article in the status bar or application title.