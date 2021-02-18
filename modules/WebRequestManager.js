///-------------------------------------------------------------------------------------------------
// File: WebRequestManager.js
//
// Author: Devanshika Ghosh
// Date: 12/8/2020
//
// Summary:	This file makes the API request and fetches the datasets from open data
///-------------------------------------------------------------------------------------------------

//constructor that initializes the webrequest settings like url, domain and limit
function WebRequestManager(request_settings){
    this.url=request_settings["url"];
    this.domain=request_settings["domains"];
    this.limit=request_settings["limit"];
    this.resultDictionary=new Object(); 
    this.requestModule= require("web-request");

}
WebRequestManager.prototype.fetchResouce= async function(){
   
    var result = await this.requestModule.get(this.url+"?only=datasets&domains="+this.domain+"&search_context="+this.domain+"&limit="+this.limit);
    var openDataResults=JSON.parse(result.content);
    //this loops gets the result from open data and stores in the result dictionary
    openDataResults["results"].forEach(aResult =>
        this.resultDictionary[aResult["resource"]["id"]]= aResult
        );
}

//this function fetches the dataset and parses it to JSON
WebRequestManager.prototype.fetchDataset= async function(datasetID){
var limitVal = 1000;
var curOffset = 0;
var dataSetJSON = []
console.log();
console.log("Dataset Name ="+this.resultDictionary[datasetID]["resource"]["name"]);
while(true)
{
    var dataset= await this.requestModule.get("https://"+this.domain+"/resource/"+datasetID+".json?$limit="+limitVal+"&$offset="+curOffset);
    var curPageData = JSON.parse(dataset.content);
    if(curPageData.length <= 0)
    {
     break;
	}
    else
    {
     curOffset += limitVal;
	}
    dataSetJSON.push.apply(dataSetJSON,curPageData);
}
console.log("Total Rows ="+dataSetJSON.length);
    return dataSetJSON;
}
module.exports = WebRequestManager;