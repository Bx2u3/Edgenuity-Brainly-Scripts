// ==UserScript==
// @name         Edgenuity Easy Brainly Search
// @namespace    reddit.com/u/subatomicmc
// @version      1
// @description  adds some easy searching
// @author       Subatomicmc
// @match        media.edgenuity.com/contentengine/frames/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';
    var button = document.createElement("button")
    button.id = "searchButton"
    button.innerText = "Search on Brainly"
    button.style.position = "absolute"
    button.style.visibility = "visible"
    document.body.append(button)
    document.addEventListener("mouseup" , mouseup)
    document.addEventListener("mousedown" , mousedown)
    var buttonpressed = false;
    function mouseup(e){
        var selection = document.getSelection().toString()
        if(buttonpressed == false && selection != ""){
            document.getElementById("searchButton").style.visibility = "visible"
            document.getElementById("searchButton").style.top = e.clientY + 10 + "px"
            document.getElementById("searchButton").style.left = e.clientX + "px"
        }
        else
        {
            buttonpressed = false
        }
    }
    function mousedown(e){
        var ignore = document.getElementById("searchButton")
        if(e.target === ignore){
            buttonpressed = true
            var url = 'https://brainly.com/app/ask?entry=top&q=' + encodeURIComponent(document.getSelection().toString())
            window.open(url , '_blank')
            return
        }
        document.getElementById("searchButton").style.visibility = "hidden"
        if (window.getSelection) {
            if (window.getSelection().empty) {
                window.getSelection().empty();
            } else if (window.getSelection().removeAllRanges) {
                window.getSelection().removeAllRanges();
            }
        } else if (document.selection) {
            document.selection.empty();
        }
    }
    // Your code here...
})();
