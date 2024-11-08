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
      className="text-2xl border-2 bg-violet-dark border-gray-600 rounded-2xl p-4"
    >
      {produto.nome}
    </Link>
  )
}
