export default function OnAttachementListLoad(clientAPI) {
	let serviceBinding = clientAPI.binding;
	return serviceBinding["@odata.readLink"] + "/NotiftoPhoto";
}