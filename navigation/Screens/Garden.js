import React, { useEffect, useState } from 'react';
import { View, Image, Dimensions, ImageBackground, StyleSheet, Text } from 'react-native';
import Animated, { useSharedValue, useAnimatedStyle, withSpring, withRepeat, withSequence  } from 'react-native-reanimated';
import { useAppContext } from '../../context/AppContext';
import { PET_MOODS } from '../../utils/petutils';

const { width, height } = Dimensions.get('window');
const backgroundImage = require("../../assets/garden-background.png");

const Pet = ({ name, image, mood }) => {
  const petWidth = 100;
  const petHeight = 100;

  const translateX = useSharedValue(0);
  const translateY = useSharedValue(height / 2); // Center vertically in the play area
  const rotateZ = useSharedValue(0);

  const movePetRandomly = () => {
    const tx = Math.random() * 200 - 100; // Random value between -100 and 100
    const ty = Math.random() * (500 - 250 + 1) + 250; // Random value between 250 and 400

    // Clamp targetX between 0 and 100
    const targetX = Math.max(-100, Math.min(tx, 100));
    // Clamp targetY between 250 and 300
    const targetY = Math.max(250, Math.min(ty, 500));

    translateX.value = withSpring(targetX, {
      duration: 5000,
      damping: 20,
      stiffness: 50,
    });

    translateY.value = withSpring(targetY, {
      duration: 5000,
      damping: 20,
      stiffness: 50,
    });
  };
    
  useEffect(() => {
    movePetRandomly();
    const intervalId = setInterval(movePetRandomly, 5000);
    return () => clearInterval(intervalId);
  }, []);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [
      { translateX: translateX.value },
      { translateY: translateY.value },
      { rotateZ: `${rotateZ.value}deg` },
    ],
  }));

  return (
    <Animated.View style={animatedStyle}>
      <View style={{ alignItems: 'center' }}>
        <View style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)', padding: 3, borderRadius: 8, flexDirection: 'row' }}>
          <Text style={{ marginBottom: -10, fontWeight: '800', textAlign: 'center', color: '#FFF', }}>{name}</Text>
          <Image
            source={PET_MOODS[mood].image}
            style={{ width: 20, height: 20, marginLeft: 5 }} />
        </View>
        <Image source={image} style={{width: petWidth, height: petHeight}} />
      </View>
    </Animated.View>
  );
};

const Garden = () => {
  const {state, dispatch} = useAppContext();
  const pets = state.pets
  console.log(pets)
  return (
    <View style={{ flex: 1 }}>
      <ImageBackground
        source={backgroundImage}
        style={styles.backgroundImage}
        resizeMode="cover"
      >
        {pets.map((pet, index) => (
          <Pet key={index} image={pet.image} name={pet.name} mood={pet.mood}/>
        ))}
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
  },
});

export default Garden;
