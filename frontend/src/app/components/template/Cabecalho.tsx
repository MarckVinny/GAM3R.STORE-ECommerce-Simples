import Link from 'next/link'
import Logo from '../shared/Logo'
import IconeCarrinho from '../shared/IconeCarrinho'

export default function Cabecalho() {
  const qtdeItems = 0
  // const { qtdeItems } = useCarrinho()
  return (
    <div
      className="flex flex-col h-20"
      style={{
        background: `linear-gradient(90deg, #14002D, #420093 50%, #14002D 100%)`,
      }}
    >
      <div className="flex-1 flex flex-col container justify-center">
        <div className="flex justify-between items-center">
          <Logo />
          <Link href="/checkout/carrinho">
            <IconeCarrinho qtdeItens={qtdeItems} />
          </Link>
        </div>
      </div>
      <div className="h-px bg-gradient-to-r from-violet-600/20 via-violet-600/80 to-violet-600/20"></div>
    </div>
  )
}
