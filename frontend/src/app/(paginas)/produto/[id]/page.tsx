import ProdutoNaoEncontrado from "@/app/components/produto/ProdutoNaoEncontrado"
import { produtos } from "@/core"

export default function PaginaProduto(props: any) {
  const id = +props.params.id
  const produto = produtos.find((produto) => produto.id === id)
  return produto ? (
    <div className="flex flex-1 items-center justify-center">
      <div className="text-2xl border-2 border-gray-600 rounded-2xl p-4">
        <h1>Produto: {produto?.nome}</h1>
      </div>
    </div>
  ) : <ProdutoNaoEncontrado />
}
