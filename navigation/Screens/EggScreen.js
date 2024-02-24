import * as React from 'react';
import { View, Text } from 'react-native';

export default function EggScreen({navigation}) {
    return(
        <View>
            <Text
            onPress={() => navigation.navigate('Home')}
            >
                Something
            </Text>
        </View>
    )
}