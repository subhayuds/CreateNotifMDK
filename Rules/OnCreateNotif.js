export default function OnCreateNotif(clientAPI) {
	return clientAPI.executeAction("/Notif_Create/Actions/Create_Notif.action").then(
	    (success) => {
	    	var finalMsg = "";
	    	var notificationNumber = (JSON.parse(success.data)).ZcnNotifnum;
	    	var element = clientAPI.evaluateTargetPath('#Page:Notif_create/#Control:txtNotifNum');
			element.setValue(notificationNumber);

			clientAPI.executeAction("/Notif_Create/Actions/attach.action").then(
				(successAttach) => {
					finalMsg = "Notification " + notificationNumber + " successfully created";
					//Read File Content from attachment control
				    let platform = clientAPI.nativescript.platformModule;
				    let containerProxy = clientAPI.getPageProxy().getControl('FormCellContainer0');
				    if (!containerProxy.isContainer()) {
				        return;
				    }

				    // Get the List of Attachments from the Attachment Control
				    let attachmentsList = containerProxy.getControl('FormCellAttachment0').getValue();
				    let fileName = "SampleFileName";
				    let fileExtension = "JPG";
				    let b64string = "SampleB64";
				    if(attachmentsList.length > 0) {
				    	let element = attachmentsList[0];
				    	fileName = (element.urlString).substring((element.urlString).lastIndexOf('/') + 1);
				    	fileName = fileName.substring(0, fileName.lastIndexOf('.') + 1);
				    	fileExtension = ((element.urlString).substring((element.urlString).lastIndexOf('.') + 1)).toUpperCase();
				    	// attachmentsList.forEach(element => {
				        if (platform.isAndroid) {
				            b64string = android.util.Base64.encodeToString(element.content, android.util.Base64.DEFAULT);
				    	} else if (platform.isIOS) {
				            b64string = element.content.base64Encoding();
				        }
				    }
				    var b64FileContentElement = clientAPI.evaluateTargetPath('#Page:Notif_create/#Control:txtB64FileContent');
					b64FileContentElement.setValue(b64string);//.substring(0, 1111));
					
					var fileNameElement = clientAPI.evaluateTargetPath('#Page:Notif_create/#Control:txtFileName');
					fileNameElement.setValue(fileName.substring(0, 50));
					
					var fileExtensionElement = clientAPI.evaluateTargetPath('#Page:Notif_create/#Control:txtFileExtension');
					fileExtensionElement.setValue(fileExtension);
					
					clientAPI.executeAction("/Notif_Create/Actions/ImageUploadExternal.action").then(
						(successMicro) => {
							finalMsg = finalMsg + "\n Notification created in Micro Service"
							alert(finalMsg);
							Promise.resolve(successMicro);
						},
					    (failureMicro) => {
					    	finalMsg = finalMsg + "\n But Failed to create Notification in Microservice";
					    	alert(finalMsg);
					    	alert(failureMicro);
					    	Promise.reject("Create Notification failed" + failureMicro);
					    }
					);
				    
					Promise.resolve(successAttach);
				},
			    (failureAttach) => {
			    	finalMsg = finalMsg + "\n But failed to attach file to notification";
			    	alert(finalMsg);
			    	// clientAPI.executeAction("/Notif_Create/Actions/Attachment_Fail.action");
			    	Promise.reject("Create Notification failed" + failureAttach);
			    }
			);
	        
	        Promise.resolve(success);
	    },
	    (failure) => {
	    	alert("Failed to create Notification");
	    	Promise.reject("Create Notification failed" + failure);
	    }
    );
}