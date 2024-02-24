import React from 'react';
import { Image, StyleSheet } from 'react-native';

const nestImage = require("../assets/nest.png");

const EmptyNest = () => {
  return <Image source={nestImage} style={styles.image} />;
};

const styles = StyleSheet.create({
  image: {
    width: 100, 
    height: 100,
    resizeMode: 'contain',
  },
});

export default EmptyNest;