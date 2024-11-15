import { produtos } from "@/core";
import ProdutoItem from "./components/produto/ProdutoItem";

export default function Home() {
  return (
    <div className="flex flex-1 flex-col container gap-5 py-10">
      <div className="grid grid-cols-4 gap-5">
        {produtos.map((produto) => (
          <ProdutoItem key={produto.id} produto={produto} />
        ))}
      </div>
    </div>
  )
}
