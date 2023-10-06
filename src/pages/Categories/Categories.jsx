import { useEffect, useState } from "react";
import { useLoaderData, Link } from "react-router-dom";
import { getCategories } from "../../utils/api";
import { firstLetterToUpperCase } from "../../utils/util";
import Category from "./Category";
import { useQuery } from "@tanstack/react-query";
import { useQueries } from "@tanstack/react-query";
import axios from "axios";

function Categories() {
  const categories = useQuery({
    queryKey: ["categories"],
    queryFn: () => getCategories(),
  });

  const categoryProducts = useQueries({
    queries: categories.data
      ? categories.data.map((category) => {
        return {
            queryKey: ["categories", category],
            queryFn: () =>
              axios
                .get(
                  `https://dummyjson.com/products/category/${category}?limit=1`
                )
                .then((res) => res.data)
                .then((data) => data.products[0]),
        }
      })
      : []
    }
  );

  if(categories.isLoading || categoryProducts.some(p => p.isLoading)) {
    return <h1>Loading... </h1>
  }

  const categoryItems =  categoryProducts.map((prod) => (
    <Category
      key={prod.data.category}
      title={prod.data.category}
      thumbnail={prod.data.thumbnail}
    />
  ));

  return (
    <main className="vh-container categories">
      <section className="intro">
        <h1 className="secondary">Check our versatile sortiment @fakestore</h1>
      </section>
      <section className="categoryItems">{categoryItems}</section>
    </main>
  );
}

export default Categories;
