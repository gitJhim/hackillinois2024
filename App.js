import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import Garden from './app/Garden';
import Hatchery from './app/Hatchery';

export default function App() {
  return (
    <View style={styles.container}>
      <Hatchery />
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
