import { ChangeEvent, FormEvent, useCallback, useState } from "react";
import ProductCard from "./components/Card/ProductCard";
import Modal from "./components/ui/Modal";
import { categories, colors, formInputsList, productList } from "./data";
import Button from "./components/ui/Button";
import Input from "./components/ui/Input";
import { IProduct } from "./interfaces";
import { productValidation } from "./validation";
import ErrorMessage from "./components/ErrorMessage/ErrorMessage";
import ProductColors from "./components/ProductColors/ProductColors";
import { v4 as uuid } from "uuid";
import SelectBox from "./components/selectbox/SelectBox";
import { productNameType } from "./types";
import toast, { Toaster } from "react-hot-toast";

function App() {
  const defaultObject = {
    title: "",
    description: "",
    imageURL: "",
    price: "",
    category: { name: "", imageURL: "" },
    colors: [],
  };

  // ============ start state ===========
  const [isOpen, setIsOpen] = useState(false);
  const [addedProducts, setaddedProducts] = useState<IProduct[]>(productList);
  const [products, setProduct] = useState<IProduct>(defaultObject);
  const [productToEdit, setProductToEdit] = useState<IProduct>(defaultObject);
  const [productToEditByIndex, setProductToEditByIndex] = useState<number>(0);
  const [errors, setErrors] = useState({
    title: "",
    description: "",
    imageURL: "",
    price: "",
  });
  const [tempColors, setTempColors] = useState<string[]>(() => []);
  const [selectedCategory, setSelectedCategory] = useState(categories[0]);
  const [isOpenEditModal, setisOpenEditModal] = useState(false);
  const [isOpenConfirmModal, setIsOpenConfirmModal] = useState(false);

  // ============ end state ===========

  // =========== start handler ==========
  const closeModal = () => setIsOpen(false);
  const openModal = () => setIsOpen(true);

  const closeEditModal = () => setisOpenEditModal(false);
  const openEditModal = useCallback(() => setisOpenEditModal(true),[])

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
      {
        ...products,
        id: uuid(),
        color: tempColors,
        category: selectedCategory,
      },
      ...prev,
    ]);
    console.log({
      ...products,
      id: uuid(),
      color: tempColors,
      category: selectedCategory,
    });
    setProduct({
      title: "",
      description: "",
      imageURL: "",
      price: "",
      category: { name: "", imageURL: "" },
      colors: [],
    });
    setTempColors([]);
    closeModal();
    toast("product has been added", {
      icon: "👏",
      style: {
        backgroundColor: "black",
        color: "white",
      },
    });
  };

  const onchangeEditHandler = (event: ChangeEvent<HTMLInputElement>) => {
    const { value, name } = event.target;
    setProductToEdit({ ...productToEdit, [name]: value });
    setErrors({ ...errors, [name]: "" });
  };

  const submitEditHundler = (event: FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
    const { title, description, imageURL, price } = productToEdit;
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

    const updatedProducts = [...addedProducts];
    updatedProducts[productToEditByIndex] = {
      ...productToEdit,
      colors: tempColors.concat(productToEdit.colors),
    };
    setaddedProducts(updatedProducts);

    setProductToEdit(defaultObject);
    setTempColors([]);
    closeEditModal();

    toast("product has been updated", {
      icon: "👏",
      style: {
        backgroundColor: "black",
        color: "white",
      },
    });
  };

  function cancelProduct(): void {
    setProduct(defaultObject);
    closeModal();
    closeEditModal();
  }
  const closeConfirmModal = () => setIsOpenConfirmModal(false);
  const openConfirmModal = () => setIsOpenConfirmModal(true);
  const removeProductHandler = () => {
    const filtered = addedProducts.filter(
      (product) => product.id !== productToEdit.id
    );
    setaddedProducts(filtered);
    closeConfirmModal();
    toast("product has been deleted", {
      icon: "👏",
      style: {
        backgroundColor: "black",
        color: "white",
      },
    });
  };
  // =========== end handler ==========

  // =========== start render ===========
  const renderProductList = addedProducts.map((product, idx) => (
    <ProductCard
      key={product.id}
      product={product}
      setProductToEdit={setProductToEdit}
      openeditmodal={openEditModal}
      idx={idx}
      setProducttoEditbyIndex={setProductToEditByIndex}
      openConfirmModal={openConfirmModal}
    />
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
          if (productToEdit.colors.includes(color)) {
            setTempColors((prev) => prev.filter((item) => item !== color));
            return;
          }
          setTempColors((prev) => [...prev, color]);
        }}
      />
    );
  });

  const renderproductEditWithErrorMsg = (
    label: string,
    id: string,
    name: productNameType
  ) => {
    return (
      <div className="flex flex-col">
        <label
          htmlFor={id}
          className="mb-[2px] text-sm font-medium text-gray-700"
        >
          {label} :
        </label>
        <Input
          id={id}
          name={name}
          type={"text"}
          value={productToEdit[name]}
          onChange={onchangeEditHandler}
        />
        <ErrorMessage msg={errors[name]} />
      </div>
    );
  };

  // =========== end render ===========

  return (
    <>
      <div className="container">
        <div className="flex items-center justify-center">
          <Button
            className="bg-indigo-700 hover:bg-indigo-800 mt-5 px-10 py-2"
            onClick={openModal}
            width="w-fit"
          >
            Build Product
          </Button>
        </div>

        <div className="m-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 p-2 gap-4 rounded-md">
          {renderProductList}
        </div>
        {/* add product modal */}
        <Modal
          isOpen={isOpen}
          closeModal={closeModal}
          title="ADD A NEW PRODUCT"
        >
          <form onSubmit={submitHundler} className="space-y-3">
            {renderFormInputList}

            <div className="">
              <SelectBox
                selected={selectedCategory}
                setSelected={setSelectedCategory}
              />
            </div>

            <div className="flex space-x-2 items-center my-4 flex-wrap space-y-2">
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
            <div className="flex space-x-2 items-center my-4  flex-wrap">
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

        {/* edit product modal */}
        <Modal
          isOpen={isOpenEditModal}
          closeModal={closeEditModal}
          title="EDIT PRODUCT"
        >
          <form onSubmit={submitEditHundler} className="space-y-3">
            {renderproductEditWithErrorMsg("product title", "title", "title")}
            {renderproductEditWithErrorMsg(
              "product description",
              "description",
              "description"
            )}
            {renderproductEditWithErrorMsg(
              "product imageURL",
              "imageURL",
              "imageURL"
            )}
            {renderproductEditWithErrorMsg("product price", "price", "price")}

            <div className="">
              <SelectBox
                selected={productToEdit.category}
                setSelected={(value) => {
                  setProductToEdit({ ...productToEdit, category: value });
                }}
              />
            </div>

            <div className="flex space-x-2 items-center my-4 flex-wrap space-y-2">
              {tempColors.concat(productToEdit.colors).map((color) => (
                <span
                  key={color}
                  className={`text-white rounded-md p-1 `}
                  style={{ backgroundColor: `${color}` }}
                >
                  {color}
                </span>
              ))}
            </div>
            <div className="flex space-x-2 items-center my-4  flex-wrap">
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

        {/* delete product modal */}
        <Modal
          isOpen={isOpenConfirmModal}
          closeModal={closeConfirmModal}
          title="Are you sure you want to remove this Product from your Store?"
          description="Deleting this product will remove it permanently from your inventory. Any associated data, sales history, and other related information will also be deleted. Please make sure this is the intended action."
        >
          <div className="flex items-center space-x-3">
            <Button
              className="bg-[#c2344d] hover:bg-red-800"
              onClick={removeProductHandler}
            >
              Yes, remove
            </Button>
            <Button
              type="button"
              className="bg-[#f5f5fa] hover:bg-gray-300 !text-black"
              onClick={closeConfirmModal}
            >
              Cancel
            </Button>
          </div>
        </Modal>

        <Toaster />
      </div>
    </>
  );
}

export default App;

// sm = md = lg = xl = 2xl = 3xl
