// test
import React, { useContext } from 'react';
import { Text, Image, StyleSheet } from 'react-native';
import {useAppContext} from '../context/AppContext';

const nestImage = require("../assets/nest.png");

const PetListItem = ({name, image}) => {
    return <>
    <Image source={image} style={{width: 100, height: 100}}/>
    <Text> Hello, my name is {name}, I am {Math.random()}</Text>
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