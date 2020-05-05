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
    function unicodeToChar(text) {
        return text.replace(/\\u[\dA-F]{4}/gi,
                            function (match) {
            return String.fromCharCode(parseInt(match.replace(/\\u/g, ''), 16));
        });
    }
    var data = document.getElementsByClassName("js-main-question").item(0).dataset.z
    if(data.length > 20)
    {
        var index = data.indexOf('"content":"') + 11
        console.log(index)
        var answers = []
        while(true){
            var begin = data.indexOf('"content":"', index) + 11
            if(begin < index){
                break
            }
            index = data.indexOf('"mark"', begin)-2
            answers.push(data.substring(begin , index))
            var tempi = data.indexOf("comments", index)
            if(tempi > index){
                index = data.indexOf( '}',tempi)
            }
            if(index < begin)
            {break}
            console.log("begin" + begin)
            console.log("index" + index)
            console.log("comments" + tempi)
            console.log("==================")
        }
        console.log(answers)
        removeElms("brn-kodiak-answer__unlock")
        removeElms("brn-kodiak-answer__preview-end")
        var answerBoxes = document.getElementsByClassName("brn-kodiak-answer__content")
        for(var i = 0; i<answerBoxes.length ; i++){
            answerBoxes[i].innerHTML = decodeURIComponent(unicodeToChar(answers[i].replace(/<\\\//g , "</")))
        }

        function removeElms(classname){
            var paras = document.getElementsByClassName(classname);
            while(paras[0]) {
                paras[0].parentNode.removeChild(paras[0]);
            }
        }
    }
    else
    {
        window.alert('The userscript "Brainly Answer Unhider" requires you to be signed in because of the way Brainly loads data')
    }
})();
