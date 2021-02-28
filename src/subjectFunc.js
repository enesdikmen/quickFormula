const { remote, ipcRenderer } = require('electron');
const fileTools = require('./fileOps');
const { evaluate } = require('mathjs')


function getSubjName(){
    let subjName = ipcRenderer.sendSync('subjectname-message');
    return subjName;
}

function setHeading(){
        let subjName = ipcRenderer.sendSync('subjectname-message');
        let subjHeader = document.getElementById("subjName");
        subjHeader.innerHTML = subjName;
        return subjName;
}

function getVarNames(subjName, id){
    let subj = fileTools.getSubj(subjName);
    return subj.formulas[id].variables
}

function formatVars(formula){
    let vars = formula.variables;
    let elements = [];
    for(i=0; i<vars.length; i++){
        let field = document.createElement("div")
        field.classList = "field has-addons";
        
        let control1 = document.createElement("div");
        control1.classList = "control"

        let varName = document.createElement("a");
        varName.classList = "button is-static";
        varName.innerHTML = vars[i];

        let control2 = document.createElement("div");
        control2.classList = "control";

        let input = document.createElement("input");
        input.classList = "input varInp";
        //input.style.width = "16%"
        input.type = "number";

        let column = document.createElement("div");
        column.classList = "column is-one-third px-1"

        control1.appendChild(varName)
        control2.appendChild(input)
        field.appendChild(control1)
        field.appendChild(control2)
        column.appendChild(field)

        elements.push(column);
    }

    return elements;
}

function loadFormulas(subj){
    
    let formulasSection = document.getElementById("formulas");
        
        //loads each formula
        subj.formulas.forEach((formula, index)=>{
            
            let formulaElement = document.createElement("div");
            formulaElement.classList = "mb-2"
            
            let div = document.createElement("div");
            div.classList = "columns is-multiline is-mobile";
            div.id = index + "formula"
            //loads each variable input
            let elements =  formatVars(formula)
            elements.forEach((element)=>{
                div.appendChild(element)
            });

            //loads formula expression
            let p = document.createElement("p");
            p.classList = "is-size-5 p-4"
            p.innerHTML = formula.expression

            //loads calculate and result
            let resultSection = document.createElement("div");
            resultSection.classList = "level is-mobile mt-5";

            let item1 = document.createElement("div");
            item1.classList = "item-level";
            
            let item2 = document.createElement("div");
            item2.classList = "item-level";
            
            let item3 = document.createElement("div");
            item3.classList = "item-level";
            
            let calcButton = document.createElement("button");
            calcButton.classList = "button is-rounded is-success calc";
            calcButton.innerHTML = "Calculate";
            calcButton.id = index + "calcButton";

            let resultInp = document.createElement("input");
            resultInp.classList = "input has-text-right";
            resultInp.readOnly = true;
            resultInp.value = "";
            resultInp.id = index + "resultInp";
            resultInp.style.width = "50%";

            let label = document.createElement("label");
            label.classList = "label";
            label.innerHTML = "Result:";

            let fullFormula = document.createElement("div");
            fullFormula.classList = "box";
            
            item1.appendChild(calcButton);
            item2.appendChild(label);
            item3.appendChild(resultInp);

            resultSection.appendChild(item1);
            resultSection.appendChild(item2);
            resultSection.appendChild(item3);

            formulaElement.appendChild(p);
            formulaElement.appendChild(div)

            fullFormula.appendChild(formulaElement);
            fullFormula.appendChild(resultSection);

            formulasSection.appendChild(fullFormula);

        });
}

function getExp(subjName, id){
    let subj = fileTools.getSubj(subjName);

    return subj.formulas[id].expression
}

function getVarInps(id){

    let varsElement = document.getElementById(id + "formula")
    let varInps = varsElement.querySelectorAll(".varInp")
    let vars = [];
    //traverse through input values
    varInps.forEach(inp =>{
        vars.push(inp.value)
    });
    return vars;
}

function getScope(varNames, varValues){
    let scope = {};
    for(i=0; i<varNames.length; i++){
        let key = varNames[i]
        scope[key] = varValues[i];
    }
    return scope;
}

function calculate(scope, expression){
    let result =  evaluate(expression, scope)
    return result;
}

function addCalcs(subjName){
    let calcButtons = document.querySelectorAll(".calc")
        calcButtons.forEach(button=>{
            button.addEventListener("click", ()=>{
                let varNames = getVarNames(subjName, button.id[0])
                let varInps = getVarInps(button.id[0]);

                let scope = getScope(varNames, varInps);
                let expression = getExp(subjName, button.id[0]);
                
                let result = calculate(scope, expression)
                let resultElement = document.getElementById(button.id[0] + "resultInp")
                resultElement.value = result;
            });

        });
}

module.exports = {

    loadPage: function(){
        
        let subjName = setHeading();
        let subj = fileTools.getSubj(subjName);
        loadFormulas(subj)
        addCalcs(subjName)

    },

    goBack: function(){
        window.location.href = __dirname + "/index.html";

    },
   
   
    deleteSubject: function(){
        let subjName = getSubjName();
        let confirmText = `Are you sure you want to delete ${subjName} subject?`;
        if(confirm(confirmText)){
            fileTools.deleteSubj(subjName);
            window.location.href = __dirname + "/index.html";
        }
        

    }
   
    
}