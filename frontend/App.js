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
    agent.Post.list().then((data) => {
      setPosts(data);
    });
  }, []);

  

 


  return (
    <SafeAreaProvider>
      <PaperProvider>
        <SafeAreaView style={styles.container}>
          <ScrollView>
            {posts.map((post) => (
              <Cards
                key={post.id}
                title={post.title}
                author={post.author}
                url={post.image}
                currentpost={post}
           //     handleClickUpdate={handleClickUpdateProduct}
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
