const { remote } = require('electron');
const fileTools = require('./fileOps')

function displayFormula(expression){
    let section = document.getElementById("formulas")
    let newFormula = document.createElement("p")
    newFormula.innerHTML = expression
    newFormula.className = "has-background-warning-light has-text-centered p-1 m-1"
    section.appendChild(newFormula)
}

function validateSubjName(subjName){

    if(!subjName) return false;
    let subjNames = fileTools.getSubjNames()
    for(i=0; i<subjNames.length; i++){
        if (subjName === subjNames[i])   return false;
    }

    return true
}

function makeFormula(exp, vars){
    var formula = {}
    formula.expression = exp
    formula.variables = vars

    return formula
}

module.exports = {

    openModal: function() {

        let win = new remote.BrowserWindow({
            parent: remote.getCurrentWindow(),
            modal: true,
            width: 400,
            height: 400,
            frame: true, //later maybe chage this   
            webPreferences: {
                nodeIntegration: true,
                enableRemoteModule: true
              } 
        })
        //win.webContents.openDevTools()
        win.loadFile('src/addFormula.html');
    },

    saveSubject: function(formulas){
        let subjName = document.getElementById("newSubjName").value
        if(validateSubjName(subjName)){
            
            subj = {}
            subj.name = subjName
            subj.formulas = formulas
            fileTools.addSubj(subj)
            window.location.href = __dirname + "/index.html";

        }
        else{
            alert("Invalid subject name!\n(Name can not be empty or same with an existing subject)")
        }
    },
    addFormula: function(exp, vars){
        let formula = makeFormula(exp, vars)

        displayFormula(exp)
        return formula
    },
    goBack: function(){
        window.location.href = __dirname + "/index.html";
    },


};
