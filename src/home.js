var tools = require('./homeFunc')
const { remote, ipcRenderer } = require('electron');

document.addEventListener("DOMContentLoaded", ()=>{
    tools.listSubjs();
    tools.addLinks();
    

})
