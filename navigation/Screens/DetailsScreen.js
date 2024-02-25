import React, {useState} from 'react';
import {useAppContext} from '../../context/AppContext';
import { Modal, ScrollView, StyleSheet, View, Text } from 'react-native';
import PetListItem from '../../components/PetListItem';

export default function DetailsScreen({navigation}) {

    const {state, dispatch} = useAppContext();
    console.log(state.pets[0].tasks)
    return<>
    <ScrollView 
    style={{
        flex: 1,
        backgroundColor: "#4F518C"
    }}>

    {state.pets.map(pet => (<PetListItem name={pet.name} image={pet.image} id={pet.id}/>))}

    </ScrollView>

    </>
}
