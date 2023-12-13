import * as React from "react";
import { Card, Text, Modal, Portal,IconButton,TextInput,DeleteIcon, Button, } from "react-native-paper";
import { StyleSheet, Pressable, Image ,TouchableOpacity} from "react-native";
import { MaterialCommunityIcons } from '@expo/vector-icons';
import agent from "../api/agent";
import { useState, useEffect } from "react";

const defaultcomment = {
    "id": 0,
    "body": "",
    "postId": 0,
  };
const Cards = ({ title, author, url,currentpost,handleClickUpdate }) => {
  const [visible, setVisible] = React.useState(false);
  const [deleteVisible, setDeleteVisible] = React.useState(false);
  const [post, setPost] = React.useState(currentpost);
  const [comments, setComments] = React.useState([]);

  useEffect(() => {
    agent.Post.comments(currentpost.id).then((data) => {
      setComments(data);
    });
  }, []);

  const showModal = () => {setVisible(true);
}
const showDeleteModal = () => {
    setPost(currentpost);
    setDeleteVisible(true);
    
};
  const hideModal = () => {setVisible(false);
  }
  const hideDeleteModal = () => {setDeleteVisible(false);
  }

  const handleOnSubmit = () => {
    hideDeleteModal();
    handleDelete(currentpost);
  };

  const handleDelete = (currentpost) => {
    agent.Post.delete(currentpost.id).then((response) => {
      console.log(response);
    })
    .catch((error) => {
      console.log(error);
    });
    

  };



  const containerStyle = {
    backgroundColor: "white",
    borderRadius: 10,
  };
  return (
    <Card style={styles.container} mode="outlined">
      <Card.Title titleStyle={styles.cardTitle} title={title} />
      <Portal>
        <Modal
          visible={visible}
          onDismiss={hideModal}
          contentContainerStyle={containerStyle}
        >
          <Image
            source={{ uri: url }}
            resizeMode="center"
            style={{ height: "80%", margin: -80 }}
          />
        </Modal>
      </Portal>
      <Portal>
        <Modal
          visible={deleteVisible}
          onDismiss={hideDeleteModal}
          contentContainerStyle={containerStyle}
        >
        <Text variant="bodyMedium">¿Estas Seguro?</Text>
        </Modal>
      </Portal>
      <Pressable onPress={showModal}>
        <Card.Cover style={styles.image} source={{ uri: url }} />
      </Pressable>
      <Card.Content>
        <Text variant="bodyMedium">Author: {author}</Text>
      </Card.Content>
      <Card.Content>
      {comments.map((comment) => (
                <Card.Content>
                    <Text variant="bodyMedium">{comment.body}</Text>
                </Card.Content>
            ))}
      </Card.Content>
      <Card.Content>
      <IconButton
         icon={() => <MaterialCommunityIcons name="delete" size={20} color="red" />} 
         onPress={showDeleteModal}
        />
      </Card.Content>
    </Card>
  );
};

export default Cards;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    margin: 10,
    backgroundColor: "#fff",
  },
  image: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 10,
  },
  cardTitle: {
    fontSize: 17,
    fontWeight: "bold",
  },
  button: {
    backgroundColor: '#3498db', 
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white', 
    fontSize: 16,
  },
});