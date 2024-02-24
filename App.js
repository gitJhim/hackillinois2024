import * as React from "react";
import MainContainer from './navigation/MainContainer';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import Garden from './navigation/Screens/Garden';
import Hatchery from './navigation/Screens/Hatchery';
import { AppProvider } from './context/AppContext';

function App() {
  return (
    <AppProvider>
      <MainContainer/>
    </AppProvider>
  );
}

export default App;