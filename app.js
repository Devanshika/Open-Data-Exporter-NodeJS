///-------------------------------------------------------------------------------------------------
// File: app.js
//
// Author: Devanshika Ghosh
// Date: 12/8/2020
//
// Summary:	This file is the main program that calls the other functions to get the request, fetch datasets and stores them in a file
///-------------------------------------------------------------------------------------------------
var WebRequestManager = require('./modules/WebRequestManager.js');
var FileParser = require('./modules/FileParser.js');
var ConfigFile = require('./config.json');

const webrequestManager=new WebRequestManager(ConfigFile["request"]);
const getData= new FileParser(ConfigFile["exportPath"]);
const cliProgress = require('cli-progress'); //progress bar
 
(async () => {
    await webrequestManager.fetchResouce();
    // create a new progress bar instance and use shades_classic theme
bar1 = new cliProgress.SingleBar({}, cliProgress.Presets.shades_classic);
resultIds = Object.keys(webrequestManager.resultDictionary);
// start the progress bar with a total value of 200 and start value of 0
bar1.start(ConfigFile['indexArr'].length, 0);
for(i of ConfigFile['indexArr'])
{
  var resultid =resultIds[i];
  var dataset= await webrequestManager.fetchDataset(resultid);
  var datafile= new Object();
  datafile["metadata"]= webrequestManager.resultDictionary[resultid];
  datafile["dataset"]=dataset;
  getData.createFile(datafile,resultid+".json");
  bar1.increment();
}
  // stop the progress bar
bar1.stop();
    
})()