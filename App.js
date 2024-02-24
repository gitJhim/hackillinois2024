import * as React from "react";
import MainContainer from './navigation/MainContainer';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import Garden from './app/Garden';
import Hatchery from './app/Hatchery';
import { AppProvider } from './context/AppContext';

function App() {
  return (
    <View style={styles.container}>
      <AppProvider>
        <MainContainer/>
      </AppProvider>
    </View>
  );
}

export default App;
