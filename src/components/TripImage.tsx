import { useEffect, useState } from 'react';

interface TripImageProps {
  src: string;
  fallback: string;
  alt: string;
  className?: string;
  loading?: 'lazy' | 'eager';
}

/** Image with automatic fallback when the primary asset 404s. */
export function TripImage({ src, fallback, alt, className, loading = 'lazy' }: TripImageProps) {
  const [current, setCurrent] = useState(src);

  useEffect(() => {
    setCurrent(src);
  }, [src]);

  return (
    <img
      src={current}
      alt={alt}
      className={className}
      loading={loading}
      onError={() => {
        if (current !== fallback) setCurrent(fallback);
      }}
    />
  );
}
