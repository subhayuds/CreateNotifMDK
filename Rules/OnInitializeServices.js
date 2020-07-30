export default function OnInitializeServices(clientAPI) {
	clientAPI.executeAction("/Notif_Create/Actions/Service/CreateService.action");
	clientAPI.executeAction("/Notif_Create/Actions/Service/CreateMicroService.action");
	return Promise.resolve();
}