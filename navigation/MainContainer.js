import React, {useEffect, useState} from "react";
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {View, Image, StyleSheet} from 'react-native';
import * as SecureStore from 'expo-secure-store';
import { makeRedirectUri, useAuthRequest, ResponseType } from 'expo-auth-session';
import {fetchAndStoreAccessToken, fetchUserRepositories} from '../utils/githubutils.js'
import HomeScreen from './Screens/HomeScreen';
import DetailsScreen from './Screens/DetailsScreen';
import SettingScreen from './Screens/SettingScreen';
import EggScreen from './Screens/EggScreen'
import Hatchery from './Screens/Hatchery';
import Garden from './Screens/Garden';
import { useAppContext } from "../context/AppContext.js";

const eggName = "Hatchery";
const homeName = "Garden";
const detailsName = "Details";
const settingsName = "Profile";

const eggImg = require("../assets/egg-outline.png");
const eggImgFilled = require("../assets/egg-filled.png");
const Tab = createBottomTabNavigator();

async function saveToken(token) {
  await SecureStore.setItemAsync('githubToken', token);
}

async function getToken() {
  return await SecureStore.getItemAsync('githubToken');
}

const discovery = {
  authorizationEndpoint: 'https://github.com/login/oauth/authorize',
  tokenEndpoint: 'https://github.com/login/oauth/access_token',
  revocationEndpoint: 'https://github.com/settings/connections/applications/' + process.env.CLIENT_ID,
};

function MainContainer() {
  const nTheme = {
    dark: true,
    colors: {
        primary: '#FFFFFF',
        background: '#FFFFFF',
        color: '#FFFFFF',
        card: '#2C2A4A',
        notification: '#FFFFFF'
    },
  };

  const [isLoggedOn, setIsLoggedOn] = useState(false);
  const {state, dispatch} = useAppContext();
  const [request, response, promptAsync] = useAuthRequest(
    {
      clientId: process.env.CLIENT_ID,
      scopes: ['repo', 'user'],
      redirectUri: makeRedirectUri({
        scheme: process.env.SCHEME
      }),
    },
    discovery
  );

  useEffect(() => {
    if (response?.type === 'success') {
      const { code } = response.params;
      fetchAndStoreAccessToken(code).then(() => setIsLoggedOn(true));
    }
  }, [response]);

  const initiateLogin = () => {
    promptAsync();
  };

  useEffect(() => {
    const checkToken = async () => {
      const token = await getToken();

      if (token) {
        try {
          const response = await fetch('https://api.github.com/user', {
            headers: {
              Authorization: `token ${token}`,
            },
          });

          if (response.ok) {
              const userInfo = await fetchUserRepositories(await SecureStore.getItemAsync('githubToken'));
              dispatch({ type: "SET_REPOSITORIES", payload: userInfo })
          } else {
            await SecureStore.deleteItemAsync('githubToken');
            initiateLogin()
          }
        } catch (error) {
          console.error('Error validating token: ', error);
        }
      } else {
        initiateLogin()
      }
    };

    checkToken();
  }, []);

  return (
    <NavigationContainer theme={nTheme}>
      <Tab.Navigator
        initialRouteName={homeName}
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;
            let rn = route.name;
            
            if (rn === eggName) {
                if (!focused) {
                    return <Image source={eggImg} style={styles.image}/>
                } else {return <Image source={eggImgFilled} style={styles.image} />}
            } else if (rn === homeName) {
                if (focused) {
                    return <Image source={require('../assets/Garden.png')} style={styles.image}/>
                } else {return <Image source={require('../assets/Garden-outline.png')} style={styles.image}/>}
            } else if (rn === detailsName) {
              iconName = focused ? 'list' : 'list-outline';

            } else if (rn === settingsName) {
              iconName = focused ? 'person' : 'person-outline';
            }
            return <Ionicons name={iconName} size={size} color={color} />;
          },
          tabBarInactiveTintColor: "white",
          tabBarActiveTintColor: "white",
          activeTintColor: '#FFFFFF',
          inactiveTintColor: '#FFFFFF',
        }
        )}
        >
        
        <Tab.Screen name={eggName} component={Hatchery} />
        <Tab.Screen name={homeName} component={Garden} />
        <Tab.Screen name={detailsName} component={DetailsScreen}/>
        <Tab.Screen name={settingsName} component={SettingScreen}/>

      </Tab.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
    image: {
      width: 30, 
      height: 30,
      resizeMode: 'contain',
      zIndex: 9
    },
  });

export default MainContainer;