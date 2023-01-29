function getEvents(accountId, eventTypeId, skipCount) {
  var config = new Config();
  var params = null;
  var filter = "$filter=" + encodeURIComponent("AccountId eq " + accountId + " and EventTypeId eq " + eventTypeId);
  if (skipCount) {
    params = [
      filter,
      "$skip=" + skipCount,
      "select=Id,EventDate",
      "$count=true",
      "$orderby=EventDate%20desc"
    ].join("&").toString()
  } else {
    params = [
      filter,
      "$select=Id,EventDate",
      "$count=true",
      "$orderby=EventDate%20desc"
    ].join("&").toString();
  }
  //Logger.log(params);
  var baseUrl = "https://" + config.companyDomain + ".us1app.churnzero.net/public/v1/Event?" + params;
  var token = Utilities.base64Encode(config.userName + ':' + config.apiKey);
  var headers = {
    "headers": {
      "Authorization": "Basic " + token
    }
  }
  var response = UrlFetchApp.fetch(baseUrl, headers);
  Logger.log(response.getResponseCode());
  if (response) {
    var json = JSON.parse(response);
    return json;
  }
  return null;
}
