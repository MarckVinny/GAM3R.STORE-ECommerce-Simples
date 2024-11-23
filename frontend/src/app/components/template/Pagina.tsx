import Cabecalho from './Cabecalho'
import Rodape from './Rodape'

export interface PaginaProps {
  children: any
  className?: string
  semCabecalho?: boolean
  semRodape?: boolean
}

export default function Pagina(props: PaginaProps) {
  return (
    <div
      //* Gradiente utilizando Classes Tailwind
      className="flex flex-col min-h-screen bg-gradient-radial from-[#2d0064] to-[#0d001c]"

      // className="flex flex-col min-h-screen"
      //* Gradiente utilizando CSS puro
      //* style={{
      //*   background:
      //*     'radial-gradient(50% 50% at 50% 50%, #2D0064 0%, #0D001C 100%)',
      //* }}
    >
      <div
        //! w-screen causou estouro de tela (overflow) 
        className="flex flex-1 flex-col w-full bg-[url('/background.png')] bg-contain"
        // style={{ backgroundImage: 'url("/background.png")' }}
      >
        {/* Se NÃO estiver semCabeçalho MOSTRA o Cabeçalho */}
        {!props.semCabecalho && <Cabecalho />}
        <main className={`flex flex-1 flex-col ${props.className ?? ''}`}>
          {props.children}
        </main>
        {/* Se NÃO estiver semRodape MOSTRA o Rodapé */}
        {!props.semRodape && <Rodape />}
      </div>
    </div>
  )
}
