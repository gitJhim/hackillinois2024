import * as React from 'react';
import { View, Text } from 'react-native';

export default function SettingScreen({navigation}) {
    return(
        <View>
            <Text
            onPress={() => navigation.navigate('Home')}
            >
                User
            </Text>
        </View>
    )
}