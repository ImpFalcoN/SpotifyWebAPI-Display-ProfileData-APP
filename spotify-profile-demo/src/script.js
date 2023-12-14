import redirectToAuthCodeFlow from "./redirectToAuthCodeFlow";

const clientId = '771315a53c91488399694c4bec1ae2eb';
const params = new URLSearchParams(window.location.search);
const code = params.get('code');

if(!code) {
    redirectToAuthCodeFlow(clientId)
}else{
}