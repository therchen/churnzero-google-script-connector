//https://app.churnzero.net/developers
function getContactsByChurnZeroAccountId(czAccountId, nextLink) {
	var baseUrl;
	var config = new Config();
	if (nextLink) {
		baseUrl = nextLink;
	} else {
		var filter = "$filter=" + encodeURIComponent("AccountId eq " + czAccountId + " and FirstName ne null and LastName ne null and Email ne ''");
		var params = [filter, "$count=true", "$orderby=ObjectCreatedDate%20desc"].join("&").toString();
		baseUrl = 'https://brazen.us1app.churnzero.net/public/v1/Contact?' + params;
	}
	var token = Utilities.base64Encode(config.userName + ':' + config.apiKey);
	var headers = {
		"headers": {
			"Authorization": "Basic " + token
		}
	}
	var response = UrlFetchApp.fetch(baseUrl, headers);
	if (response) {
		var theseContacts = JSON.parse(response);
		return theseContacts;
	}
	return null;
}
