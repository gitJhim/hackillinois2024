import * as React from 'react';
import { View, Text } from 'react-native';

export default function DetailsScreen({navigation}) {
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