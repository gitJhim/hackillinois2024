// Hatchery.js
import React, {useState} from 'react';
import { View, StyleSheet, ImageBackground, Dimensions, TouchableOpacity, Text, Button, TextInput } from 'react-native';
import EmptyNest from '../../components/EmptyNest'; // Ensure the path is correct
import NestWithEgg from '../../components/NestWithEgg';
import { useAppContext } from '../../context/AppContext';
import Modal from "react-native-modal";

const backgroundImage = require("../../assets/hatchery-background.png");
const { width, height } = Dimensions.get('window');

const Hatchery = () => {
  const {state, dispatch} = useAppContext();
  console.log(state)
  const [isModalVisible, setModalVisible] = useState(false);
  const [isHatchEggModalVisible, setHatchEggModalVisible] = useState(false);

  const [name, onChangeName] = useState('');

  const gridSize = 3;
  const nests = Array.from({ length: gridSize * gridSize }).map((_, i) => (
    <View key={i} style={styles.gridItem}>
      {state.eggs[i] ? 
        <NestWithEgg
          id={state.eggs[i].id} 
          name={state.eggs[i].name} 
          angle={state.eggs[i].angle} 
          removeFunc={() => { dispatch({ type: "REMOVE_EGG", payload: { id: state.eggs[i].id } })}}
          /> : <EmptyNest />}
    </View>
  ));


  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  const handlePress = () => {
    toggleModal()
  };

  const donePress = () => {
    function getRndInteger(min, max) {
      return Math.floor(Math.random() * (max - min) ) + min;
    }
    dispatch({ type: "ADD_EGG", payload: { id: state.currID, name: name, angle: getRndInteger(-15, 15)} })
    toggleModal()
  }

  const hatchEgg = () => {
    const egg = state.eggs.find(egg => egg.id === state.currHatching);
    dispatch({ type: "ADD_PET", 
      payload: { id: state.currHatching, name: egg.name } 
    })
    toggleModal()
  }

  return (
    <View style={styles.container}>
      <ImageBackground
        source={backgroundImage}
        style={styles.backgroundImage}
        resizeMode="cover"
      >
        <View style={styles.fullScreenContainer}>
          {nests}
        </View>

        <Modal isVisible={isModalVisible} backdropOpacity={0.3}>
            <View style={styles.modalView}>
            <Text style={styles.modalHeader}>Add Egg</Text>
                <View style={styles.modalContent}>
                    <TextInput
                        style={styles.input}
                        onChangeText={onChangeName}
                        value={name}
                    />
                </View>
            <Button style={styles.menuButton} title="Done" onPress={donePress} />
            </View>
        </Modal>

        <Modal isVisible={isHatchEggModalVisible} backdropOpacity={0.3}>
            <View style={styles.modalView}>
            <Text style={styles.modalHeader}>Are you sure you want to hatch this egg?</Text>
                <View style={styles.modalContent}>
                    <TextInput
                        style={styles.input}
                        onChangeText={onChangeName}
                        value={name}
                    />
                </View>
            <Button title="Hatch Egg" onPress={hatchEgg} />
            </View>
        </Modal>

        <TouchableOpacity onPress={handlePress} style={styles.floatingButton}>
            <Text style={styles.buttonText}>+</Text>
        </TouchableOpacity>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backgroundImage: {
    flex: 1,
  },
  fullScreenContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    flex: 1,
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  gridItem: {
    width: width / 3,
    height: height / 4,
    justifyContent: 'center',
    alignItems: 'center',
  },
  floatingButton: {
    backgroundColor: '#007bff', // You can choose any color
    width: 60, // Diameter of the button
    height: 60, // Diameter of the button
    borderRadius: 30, // Half of the width/height to make it a perfect circle
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute', // Important to position it over other content
    bottom: 20, // Distance from the bottom
    right: 20, // Distance from the right
    elevation: 8, // Adds a drop shadow for Android (optional)
    shadowColor: '#000', // iOS shadow
    shadowOffset: { width: 0, height: 2 }, // iOS shadow
    shadowOpacity: 0.25, // iOS shadow
    shadowRadius: 3.84, // iOS shadow
  },
  buttonText: {
    color: '#ffffff', // Text color
    fontSize: 24, // Text size, adjust accordingly
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
    color: 'white',
    fontSize: 18,
    fontVariant: "bold"
  },
  modalContent: {
    alignItems: 'center'
  },
  input: {
    color: 'white',
    height: 40,
    margin: 12,
    borderWidth: 0,
    borderBottomWidth: 2,
    borderColor: 'white',
    padding: 10,
  },
  menuButton: {
  },
});

export default Hatchery;
