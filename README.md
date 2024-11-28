<h1 align='center'>GAM3R STORE e-Commerce Simples</h1>

___

Este projeto faz parte do Curso de Formação DEV da COD3R, e é um e-commerce simples contendo página apresentando os produtos divididos em 4 colunas, página de descrição do produto, carrinho de compras entre outros.

## SUMÁRIO

- [Criação do Projeto](./DOCUMENTACAO.md/#criação-do-projeto)
- [Limpando a Estrutura Padrão](./DOCUMENTACAO.md/#limpando-a-estrutura-padrão)
- [CORE - Criando o Núcleo da Aplicação](./DOCUMENTACAO.md/#criando-o-núcleo-da-aplicação)
  - [Produto](./DOCUMENTACAO.md/#produto)
    - [Interface Produto](./DOCUMENTACAO.md/#interface-produto)
    - [Interface Especificações](./DOCUMENTACAO.md/#interface-especificações)
    - [Relação de Composição](./DOCUMENTACAO.md/#relação-composição)
    - [Interface Precificavel](./DOCUMENTACAO.md/#interface-precificavel)
    - [Relação de Herança](./DOCUMENTACAO.md/#relação-de-herança)
    - [Exportando as Interfaces do Diretório Produto](./DOCUMENTACAO.md/#exportando-as-interfaces-do-diretório-produto)
  - [Parcelamento](./DOCUMENTACAO.md/#parcelamento)
    - [Interface Parcelamento](./DOCUMENTACAO.md/#interface-parcelamento)
    - [Classe Calcular Parcelamento](./DOCUMENTACAO.md/#classe-calcular-parcelamento)
  - [Banco de Dados Mockado](./DOCUMENTACAO.md/#banco-de-dados-mockado)
  - [Formatando Moeda](./DOCUMENTACAO.md/#formatando-moeda)
- [FRONTEND - Interface Gráfica](./DOCUMENTACAO.md/#frontend---interface-gráfica)
  - [Componente Card ProdutoItem](./DOCUMENTACAO.md/#componente-card-produtoitem)
    - [Definindo Parâmetros para o Componente ProdutoItem](./DOCUMENTACAO.md/#definindo-parâmetros-para-o-componente-produtoitem)
    - [Definindo uma Lista de Componentes](./DOCUMENTACAO.md/#definindo-uma-lista-de-componentes)
    - [Definindo um Layout Boxed](./DOCUMENTACAO.md/#definindo-um-layout-boxed)
    - [Definindo Rotas Dinâmicas](./DOCUMENTACAO.md/#definindo-rotas-dinâmicas)
      - [Criando uma Rota Dinâmica](./DOCUMENTACAO.md/#criando-uma-rota-dinâmica)
    - [Adicionando uma Cor ao Tema do Tailwind CSS](./DOCUMENTACAO.md/#adicionando-uma-cor-ao-tema-do-tailwind-css)
    - [Exibindo Imagem na Aplicação](./DOCUMENTACAO.md/#exibindo-imagem-na-aplicação)
      - [Corrigindo o Erro de Exibição de Imagem](./DOCUMENTACAO.md/#corrigindo-o-erro-de-exibição-de-imagem)
    - [Exibindo Informações do Produto](./DOCUMENTACAO.md/#exibindo-informações-do-produto)
      - [Nome do Produto](./DOCUMENTACAO.md/#nome-do-produto)
      - [Especificação em Destaque](./DOCUMENTACAO.md/#especificação-em-destaque)
      - [Preço do Produto](./DOCUMENTACAO.md/#preço-do-produto)
      - [Exibindo Notas de Review](./DOCUMENTACAO.md/#exibindo-notas-de-review)
      - [Adicionando NotaReview ao ProdutoItem](./DOCUMENTACAO.md/#adicionando-notareview-ao-produtoitem)
  - [Layout da Aplicação](./DOCUMENTACAO.md/#layout-da-aplicação)
    - [Componente Logo](./DOCUMENTACAO.md/#componente-logo)
    - [Componente IconeCarrinho](./DOCUMENTACAO.md/#componente-iconecarrinho)
    - [Componente Cabecalho](./DOCUMENTACAO.md/#componente-cabecalho)
    - [Componente Rodape](./DOCUMENTACAO.md/#componente-rodape)
  - [Componente Pagina](./DOCUMENTACAO.md/#componente-pagina)
    - [1. Propriedades "Props"](./DOCUMENTACAO.md/#1-propriedades-props)
    - [2. Estrutura do Componente](./DOCUMENTACAO.md/#2-estrutura-do-componente)
      - [Explicação Detalhada do Radial Gradient](./DOCUMENTACAO.md/#explicação-detalhada-do-radial-gradient)
      - [Recriando o Radial-Gradient com Tailwind](./DOCUMENTACAO.md/#recriando-o-radial-gradient-com-tailwind)
        - [Classe Personalizada](./DOCUMENTACAO.md/#classe-personalizada)
    - [3. Explicação Detalhada](./DOCUMENTACAO.md/#3-explicação-detalhada)
    - [4. Estilo com TailwindCSS](./DOCUMENTACAO.md/#4-estilo-com-tailwindcss)
  - [Grupo de Rotas](./DOCUMENTACAO.md/#criando-grupo-de-rotas)
  - [Componente ListaProdutos](./DOCUMENTACAO.md/#criando-componente-listaprodutos)
  - [Componente ProdutoNaoEncontrado](./DOCUMENTACAO.md/#criando-componente-produtonaoencontrado)
  - [Editando Informações do Produto](./DOCUMENTACAO.md/#editando-informações-do-produto)
    - [Classe Personalizada Botão Voltar](./DOCUMENTACAO.md/#classe-personalizada-botão-voltar)
    - [Personalizando a Tela de Informações do Produto](./DOCUMENTACAO.md/#personalizando-a-tela-de-informações-do-produto)
    - [Componente TituloProduto](./DOCUMENTACAO.md/#componente-tituloproduto)
    - [Componente TAG](./DOCUMENTACAO.md/#componente-tag)
    - [Componente Especificacoes](./DOCUMENTACAO.md/#componente-especificacoes)
    - [Componente InformacoesProduto](./DOCUMENTACAO.md/#componente-informacoesproduto)
    - [Atualizando Tela Informações do Produto](./DOCUMENTACAO.md/#atualizando-tela-informações-do-produto)
    - [O Uso de Hooks Personalizados em uma Aplicação](./DOCUMENTACAO.md/#o-uso-de-hooks-personalizados-em-uma-aplicação)
    - [Componente useParcelamento](./DOCUMENTACAO.md/#componente-useparcelamento)
    - [Componente BannerCompra](./DOCUMENTACAO.md/#componente-bannercompra)
