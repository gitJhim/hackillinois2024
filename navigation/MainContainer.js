import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {View, Image, StyleSheet} from 'react-native';

import HomeScreen from './Screens/HomeScreen';
import DetailsScreen from './Screens/DetailsScreen';
import SettingScreen from './Screens/SettingScreen';
import EggScreen from './Screens/EggScreen';

const homeName = "Home";
const detailsName = "Details";
const settingsName = "User";
const eggName = "Egg";

const eggImg = require("../assets/egg-outline.png");
const eggImgFilled = require("../assets/egg-filled.png");
const Tab = createBottomTabNavigator();

function MainContainer() {
  const nTheme = {
    dark: false,
    colors: {
        primary: '#000000',
        text: '#000000',
        card: '#2C2A4A',
    },
  };
  return (
    <NavigationContainer theme={nTheme} >
      <Tab.Navigator
        initialRouteName={homeName}
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;
            let rn = route.name;
            
            if (rn === "Egg") {
                if (!focused) {
                    return <Image source={eggImg} style={styles.image}/>
                } else {return <Image source={eggImgFilled} style={styles.image} />}
            } else if (rn === homeName) {
                if (!focused) {
                    return <Image source={require('../assets/Garden.png')} style={styles.image}/>
                } else {}
            } else if (rn === detailsName) {
              iconName = focused ? 'list' : 'list-outline';

            } else if (rn === settingsName) {
              iconName = focused ? 'person' : 'person-outline';
            }
            return <Ionicons name={iconName} size={size} color={color} />;
          },
          tabBarInactiveTintColor: "white",
          tabBarActiveTintColor: "white",
          tabBarStyle: [
            {
                display: "flex"
            },
            null
          ]
        }
        )}
        >
        
        <Tab.Screen name={eggName} component={EggScreen}/>
        <Tab.Screen name={homeName} component={HomeScreen} />
        <Tab.Screen name={detailsName} component={DetailsScreen} />
        <Tab.Screen name={settingsName} component={SettingScreen} />

      </Tab.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
    image: {
      width: 30, 
      height: 30,
      resizeMode: 'contain',
    },
  });

export default MainContainer;