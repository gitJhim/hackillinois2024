// NestWithEgg.js
import React from 'react';
import { Image, StyleSheet, View } from 'react-native';

const nestImage = require("../assets/nest.png"); // Replace with your nest image path
const eggImage = require("../assets/egg.png"); // Replace with your egg image path

const NestWithEgg = ({ angle = 0 }) => {
  // Style for rotating the egg image
  const eggStyle = {
    transform: [{ rotate: `${angle}deg` }],
  };

  return (
    <View style={styles.container}>
      <Image source={nestImage} style={styles.nestImage} />
      <View style={[styles.eggContainer, eggStyle]}>
        <Image source={eggImage} style={styles.eggImage} />
      </View>
    </View>
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
});

export default NestWithEgg;
