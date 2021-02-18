///-------------------------------------------------------------------------------------------------
// File: FileParser.js
//
// Author: Devanshika Ghosh
// Date: 12/8/2020
//
// Summary:	This file creates the file that stores our datasets
///-------------------------------------------------------------------------------------------------

const { ModuleResolutionKind } = require("typescript");
const { defaultCipherList } = require("constants");

//constructor that stores file path
function FileParser(file_settings){
    this.exportPath=file_settings;
    this.fs = require("fs");
}
FileParser.prototype.createFile= async function(datafile, fileName){
    var datajson = JSON.stringify(datafile);
    var fd = this.fs.openSync(this.exportPath+"\\"+fileName,'w');
    this.fs.writeFileSync(fd,datajson,"utf8");
}
module.exports=FileParser;