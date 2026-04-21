"use client";
import axios from "axios";
import React, { useEffect } from "react";
import { useState } from "react";

export default function ProductTabs() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost/don-corleone-api/get_products.php")
      .then((res) => {
        console.log("Gələn məlumat:", res.data);
        setProducts(res.data);
      })
      .catch((err) => {
        console.error("PHP linkində problem var:", err);
      });
  }, []);

  return <div>ProductTabs</div>;
}
