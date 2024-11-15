'use client'
import { Moeda, Produto } from '@/core'
import { IconShoppingCartPlus } from '@tabler/icons-react'
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
      className="border-2 bg-violet-dark border-cyan-400/30 rounded-2xl"
    >
      <div className="w-full h-48 relative">
        <Image
          src={produto.imagem}
          fill
          className="object-contain"
          alt="Imagem Produto"
        />
      </div>

      <div className="flex-1 flex flex-col gap-3 p-5 border-t-2 border-cyan-400/30">
        <span className="text-lg font-semibold">{produto.nome}</span>

        <div className="self-start text-sm border-b border-dashed">
          {produto.especificacoes.destaque}
        </div>

        <div className="flex-1"></div>

        <div className="flex flex-col">
          <span className="text-sm text-gray-400 line-through">
            de {Moeda.formatar(produto.precoBase)}
          </span>

          <span className="text-xl font-semibold text-emerald-400">
            por {Moeda.formatar(produto.precoPromocional)}
          </span>

          {/* <span className="text-xs text-zinc-400">
            até {Moeda.formatar(parcelamento.qtdeParcelas) x de {''}
            {Moeda.formatar(parcelamento.valorParcela)}}
          </span> */}
        </div>

        <button
          className="
          flex justify-center items-center gap-2 h-8 
          bg-violet-700 hover:border-2 border-emerald-500 rounded-full
          "
          onClick={(e) => {
            e.preventDefault()
            console.log('Produto Adicionado')
            // adicionarItem(produto)
          }}
        >
          <IconShoppingCartPlus size={20} />
          <span>Adicionar</span>
        </button>
      </div>
    </Link>
  )
}
