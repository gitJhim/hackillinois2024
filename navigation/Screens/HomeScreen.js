import * as React from 'react';
import { View, Text } from 'react-native';

export default function HomeScreen({navigation}) {
    return(
        <View>
            <Text
            onPress={() => navigation.navigate('Home')}
            >
                Home
            </Text>
        </View>
    )
}