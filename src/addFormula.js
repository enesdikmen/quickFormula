var tools = require('./addFormulaFunc');


document.getElementById("incVarButton").addEventListener("click", tools.incVarNum);

document.getElementById("decVarButton").addEventListener("click", tools.decVarNum);


document.getElementById("saveFormulaButton").addEventListener("click", tools.addFormula)

document.getElementById("cancelFormulaButton").addEventListener("click", tools.closeModal)