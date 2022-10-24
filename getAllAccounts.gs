function getAllAccounts(nextLink){
  var config = new Config();
  var baseUrl = '';
  if(nextLink){
    baseUrl = nextLink;
  }
  else{
    baseUrl = 'https://xyz.us1app.churnzero.net/public/v1/Account?$select=ExternalId,CrmId';
  }
  var token = Utilities.base64Encode(config.userName + ':' + config.apiKey);
  var headers = {
    "headers": {
      "Authorization": "Basic " + token
      }
    }
    var response = UrlFetchApp.fetch(baseUrl, headers);
    if(response){
      var json = JSON.parse(response);
      return json;
    }
    return null;
}
