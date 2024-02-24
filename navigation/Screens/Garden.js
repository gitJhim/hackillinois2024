import React, { useEffect } from 'react';
import { View, Image, Dimensions, ImageBackground, StyleSheet } from 'react-native';
import Animated, { useSharedValue, useAnimatedStyle, withSpring, withRepeat, withSequence  } from 'react-native-reanimated';
import { useAppContext } from '../../context/AppContext';

const { width, height } = Dimensions.get('window');
const backgroundImage = require("../../assets/garden-background.png");

const Pet = ({ image }) => {
  const translateX = useSharedValue(0);
  const translateY = useSharedValue(height / 2);
  const rotateZ = useSharedValue(0); // rotation value for wiggling

  // Initial target setting
  let targetX = Math.random() * (width - 100);
  let targetY = Math.random() * ((height / 2 - 100) - 100) + height / 2;

  const movePetRandomly = () => {
    // Set new target positions
    targetX = Math.random() * (width - 100);
    targetY = Math.random() * ((height / 2 - 100) - 100) + height / 2;

    // Move to the new target
    translateX.value = withSpring(targetX, {
      duration: 10000,
      damping: 20,
      stiffness: 50,
    });

    translateY.value = withSpring(targetY, {
      duration: 10000,
      damping: 20,
      stiffness: 50,
    });
  };

  useEffect(() => {
    movePetRandomly();
    // Start wiggle rotation
    rotateZ.value = withRepeat(withSequence(
      withSpring(-5, { damping: 20, stiffness: 50 }), // Rotate slightly left
      withSpring(5, { damping: 20, stiffness: 50 })  // Rotate slightly right
    ), -1, true); // Infinite repeat with autoreverse

    // Change position less frequently to maintain a straight line movement
    const positionInterval = setInterval(movePetRandomly, 5000);
    return () => clearInterval(positionInterval);
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
      <Image source={image} style={{ width: 100, height: 100 }} />
    </Animated.View>
  );
};

const Garden = () => {
  const {state, dispatch} = useAppContext();
  const pets = state.pets
  return (
    <View style={{ flex: 1 }}>
      <ImageBackground
        source={backgroundImage}
        style={styles.backgroundImage}
        resizeMode="cover"
      >
        {pets.map((pet, index) => (
          <Pet key={index} image={pet.image} />
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
