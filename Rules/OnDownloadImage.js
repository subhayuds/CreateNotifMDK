export default function OnDownloadImage(clientAPI) {
	// alert("Here 1");
	var appId = "com.sap.mdk.asset";
	var destination = 'com.sap.mdk.asset2';
	var relativePath = "PMNOTIFPHOTOSet(ZcnNotifnum='10000410',FolderId='FOL42000000000004EXT45000000000002')/$value";
	var requestPath = destination + '/' + relativePath;
	// alert(requestPath);
	// var notifNumber = clientAPI.evaluateTargetPath('#Page:Notif_create/#Control:txtNotifNum/#Value');
	// var filePath = clientAPI.evaluateTargetPath('#Page:Notif_create/#Control:FormCellAttachment0/#Value');
	// var fileContent = "iVBORw0KGgoAAAANSUhEUgAAAAUAAAAFCAYAAACNbyblAAAAHElEQVQI12P4//8/w38GIAXDIBKE0DHxgljNBAAO9TXL0Y4OHwAAAABJRU5ErkJggg==";
	alert("Here 1");
	try {
	  let sectionTableValue =  clientAPI.getPageProxy().getClientData();
		// alert(sectionTableValue);
		alert(JSON.stringify(sectionTableValue));
	}
	catch(err) {
	  alert(err);
	}
	
	// try {
	// 	let containerProxy = clientAPI.getPageProxy().getClientData();
	// 	alert(JSON.stringify(containerProxy));
	// }
	// catch(err) {
	//   alert(err);
	// }
	
	var params = {
		'method': 'GET',
		'header': {
			'x-smp-appid': appId
			// 'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9'
			// 'Content-Type': 'application/octet-stream',
		}
	};
	alert(JSON.stringify(params));
	
	return clientAPI.sendMobileServiceRequest(requestPath, params).then((response) => {
		if (response.statusCode == 200) {
			return response.body;
		} else {
			alert("FAIL: " + JSON.stringify(response));
			// clientAPI.executeAction("/Notif_Create/Actions/Attachment_Fail.action");
		}
	});
	
	return "";
}