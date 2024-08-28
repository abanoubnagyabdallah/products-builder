import { ChangeEvent, FormEvent, useState } from "react";
import ProductCard from "./components/Card/ProductCard";
import Modal from "./components/ui/Modal";
import { formInputsList, productList } from "./data";
import Button from "./components/ui/Button";
import Input from "./components/ui/Input";
import { IProduct } from "./interfaces";
import { productValidation } from "./validation";
import ErrorMessage from "./components/ErrorMessage/ErrorMessage";

function App() {
  // ============ state ===========
  const [isOpen, setIsOpen] = useState(false);
  const [products, setProduct] = useState<IProduct>({
    title: "",
    description: "",
    imageURL: "",
    price: "",
    category: { name: "", imageURL: "" },
    colors: [],
  });

  const [errors, setErrors] = useState({
    title: "",
    description: "",
    imageURL: "",
    price: "",
  });

  // ============ state ===========

  // =========== handler ==========
  const closeModal = () => setIsOpen(false);
  const openModal = () => setIsOpen(true);

  const onchangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    const { value, name } = event.target;
    setProduct({ ...products, [name]: value });
    setErrors({...errors,[name]:""})
  };

  const submitHundler = (event: FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
    const { title, description, imageURL, price } = products;
    const errorsObject = productValidation({
      title,
      description,
      imageURL,
      price,
    });
    
    // check any property has a value of "" && check if all properties have a value of ""
    const hasErrorMessage =
      Object.values(errorsObject).some((value) => value === "") &&
      Object.values(errorsObject).every((value) => value === "");
      if(!hasErrorMessage){
        setErrors(errorsObject);
        return;
      }
    console.log(hasErrorMessage);
  };

  function cancelProduct(): void {
    setProduct({
      title: "",
      description: "",
      imageURL: "",
      price: "",
      category: { name: "", imageURL: "" },
      colors: [],
    });
    closeModal();
  }
  // =========== handler ==========

  // =========== render ===========
  const renderProductList = productList.map((product) => (
    <ProductCard key={product.id} product={product} />
  ));

  const renderFormInputList = formInputsList.map((input) => (
    <div key={input.id} className="flex flex-col">
      <label
        htmlFor={input.id}
        className="mb-[2px] text-sm font-medium text-gray-700"
      >
        {input.label} :
      </label>
      <Input
        key={input.id}
        id={input.id}
        name={input.name}
        type={input.type}
        value={products[input.name]}
        onChange={onchangeHandler}
      />
      <ErrorMessage msg={errors[input.name]} />
      <br />
    </div>
  ));

  // =========== render ===========

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
          <form onSubmit={submitHundler} className="space-y-3">
            {renderFormInputList}
            <div className="flex space-x-3">
              <Button className="bg-indigo-700 hover:bg-indigo-800">
                Submit
              </Button>
              <Button
                className="bg-gray-400 hover:bg-gray-500"
                onClick={cancelProduct}
              >
                Cancel
              </Button>
            </div>
          </form>
        </Modal>
      </div>
    </>
  );
}

export default App;

// sm = md = lg = xl = 2xl = 3xl
