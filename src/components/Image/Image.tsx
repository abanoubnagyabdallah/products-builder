interface IProps {
  imageURL: string;
  alt: string;
  className:string
}
export default function Image({ imageURL, alt, className }: IProps) {
  return (
    <>
      <img src={imageURL} alt={alt} className={className} />
    </>
  );
}
