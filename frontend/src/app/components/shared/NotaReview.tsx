import { IconStar, IconStarFilled, IconStarHalfFilled } from "@tabler/icons-react"

export interface NotaReviewProps {
  nota: number
  tamanho?: number
  produtoId: number
}

export default function NotaReview(props: NotaReviewProps) {
  function notaParaEstrelas(nota: number) {
    const estrelas = []
    for (let i = 1; i <= 5; i++) {
      //* Gera uma chave única combinando ID do produto e o índice.
      const key = `${props.produtoId}-${i}`
      if (nota >= i) {
        estrelas.push(<IconStarFilled key={key} size={props.tamanho ?? 12} />)
      } else if (nota >= i - 0.5) {
        estrelas.push(
          <IconStarHalfFilled key={key} size={props.tamanho ?? 12} />
        )
      } else {
        estrelas.push(<IconStar key={key} size={props.tamanho ?? 12} />)
      }
    }
    return estrelas
  }
  return <div className="flex gap-0.5 text-emerald-400">{notaParaEstrelas(props.nota)}</div>
}