// Hatchery.js
import React from 'react';
import { View, StyleSheet, ImageBackground, Dimensions } from 'react-native';
import EmptyNest from '../components/EmptyNest'; // Ensure the path is correct
import NestWithEgg from '../components/NestWithEgg';

const backgroundImage = require("../assets/dirtbackground.png");
const { width, height } = Dimensions.get('window');

const Hatchery = () => {
  const gridSize = 3;
  const nests = Array.from({ length: gridSize * gridSize }).map((_, i) => (
    <View key={i} style={styles.gridItem}>
      <NestWithEgg />
    </View>
  ));

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
});

export default Hatchery;
