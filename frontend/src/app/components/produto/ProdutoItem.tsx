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