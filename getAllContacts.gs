function getAllContacts(nextLink){
  var config = new Config();
  var baseUrl = '';
  if(nextLink){
    baseUrl = nextLink;
  }
  else{
    baseUrl = 'https://' + config.companyDomain + '.us1app.churnzero.net/public/v1/Contact?$orderby=ObjectCreatedDate%20desc&$count=true';
    //&$top=10
  }
  var token = Utilities.base64Encode(config.userName + ':' + config.apiKey);
  var headers = {
    "headers": {
      "Authorization": "Basic " + token
      }
    }
    var response = UrlFetchApp.fetch(baseUrl, headers);
    if(response){
      var theseContacts = JSON.parse(response);
      return theseContacts;
    }
    return null;
}
