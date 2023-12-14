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
<html lang="en">
    <head>
        <meta charset="utf-8">
        <title>My Spotify Profile</title>
        <script src="src/script.js" type="module"></script>
    </head>
    <body>
        
    </body>
</html>
```

Dentro do corpo do nosso html, isto é, dentro da nossa tag body, vamos adicionar algumas marcações para mostrar os dados de perfil:

```html
<h1>Display your Spotify profile data</h1>

<section id="profile">
<h2>Logged in as <span id="displayName"></span></h2>
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


