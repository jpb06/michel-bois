import { useRef, useEffect } from 'react';

import type { PropsWithClassName } from '../../types';

type ImageProps = {
  name: string;
  url: string;
  placeholderUrl: string;
};

export const Image = ({
  className,
  name,
  url,
  placeholderUrl,
}: PropsWithClassName<ImageProps>) => {
  const imgRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const img = entry.target;

          const src = img.getAttribute('data-src');
          if (!src) {
            return;
          }

          img.setAttribute('src', src);
          img.classList.add('fade');

          observer.disconnect();
        }
      });
    });

    if (imgRef.current) {
      observer.observe(imgRef.current);
    }
  }, []);

  return (
    <img
      ref={imgRef}
      src={placeholderUrl}
      data-src={url}
      loading="lazy"
      alt={name}
      className={className}
    />
  );
};
