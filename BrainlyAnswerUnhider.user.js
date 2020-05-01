// ==UserScript==
// @name         Brainly Answer Unhider
// @namespace    reddit.com/u/subatomicmc
// @version      1
// @description  Unhides Brainly answers
// @author       Subatomicmc
// @match        https://brainly.com/question/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';
    var data = document.getElementsByClassName("js-main-question").item(0).dataset.z
    var index = data.indexOf('"content":"') + 11
    console.log(index)
    var answers = []
    while(true){
        var begin = data.indexOf('"content":"', index) + 11
        if(begin < index){
            break
        }
        console.log(begin)
        index = data.indexOf('"', begin)
        answers.push(data.substring(begin , index))
        var tempi = data.indexOf("comments", index)
        if (tempi > index)
        {
            index = data.indexOf( '}',tempi)
        }
    }
    console.log(answers)
    removeElms("brn-kodiak-answer__unlock")
    removeElms("brn-kodiak-answer__preview-end")
    var answerBoxes = document.getElementsByClassName("brn-kodiak-answer__content")
    for(var i = 0; i<answerBoxes.length ; i++){
        if(answers.length > 0){
            answerBoxes[i].innerHTML = decodeURIComponent(JSON.parse('"' + answers[i].replace('"', '\\"') + '"'))
        }
        else
        {
            answerBoxes[i].innerHTML = "This script only works when signed into a brainly account. Please create a free one and sign in"
        }
    }

    function removeElms(classname){
        var paras = document.getElementsByClassName(classname);
        while(paras[0]) {
            paras[0].parentNode.removeChild(paras[0]);
        }
    }
})();
