// components/ProductTable.tsx
"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { Box, Grid, Paper, Skeleton, Typography } from "@mui/material";
import { makeApiCall } from "@/app/shared/makeAPiCall";

type Product = {
  id: number;
  title: string;
  image: string;
};

interface Statetype {
  products: Product[] | [];
  loading: boolean;
  visibleProductId: number | null;
  focusedIndex: number;
}

export default function ProductTable() {
  const [state, SetState] = useState<Statetype>({
    products: [],
    loading: true,
    visibleProductId: null,
    focusedIndex: -1,
  });

  const { products, loading, visibleProductId, focusedIndex } = state;

  useEffect(() => {
    fetchproduct();
  }, []);

  const fetchproduct = async () => {
    try {
      const response = await makeApiCall("GET", "products", null, null);
      SetState((prev) => ({ ...prev, products: [...response.data] }));
    } catch (error) {
      console.log(error);
    } finally {
      SetState((prev) => ({ ...prev, loading: false }));
    }
  };

  const handleClick = (id: number, index: number) => {
    SetState((prev) => ({
      ...prev,
      visibleProductId: visibleProductId === id ? null : id,
      focusedIndex: visibleProductId === id ? -1 : index,
    }));
  };

  const onDragStart = (
    event: React.DragEvent<HTMLDivElement>,
    index: number
  ) => {
    console.log(index, "check drag start");
    event.dataTransfer.setData("text/plain", index.toString());
  };

  const onDrop = (
    event: React.DragEvent<HTMLDivElement>,
    dropIndex: number
  ) => {
    console.log(dropIndex, "check drop");
    const dragProductid = parseInt(
      event.dataTransfer.getData("text/plain"),
      10
    );
    const getproductdragindex = products.findIndex(
      (product) => product.id === dragProductid
    );
    const getproductdropindex = products.findIndex(
      (product) => product.id === dropIndex
    );
    const updatedProducts = [...products];
    const draggedItem = updatedProducts[getproductdragindex];
    const droppedItem = updatedProducts[getproductdropindex];
    updatedProducts.splice(getproductdragindex, 1, droppedItem);
    updatedProducts.splice(getproductdropindex, 1, draggedItem);
    // setProducts(updatedProducts);
    SetState((prev) => ({ ...prev, products: [...updatedProducts] }));
  };

  const onDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
  };

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (focusedIndex === -1) return;
    const numCols = 5;
    let newIndex = focusedIndex;
    // console.log(focusedIndex);
    const getproductdropindex = products.findIndex(
      (product) => product.id === visibleProductId
    );
    switch (event.key) {
      case "ArrowUp":
        if (focusedIndex < numCols) {
          newIndex = products.length - (numCols - focusedIndex);
        } else {
          newIndex = focusedIndex - numCols;
        }
        break;
      case "ArrowDown":
        if (focusedIndex >= products.length - numCols) {
          newIndex = focusedIndex % numCols;
        } else {
          newIndex = focusedIndex + numCols;
        }
        break;
      case "ArrowLeft":
        if (focusedIndex === 0) {
          newIndex = products.length - 1;
        } else {
          newIndex = focusedIndex - 1;
        }
        break;
      case "ArrowRight":
        if (focusedIndex !== products.length - 1) {
          newIndex = focusedIndex + 1;
        } else {
          newIndex = 0;
        }

        break;
    }
    SetState((prev) => ({
      ...prev,
      visibleProductId: products[newIndex].id ? products[newIndex].id : null,
      focusedIndex: newIndex,
    }));
  };

  return (
    <Box onKeyDown={handleKeyDown}>
      {loading ? (
        <Grid container spacing={1}>
          {Array.from({ length: 20 }).map((number, index) => (
            <Grid item xs={12 / 5} key={index}>
              <Paper
                style={{
                  height: "100px",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  cursor: "pointer",
                }}
              >
                <Skeleton variant="rectangular" />
              </Paper>
            </Grid>
          ))}
        </Grid>
      ) : (
        <Grid container spacing={1}>
          {products.map((product, index) => (
            <Grid item xs={12 / 5} key={product.id}>
              <Paper
                draggable
                onDragStart={(event) => onDragStart(event, product.id)}
                onDrop={(event) => onDrop(event, product.id)}
                onDragOver={onDragOver}
                style={{
                  backgroundColor:
                    visibleProductId === product.id ? "white" : "black",
                  height: "100px",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  cursor: "pointer",
                  color: visibleProductId === product.id ? "black" : "white",
                }}
                onClick={() => handleClick(product.id, index)}
                tabIndex={index}
              >
                {visibleProductId === product.id ? (
                  <>
                    <Typography variant="body2">{product.title}</Typography>
                    <img src={product.image} alt={product.title} />
                  </>
                ) : null}
              </Paper>
            </Grid>
          ))}
        </Grid>
      )}
    </Box>
  );
}
