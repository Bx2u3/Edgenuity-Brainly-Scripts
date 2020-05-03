// ==UserScript==
// @name         Edgenuity Easy Brainly Search
// @namespace    reddit.com/u/subatomicmc
// @version      1
// @description  adds some easy searching
// @author       Subatomicmc
// @match        https://r09.core.learn.edgenuity.com/Player/
// @grant        none
// ==/UserScript==

(function() {
    'use strict';
    var innerFrameExists = false
    var theDocument = document.getElementById("stageFrame").contentDocument
    var theWindow = document.getElementById("stageFrame").contentWindow
    var frameBody = document.getElementById("stageFrame")
    var buttonpressed = false
    var button = document.createElement("button")
    button.id = "searchButton"
    button.innerText = "Search on Brainly"
    button.style.position = "absolute"
    button.style.visibility = "visible"
    document.body.append(button)
    document.getElementById("searchButton").onclick = function(){
        buttonpressed = true
        var url = 'https://brainly.com/app/ask?entry=top&q=' + encodeURIComponent(theDocument.getSelection().toString())
        window.open(url , '_blank')}
    setInterval(addthestuff , 300)
    function addthestuff()
    {
        if(frameBody.contentDocument.getElementById("iFramePreview") != null)
        {
            frameBody = frameBody.contentDocument.getElementById("iFramePreview")
        }
        else
        {
            frameBody = document.getElementById("stageFrame")
        }
        if(frameBody.onmousedown == null || frameBody.onmouseup == null)
        {
            theDocument = frameBody.contentDocument
            theWindow = frameBody.contentWindow
            frameBody.contentDocument.body.onmouseup = mouseup
            frameBody.contentDocument.body.onmousedown = mousedown
        }
    }
    function mouseup(e){
        var selection = theDocument.getSelection().toString()
        if(buttonpressed == false && selection != ""){
            var rect = frameBody.getBoundingClientRect()
            document.getElementById("searchButton").style.visibility = "visible"
            document.getElementById("searchButton").style.top = e.clientY + rect.y + 10 + "px"
            document.getElementById("searchButton").style.left = e.clientX + rect.x + "px"
        }
        else
        {
            buttonpressed = false
        }
    }
    function mousedown(e){
        document.getElementById("searchButton").style.visibility = "hidden"
        if (theWindow.getSelection) {
            if (theWindow.getSelection().empty) {
                theWindow.getSelection().empty();
            } else if (theWindow.getSelection().removeAllRanges) {
                theWindow.getSelection().removeAllRanges();
            }
        } else if (theDocument.selection) {
            theDocument.selection.empty();
        }
    }
    // Your code here...
})();
