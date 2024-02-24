import React, { useEffect } from 'react';
import { View, Image, Dimensions, ImageBackground, StyleSheet } from 'react-native';
import Animated, { useSharedValue, useAnimatedStyle, withSpring } from 'react-native-reanimated';

const { width, height } = Dimensions.get('window');
const backgroundImage = require("../../assets/garden-background.png");
const examplePet = require("../../assets/dragon.png");

const Garden = () => {
  const translateX = useSharedValue(0);
  const translateY = useSharedValue(0);

  const movePetRandomly = () => {
    // Generate random positions within the screen boundaries
    translateX.value = withSpring(Math.random() * (width - 100));
    translateY.value = withSpring(Math.random() * (height - 100));
  };

  useEffect(() => {
    // Move the pet at a regular interval
    const interval = setInterval(movePetRandomly, 2000);

    // Clear interval on component unmount
    return () => clearInterval(interval);
  }, []);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: translateX.value }, { translateY: translateY.value }],
    };
  });

  return (
    <View style={{ flex: 1 }}>
      <ImageBackground
        source={backgroundImage}
        style={styles.backgroundImage}
        resizeMode="cover"
      >
        <Animated.View style={animatedStyle}>
        <Image
          source={examplePet} // Replace with your pet image
          style={{ width: 100, height: 100 }}
        />
      </Animated.View>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
  },
})

export default Garden;
