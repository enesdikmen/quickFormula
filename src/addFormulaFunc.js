
const {ipcRenderer, remote } = require('electron');
const { evaluate } = require('mathjs')

function getVars(){
    let vars = document.getElementById("varsSection")
    let varNameList = Array.from(vars.children);
    varNameList = varNameList.map(({ value }) => value)
    return varNameList
}

function validateVars(vars){
    //true if duplicate values exist in the array
    if(new Set(vars).size !== vars.length) return false;
    
    for(i=0; i<vars.length; i++){
        if(vars[i] == "") return false;
    }

    return true;
}

function validateFormulaName(name){
    if(name === ""){
        return false;
    }
    return true;
}


function getScope(varNames){
    let scope = {};
    for(i=0; i<varNames.length; i++){
        let key = varNames[i]
        scope[key] = 2; //2 is a random number
    }
    return scope;
}


function validateExp(exp, vars){
    let scope = getScope(vars)
    try {
        evaluate(exp, scope)

    } catch (error) {
        return false
    }
    return true;
}

module.exports = {
    incVarNum: function(){
        let varNumInput = document.getElementById("varNumInput");

        if(varNumInput.value >= 7) return;

        let vars = document.getElementById("varsSection")
        varNumInput.value = String(Number(varNumInput.value) + 1);
        let newVar = document.createElement("input")
        newVar.className = "mx-1 input is-small block"
        newVar.maxLength = "8"
        newVar.style.width = "16%"
        newVar.type = "text"
        vars.appendChild(newVar)
    },

    decVarNum: function(){
        let varNumInput = document.getElementById("varNumInput");
        if(varNumInput.value <= 0) return;

        varNumInput.value = String(Number(varNumInput.value) - 1);
        
        
        let rmVar = document.getElementById("varsSection").lastElementChild
        rmVar.remove()
    },
    
    closeModal: function(){
        let win = remote.getCurrentWindow()
        win.close()
    },

    addFormula: function(){
    

        let formulaName = document.getElementById("newFormulaNameInput").value
        if(!validateFormulaName(formulaName)){
            alert("Invalid formula name!")
            return;
        }
        let vars = getVars()
        if(!validateVars(vars)){
            alert("Invalid variable names!")
            return;
        }  


       
        let expression = document.getElementById("newFormulaInput").value
        if(!validateExp(expression, vars)){
            alert("Invalid expression!");
            return
        }

        
             
        //sending expression and vars to parent window
        let parentid = remote.getCurrentWindow().getParentWindow().webContents.id
        ipcRenderer.sendTo(parentid, 'new-formula', expression, vars, formulaName)
        remote.getCurrentWindow().close()
    }

}