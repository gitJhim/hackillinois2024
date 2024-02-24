// NestWithEgg.js
import React, {useState} from 'react';
import { Pressable, View, StyleSheet, TouchableOpacity, Text, Button, TextInput, Image } from 'react-native';
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
        <Pressable style={styles.button} onPress={hatchEgg}>
          <Text style={styles.text}>Hatch Egg!</Text>
        </Pressable>
        <Pressable style={styles.button} onPress={removeEgg}>
          <Text style={styles.text}>Remove</Text>
        </Pressable>
        <Pressable style={styles.button} onPress={toggleModal}>
          <Text style={styles.text}>Done</Text>
        </Pressable>
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
    backgroundColor: '#4F518C',
    borderRadius: 4,
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
    fontSize: 24,
    fontVariant: "bold",
    color: 'white',
  },
  modalContent: {
    alignItems: 'center'
  },
  button: {
    alignItems: 'center',
    margin: 4,
    padding: 8,
    backgroundColor: 'white',
    borderRadius: 4,
  },
  text: {
    fontSize: 16,
    color: '#4F518c',
  },
});

export default NestWithEgg;
