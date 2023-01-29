function getMostRecentEvent(accountId, eventTypeId, skipCount){
  var config = new Config();
  var select = "$select=Id,EventDate";
  var skip = "$skip=" + skipCount;
  var filter = "$filter=" + encodeURIComponent("AccountId eq " + accountId + " and EventTypeId eq " + eventTypeId);
    var params = [
      select,
      skip,
      filter
  ].join("&").toString();
  var baseUrl = "https://" + config.companyDomain + ".us1app.churnzero.net/public/v1/Event?" + params;
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
