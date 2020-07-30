export default function OnMicroServiceImageUpload(context) {
	let appId = context.evaluateTargetPath('#Application/#ClientData/#Property:Notif_Create');
	// POST "https://petstore.swagger.io/v2/pet" -H "accept: application/json" -H "Content-Type: application/json"
	let destination = 'test';
	let relativePath = 'PMNOTIFPHOTOSet';
	let requestPath = destination + '/' + relativePath;
	//Retrieve the individual input values from Pet_Create page and store them in local variables  
	let notifNumber = context.evaluateTargetPath('#Page:Notif_create/#Control:txtNotifNum/#Value');
	// let filePath = context.evaluateTargetPath('#Page:Notif_create/#Control:FormCellAttachment0/#ClientData/#Property:?');
	let fileContent = context.evaluateTargetPath('#Page:Notif_create/#Control:FormCellAttachment0/#Value');
	alert("Here 1: " + notifNumber);
	let requestBodyJSON = {
		"FolderId": "",
		"ZcnNotifnum": notifNumber,
		"Mimetype": "",
		"Filename": "",
		"Content": fileContent
	}
	alert("Here 2: Preparing Payload");
	let params = {
		'method': 'POST',
		'header': {
			'x-smp-appid': appId,
			'Accept': 'application/json',
			'Content-Type': 'application/json',
			'slug': notifNumber
		},
		'body': JSON.stringify(requestBodyJSON)
	};
	alert("Here 3: Before calling Micro Service");
	return context.sendMobileServiceRequest(requestPath, params).then((response) => {
		if (response.statusCode == 200) {
			alert(response.content.toString());
		} else {
			alert('something went wrong');
		}
	});
}