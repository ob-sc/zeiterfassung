import { useState, useEffect } from 'react';

const useMobile = () => {
  const [mobile, setMobile] = useState(false);

  useEffect(() => {
    const setResponsiveness = () => {
      return window.innerWidth < 1280 ? setMobile(true) : setMobile(false);
    };
    setResponsiveness();
    window.addEventListener('resize', () => setResponsiveness());
  }, []);

  return mobile;
};

export default useMobile;
