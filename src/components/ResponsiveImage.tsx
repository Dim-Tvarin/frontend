const ResponsiveImage = ({
  urlMin,
  urlMax,
  alt,
}: {
  urlMin?: string;
  urlMax: string;
  alt: string;
}) => {
  return (
    <picture>
      <source
        media="(max-width: 768px)"
        srcSet={`${urlMin} 768w}`}
        sizes="768px"
      />
      <source srcSet={`${urlMax} 1280w`} sizes="1280px" />
      <img src={urlMax} alt={alt} className="w-full h-full object-cover" />
    </picture>
  );
};
export default ResponsiveImage;
