import { useState, useEffect } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import agent from "./api/agent";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { PaperProvider, List, Divider } from "react-native-paper";
import Cards from "./components/Cards";
import Post from "./api/agent"

const defaultPost = {
  "id": 0,
  "title": "",
  "author": "",
  "image": ""
};

export default function App() {
  const [posts, setPosts] = useState([]);


  useEffect(() => {
    agent.Product.list().then((data) => {
      setProducts(data);
    });
  }, []);

  const handleClickUpdateProduct = (updatedProduct) => {
    agent.Product.update(updatedProduct.id,updatedProduct.name,updatedProduct.image,updatedProduct.description,updatedProduct.price,updatedProduct.quantity,updatedProduct.status).then((response) => {
      setProducts((prevProduct) =>
        prevProduct.map((product) =>
          product.id === updatedProduct.id
            ? { ...product, ...updatedProduct }
            : product
        )
      );
      console.log(response);
    })
    .catch((error) => {
      console.log(error);
    });
    

  };


  return (
    <SafeAreaProvider>
      <PaperProvider>
        <SafeAreaView style={styles.container}>
          <ScrollView>
            {products.map((product) => (
              <ProductTable 
                key={product.id}
                title={product.name}
                description={product.price}
                url={product.image}
                currentproduct={product}
                handleClickUpdate={handleClickUpdateProduct}
              />
            ))}
          </ScrollView>
        </SafeAreaView>
      </PaperProvider>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#031540",
    alignItems: "center",
    justifyContent: "center",
  },
  interest: {
    width: "100%",
    backgroundColor: "#fffcfe",
  },
});
