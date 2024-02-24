import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import Garden from './app/Garden';
import Hatchery from './app/Hatchery';
import { AppProvider } from './context/AppContext';

export default function App() {
  return (
    <View style={styles.container}>
      <AppProvider>
        <Hatchery />
      </AppProvider>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
