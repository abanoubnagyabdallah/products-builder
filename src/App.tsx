import ProductCard from "./components/Card/ProductCard";
import { productList } from "./data";

function App() {
  const renderProductList = productList.map((product) => (
    <ProductCard key={product.id} product={product} />
  ));
  return (
    <>
      <div className="container">
        <div className="m-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 p-2 gap-4 rounded-md">
          {renderProductList}
        </div>
      </div>
    </>
  );
}

export default App;

// sm = md = lg = xl = 2xl = 3xl
