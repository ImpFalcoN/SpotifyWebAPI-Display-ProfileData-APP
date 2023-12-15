# Exiba os dados do seu perfil Spotify em um aplicativo da web

Este guia cria uma aplicação simples client-side que faz uso da Web API do spotify para ter acesso aos dados do perfil do usuário.
Aplicações externas podem uso da Spotify Web API para conseguir acesso a conteúdo do Spotify, como dados de músicas, albums e playlists.
Entretanto, para acessar o dados relativos do usuário com a Spotify Web API, uma aplicação deve ser autorizada pelo usuário para se obter acesso acesso a essas informações específicas.

## Pré-Requisitos

- Versão [Node.js LTS](https://nodejs.org/en) ou superior.
- [Npm](https://docs.npmjs.com/) versão 7 ou superior.
- Uma [conta Spotify](https://accounts.spotify.com/en/login?flow_ctx=a00142bf-54ff-4ac2-89e3-5bf33b142f27:1702587714).

## Preparando Sua Conta 

Faça o login no [Painel de controle de desenvolvimento do Spotify](https://developer.spotify.com/).

## Criando um app Spotify

Nós vamos precisar registrar um novo app para gerar credenciais válidas - Vamos utilizar as credenciais mais tarde para performar chamadas API. Siga este [passo a passo](https://developer.spotify.com/documentation/web-api/concepts/apps) caso não saiba como registrar um novo app.

## Criando um novo projeto

Esse aplicativo usa o servidor de desenvolvimento Vite. Vamos criar esse novo projeto com o commando vite create e usar um templete default para nos dar um aplicativo basíco usando js.

```
npm create vite@latest spotify-profile-demo -- --template vanilla
```

Em alternativa podemos usar um template que faz uso de TypeScript.

```
npm create vite@latest spotify-profile-demo -- --template vanilla-ts
```
Mude o diretório usando o comando cd (change directory) para o diretório onde criamos o novo app, uma vez que criamos o app podemos rodar o servidor de desenvolvimento.

```
cd spotify-profile-demo
npm install
npm run dev
```
O template default do vite cria alguns arquivos que nós não precisamos para essa demonstração, podemos deletar todos os arquivos que se encontram em ./src/ e ./public/

## Criando a interface do usuário

Essa demonstração se trata de uma aplicação de página única (Single page application) que vai rodar inteiramente no navegador. Nós vamos substituir o conteúdo do arquivo index.html por um html simples que constitui a interface do usuário que seŕa utilizado para exibir os dados de perfil.

Comece excluindo o conteúdo do arquivo index.html e substituindo-o por um esqueleto html e uma tag que faz referência a nosso arquivo JavaScript.

```html
<!DOCTYPE html>
<html lang="pt-BR">
    <head>
        <meta charset="utf-8">
        <title>Meu perfil Spotify</title>
        <script src="src/script.js" type="module"></script>
    </head>
    <body>
        
    </body>
</html>
```

Dentro do corpo do nosso html, isto é, dentro da nossa tag body, vamos adicionar algumas marcações para mostrar os dados de perfil:

```html
<h1>Exiba seus dados de perfil Spotify</h1>

<section id="perfil">
    <h2>Logado como <span id="displayName"></span></h2>
    <span id="avatar"></span>
    <ul>
        <li>User ID: <span id="id"></span></li>
        <li>Email: <span id="email"></span></li>
        <li>Spotify URI: <a id="uri" href="#"></a></li>
        <li>Link: <a id="url" href="#"></a></li>
        <li>Profile Image: <span id="imgUrl"></span></li>
    </ul>
</section> 
```
Alguns elementos nesse bloco de código tem atributos de ID. Faremos o uso de identificadores para popular os elementos com dados retornados pela API.

## Efetuando a Chamada para Web API

Nós vamos usar a Web API para recuperar dados do perfil do usuário. Nós vamos usar o fluxo de código de autorização com PKCE.

<details>
    <summary>O que é fluxo de código de autorização? 🧐</summary>
    <br>
    <p>
        O fluxo de código de autorização é um dos fluxos do OAuth 2.0, um protocolo amblamente utilizado para autenticação e autorização em aplicativos web e móveis. Neste fluxo, um cliente solicita uma autorização ao servidor de autorização, que autentica o usuário e retorna um código de autorização. Esse código é então trocado por um token de acesso, que é usado para acessar recursos protegidos.
    </p>
    <details>
        <summary>O que é um Fluxo de código de autorização de maneira simples? 🤔</summary>
        <br>
        <p>Imagine que você quer entrar em um clube secreto, para isso seguimos um <span>fluxo de passos</span>:</p>
        <ul>
            <li>Você vai até a porta e pede permissão para entrar.</li>
            <li>O Guardião do clube solicita que diga quem é, e você responde seu nome.</li>
            <li>Em vez de deixar você entrar imediatamente, o Guardião dá a você um código especial.</li>
            <li>Agora em vez de usarmos diretamente esse código para abrir a porta, o fornecemos para o Guardião e o Guardião o usa para deixar você entrar...</li>
        </ul>    
    </details>
    <br>
    <p>Agora que entendeu oque é o <strong>fluxo de código de autenticação</strong> pode estar se perguntando "Como assim fluxo de código de autenticação com <strong>PKCE</strong>?🧐":</p>
    <strong>PKCE</strong> é uma medida de segurança frequentemente adicionada ao fluxo de código de autorização para proteger contra certos tipos de ataques, tornando o processo de autenticação mais seguro.
</details>

#### como isso funciona?

1. Quando a página carregar, nós vamos checar se existe um código na callback query string.
2. Caso não exista um código, nós vamos redirecionar o usuário para a página de autorização do Spotify.
3. Uma vez que o usuário autorizou o aplicativo, o Spotify vai redirecionar o usuário de volta para nossa aplicação, e nos vamos poder ler o código na query string.
4. Nós vamos usar o código para fazer uma requisição de token de acesso usando a Spotify Token API.
5. Nós vamos usar o token de acesso para chamar a Web API para recuperar os dados do usuário.
6. Nós Vamos popular o interface do usuário utilizando os dados retornados.

Crie um arquivo src/script.js e adicione o seguinte código:
```JavaScript
const clientId = "your-client-id-here"; // Replace with your client ID
const code = undefined;

if (!code) {
    redirectToAuthCodeFlow(clientId);
} else {
    const accessToken = await getAccessToken(clientId, code);
    const profile = await fetchProfile(accessToken);
    populateUI(profile);
}

async function redirectToAuthCodeFlow(clientId) {
    // TODO: Redirect to Spotify authorization page
}

async function getAccessToken(clientId, code) {
  // TODO: Get access token for code
}

async function fetchProfile(token) {
    // TODO: Call Web API
}

function populateUI(profile) {
    // TODO: Update UI with profile data
}
```

Esse é o esqueleto da nossa aplicação.

Na primeira linha temos a variável que abriga nosso clientId - você precisa setar essa variável pelo client_id disponivel no app Spotify que criamos mais cedo.

O código agora precisa ser atualizado para redirecionar o usuário para página de autorização Spotify. Para fazer isso, vamos escrever a função RedirectToAuthCodeFlow:

```JavaScript
export async function redirectToAuthCodeFlow(clientId) {
    const verifier = generateCodeVerifier(128);
    const challenge = await generateCodeChallenge(verifier);

    localStorage.setItem("verifier", verifier);

    const params = new URLSearchParams();
    params.append("client_id", clientId);
    params.append("response_type", "code");
    params.append("redirect_uri", "http://localhost:5173/callback");
    params.append("scope", "user-read-private user-read-email");
    params.append("code_challenge_method", "S256");
    params.append("code_challenge", challenge);

    document.location = `https://accounts.spotify.com/authorize?${params.toString()}`;
}

function generateCodeVerifier(length) {
    let text = '';
    let possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

    for (let i = 0; i < length; i++) {
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
}

async function generateCodeChallenge(codeVerifier) {
    const data = new TextEncoder().encode(codeVerifier);
    const digest = await window.crypto.subtle.digest('SHA-256', data);
    return btoa(String.fromCharCode.apply(null, [...new Uint8Array(digest)]))
        .replace(/\+/g, '-')
        .replace(/\//g, '_')
        .replace(/=+$/, '');
}
```

Nesta função, um novo objeto URLSearchParams é criado, e nos adicionamos os parâmetros client_id, response_type, redirect_uri e scope. O parâmetro scope é uma [lista de permissões](https://developer.spotify.com/documentation/web-api/concepts/scopes) que nos estamos requisitando ao usuário.

O **redirect_uri** é o URL para qual o Spotify redirecionará o usuário depois de autorizar o aplicativo. Neste caso estamos usando um URL que aponta para o nosso servidor de desenvolvimento local do Vite.

Você também vai ver que estamos utilizando o [Verificador PKCE e Challenge data], estamos usando isso para verificar se nossa solicitação é autêntica. Estamos usando o armazenamento local para armazenar os dados do verificador, que funciona como uma senha para o processo de troca de token.

Para evitar que o usuário fique preso em um loop de redirecionamento quando autenticar, precisamos verificar se o retorno da chamada contém um code. Para fazer isso, as três primeiras linhas do src/script.js devem ser modificadas assim:

```JavaScript
const clientId = "your_client_id";
const params = new URLSearchParams(window.location.search);
const code = params.get("code");

if (!code) {
    redirectToAuthCodeFlow(clientId);
} else {
    const accessToken = await getAccessToken(clientId, code);
    const profile = await fetchProfile(accessToken);
    populateUI(profile);
}
```

Para garantir que a troca de token funcione, precisamos escrever a função getAcessToken:

```JavaScript
export async function getAccessToken(clientId: string, code: string): Promise<string> {
    const verifier = localStorage.getItem("verifier");

    const params = new URLSearchParams();
    params.append("client_id", clientId);
    params.append("grant_type", "authorization_code");
    params.append("code", code);
    params.append("redirect_uri", "http://localhost:5173/callback");
    params.append("code_verifier", verifier!);

    const result = await fetch("https://accounts.spotify.com/api/token", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: params
    });

    const { access_token } = await result.json();
    return access_token;
}
```

Nesta função, inicializamos uma variavel com o verificador do nosso armazenamento local, e usamos o código retornado pela nossa chamada e o verificador para executar um Post na API do token Spotify. A API usa esses dois valores para verificar nossa solicitação e retorna um token de acesso.

Agora, se rodarmos o comando `npm run dev`, e navergarmos até http://localhost:5173, somos redirecionados para a página de autorização do Spotify. se autorizarmos o aplicativo, seremos redirecionados de volta ao nosso aplicativo, mas nenhum dado será buscado e exibido.

Para ajeitar isso, precisamos escrever a função fetchProfile, ela vai realizar a chamada para Web API e obter os dados do perfil:

```JavaScript
async function fetchProfile(token) {
    const result = await fetch("https://api.spotify.com/v1/me", {
        method: "GET", headers: { Authorization: `Bearer ${token}` }
    });

    return await result.json();
}
```

Nesta função, a chamada para https://api.spotify.com/v1/me usando a função fetch para obter os dados do perfil. O Authorization está definido para Bearer ${token}, onde o token é o token de acesso que obtivemos com a função getTokenAcess.

Se fizer um console.log para o resultado da chamada podemos ver que os dados são retornados da API para o console do nosso navegador:

```JavaScript
} else {
    const profile = await fetchProfile(token);
    console.log(profile); // Profile data logs to console
    ...
}
```

Finalmente e não menos importante precisamos popular nossa interface do usuário escrevendo a função populateUI:

```JavaScript
function populateUI(profile) {
    document.getElementById("displayName").innerText = profile.display_name;
    if (profile.images[0]) {
        const profileImage = new Image(200, 200);
        profileImage.src = profile.images[0].url;
        document.getElementById("avatar").appendChild(profileImage);
        document.getElementById("imgUrl").innerText = profile.images[0].url;
    }
    document.getElementById("id").innerText = profile.id;
    document.getElementById("email").innerText = profile.email;
    document.getElementById("uri").innerText = profile.uri;
    document.getElementById("uri").setAttribute("href", profile.external_urls.spotify);
    document.getElementById("url").innerText = profile.href;
    document.getElementById("url").setAttribute("href", profile.href);
}
```

Agora você pode executar a aplicação rodando `npm run dev` no terminal e navegar até http://localhost:5173 usando seu browser/navegador.