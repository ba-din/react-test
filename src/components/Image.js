import React, { useState } from 'react';
import defaulImage from '../assets/images/default-image.jpg';

const Image = ({ src, size }) => {
  const [url, setUrl] = useState('src');

  return (
    <>
      <img
        src={src || url}
        width={size}
        height="auto"
        alt=""
        onError={() => setUrl(defaulImage)}
      />
    </>
  )
}

export default Image;
