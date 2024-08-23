import { useState } from "react";
import ProductCard from "./components/Card/ProductCard";
import Modal from "./components/ui/Modal";
import { formInputsList, productList } from "./data";
import Button from "./components/ui/Button";
import Input from "./components/ui/Input";

function App() {
  // ======== display product list =========
  const renderProductList = productList.map((product) => (
    <ProductCard key={product.id} product={product} />
  ));
  // ======== display product list =========
  // ======== display form in modal =========
  const renderFormInputList = formInputsList.map((input) => (
    <div className="flex flex-col">
      <label
        htmlFor={input.id}
        className="mb-[2px] text-sm font-medium text-gray-700"
      >
        {input.label} :
      </label>
      <Input key={input.id} id={input.id} name={input.name} type={input.type} />
      <br />
    </div>
  ));
  // ======== display form in modal =========
  // ======== Modal =========
  const [isOpen, setIsOpen] = useState(false);
  function closeModal() {
    setIsOpen(false);
  }
  function openModal() {
    setIsOpen(true);
  }
  // ======== Modal =========
  return (
    <>
      <div className="container">
        <Button
          className="bg-indigo-700 hover:bg-indigo-800"
          onClick={openModal}
        >
          Add
        </Button>
        <div className="m-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 p-2 gap-4 rounded-md">
          {renderProductList}
        </div>
        <Modal
          isOpen={isOpen}
          closeModal={closeModal}
          title="ADD A NEW PRODUCT"
        >
          <form className="space-y-3">{renderFormInputList}</form>
          <div className="flex space-x-3">
            <Button className="bg-indigo-700 hover:bg-indigo-800">
              Submit
            </Button>
            <Button
              className="bg-gray-400 hover:bg-gray-500"
              onClick={closeModal}
            >
              Cancel
            </Button>
          </div>
        </Modal>
      </div>
    </>
  );
}

export default App;

// sm = md = lg = xl = 2xl = 3xl
