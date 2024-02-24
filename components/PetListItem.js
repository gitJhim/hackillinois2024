import React, { useContext } from 'react';
import { Text, Image, StyleSheet } from 'react-native';
import {useAppContext} from '../context/AppContext';

const nestImage = require("../assets/nest.png");

const PetListItem = ({name, image}) => {
    return <>
    <Image source={image} style={{width: 100, height: 100}}/>
    <Text style={{color: "white"}}> Hello, my name is {name}</Text>
    {Math.random()>0.4 ? (
        <Text style={{color: "white"}}> I am happy.</Text>
    ): (
        <Text style={{color: "white"}}> I am hungry</Text>
    )}

    </>;
};

const styles = StyleSheet.create({
    image: {
        width: 100,
        height: 100,
        resizeMode: 'contain',
    },
});

export default PetListItem;