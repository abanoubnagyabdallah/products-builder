import { IProduct } from "../../interfaces";
import { textSlicer } from "../../utils/function";
import Image from "../Image/Image";
import ProductColors from "../ProductColors/ProductColors";
import Button from "../ui/Button";

interface IProps {
  product: IProduct;
}

export default function ProductCard({ product }: IProps) {
  const { title, description, imageURL, price, category ,colors} = product;
  return (
    <>
      <div className="border rounded-md p-2 flex flex-col max-w-sm md:max-w-lg mx-auto md:mx-0 ">
        <Image
          imageURL={imageURL}
          alt={"product name"}
          className="rounded-md mb-2 object-cover h-52"
        />

        <h3>{title}</h3>

        <p>{textSlicer(description, 60)}</p>

        <div className="flex space-x-2 items-center my-4 justify-center flex-wrap">
          {colors.map((color) => (
            <ProductColors key={color} color={color} />
          ))}
        </div>

        <div className="flex justify-between items-center">
          <span className="text-indigo-600 font-semibold">${price}</span>
          <Image
            imageURL={category.imageURL}
            alt={category.name}
            className="w-10 h-10 rounded-full object-center"
          />
        </div>

        <div className="flex justify-between items-center space-x-2 my-3">
          <Button className="bg-indigo-700" width="w-full">
            EDIT
          </Button>
          <Button className="bg-red-700" width="w-full">
            DELETE
          </Button>
        </div>
      </div>
    </>
  );
}
