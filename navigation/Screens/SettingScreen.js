import * as React from 'react';
import { View, Text, Pressable, StyleSheet, Image } from 'react-native';


function SettingScreen({navigation}) {
    const avatarImg = require('../../assets/avatar.png');
    return(
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: '#4F518C' }}>
            <Image source={avatarImg} style={styles.avatar}/>
            <Text
            style={{ fontSize: 20, color: 'white', fontWeight: 'bold', padding: 20, textAlign: 'center'}}
            >
                gitJhim
            </Text>
            <Pressable style={styles.button} onPress={() => navigation.navigate('Hatchery')}>
                <Text style={styles.pressableText}>Start</Text>
            </Pressable>
        </View>
    )
}

const styles = StyleSheet.create({
    button: {
        backgroundColor: 'white',
        justifyContent: 'center',
        alignItems: 'center',
        margin: 10,
        width: '33%' ,
        height: '5%',
        borderRadius: 4,
    },
    pressableText: {
        color: '#4F518C',
        fontSize: 22,
        fontWeight: 'bold',
    },
    avatar: {
        width: 150,
        height: 150,
        resizeMode: 'contain',
        borderRadius: 75,
    }
});
export default SettingScreen;