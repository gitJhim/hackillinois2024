// NestWithEgg.js
import React, {useState} from 'react';
import { Pressable, View, StyleSheet, TouchableOpacity, Text, Button, TextInput, Image } from 'react-native';
import Modal from "react-native-modal";
import { useAppContext } from '../context/AppContext';
import { PET_IMAGES, PET_MOODS } from '../utils/petutils';
import DropDownPicker from 'react-native-dropdown-picker';
import { fetchGitHubUsername, fetchRepositoryCommits, moodBasedOnCommits } from '../utils/githubutils';
import * as SecureStore from 'expo-secure-store';

const nestImage = require("../assets/nest.png"); // Replace with your nest image path
const eggImage = require("../assets/hatchery-egg.png"); // Replace with your egg image path

const NestWithEgg = ({ id, name, angle, removeFunc }) => {  
  const {state, dispatch} = useAppContext();
  const [isModalVisible, setModalVisible] = useState(false);
  const [isRepositoryModalVisible, setIsRepositoryModalVisible] = useState(false);
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);  
  
  const toggleModal = () => {
    setModalVisible(!isModalVisible)
  }

  const toggleRepositoryModal = () => {
    setIsRepositoryModalVisible(!isRepositoryModalVisible)
  }

  const removeEgg = () => {
    removeFunc()
    toggleModal()
  }

  const hatchEgg = () => {
    setModalVisible(false); // Directly close the initial modal
    setIsRepositoryModalVisible(true); // Directly open the repository modal
  }

  const linkRepositoryAndHatchEgg = async () => {
    try {
      const token = await SecureStore.getItemAsync('githubToken');
      if (!token) throw new Error('GitHub token is not available.');
  
      // Assuming id, name, and value are available in the scope. If not, they need to be passed as arguments.
      const username = await fetchGitHubUsername(token);
      if (!username) throw new Error('Failed to fetch GitHub username.');
  
      const commits = await fetchRepositoryCommits(token, username, value);
      console.log(commits)
      if (!commits) throw new Error('Failed to fetch repository commits.');

      const mood = await moodBasedOnCommits(commits);

      dispatch({ 
        type: "ADD_PET", 
        payload: { 
          id: id, 
          name: name, 
          repository: value, 
          image: PET_IMAGES[Math.floor(Math.random() * PET_IMAGES.length)],
          commits: commits,
          mood: mood,
          birthday: Date.now()
        } 
      });
  
      toggleRepositoryModal();
      removeEgg();
    } catch (error) {
      console.error('Error linking repository and hatching egg:', error);
      // Handle the error appropriately (e.g., display an error message)
    }
  };

  return (
    <>
    <View style={styles.container}>
      <TouchableOpacity onPress={toggleModal}>
        <Image source={nestImage} style={styles.nestImage} />
        <View style={[styles.eggContainer]}>
            <Text style={{ fontWeight: '800', textAlign: 'center', backgroundColor: 'rgba(0, 0, 0, 0.5)', padding: 3, borderRadius: 8, color: '#FFF' }}>{name ? name : "womp"}</Text>
            <Image source={eggImage} style={styles.eggImage} />
        </View>
      </TouchableOpacity>
    </View>

    <Modal isVisible={isModalVisible} backdropOpacity={0.3}>
        <View style={styles.modalView}>
        <Text style={styles.modalHeader}>{name ? name : "womp"}</Text>
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

    <Modal isVisible={isRepositoryModalVisible} backdropOpacity={0.3}>
        <View style={styles.modalView}>
        <Text style={styles.modalHeader}>{name}</Text>
        <Text>What repository do you want to link this pet to?</Text>
          <DropDownPicker
            open={open}
            value={value}
            items={state.userRepositories}
            max={30}
            setOpen={setOpen}
            setValue={setValue}
            placeholder={'Choose a repository.'}
          />
          <Pressable style={styles.button} onPress={linkRepositoryAndHatchEgg}>
            <Text style={styles.text}>Confirm</Text>
          </Pressable>
          <Pressable style={styles.button} onPress={toggleModal}>
            <Text style={styles.text}>Cancel</Text>
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
    marginLeft: '13%',
    marginBottom: '10%'
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
