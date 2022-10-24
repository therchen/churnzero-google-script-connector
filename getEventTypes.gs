function getEventTypes() {
  var config = new Config();
  var baseUrl = "https://xyz.us1app.churnzero.net/public/v1/EventType";
  var token = Utilities.base64Encode(config.userName + ':' + config.apiKey);
  var headers = {
    "headers": {
      "Authorization": "Basic " + token
      }
    }
    var response = UrlFetchApp.fetch(baseUrl, headers);
    if(response){
      var ss = SpreadsheetApp.openById('');
      var sh  = ss.getSheetByName('Event Types');
      var values = [];
      var json = JSON.parse(response);
      var eventTypes = json.value;
      eventTypes.forEach(function(eventType){
        values.push([eventType.Id, eventType.Name]);
      })
      sh.getRange(2,1,values.length, 2).setValues(values);
    }
    return null;
}
