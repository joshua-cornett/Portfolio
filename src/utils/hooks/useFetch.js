// src/utils/hooks/useFetch.js
import { useState, useEffect } from 'react';
import CryptoJS from 'crypto-js';

function useFetch(url) {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error('Network response was not ok.');
        }
        const encryptedData = await response.json();

        // Decryption
        const dataKey = process.env.DATA_KEY;
        if (!dataKey) {
          throw new Error('Data key not found.');
        }
        const bytes = CryptoJS.AES.decrypt(encryptedData, dataKey);
        const decryptedData = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));

        setData(decryptedData);
      } catch (err) {
        setError(err);
        console.error('Error fetching and decrypting data:', err); // Log for debugging
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [url]);

  return { data, isLoading, error };
}

export default useFetch;
