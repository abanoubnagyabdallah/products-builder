import { ChangeEvent, FormEvent, useState } from "react";
import ProductCard from "./components/Card/ProductCard";
import Modal from "./components/ui/Modal";
import { colors, formInputsList, productList } from "./data";
import Button from "./components/ui/Button";
import Input from "./components/ui/Input";
import { IProduct } from "./interfaces";
import { productValidation } from "./validation";
import ErrorMessage from "./components/ErrorMessage/ErrorMessage";
import ProductColors from "./components/ProductColors/ProductColors";
import { v4 as uuid } from "uuid";

function App() {
  // ============ start state ===========
  const [isOpen, setIsOpen] = useState(false);
  const [products, setProduct] = useState<IProduct>({
    title: "",
    description: "",
    imageURL: "",
    price: "",
    category: { name: "", imageURL: "" },
    colors: [],
  });

  const [addedProducts, setaddedProducts] = useState<IProduct[]>(productList);

  const [errors, setErrors] = useState({
    title: "",
    description: "",
    imageURL: "",
    price: "",
  });

  const [tempColors, setTempColors] = useState<string[]>(() => []);

  // ============ end state ===========

  // =========== start handler ==========
  const closeModal = () => setIsOpen(false);
  const openModal = () => setIsOpen(true);

  const onchangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    const { value, name } = event.target;
    setProduct({ ...products, [name]: value });
    setErrors({ ...errors, [name]: "" });
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
    if (!hasErrorMessage) {
      setErrors(errorsObject);
      return;
    }
    setaddedProducts((prev) => [
      { ...products, id: uuid(), color: tempColors },
      ...prev,
    ]);
    // console.log({ ...products, id: uuid(), color: tempColors });
    setProduct({
      title: "",
      description: "",
      imageURL: "",
      price: "",
      category: { name: "", imageURL: "" },
      colors: [],
    });
    setTempColors([])
    
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
  // =========== end handler ==========

  // =========== start render ===========
  const renderProductList = addedProducts.map((product) => (
    <ProductCard key={product.id} product={product}   />
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

  const renderColorList = colors.map((color) => {
    return (
      <ProductColors
        key={color}
        color={color}
        onClick={() => {
          if (tempColors.includes(color)) {
            setTempColors((prev) => prev.filter((item) => item !== color));
            return;
          }
          setTempColors((prev) => [...prev, color]);
        }}
      />
    );
  });
  console.log(tempColors);

  // =========== end render ===========

  return (
    <>
      <div className="container">
        <div className="flex items-center justify-center">
          <Button
            className="bg-indigo-700 hover:bg-indigo-800 mt-5 "
            onClick={openModal}
            width="w-fit"
          >
            Build Product
          </Button>
        </div>
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

            <div className="flex space-x-2 items-center my-4 justify-center flex-wrap">
              {tempColors.map((color) => (
                <span
                  key={color}
                  className={`text-white rounded-md p-1 `}
                  style={{ backgroundColor: `${color}` }}
                >
                  {color}
                </span>
              ))}
            </div>

            <div className="flex space-x-2 items-center my-4 justify-center flex-wrap">
              {renderColorList}
            </div>

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
