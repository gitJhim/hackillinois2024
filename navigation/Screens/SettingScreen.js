import * as React from 'react';
import { View, Text, Pressable, StyleSheet, Image } from 'react-native';
import { useAppContext } from '../../context/AppContext';

function SettingScreen({navigation}) {
    const { state, dispatch } = useAppContext();
    const avatarImg = require('../../assets/avatar.png');

    const veryHappyPets = state.pets.filter(pet => pet.mood === "VERY_HAPPY").length;
    const happyPets = state.pets.filter(pet => pet.mood === "HAPPY").length;
    const sadPets = state.pets.filter(pet => pet.mood === "SAD").length;
    const verySadPets = state.pets.filter(pet => pet.mood === "VERY_SAD").length;
    const neutralPets = state.pets.filter(pet => pet.mood === "NEUTRAL").length;
    const totalPets = state.pets.length;
    const finishedTasks = state.pets.reduce((acc, pet) => acc + pet.tasks?.filter(task => task.completed).length, 0);
    const unfinishedTasks = state.pets.reduce((acc, pet) => acc + pet.tasks?.filter(task => !task.completed).length, 0);

    return(
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: '#4F518C' }}>
            <Image source={avatarImg} style={styles.avatar}/>
            <Text
            style={{ fontSize: 20, color: 'white', fontWeight: 'bold', padding: 20, textAlign: 'center'}}
            >
                gitJhim
            </Text>
            <View style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)', padding: 3, borderRadius: 8, flexDirection: 'row'}}>
                <View style={{ marginRight: 25 }}>
                     <Text style={styles.statsText}>Very Sad Pets: {verySadPets}</Text>
                     <Text style={styles.statsText}>Sad Pets: {sadPets}</Text>
                     <Text style={styles.statsText}>Neutral Pets: {neutralPets}</Text>
                    <Text style={styles.statsText}>Happy Pets: {happyPets}</Text>
                    <Text style={styles.statsText}>Very Happy Pets: {veryHappyPets}</Text>
                </View>
                <View>
                    <Text style={styles.statsText}>Total Pets: {totalPets}</Text>
                    <Text style={styles.statsText}>Finished Tasks: {finishedTasks}</Text>
                    <Text style={styles.statsText}>Unfinished Tasks: {unfinishedTasks}</Text>
                </View>
            </View>
            
            <Pressable style={styles.button} onPress={() => navigation.navigate('Hatchery')}>
                <Text style={styles.pressableText}>Hatchery</Text>
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
    },
    statsText: {
        color: 'white',
        margin: 8,
        fontSize: 12,
    },
});
export default SettingScreen;