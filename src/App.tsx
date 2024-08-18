import ProductCard from "./components/ProductCard";

function App() {
  
  return (
    <>
      <div className="border-2 border-red-500 m-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 bg-indigo-500 p-2 gap-2 rounded-md">
        <ProductCard />
        <ProductCard />
        <ProductCard />
        <ProductCard />
        <ProductCard />
        <ProductCard />
        <ProductCard />
        <ProductCard />
      </div>
    </>
  );
}

export default App

// sm = md = lg = xl = 2xl = 3xl