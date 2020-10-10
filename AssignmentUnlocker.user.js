// ==UserScript==
// @name         Assignment Unlocker
// @namespace    http://tampermonkey.net/
// @version      1.2.1
// @description  Lets you start locked assignments
// @author       SubatomicMC
// @match        https://student.edgenuity.com/*
// @grant        none
// ==/UserScript==

(function() {
    var url;
    var observerTimeout;
    'use strict';
    function readCookie(name) {
        var nameEQ = name + "=";
        var ca = document.cookie.split(';');
        for(var i=0;i < ca.length;i++) {
            var c = ca[i];
            while (c.charAt(0)==' ') c = c.substring(1,c.length);
            if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
        }
        return null;
    }
    function checkURL(){
        if(url != document.location.href){
            url = document.location.href;
            clearTimeout(observerTimeout);
            console.log("url changed")
            if(url.indexOf("https://student.edgenuity.com/enrollment/")!= -1){
                console.log("is timeline");
                tryToStartObserver();
            }
        }

    }
    function tryToStartObserver(){
        if(document.getElementsByClassName("course-timeline").length == 0){
            setTimeout(tryToStartObserver,100);
            console.log("cant find timeline. waiting");
            return;
        }
        var realm = JSON.parse(readCookie("TokenData")).Realm.toString();
        var loc = document.location.href;
        var temp = loc.indexOf("enrollment") + 11;
        var enrollment = loc.substr(temp,36);
        var url = '//r' + (realm.length == 1?"0":"") + realm + ".core.learn.edgenuity.com/lmsapi/sle/api/enrollments/"+ enrollment +"/activity/";
        var lastButton = null;
        for(var node of document.getElementsByClassName("ActivityTile-status-gated")){
            node.setAttribute("onclick", "document.location='"+ url + node.id + "'");
        }
        function mutationFunc(mutationsList, observer){
            for(const mutation of mutationsList) {
                for(var node of mutation.addedNodes){
                    if(node.classList.contains("ActivityTile-status-gated") || node.classList.contains("ActivityTile-status-locked")){
                        console.log("found locked button")
                        lastButton = node;
                        node.setAttribute("onclick", "document.location='"+ url + node.id + "'");
                    }
                }
            }
        }
        var observer = new MutationObserver(mutationFunc);
        observer.observe(document.getElementsByClassName("course-timeline")[0],{ attributes: false, childList: true, subtree: true });
    }
    url = document.location.href;
    setInterval(checkURL,100);
    if(url.indexOf("https://student.edgenuity.com/enrollment/")!= -1){
        tryToStartObserver();
    }
})();
