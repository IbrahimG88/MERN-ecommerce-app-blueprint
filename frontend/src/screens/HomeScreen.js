import React, { useState, useEffect } from "react";
import { Row, Col } from "react-bootstrap";
import Product from "../components/Product";
import axios from "axios";

const HomeScreen = () => {
  const [products, setProducts] = useState([]);
  /*
  useState:
  const [products, setProducts] 
  products is ewhat we want to call it this piece of state,
  and setProducts is the function that we will use to manipulate or change this piece of state, products
 
  useState([])
  the empty array is the default for products value
  */

  /*
  useEffect()
  similar to componentDidMount()
  */

  useEffect(() => {
    const fetchProducts = async () => {
      const { data } = await axios.get("/api/products");

      setProducts(data);
      // set products value to the vaslue of data received in the response
    };

    fetchProducts();
  }, []);
  // the empty array above includes dependencies that fire
  // useEffect if they change, eg: [test]) if test value changes, fire off useEffect

  return (
    <>
      <h1>Latest Products</h1>
      <Row>
        {products.map((product) => (
          <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
            <Product product={product} />
          </Col>
        ))}
      </Row>
    </>
  );
};

export default HomeScreen;
