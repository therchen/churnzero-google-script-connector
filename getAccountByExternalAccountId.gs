function getAccountByExternalAccountId(id){
  var config = new Config();
  var baseUrl = "https://" + config.companyDomain + ".us1app.churnzero.net/public/v1/Account(AccountExternalId='" + id + "')?";
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
