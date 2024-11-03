[< voltar](./README.md)

<h1 align='center'>Curso Formação DEV</h1>

***Este conteúdo faz parte do curso de Formação DEV da [COD3R](https://www.cod3r.com.br)***

<h1 align='center'>Projeto e-Commerce Simples</h1>

## Criação do Projeto  

Dentro do diretório onde deseja criar o projeto ***"C:\Projetos\ecommerce"*** por exemplo, crie um diretório chamado `\mercado` e dentro desse diretório abra o Terminal e execute o comando a seguir:  

```zsh
// Terminal

$ npx create-next-app@latest frontend
```

Após criar o projeto, instale a dependência [Tabler](https://tabler.io/docs/icons/react#installation) para React que é o pacote de ícones que iremos utilizar no projeto.  
Se houver algum problema na instalação do Tabler, pode ser que o `react:` e o `react-dom:` no `package.json` estejam na versão RC Release Candidate e não sejam compatíveis com o Tabler, a solução é modificar manualmente para uma versão estável, neste momento estamos utilizando a versão 18.3.1.  

```json
// package.json

...
  "dependencies": {
    "@tabler/icons-react": "^3.21.0",
    "next": "15.0.2",
    "react": "^18.3.1",
    "react-dom": "^18.3.1"
...
```

O próximo passo é iniciar o projeto para que possamos visualizar as alterações feitas instantaneamente, para isso execute o comando a seguir no Terminal.  

```zsh
// Terminal

$ npm run dev
```

Com isso teremos o projeto de modelo do React sendo executado no navegador através do endereço [localhost:3000](http://localhost:3000) apresentando a seguinte página:  

<div align='center'><img alt='projeto modelo react' src='./imagens/001.png' /></div>

