[< voltar](./README.md)

<h1 align='center'>Curso Formação DEV</h1>

***Este conteúdo faz parte do curso de Formação DEV da [COD3R](https://www.cod3r.com.br)***

<h1 align='center'>GAM3R STORE  e-Commerce Simples</h1>

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

[^ Sumário ^](./README.md)

## Limpando a Estrutura Padrão  

Agora precisamos excluir alguns arquivos e trechos de código que não iremos utilizar em nosso projeto.  

- Primeiro precisamos excluir todo o conteúdo da página principal do projeto que se encontra no caminho `src\app\page.tsx`.  

```tsx
// page.tsx

export default function Home() {
  return (
    <div className="flex justify-center pt-10">Aplicação</div>
  );
}
```

Após a edição do arquivo, ele apresentará no navegador a mensagem ***"Aplicação"*** centralizada na tela.  
O próximo passo é editar o arquivo `layout.tsx` que se encontra no caminho `src\app\layout.tsx`.  

```tsx
// layout.tsx

import type { Metadata } from "next";
import {Montserrat} from "next/font/google"
import "./globals.css";

const font = Montserrat({
  subsets: ['latin']
})

export const metadata: Metadata = {
  title: "GAM3R STORE",
  description: "Versão completa da loja Gam3r.Store",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body className={font.className}>
        {children}
      </body>
    </html>
  );
}

```

Com isso, fizemos as seguintes alterações:

- Importamos a fonte Montserrat do google.  

  ```tsx
  import {Montserrat} from "next/font/google"
  ```  

- Criamos uma contrante chamada "font" para ser utilizada no body.

  ```tsx
  const font = Montserrat({subsets: ['latin']})
  ```  

- Inserimos a contante "font" no "className" do body.  

  ```html
  <body className={font.className}>
  ```

- Alteramos o idioma da página para português Brasil.  

  ```html
  <html lang="pt-BR">
  ```  

- E por último, modificamos o título e a descrição da página.  

  ```tsx
  export const metadata: Metadata = {
    title: "GAM3R STORE",
    description: "Versão completa da loja Gam3r.Store",
  };
  ```

Com essas alterações, já podemos excluir o diretório `\fonts`que se encontra no caminho `src\app` e todo o conteúdo do diretório `\public` que se encontra na raiz da aplicação Frontend.  

>***OBS.:***  
É para excluir o que tem dentro do diretório e não o diretório, a pasta deve continuar na raiz do projeto.

[^ Sumário ^](./README.md)

## Criando o Núcleo da Aplicação

Agora iremos criar o diretório onde iremos criar a ***Regra de Negócio da Aplicação***, neste diretório não será misturado com nenhuma linguagem de framework, aqui iremos utilizar lógica de programação pura, não será desenhado nenhuma tela e nem será feito nenhuma conexão com Banco de Dados ou APIs.  
E é por isso que precisamos aprender a separar o que é Regra de Negócio de frameworks e bibliotecas, para que possamos proteger as Regas de eventuais mudanças que os Frameworks acabam impondo para aqueles que se comprometem demais os utilizando.  
Para isso, no caminho `\src` crie um diretório chamado `\core`, por enquanto ele ficará dentro do Frontend, mas, posteriormente ele será retirado para que fique fora da estrutura do Frontend.  
A Lógica implementada dentro do Core, ficará disponível para toda a aplicação, podendo ser usada tanto no ***Frontend quanto no Backend*** e por outras tecnologias, por isso a importância de se separar a ***Regra de Negócio***.  

Dentro do diretório Core, nenhum arquivo será acessado diretamente, todos os arquivos serão exportados e acessados através do arquivo ***"index.ts"*** que se encontra no caminho `\src\core\index.ts`.  

No ***Core da Aplicação*** iremos definir algumas coisas importantes, principalmente na parte de ***PRODUTOS.***  
No momento nosso foco inicial será ***Página Inicial*** e na página de ***Detalhes de Produtos***, onde constarão as definições do produto, preço com e sem desconto, preço parcelado, botões de comprar e adicionar no carrinho entre outras informações.

[^ Sumário ^](./README.md)

## PRODUTO

### Interface Produto

Estaremos utilizando a abordagem de modelagem por ***interface*** por simplicidade, pois, se optasse-mos por DDD, Arquitetura Limpa e outros padrões que iriam influenciar muito a arquitetura, seria utilizado a abordagem de se criar uma Classe ao invés de uma interface.  
Por isso, vamos focar em uma modelagem mais simples ***"anêmica"***, para poder focar em outras questões da Aplicação, pois, existe muita coisa para ser feita.  

>*Mas aqui seria uma oportunidade de se criar um **Modelo Rico** colocando Regas de Negócio dentro das Entidades, pois, quando as Regras estão no Centro da Aplicação, com as Regras próximas dos DADOS, se favorece uma melhor **Orientação a Objetos.***  
>
>*Pois a **POO** (Programação Orientada a Objetos), diz respeito a Atributos mas também a Comportamentos relacionados aqueles atributos, então, se existem Regras o ideal é que elas andem juntos com os atributos do Objeto, dentro da Classe que está sendo implementada.*
<p>

No caminho `\src\core` crie um novo diretório chamado `\produto` e dentro dele crie um arquivo chamado `Produto.ts` é nesse arquivo que iteremos implementar nossa ***Interface de Produto***, onde iremos definir os atributos do produto.  

```ts
// Produto.ts

export default interface Produto {
  id: number
  nome: string
  descricao: string
  marca: string
  modelo: string
  imagem: string
  nota: number
  videoReview: string
  tags: string[]
}
```

> [!IMPORTANT]
> Não planeje o reuso antes do uso, quero dizer que, não tente criar uma Mega Arquitetura antes de ter a necessidade para aquela Mega Arquitetura, para que não se frustre e desista no meio do caminho.  
>Comece simples e vá evoluindo e implementando conforme o necessário.

[^ Sumário ^](./README.md)

### Interface Especificações

Agora estaremos implementando as Especificações do Produto.
No caminho `\src\core` crie o arquivo chamado `Especificacoes.ts`, esse arquivo tem uma particularidade, pois, diversos produtos possuem especificações diferentes uns dos outros e isso dificulta um pouco na criação dessa Interface, mas existe uma forma de informar essas especificações de uma forma mais flexível.  
Uma coisa é certa, todas as especificações dos produtos e uma delas está em destaque.  

```ts
// Especificacoes.ts

export default interface Especificacoes {
  destaque: string
  //* Faz com que o atributo chave: valor seja flexível
  [chave: string]: string | number | boolean
}
```

Interface Produto atualizada com a adição do atributo especificacoes.

```ts
// Produto.ts

import Especificacoes from "./Especificacoes"

export default interface Produto {
  id: number
  nome: string
  descricao: string
  marca: string
  modelo: string
  imagem: string
  nota: number
  videoReview: string
  tags: string[]
  especificacoes: Especificacoes
}
```

>#### Relação Composição
>
>Quando **TEM UM** Produto **E TEM** Especificações (relação "TEM UM")*
<p>

[^ Sumário ^](./README.md)

### Interface Precificavel

Agora iremos implementar a interface precificavel, isso significa que implementaremos algo que pode ser precificavel.  

No caminho `\src\core` crie o arquivo chamado `Precificavel.ts`, contendo os atributos abaixo.  

```ts
// Precificavel.ts

export default interface Precificavel {
  menorPreco: number
  maiorPreco: number
  precoBase: number
  precoMedio: number
  precoPromocional: number
}
```

A maioria dos programadores gosta de padronizar o nome das variáveis como no caso acima muitos iriam preferir usar o sufixo "preco" em todos os atributos, mas, prefiro particularmente usar variáveis como falamos normalmente, assim fica melhor para identificar sobre o que se trata, utilizando palavras que são usadas regularmente no negócio, evitando assim estranheza por parte de quem vai usar o sistema.  

Pois o código deve refletir ao máximo o negócio, e não ficar usando jargões de tecnologia, dificultando a comunicação entre o corpo técnico e os membros do negócio.  

[^ Sumário ^](./README.md)

### Relação de Herança

Agora iremos implementar uma Relação de Herança na interface Produto, pois, além do produto ter especificações, ele também é precificavel e para estabelecer essa relação, vamos estender a interface produto da interface precificavel, pode parecer difícil, mas é muito simples como podemos ver a seguir.  

```ts
// Produto.ts

import Especificacoes from "./Especificacoes"
import Precificavel from "./Precificavel"

export default interface Produto extends Precificavel {
  id: number
  nome: string
  descricao: string
  marca: string
  modelo: string
  imagem: string
  nota: number
  videoReview: string
  tags: string[]
  especificacoes: Especificacoes
}
```

Neste caso não seria necessário utilizar a Herança, mas foi utilizado para exemplo, pois poderíamos colocar os atributos diretamente na interface Produto.  
A herança seria mais indicado caso existissem outras Entidades que também fossem precificáveis, assim evitaria a duplicação de código desnecessária.  

[^ Sumário ^](./README.md)

### Exportando as Interfaces do Diretório Produto

Agora iremos criar e configurar o arquivo `index.ts` do diretório ***Produto*** presente no caminho `src\core\produto`, nesse arquivo, iremos importar todas as interfaces que implementamos até o momento.  

```ts
// produto\index.ts

import Especificacoes from "./Especificacoes"
import Precificavel from "./Precificavel"
import Produto from "./Produto"

export type {Especificacoes, Precificavel, Produto}
```

Como podemos ver acima, primeiro importamos cada interface utilizando o comando `import` e logo em seguida exportamos as interfaces utilizando o comando `export` seguido de `type`, precisamos utilizar o comando `type` por estarmos exportando uma ***interface*** e não uma ***Classe***.

Agora, por qual motivo que foi criado esse arquivo `index.ts` dentro do diretório Produto?  

Esse arquivo foi criado para que possamos expor todo o conteúdo de Produto para toda a aplicação, mas só criar esse arquivo importando e exportando as interfaces não faz a mágica acontecer, pra isso acontecer verdadeiramente, precisamos criar outro arquivo `index.ts` dentro do diretório Core exportando todo o conteúdo de Produto.  

Esse mesmo processo precisa ser feito em todos os diretórios e arquivos que pretendemos utilizar fora do Núcleo da Aplicação, consequentemente utiliza-los em toda a aplicação.  

Então, vamos criar e configurar o `index.ts` do Core, no caminho `src\core`.

```ts
// core\index.ts

export * from "./produto"
```

Como podemos ver acima, estamos exportando `export` tudo `*` de `from` Produto `"./produto`, esse mesmo procedimento deve ser feito para outros diretórios que pretendemos expor para toda a Aplicação.

[^ Sumário ^](./README.md)

## PARCELAMENTO

No Parcelamento, iremos definir qual é a estrutura de um parcelamento juntamente com o cálculo relacionado a juros compostos (tendo um preço promocional dividido por uma quantidade de parcelas) mostrando qual o valor das parcelas.  
Esta Regra do Negócio continua separada de tecnologias e puramente pertencente ao Núcleo da Aplicação.  

O Parcelamento não estará relacionado ao produto e nem ao pedido, pois, o parcelamento pode ser usado em várias partes da Aplicação.

[^ Sumário ^](./README.md)

### Interface Parcelamento

Agora no caminho `src\core` crie um diretório chamado `parcelamento` e dentro dele crie o arquivo `Parcelamento.ts` que será nossa interface.  

Vamos implementar um interface simples contendo os atributos: valorTotal (que servirá como base para o calculo), valorParcela, qtdeParcelas e taxaJuros.

```ts
// Parcelamento.ts

export default interface Parcelamento {
  valorTotal: number
  valorParcela: number
  qtdeParcelas: number
  taxaJuros: number
}
```

[^ Sumário ^](./README.md)

### Classe Calcular Parcelamento

Agora iremos criar uma Classe que irá implementar o cálculo relacionado ao parcelamento.  

> [!NOTE]
> Esse cálculo, ele é algo que representa a Regra de Negócio da Aplicação e isso não deveria estar ***"amarrado ou atrelado"*** ao Backend, pois, as Regras precisam utilizar apenas a linguagem de programação e dependendo o mínimo possível de Framework, assim se isola a Regra e podemos reusar em qualquer lugar, até mesmo em outra aplicação semelhante.  

<p>

Antes de qualquer coisa precisamos criar o arquivo `index.ts` no diretório chamado `\constants` no caminho `src\core` que irá conter as constantes que iremos precisar usar em nossa ***Classe Calcular Parcelamento***.  

```ts
// constants\index.ts

const QTDE_MAX_PARCELAS = 12
const TAXA_JUROS_MENSAL = 0.0167

export { QTDE_MAX_PARCELAS, TAXA_JUROS_MENSAL }
```

Como podemos ver acima, criamos duas constantes, uma referente a ***quantidade de parcelas*** e a outra referente a ***taxa de juros*** e logo em seguida exportamos as duas constantes para que possamos usar na aplicação.  

Agora que já temos nossas constantes criadas, podemos começar a implementar nossa Classe.  
No caminho `src\core\parcelamento` crie o arquivo `CalcularParcelamento.ts` que será nossa Classe.

```ts
// CalcularParcelamento.ts

import { QTDE_MAX_PARCELAS, TAXA_JUROS_MENSAL } from "../constants";
import Parcelamento from "./Parcelamento";

export default class CalcularParcelamento {
  executar(
    valor: number,  //* Valor Base promocional
    qtdeParcelas: number = QTDE_MAX_PARCELAS,
    taxaJuros: number = TAXA_JUROS_MENSAL //* Pode passar uma taxa específica ou usa a taxa padrão cadastrada
  ): Parcelamento {
    if (qtdeParcelas < 2 || qtdeParcelas > QTDE_MAX_PARCELAS){
      //* Dispara uma exceção caso tem parcelar acima do permitido 
      throw new Error(`Quantidade de parcelas deve ser entre 2 e ${QTDE_MAX_PARCELAS}`)
    }

    //* Calcula o valor total do produto, junto com os juros compostos
    const totalComJuros = this.calcularJurosCompostos(valor, taxaJuros, qtdeParcelas)

    return {
      valorParcela: this.comDuasCasasDecimais(totalComJuros / qtdeParcelas),
      valorTotal: this.comDuasCasasDecimais(totalComJuros),
      qtdeParcelas,
      taxaJuros,
    }
  }

    private calcularJurosCompostos(valorTotal: number, taxaMensal: number, qtdeParcelas: number){
      //* O cálculo é o Valor Promocional, multiplicado pela formula
      //* 1 mais a taxaMensal elevado a qtdeParcelas Ex. (0.0167)¹²
      return valorTotal * Math.pow(1 + taxaMensal, qtdeParcelas)
    }

    private comDuasCasasDecimais(valor: number): number {
      return Math.round(valor * 100) / 100
    }
}
```

O próximo passo é criar o arquivo `index.ts` no diretório `\parcelamento` importando e exportando todos os arquivos constantes nele.  

```ts
// parcelamento\index.ts

import CalcularParcelamento from "./CalcularParcelamento"
import Parcelamento from "./Parcelamento"

export { CalcularParcelamento }
export type { Parcelamento }
```

E para completar o processo, precisamos atualizar o arquivo `index.ts` do diretório `\core` adicionando o diretório `\parcelamento` importando todos os seus arquivos.  

```ts
// core\index.ts

export * from "./produto"
export * from "./parcelamento"
```

[^ Sumário ^](./README.md)

## Banco de Dados Mockado

Para que possamos dar procedimento ao projeto, precisaremos mockar alguns produtos para que possamos exibir nas páginas que iremos criar.  
Posteriormente será executado um processo que irá preencher o banco de dados com essas informações.  

Então no caminho `src\core\constants` crie o arquivo `produtos.ts` e insira os dados ***(não irei colocar todos os daqui aqui pois são muitos, mas constarão no repositório).***

```ts
// produtos.ts

import { Produto } from '../produto'

const produtos: Produto[] = [
  {
    id: 1,
    nome: 'Notebook Gamer Acer Nitro 5',
    descricao:
      'O Acer Nitro 5 é um notebook gamer poderoso, ideal para jogos pesados e multitarefas.',
    marca: 'Acer',
    modelo: 'AN515-54-58CL',
    imagem:
      'https://firebasestorage.googleapis.com/v0/b/formacao-dev.appspot.com/o/lancamentos%2Fgam3rstore%2Facer-nitro-5.png?alt=media&token=094ba6a8-1a4d-414a-b32c-c176bfeaca8e',
    nota: 4.5,
    videoReview:
      'https://www.youtube.com/embed/8NQFr9De3lU?si=s_lN2KTQresD-36Y',
    tags: ['Baixou'],
    precoBase: 6499.99,
    precoPromocional: 5999.99,
    menorPreco: 4850.9,
    maiorPreco: 9800.8,
    precoMedio: 6503.7,
    especificacoes: {
      destaque: 'NVIDIA GeForce RTX 2060',
      Processador: 'Intel Core i5-9300H',
      Memória: '16GB DDR4',
      Armazenamento: '512GB SSD',
      'Placa de Vídeo': 'NVIDIA GeForce RTX 2060',
      Tela: '15.6 polegadas Full HD',
      Peso: '2.5 Kg',
    },
  },
...
]

export default Produtos
```

Agora precisamos atualizar o aquivo `index.ts` do diretório `\constants` adicionando o comando que importar e exportar o nosso Mock do Banco de Dados `produtos.ts`.

```ts
// constants\index.ts

import produtos from "./produtos"

const QTDE_MAX_PARCELAS = 12
const TAXA_JUROS_MENSAL = 0.0167

export { produtos, QTDE_MAX_PARCELAS, TAXA_JUROS_MENSAL }
```

E para finalizar, precisamos atualizar o arquivo `index.ts` no diretório Core da Aplicação `\core` exportando tudo que o diretório `\constants` contém.

```ts
// core\index.ts

export * from "./constants"
export * from "./produto"
export * from "./parcelamento"
```

[^ Sumário ^](./README.md)

## Formatando Moeda

Agora iremos criar uma Classe que irá formatar como a Moeda será exibida na tela.
No caminho `src\core` crie um diretório `\utils` e dentro crie um arquivo `Moeda.ts` que irá conter a implementação da da ***Classe Moeda.***

```ts
// Moeda.ts

export default class Moeda {
  static formatar(
    valor: number,
    localizacao: string = 'pt-BR',
    moeda: string = 'BRL'
  ): string {
    return (valor ?? 0).toLocaleString(localizacao, {
      style: 'currency',
      currency: moeda,
    })
  }
}
```

A Classe acima cria um Método estático chamado `formatar()` com os atributos: valor, localização (que por padrão seleciona o idioma ***'pt-BR'***) e moeda (que por padrão seleciona a moeda ***'BRL'***) e por fim formata a moeda.  

E essa é a Classe Utilitária que iremos utilizar em toda a Aplicação quando formos formatar qualquer moeda.  

Para finalizar, precisamos importar e exportar a Classe Moeda, no arquivo `index.ts` do diretório `\utils`.  

```ts
// utils\index.ts

import Moeda from "./Moeda"

export { Moeda }
```

E para finalizar, precisamos atualizar o `index.ts` do Core da Aplicação exportando todo o conteúdo do diretório `\utils`.

```ts
// core\index.ts

export * from "./constants"
export * from "./parcelamento"
export * from "./produto"
export * from "./utils"
```

Por enquanto o Core da Aplicação está finalizado para que possamos começar e criar a Interface Gráfica da Aplicação, mas, ainda tem bastantes funcionalidades para serem acrescentadas ao Core, mas serão adicionados futuramente.

[^ Sumário ^](./README.md)

## FRONTEND - Interface Gráfica

Agora iremos iniciar a programação da ***Interface Gráfica*** a parte visual da aplicação.  

### Componente ProdutoItem

Inicialmente irenos implementar o ***Item do Produto*** e para isso, vamos criar um Componente chamado ***ProdutoItem***, então, no caminho `src\app` crie um diretório `\components` depois crie outro diretório `\produto` e dentro crie o arquivo `ProdutoItem.tsx`.  

Como puderam notar, agora estamos usando a extensão ***".tsx"*** ela possui um "x" no final pois estaremos criando página Rect que mistura o ***"html"*** e o ***"css"*** na criação da interface gráfica, ou seja, um arquivo typescript possui código html e css dentro dele.

> ***NOTA:***
> ___
> *Um atalho no VSCode para criar essa estrutura mais rápido é ao invés de criar uma pasta de cada vez e depois criar o arquivo, pode clicar em criar arquivo e digitar: `components\produto\ProdutoItem.ts`.  
Assim, já são criadas as pastas e o arquivo com um único clique.  
**PS.: lembrando que para esse exemplo precisa estar dentro do** `\app`.*
<p>

Para iniciar e poder começar a visualizar algo na tela, vamos criar uma Função que irá exibir uma DIV contendo o texto ***"Produto Item"***, somente isso por enquanto.  

```tsx
// ProdutoItem.tsx

export default function ProdutoItem () {
  return (
    <div className="text-2xl border-2 border-gray-600 rounded-2xl p-4">
      Produto Item
    </div>
  )
}
```

No Componente ProdutoItem, O texto ***"Produto Item"*** será grande *(tamanho 2xl)*, estará dentro de uma div com bordas de 2 pixels de espessura, uma cor cinza escura e bordas arredondadas *(2xl)*.
O conteúdo dentro da div terá um espaçamento interno *(padding)* de 1rem *(16px)*, garantindo que o texto não fique colado nas bordas da div.  

- `text-2xl`:  
***Função:*** Define o tamanho do texto como 2xl *(extra grande)*.  
***Tamanho:*** Aproximadamente 1.5rem *(24px)* por padrão no Tailwind CSS.  
***Exemplo:*** Aumenta o tamanho da fonte do texto ***"Produto Item"***.  

- `border-2`:  
***Função:*** Aplica uma borda ao redor da div com uma largura de 2 pixels.
***Exemplo:*** A borda em volta da div terá 2 pixels de espessura.  

- `border-gray-600`:  
***Função:*** Define a cor da borda como cinza escuro.  
***Escala:*** gray-600 é uma cor da paleta de cinza do Tailwind, e é uma tonalidade intermediária de cinza.  
***Exemplo:*** A borda ao redor da div terá uma cor de cinza escuro.  

- `rounded-2xl`:  
***Função:*** Define o arredondamento das bordas como 2xl.  
***Significado:*** Isso aplica bordas arredondadas com um raio maior *(aproximadamente 1rem ou 16px de raio de curvatura)*.  
***Exemplo:*** As bordas da div terão cantos arredondados de forma mais pronunciada.  

- `p-4`:  
***Função:*** Aplica um padding (espaçamento interno) de 1rem (16px) em todos os lados da div.  
***Exemplo:*** O conteúdo "Produto Item" ficará afastado das bordas da div, com 1rem de espaço por todos os lados.  

Agora que temos o Componente ProdutoItem criado, podemos adiciona-lo a página principal da aplicação, e para isso abra o arquivo `page.tsx` no caminho `src\app` e faça as alterações abaixo.  

```tsx
// Page.tsx

import ProdutoItem from "./components/produto/ProdutoItem";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center space-y-2 h-screen">
      <ProdutoItem />
      <ProdutoItem />
      <ProdutoItem />
      <ProdutoItem />
    </div>
  );
}
```

Acima temos a página inicial de nossa aplicação renderizando 4 Componentes `<ProdutoItem />` eles serão exibidos centralizados na tela com um espaçamento de 2px entre eles.  

A div que envolve os componentes ***ProdutoItem*** usará o Flexbox para organizar os itens em uma coluna, centralizá-los tanto vertical quanto horizontalmente na tela.  

Entre os itens ***ProdutoItem***, haverá um pequeno espaçamento *(8px)* definido por `space-y-2`.  

A div ocupará toda a altura da tela *(h-screen)*, e os itens serão alinhados ao centro, tanto na vertical quanto na horizontal, abaixo o que cada ClassName faz:  

- `flex`:  
***Função***: Define que o contêiner usará o modelo de layout Flexbox.  
***Exemplo***: O Flexbox ajuda a organizar e alinhar os itens filhos *(os componentes ***ProdutoItem***)* de maneira eficiente e controlada.  

- `flex-col`:  
***Função***: Organiza os itens filhos na direção vertical *(coluna)*.  
***Exemplo***: Os componentes ***ProdutoItem*** serão empilhados um abaixo do outro, formando uma coluna.  

- `items-center`:  
***Função***: Alinha os itens filhos horizontalmente no centro do contêiner *(ao longo do eixo transversal do Flexbox).*  
***Exemplo***: Todos os ***ProdutoItem*** serão centralizados horizontalmente dentro da div.  

- `justify-center`:  
***Função***: Alinha os itens filhos verticalmente no centro do contêiner *(ao longo do eixo principal do Flexbox).*  
***Exemplo***: Todos os ***ProdutoItem*** serão centralizados verticalmente dentro da div.  

- `space-y-2`:  
***Função***: Adiciona um espaçamento vertical de *0.5rem (8px)* entre os itens filhos *(no caso, entre os componentes ***ProdutoItem***).*  
***Exemplo***: Cria um pequeno espaço entre cada um dos componentes ***ProdutoItem*** na lista.  

- `h-screen`:  
***Função***: Define a altura do contêiner como 100% da altura da viewport *(tela visível)*.  
***Exemplo***: A div que contém os componentes ***ProdutoItem*** ocupará toda a altura da tela, ajudando a centralizar verticalmente os itens dentro dessa área.  

Essas classes trabalham juntas para criar uma estrutura bem organizada e visualmente equilibrada, com centralização dos itens e uma estética agradável com bordas arredondadas e espaços internos adequados e podemos verificar como ficou, na imagem a seguir:  

<div align='center'><img alt='renderização do componente ProdutoItem' src='./imagens/002.png' /></div>

[^ Sumário ^](./README.md)

### Definindo Parâmetros para o Componente ProdutoItem

Dentro do ***Componente ProdutoItem*** é que podemos definir quais são os parâmetros que queremos passar para o componente.  

```tsx
// ProdutoItem.tsx

import { Produto } from "@/core"

export interface ProdutoItemProps {
  produto: Produto
}

export default function ProdutoItem (props: ProdutoItemProps) {
  const { produto } = props
  return (
    <div className="text-2xl border-2 border-gray-600 rounded-2xl p-4">
      {produto.nome}
    </div>
  )
}
```

Como podemos ver acima, a importação do Produto foi feita de forma diferente, note que tem um ***"@"*** antes de apontar para a pasta Core `@/core` ele não está sendo acessado por caminho relativo como é feito comumente, isso acontece porque exportamos o Núcleo da Aplicação, a Regra de Negócio.  

E mais adiante quanto retirar-mos o Core de dentro do Frontend, a importação ficará sem a barra depois do arroba.  

```tsx
// ProdutoItem.tsx

import { Produto } from "@/core"
...
```

Quando definimos e exportamos uma interface `ProdutoItemProps` informamos os atributos que queremos passar para o Componente, que em nosso caso estamos definindo que o Componente precisa ter um Produto, definindo um atributo `produto:` que recebe um `Produto`.  

> ***NOTA:***  
> ___
> *Por padrão definimos o nome de uma propriedade adicionando o sufixo **"Props"** após o nome do Componente.*
<p>

```tsx
// ProdutoItem.tsx

...
export interface ProdutoItemProps {
  produto: Produto
}
...
```

E uma vez que temos o Produto, o instanciamos em uma constante `const { produto } = props` e o usamos pegando o nome do produto por exemplo `{produto.nome}`.  

```tsx
// ProdutoItem.tsx

...
export default function ProdutoItem (props: ProdutoItemProps) {
  const { produto } = props
  return (
    <div className="text-2xl border-2 border-gray-600 rounded-2xl p-4">
      {produto.nome}
    </div>
  )
}
```

Agora que já definimos os atributos em nosso componente, precisamos editar a página principal para exibir os Produtos que Mockamos com os dados dos produtos, então, edite o arquivo `page.tsx` no caminho `src\app`.  

```tsx
// Page.tsx

import { produtos } from "@/core";
import ProdutoItem from "./components/produto/ProdutoItem";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center space-y-2 h-screen">
      <ProdutoItem produto={produtos[0]}/>
      <ProdutoItem produto={produtos[1]}/>
      <ProdutoItem produto={produtos[2]}/>
      <ProdutoItem produto={produtos[3]}/>
    </div>
  );
}
```

Como podemos observar no código acima, podemos acessar os dados de Produtos através do índice `produto={produtos[0]}`, veja abaixo como é exibido na tela:  

<div align='center'><img alt='Nome dos produtos' src='./imagens/003.png' /></div>

[^ Sumário ^](./README.md)

### Definindo uma Lista de Componentes

Agora transformaremos um ***Array de Objetos*** literais que está dentro do arquivo `src\core\constants\produtos.ts` para uma ***Lista de Componentes*** na interface gráfica.  

```tsx
// src\app\page.tsx

import { produtos } from "@/core";
import ProdutoItem from "./components/produto/ProdutoItem";

export default function Home() {
  return (
    <div className="grid grid-cols-4 items-center justify-center space-y-2 space-x-2 m-10 h-screen">
      {produtos.map((produto) => (
        <ProdutoItem key={ produto.id } produto={ produto } />
      ))}
    </div>
  );
}
```

> ***NOTA:***
> ___
> *Toda vez que geramos uma **Lista de Componentes** através de um **Laço FOR** ou um **MAP** precisamos estabelecer uma **chave única** `key={ }` para que o React consiga alterar esse elemento específico.*
<p>

A função Home é um componente funcional escrito em React, usando TSX para renderizar a interface do usuário.  
Vamos quebrar o que ela faz, linha por linha:

1. Importações:

    ```tsx
    // src\app\page.tsx

    import { produtos } from "@/core";
    import ProdutoItem from "./components/produto/ProdutoItem";

    ...
    ```

    - A função começa importando o array `produtos` do módulo `@/core`. Esse array contém uma lista de produtos *(presumivelmente, com atributos como `id`, `nome`, `preço`, etc.)*.  

    - Também importa o componente `ProdutoItem` de um caminho relativo (`"./components/produto/ProdutoItem"`). Esse componente será usado para exibir informações sobre cada produto individualmente.

2. Definição da função `Home`:

    ```tsx
    // src\app\page.tsx

    ...
    export default function Home() {
      return (
        <div className="grid grid-cols-4 items-center justify-center space-y-2 space-x-2 m-10 h-screen">
          {produtos.map((produto) => (
            <ProdutoItem key={ produto.id } produto={ produto } />
          ))}
        </div>
      );
    }
    ```

    - A função `Home` é exportada como o componente padrão *(página principal do app React)*.  

    - Dentro do `return`, o TSX define um `div` com uma série de classes do ***Tailwind CSS*** para o layout.  
    Estas classes são:  

      - `grid`: Define um layout de grade (grid layout).  

      - `grid-cols-4`: Organiza os itens em 4 colunas.  

      - `items-center`: Alinha os itens verticalmente no centro.  

      - `justify-center`: Alinha os itens horizontalmente no centro.  

      - `space-y-2`: Define um espaçamento de 2 unidades entre os itens na direção vertical.  

      - `space-x-2`: Define um espaçamento de 2 unidades entre os itens na direção horizontal.  

      - `m-10`: Adiciona uma margem de 10 unidades ao redor da grade.  

      - `h-screen`: Faz o div ter a altura total da tela (100% da altura da janela do navegador).  

3. Renderização de `ProdutoItem`:  

    ```tsx
    // src\app\page.tsx

    ...
      {produtos.map((produto) => (
        <ProdutoItem key={ produto.id } produto={ produto } />
      ))}
    ```

    - O código usa o método `.map()` para iterar sobre o array `produtos`.  

    - Para cada item em `produtos`, é criado um componente `ProdutoItem`, passando o `produto` como uma ***prop*** para o componente, e utilizando o `id` do produto como ***key*** para ajudar o React a gerenciar o DOM de forma eficiente.  

Em resumo, a ***Função Home*** `function Home()` é um componente que exibe uma ***Lista de Produtos*** em um layout de grade, onde cada produto é renderizado através do componente `ProdutoItem`. O componente usa o ***Tailwind CSS*** para estilizar a interface, garantindo que a ***lista de produtos*** seja organizada em um ***Grid Responsivo*** e com espaçamento adequado.  

Cada produto é representado por um item individual *(`ProdutoItem`)* que recebe o objeto `produto` como uma propriedade. A `key` é usada para ajudar o React a otimizar a renderização de listas.

<div align='center'><img alt='Lista de Componentes' src='./imagens/004.png' /></div>
<p>

[^ Sumário ^](./README.md)

## Definindo um Layout Boxed

Um ***layout boxed*** *(ou **layout em caixa**)* é um tipo de design de página em que o conteúdo da página é restrito a uma área centralizada e delimitada por uma borda, geralmente com um espaço vazio ao redor *(margens)*. Em vez de ocupar toda a largura da tela *(como ocorre no **layout full-width**, que preenche toda a largura da janela do navegador)*, o layout boxed mantém o conteúdo de uma página com uma largura fixa e um ***"gutter"*** ou espaçamento nas laterais, criando um efeito de ***"caixa"*** ao redor do conteúdo.  

### Características principais do layout boxed

- ***Conteúdo centralizado:***  
O conteúdo da página, como textos, imagens, e outros elementos, é alinhado ao centro da tela, com margens nas laterais que o distanciam das bordas da janela.

- ***Largura fixa:***  
A largura do conteúdo geralmente é definida em pixels ou outras unidades fixas *(por exemplo, **1200px** de largura)*, o que significa que, independentemente do tamanho da tela do usuário, o conteúdo não se estende além dessa largura. Isso pode ser útil para criar um layout mais controlado e previsível.

- ***Espaçamento ao redor:***  
O espaço vazio ***ao redor do conteúdo*** *(conhecido como padding ou margem externa)* ajuda a criar uma sensação de ***"respiro"*** e de que o conteúdo está em uma área separada, como se estivesse dentro de uma caixa.

- ***Estética mais organizada:***  
O ***layout boxed*** é frequentemente preferido em sites que buscam um design mais limpo e estruturado, pois o limite de largura impede que o conteúdo se espalhe demais na tela, oferecendo uma leitura mais confortável.  

### Exemplos de quando o layout boxed é utilizado

- ***Sites de portfólio:***  
Muitos designers e fotógrafos usam layouts em caixa para garantir que as imagens e o conteúdo sejam exibidos de forma clara e consistente, independentemente do tamanho da tela.  

- ***Blog ou sites institucionais:***  
Em blogs ou sites de conteúdo, um layout boxed pode tornar a leitura mais fácil e agradável, com um limite de largura que não distorce a experiência em telas grandes.  

- ***E-commerce:***  
Lojas online também podem usar layout boxed para garantir que as imagens de produtos, descrições e botões de ação não fiquem excessivamente grandes ou difíceis de interagir em telas grandes.

### Comparação com o Layout Full-Width

- ***Full-width:***  
No ***layout full-width***, o conteúdo da página se estende por toda a largura da janela do navegador, independentemente do tamanho da tela. Isso pode ser ideal para criar uma experiência visual mais expansiva, mas pode ser menos controlado.  

- ***Boxed:***  
No ***layout boxed***, o conteúdo está restrito a uma largura definida, o que proporciona uma experiência mais controlada e centrada.  

### Como aplicar um layout boxed no CSS?

No caminho `src\app` edite o arquivo `globals.css` para que possamos configurar o CSS no Tailwind CSS.  

O Tailwind, é organizado em 3 partes ***base, componentes e utilitários*** *(`base`, `components` e `utilities`)* e podemos extender essas camadas ***"layers"*** através da marcação `@layer` alguma coisa como por exemplo:  

```css
/* src\app\globals.css */

...
@layer components {
  .container {
    @apply max-w-7xl mx-auto px-10;
  }
}
...
```

### Explicação de cada parte

1. `@layer components`:  

    O ***Tailwind CSS*** permite organizar e agrupar estilos em camadas *(layers)*. A diretiva `@layer` é usada para inserir regras de estilo dentro de uma camada específica. O Tailwind possui três camadas principais:  

    - `base`: Para estilos base *(como `body`, `html`, etc.)*.  
  
    - `components`: Para componentes reutilizáveis *(como `botões`, `cards`, `containers`, etc.)*.  
  
    - `utilities`: Para classes utilitárias, que são a base do funcionamento do Tailwind.  
  
    Nesse caso, você está criando ou adicionando um componente à camada `components`.  

2. `.container`:  

    Aqui você está criando uma classe CSS chamada `.container`. Esse nome é frequentemente usado para definir um container de largura máxima, centralizado na página, que limita a largura do conteúdo dentro dele. É um padrão comum em muitos sites para melhorar a legibilidade e garantir que o conteúdo não se estenda demais na tela.  

3. `@apply`:  

    A diretiva `@apply` é uma funcionalidade do Tailwind CSS que permite aplicar classes utilitárias diretamente dentro de um arquivo CSS. Ela é útil quando você deseja criar um conjunto de classes reutilizáveis de forma mais compacta e legível.  

    Nesse caso, as classes utilitárias estão sendo aplicadas à classe `.container`:  

      - `max-w-7xl`:  
      Define a largura máxima do container. O valor `7xl` corresponde a uma largura específica de ***80rem (1280px)***. Ou seja, o container pode ter até 80rem de largura, mas nunca mais que isso.  
  
      - `mx-auto`:  
      Centraliza o container horizontalmente, definindo as margens esquerda e direita *(**margin-left** e **margin-right**)* como automáticas. Isso garante que o container fique centralizado na tela.  
  
      - `px-10`:  
      Define um ***padding de 10 unidades*** nas direções ***esquerda*** e ***direita*** *(em Tailwind, o *padding* é um valor proporcional ao sistema de espaçamento configurado no Tailwind, normalmente `0.25rem`, `0.5rem`, etc.)*.  
      Então, ***px-10*** aplica um ***padding-left*** e ***padding-right*** de ***2.5rem (40px)***.  

Agora que temos nossa área ***Boxed*** definida, podemos utilizar em nossa página para que ela tenha uma área Boxed delimitada para que possamos criar nossa aplicação, então, edite o arquivo `page.tsx` no caminho `src\app`.  

```tsx
// page.tsx

...
    <div className="grid grid-cols-4 container items-center justify-center space-y-2 space-x-2 mt-5 h-screen">
...

```

Só foi preciso adicionar a Classe Tailwind CSS `container` na `div` do Componente `ProdutoItem` que a página foi renderizada como esperado, só houve mais um pequeno ajuste na margem top para ficar um pouco melhor `mt-5` aplicando uma margem de 20px.

Na imagem abaixo podemos observar como está ficando:  

<div align='center'><img alt='imagem5' src='./imagens/005.png' /></div>

[^ Sumário ^](./README.md)

## Definindo Rotas Dinâmicas

Para que nosso `ProdutoItem` funcione nas ***Rotas Dinâmicas*** precisamos converte-lo em um `LINK` e para isso precisamos fazer algumas alterações no arquivo `ProdutoItem.tsx` que se encontra no caminho `src\app\components\produto`.  

```tsx
// ProdutoItem.tsx

import { Produto } from '@/core'
import Link from 'next/link'

export interface ProdutoItemProps {
  produto: Produto
}

export default function ProdutoItem(props: ProdutoItemProps) {
  const { produto } = props
  return (
    <Link
      href={`/produto/${props.produto.id}`}
      className="text-2xl border-2 border-gray-600 rounded-2xl p-4"
    >
      {produto.nome}
    </Link>
  )
}
```

Agora vamos ver o que cada parte alteramos faz:  

### 1. Importações

```tsx
// ProdutoItem.tsx

import { Produto } from '@/core'
import Link from 'next/link'

...
```

- `Produto`:  
Está sendo importado de `'@/core'`. Presumivelmente, `Produto` é um tipo ou interface que define as propriedades de um produto, como `id`, `nome`, etc.  

- `Link`:  
Vem da biblioteca `next/link`, que é uma maneira de criar links de navegação entre páginas no Next.js. `Link` permite uma navegação otimizada para Single Page Applications *(SPAs)*.

### 2. Interface `ProdutoItemProps`

```tsx
// ProdutoItem.tsx

...
export interface ProdutoItemProps {
  produto: Produto
}

...
```

Aqui, é declarada uma interface chamada `ProdutoItemProps`. Ela define que o componente `ProdutoItem` espera uma propriedade chamada `produto`, que é do tipo `Produto`. O tipo Produto contém informações como `id`, `nome` e outras propriedades relacionadas a um produto.  

### 3. Componente `ProdutoItem`

```tsx
// ProdutoItem.tsx

...
export default function ProdutoItem(props: ProdutoItemProps) {
  const { produto } = props
  return (
    <Link
      href={`/produto/${props.produto.id}`}
      className="text-2xl border-2 border-gray-600 rounded-2xl p-4"
    >
      {produto.nome}
    </Link>
  )
}
```

- `Declaração do Componente`:  
`ProdutoItem` é uma função que recebe props do tipo `ProdutoItemProps`. Dentro do componente, ele extrai a propriedade `produto` de `props`.  

- `Elemento Link`:  
  - O componente retorna um elemento `Link`, que é usado para criar um link de navegação para uma página de detalhes do produto.  

  - O atributo `href` é configurado dinamicamente para apontar para a URL `/produto/${props.produto.id}`, onde `produto.id` é o identificador único do produto. Isso cria um link para a página de detalhes desse produto específico.  

  - ***Estilos:***  
  O `Link` possui uma série de classes utilitárias do ***Tailwind CSS*** que estilizam o componente:
  
    - `text-2xl`:  
    Define o tamanho da fonte como `2xl` *(muito grande)*.  
  
    - `border-2 border-gray-600`:  
    Aplica uma borda de `2px` de espessura, com a cor cinza-escuro *(`#4b5563`)*.  
  
    - `rounded-2xl`:  
    Aplica bordas arredondadas de `2xl`.  

    - `p-4`:  
    Aplica um `padding` *(espaçamento interno)* de `1rem` em todos os lados.  
  
  - ***Conteúdo do Link***:  
    Dentro do `Link`, é exibido o nome do produto, acessado via `produto.nome`.

Em resumo, é um componente simples usado para exibir uma lista de produtos, onde cada item é um link para a página de detalhes desse produto específico.  
Neste ponto, ele está navegando para uma página que ainda não existe, mas, já iremos solucionar esse problema criando a Rota.  

[^ Sumário ^](./README.md)

## Criando uma Rota Dinâmica

No caminho `src\app` qualquer diretório que for criado dentro, podemos criar uma Rota a partir dela, então, crie um diretório `\produto` e dentro iremos criar uma ***Rota Dinâmica*** utilizando o padrão que nomeia o diretório entre colchetes `\[id]` com isso, criamos uma Rota Dinâmica para o `ID` do `ProdutoItem`, agora, dentro da rota que acabamos de criar, crie o arquivo `page.tsx`.  

> ***NOTA:***
> ___
> Não se esqueça que pode usar o atalho de criar o diretório e o arquivo de uma só vez.  
> Clique em criar ***Novo Arquivo*** e digite: `produto\[id]\page.tsx` e pronto, tudo criado.  
<p>

```tsx
// page.tsx

import { produtos } from "@/core"

export default function PaginaProduto(props: any) {
  const id = +props.params.id
  const produto = produtos.find((produto) => produto.id === id)
  return (
    <div className="flex items-center justify-center h-screen">
      <div className="text-2xl border-2 border-gray-600 rounded-2xl p-4">
        <h1>Produto: {produto?.nome}</h1>
      </div>
    </div>
  )
}


```

> [!WARNING]
> Quando utilizamos `(props: any)` como parâmetro, o ***ESLint*** exibe um alerta de que não pode ser usado, então vamos desativar essa regra no arquivo que se encontra na raiz da aplicação Frontend `.eslintrc.json` e adicionaremos a seguinte regra: `"rules": { "@typescript-eslint/no-explicit-any": "off" }`.

<br>

```JSON
// .eslintrc.json

{
  "extends": ["next/core-web-vitals", "next/typescript"],
  "rules": {
    "@typescript-eslint/no-explicit-any": "off"
  }
}
```

Como observamos acima, ***Função*** `PaginaProduto` é um ***Componente React*** que renderiza uma página para exibir informações sobre um ***produto específico*** com base no `ID` passado como parâmetro na URL.  
Vamos descrever seu funcionamento detalhadamente:

## Descrição do Componente

### 1. Importação de Dados

- `import { produtos } from "@/core"`:  
A função importa um ***array*** `produtos` do arquivo `constants\produtos.ts` dentro do diretório `\core`. Esse array contém ***objetos de produto***, e cada produto possui um ***ID único*** e outras propriedades *(como `nome`, `preço`, etc.)*.  

### 2. Função do Componente

- O componente é definido como uma função que recebe `props` (provavelmente passadas pelo Next.js ou pelo React Router) e retorna JSX para renderizar o conteúdo.  

### 3. Recuperação do ID do Produto

- `const id = +props.params.id`:  
A função acessa o `id` do produto a partir das `params` que estão nas propriedades `props`. A conversão `+` é usada para garantir que o ID seja tratado como um número *(caso venha como string)*.  

### 4. Busca do Produto

- `const produto = produtos.find((produto) => produto.id === id)`:  
Em seguida, o componente usa o método `find` para buscar o produto correspondente ao `id` informado. O `find` retorna o primeiro produto que tem o mesmo `ID`. Caso não encontre, produto será `undefined`.  

### 5. Renderização do JSX

- A função retorna um ***JSX*** com a estrutura de uma página. Ela renderiza uma `div` centralizada na tela com:  
  - ***Título:***  
  Um título `Produto: {produto?.nome}`. O `?`. é utilizado para garantir que, caso `produto` seja `undefined` *(quando não encontrado)*, não haja erro ao tentar acessar a propriedade nome.  

  - ***Estilo:***  
  A `div` tem classes de estilo do ***Tailwind CSS***, como `flex`, `items-center`, `justify-center`, `h-screen`, entre outras, que garantem que o conteúdo será centralizado na tela e com um design simples *(borda, espaçamento, etc.)*.  

Resumindo, este componente recebe um ***id de produto*** via parâmetros da URL, encontra o ***produto correspondente*** a esse id no ***array produtos*** e renderiza o nome do produto em uma página centralizada. Se o produto não for encontrado, o comportamento atual não mostra nenhuma mensagem de erro, o que será melhorado mais adiante.

Agora como podemos observar na imagem abaixo, quando clicamos em um produto da Lista de Produtos, somos enviados para a página referente ao produto clicado, e tudo isso graças a Rota Dinâmica que acabamos de criar.

<div align='center'><img alt='rota dinâmica' src='./imagens/006.png' /></div>

[^ Sumário ^](./README.md)

## Adicionando uma Cor ao Tema do Tailwind CSS

Agora veremos como adicionar uma cor personalizada ao Tema do ***Tailwind CSS*** para poder utilizar na aplicação.  
Para isso, precisamos editar o arquivo `tailwind.config.ts` que se encontra na raiz da aplicação Frontend.

```ts
// tailwind.config.ts

...
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        'violet-dark': {
          // DEFAULT: "#0E001D",
          DEFAULT: '#10041f',
          foreground: '#FFF',
        },
      },
    },
  },
...
```

Como podemos observar dentro de `theme:` o estendemos `extend:` e editamos as cores `colors` adicionando nossa cor personalizada `violet-dark`, deixando como cor padrão do background a cor `DEFAULT: "#0E001D"` e para o texto a cor `foreground: "#FFF"` e com essa configuração, quando estivermos programando o VSCode completará o nome da cor.  

Agora vamos editar o arquivo `ProdutoItem.tsx` adicionando a cor de background `bg-violet-dark` que acabamos de criar ao `ClassName` do componente.  

<div align='center'><img alt='background violet-dark' src='./imagens/007.png' /></div>

Como pode ser observado, o tom da cor é bem escuro quase igual ao tema dark do Chrome, mas dá pra perceber uma pequena diferença no tom, posteriormente essa cor será modificada.

[^ Sumário ^](./README.md)

## Exibindo Imagem na Aplicação

Para que possamos exibir as imagens dos produtos que estão cadastras no arquivo `src\core\constants\produtos.ts`, precisamos realizar algumas configurações no projeto.  
primeiro vamos adicionar uma imagem sem realizar a configuração para que possamos observar o erro.  

```tsx
// ProdutoItem.tsx

import { Produto } from '@/core'
import Image from 'next/image'
import Link from 'next/link'

export interface ProdutoItemProps {
  produto: Produto
}

export default function ProdutoItem(props: ProdutoItemProps) {
  const { produto } = props
  return (
    <Link
      href={`/produto/${props.produto.id}`}
      className="text-2xl border-2 bg-violet-dark border-gray-600 rounded-2xl p-4"
    >
      <div className="w-full h-48 relative">
        <Image
          src={produto.imagem}
          fill
          className='object-contain'
          alt='Imagem Produto'
        />        
      </div>
      {produto.nome}
    </Link>
  )
}
```

### Descrição do Código

O código acima renderiza uma imagem dentro de um `div` com largura completa (`w-full`) e altura fixa de 48 unidades (`h-48`). Utiliza-se o componente `Image` para exibir a imagem do produto, ocupando todo o espaço disponível do `div` devido ao uso da propriedade `fill`. A classe `object-contain` é aplicada para garantir que a imagem mantenha suas proporções, ajustando-se dentro do contêiner.

```tsx
<div className="w-full h-48 relative">
  <Image
    src={produto.imagem}
    fill
    className='object-contain'
    alt='Imagem Produto'
  />        
</div>
```

### Explicação dos Atributos

- `w-full`:  
Define que a largura do contêiner será de 100% do elemento pai.  

- `h-48`:  
Define a altura do contêiner como 48 unidades (tailwindcss).  

- `relative`:  
A classe relative permite o posicionamento absoluto do conteúdo interno em relação a este contêiner.  

- `fill`:  
Permite que a imagem preencha todo o contêiner div.  

- `object-contain`:  
Garante que a imagem seja redimensionada proporcionalmente dentro do contêiner.  

- `alt`:  
Texto alternativo para a imagem, importante para acessibilidade.  

Quando adicionamos uma imagem na Aplicação sem a devida configuração, a mensagem de erro abaixo será exibida:  

<div align='center'><img alt='Erro' src='./imagens/008.png' /></div>
<br>

[^ Sumário ^](./README.md)

### Corrigindo o Erro de Exibição de Imagem

Para que as imagens do Projeto possam ser exibidas, precisamos liberar o caminho da imagem que está no Firebase `firebasestorage.googleapis.com` na Aplicação Nextjs.  

Então, precisamos editar o arquivo `next.config.ts` que se encontra na rais da aplicação Frontend.  
Precisamos adicionar os atributos: `images:`, `remotePatterns:`,  `protocol:` *(somente o protocolo Ex.: `https` sem `://` )* e `hostname:`*(contendo o caminho `firebasestorage.googleapis.com`)*.  

```ts
// next.config.ts

import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        // hostname: '**', //* Libera qualquer URL
        hostname: 'firebasestorage.googleapis.com',
      },
    ],
  },
}

export default nextConfig;
```

Com essa alteração realizada as imagens já podem ser exibidas na aplicação, como podemos observar na imagem abaixo:  

<div align='center'><img alt='Imagem Produto' src='./imagens/009.png' /></div>
