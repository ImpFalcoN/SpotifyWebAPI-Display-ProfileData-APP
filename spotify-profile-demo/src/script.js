import fetchProfile from "./fetchProfile";
import getAcessToken from "./getAcessToken";
import populateUI from "./populateUI";
import redirectToAuthCodeFlow from "./redirectToAuthCodeFlow";

const clientId = '771315a53c91488399694c4bec1ae2eb';
const params = new URLSearchParams(window.location.search);
const code = params.get('code');

if(!code) {
    redirectToAuthCodeFlow(clientId)
}else{
    const acessToken = await getAcessToken(clientId, code);
    const profile = await fetchProfile(acessToken);
    populateUI(profile);
}