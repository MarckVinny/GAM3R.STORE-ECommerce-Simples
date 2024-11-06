import ProdutoItem from "./components/produto/ProdutoItem";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center space-y-2 h-screen">
      <ProdutoItem />
      <ProdutoItem />
      <ProdutoItem />
      <ProdutoItem />
    </div>
  );
}
