export default async function getAcessToken(clientId, code) {
    let verifier = localStorage.getItem('verifier')

    const params = new URLSearchParams();

    params.append("client_id", clientId);
    params.append("grant_type", "authorization_code");
    params.append("code", code);
    params.append("redirect_uri", "http://localhost:5173/callback");
    params.append("code_verifier", verifier);

    const result = await fetch("https://accounts.spotify.com/api/token", {
        method: 'POST',
        headers: { "content-Type": "application/x-www-form-urlencoded" },
        body: params
    })

    const { acess_token } = await result.json();
    return acess_token;
}