const tools = require('./subjectFunc')


document.addEventListener("DOMContentLoaded", ()=>{
    tools.loadPage();
})

document.getElementById("backButton").addEventListener("click", tools.goBack)

document.getElementById("deleteButton").addEventListener("click", tools.deleteSubject)