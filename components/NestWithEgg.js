// NestWithEgg.js
import React, {useState} from 'react';
import { View, StyleSheet, TouchableOpacity, Text, Button, TextInput, Image } from 'react-native';
import Modal from "react-native-modal";

const nestImage = require("../assets/nest.png"); // Replace with your nest image path
const eggImage = require("../assets/hatchery-egg.png"); // Replace with your egg image path

const NestWithEgg = ({ name, angle, removeFunc }) => {  
  
  const [isModalVisible, setModalVisible] = useState(false);  
  const eggStyle = {
    transform: [{ rotate: `${angle}deg` }],
  };
  
  const toggleModal = () => {
    setModalVisible(!isModalVisible)
  }

  const removeEgg = () => {
    removeFunc()
    toggleModal()
  }

  const hatchEgg = () => {

  }

  return (
    <>
    <View style={styles.container}>
      <TouchableOpacity onPress={toggleModal}>
        <Image source={nestImage} style={styles.nestImage} />
        <View style={[styles.eggContainer, eggStyle]}>
            <Text>{name ? name : "womp"}</Text>
            <Image source={eggImage} style={styles.eggImage} />
        </View>
      </TouchableOpacity>
    </View>

    <Modal isVisible={isModalVisible} backdropOpacity={0.3}>
        <View style={styles.modalView}>
        <Text style={styles.modalHeader}>{name}</Text>
        <Button title="Hatch Egg!" onPress={removeEgg} />
        <Button title="Remove" onPress={removeEgg} />
        <Button title="Done" onPress={toggleModal} />
        </View>
    </Modal>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  nestImage: {
    width: 100,
    height: 100,
    resizeMode: 'contain',
  },
  eggContainer: {
    position: 'absolute',
    width: '50%', // Adjust based on your egg image size relative to the nest
    height: '50%', // Adjust based on your egg image size relative to the nest
    justifyContent: 'center',
    alignItems: 'center',
  },
  eggImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
  },
  modalView: {
    margin: 10,
    backgroundColor: 'white',
    borderRadius: 15,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalHeader: {
    fontSize: 18,
    fontVariant: "bold"
  },
  modalContent: {
    alignItems: 'center'
  },
});

export default NestWithEgg;
