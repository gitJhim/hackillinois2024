import React, {useEffect} from 'react';
import { fetchUserInfoAsync, makeRedirectUri, useAuthRequest } from 'expo-auth-session';
import { View, Text, StyleSheet,TouchableOpacity } from 'react-native';

const discovery = {
    authorizationEndpoint: 'https://github.com/login/oauth/authorize',
    tokenEndpoint: 'https://github.com/login/oauth/access_token',
    revocationEndpoint: 'https://github.com/settings/connections/applications/eb6a7c3efac150b9902e',
  };

export default function EggScreen({navigation}) {
    const [request, response, promptAsync] = useAuthRequest(
        {
          clientId: 'eb6a7c3efac150b9902e',
          scopes: ['identity'],
          redirectUri: makeRedirectUri({
            scheme: 'exp://172.16.238.178:8081'
          }),
        },
        discovery
      );
    const handlePress = () => {
        promptAsync()
    }

    async function fetchAccessToken(code) {
        const response = await fetch('https://github.com/login/oauth/access_token', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
          },
          body: JSON.stringify({
            client_id: "eb6a7c3efac150b9902e",
            client_secret: '93aa26482af9d6e31d398f6d31e8e6002ce53325',
            code: code,
            redirect_uri: 'exp://172.16.238.178:8081',
          }),
        });
    
        const data = await response.json();
        return data.access_token;
      }
    
      async function fetchUserInfo(accessToken) {
        const response = await fetch('https://api.github.com/user', {
          headers: {
            'Authorization': `token ${accessToken}`,
          },
        });
    
        const data = await response.json();
        return data;
      }

      async function fetchUserRepositories(accessToken) {
        const response = await fetch('https://api.github.com/user/repos', {
          headers: {
            'Authorization': `token ${accessToken}`,
          },
        });
    
        const repos = await response.json();
        if (response.ok) {
            return repos.map(repo => repo.name);
        } else {
            throw new Error('Failed to fetch repositories');
        }
      }

      useEffect(() => {
        if (response?.type === 'success') {
            const { code } = response.params;
            const fetchData = async () => {
                try {
                    const accessToken = await fetchAccessToken(code);
                    const userInfo = await fetchUserRepositories(accessToken);
                    console.log(userInfo);
                } catch (error) {
                    console.error('Error fetching data: ', error);
                }
            };
    
            fetchData();
        }
    }, [response]);

    return(
        <View style={{ flex: 1 }}>
            <Text></Text>
            <TouchableOpacity onPress={handlePress} style={styles.floatingButton}disabled={!request}>
                <Text style={styles.buttonText}>+</Text>
            </TouchableOpacity>
        </View>
    )
}
const styles = StyleSheet.create({
    floatingButton: {
        backgroundColor: '#4F518C', // You can choose any color
        width: 60, // Diameter of the button
        height: 60, // Diameter of the button
        borderRadius: 30, // Half of the width/height to make it a perfect circle
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute', // Important to position it over other content
        bottom: 20, // Distance from the bottom
        right: 20, // Distance from the right
        elevation: 8, // Adds a drop shadow for Android (optional)
        shadowColor: '#000', // iOS shadow
        shadowOffset: { width: 0, height: 2 }, // iOS shadow
        shadowOpacity: 0.25, // iOS shadow
        shadowRadius: 3.84, // iOS shadow
    },
})
