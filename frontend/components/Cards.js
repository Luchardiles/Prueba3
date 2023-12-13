import * as React from "react";
import { Card, Text, Modal, Portal,IconButton,TextInput,DeleteIcon, } from "react-native-paper";
import { StyleSheet, Pressable, Image ,TouchableOpacity} from "react-native";
import { MaterialCommunityIcons } from '@expo/vector-icons';

const Cards = ({ title, description, url,currentproduct,handleClickUpdate }) => {
  const [visible, setVisible] = React.useState(false);
  const [editVisible, setEditVisible] = React.useState(false);
  const [deleteVisible, setDeleteVisible] = React.useState(false);
  const [product, setProduct] = React.useState(currentproduct);

  const showModal = () => {setVisible(true);
}
  const showEditModal = () => {
    setProduct(currentproduct);
    setEditVisible(true);
    
};
const showDeleteModal = () => {
    setProduct(currentproduct);
    setDeleteVisible(true);
    
};
  const hideModal = () => {setVisible(false);
  }
  const hideDeleteModal = () => {setDeleteVisible(false);
  }
  const hideEditModal = () => {setEditVisible(false);
  }

  const handleProductChange = (id, value) => {
    setProduct({ ...product, [id]: value });
  };

  const handleOnSubmit = () => {
    handleClickUpdate(product);
    hideEditModal();
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
      <Pressable onPress={showModal}>
        <Card.Cover style={styles.image} source={{ uri: url }} />
      </Pressable>
      <Card.Content>
        <Text variant="bodyMedium">Precio:${description}</Text>
      </Card.Content>
    </Card>
  );
};

export default ImageCard;

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