export default function OnCreateNotif(clientAPI) {
	return clientAPI.executeAction("/Notif_Create/Actions/Create_Notif.action").then(
    (success) => {
    	var notificationNumber = (JSON.parse(success.data)).ZcnNotifnum;
    	var element = clientAPI.evaluateTargetPath('#Page:Notif_create/#Control:txtNotifNum');
		element.setValue(notificationNumber);
		clientAPI.executeAction("/Notif_Create/Actions/attach.action");
        Promise.resolve(success);
    },
    (failure) => {
    	alert("Failed to create Notification");
    	Promise.reject("Create Notification failed" + failure);
    });
}