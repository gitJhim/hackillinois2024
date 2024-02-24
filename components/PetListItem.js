// test
import React, { useContext } from 'react';
import { Text, Image, StyleSheet } from 'react-native';
import {useAppContext} from '../context/AppContext';

const nestImage = require("../assets/nest.png");

const PetListItem = ({name}, {image}) => {
    return <>
    
    <Text> Hello, {name}</Text>
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