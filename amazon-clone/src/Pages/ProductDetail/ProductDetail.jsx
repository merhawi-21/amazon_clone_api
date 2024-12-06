

import React, { useEffect, useState } from 'react';
import classes from './ProductDetail.module.css';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Layout from '../../components/Layout/Layout';
import ProductCard from '../../components/Products/ProductCard';
import Loader from '../../components/Loader/Loader';
import { productUrl } from '../../Api/endPoints';

function ProductDetail() {
  const { productId } = useParams();
  const [product, setProduct] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    setIsLoading(true);
    setError(null);

    axios
      .get(`${productUrl}/products/${productId}`)
      .then((res) => {
        if (res.status === 200) {
          setProduct(res.data);
        } else {
          setError('Product not found.');
        }
        setIsLoading(false);
      })
      .catch((err) => {
        setError('Failed to fetch product details. Please try again.');
        console.error(err);
        setIsLoading(false);
      });
  }, [productId]);

  if (isLoading) return <Loader />;
  if (error) return <div className={classes.error-message}>{error}</div>;

  return (
    <Layout>
      <ProductCard product={product} flex={true} renderDesc={true} />
    </Layout>
  );
}

export default ProductDetail;
