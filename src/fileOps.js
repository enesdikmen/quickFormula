const fs = require('fs')
const electron = require('electron');


const subjectsPath = (electron.app || electron.remote.app).getPath('userData')+"\\Local Storage\\";


function getJson(path){
    let  file = fs.readFileSync(path, 'utf-8')
    return JSON.parse(file)
}

function newJson(dir, json){
    
    fs.writeFileSync(dir + json.name + ".json", JSON.stringify(json), 'utf-8' )

}

module.exports = {
    getSubj: function(subjName){

        let subj = getJson(subjectsPath + subjName + ".json")
        return getJson(subjectsPath + subjName + ".json") 
    },

    addSubj: function(subj){

        newJson(subjectsPath, subj);
    },

    getSubjNames: function(){
        let subjs = []

        fs.readdirSync(subjectsPath).forEach(fileName=> {
            if(fileName.slice(fileName.length-5, fileName.length) === ".json"){
                subjs.push(fileName.slice(0, fileName.length-5))

            }
        })
        return subjs
    },

    getSubjs: function(){
        let subjs = []
        fs.readdirSync(subjectsPath).forEach(fileName=> {
            subjs.push(getJson(subjectsPath + fileName))
        });
        return subjs
    },
    deleteSubj: function(subjName){
        fs.unlinkSync(subjectsPath + subjName  + ".json");

    },

}