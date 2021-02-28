const {ipcRenderer } = require('electron');
const tools = require('./addSubjectFunc');

var formulas = [];

document.getElementById("addFormulaButton").addEventListener("click", tools.openModal)

ipcRenderer.on('new-formula', (event, exp, vars) =>{
    let formula = tools.addFormula(exp, vars);
    formulas.push(formula)
})


document.getElementById("saveSubjectButton").addEventListener("click", ()=>{
    tools.saveSubject(formulas)
})

document.getElementById("backButton").addEventListener("click", tools.goBack)