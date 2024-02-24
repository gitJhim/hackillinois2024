// test
import React, { useContext } from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import {useAppContext} from '../context/AppContext';

const nestImage = require("../assets/nest.png");

const PetListItem = ({name, image}) => {
    return <>
    <View style={styles.petList}>
    <Image source={image} style={styles.image}/>
    <View style={styles.petListDetails}>    
        <Text style={styles.text}>Name: {name}</Text>
        <Text style={styles.text}>Birthday: 7/13/04</Text>
        <Text style={styles.text}>Status: Happy</Text>
    </View>

    </View>
    </>;
};

const styles = StyleSheet.create({
    image: {
        width: 100,
        height: 100,
        resizeMode: 'contain',
    },
    petList: {
        margin: 8,
        padding: 8,
        borderRadius: 4, 
        borderWidth: 2,
        borderColor: 'white',
        flexDirection: 'row',
        overflow: 'scroll',
    },
    petListDetails: {
    },
    text: {
        color: 'white',
        marginTop: 6,
        marginBottom: 6,
    },
});

export default PetListItem;