interface IValidate {
  title: string;
  description: string;
  imageURL: string;
  price: string;
}

/**
 * 
 * @param {object} product -product object to be valid 
 * @returns {object} -object containing error messages for invalid fields 
 */


export const productValidation = (product: IValidate) => {
  // return an object
  const errors: IValidate = {
    title: "",
    description: "",
    imageURL: "",
    price: "",
  };

  const validUrl = /^(ftp|http|https):\/\/[^ "]+$/.test(product.imageURL);

  if (
    !product.title.trim() || // '  hello    '
    product.title.length < 10 ||
    product.title.length > 80
  ) {
    errors.title = "product title must be between 10 and 80 charecters!";
  }

  if (
    !product.description.trim() ||
    product.description.length < 10 ||
    product.description.length > 900
  ) {
    errors.description =
      "product description must be between 10 and 900 charecters!";
  }

  if (!product.imageURL.trim() || !validUrl) {
    errors.imageURL = "valid imageURL required";
  }

  if (!product.price.trim() || isNaN(Number(product.price))) {
    errors.price = "valid price is required";
  }

  return errors  
};
