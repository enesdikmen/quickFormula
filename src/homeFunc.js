const fileTools = require('./fileOps')
const { remote, ipcRenderer } = require('electron');

function subjPage(subjName){

    ipcRenderer.invoke('current-subject', subjName)
    window.location.href = __dirname + "/subject.html";

}

module.exports = {
    listSubjs: function(){
        let subjects = fileTools.getSubjNames()
        subjects.forEach(subject=>{
            let button = document.createElement("button");
            button.classList="button is-success is-fullwidth m-1 subjectButton";
            button.innerHTML = subject;
            button.id = subject
            document.getElementById("subjectsList").appendChild(button);
        })
    },

    addLinks: function(){
        let subjects = document.querySelectorAll(".subjectButton");
        subjects.forEach(subject =>{
            subject.addEventListener("click", ()=>{
                subjPage(subject.id)
            })
        })
    
        
    }
}
