interface ResponsiveImageProps {
  urlMin1x: string;
  urlMin2x?: string;
  urlMax1x: string;
  urlMax2x?: string;
  alt: string;
  className?: string;
}

const ResponsiveImage = ({
  urlMin1x,
  urlMin2x,
  urlMax1x,
  urlMax2x,
  alt,
  className = 'w-full h-full object-cover',
}: ResponsiveImageProps) => {
  return (
    <picture>
      <source
        media="(min-width: 640px)"
        srcSet={urlMax2x ? `${urlMax1x} 1x, ${urlMax2x} 2x` : `${urlMax1x} 1x`}
      />
      <img
        src={urlMin1x}
        srcSet={urlMin2x ? `${urlMin1x} 1x, ${urlMin2x} 2x` : undefined}
        alt={alt}
        loading="lazy"
        className={className}
      />
    </picture>
  );
};
export default ResponsiveImage;
