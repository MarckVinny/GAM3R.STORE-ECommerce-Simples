import { produtos } from "@/core";
import ProdutoItem from "./components/produto/ProdutoItem";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center space-y-2 h-screen">
      <ProdutoItem produto={produtos[0]}/>
      <ProdutoItem produto={produtos[1]}/>
      <ProdutoItem produto={produtos[2]}/>
      <ProdutoItem produto={produtos[3]}/>
    </div>
  );
}
