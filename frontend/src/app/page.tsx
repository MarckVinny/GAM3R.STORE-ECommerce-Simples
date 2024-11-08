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
