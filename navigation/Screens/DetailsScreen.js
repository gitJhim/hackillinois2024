import * as React from 'react';
import {useAppContext} from '../../context/AppContext';
import { ScrollView, StyleSheet, View, Text } from 'react-native';
import PetListItem from '../../components/PetListItem';

export default function DetailsScreen({navigation}) {
    const {state, dispatch} = useAppContext();

    return<>
    <ScrollView 
    style={{
        flex: 1,
        backgroundColor: "#4F518C"
    }}>

    {state.pets.map(pet => (<PetListItem name={pet.name} image={pet.image}/>))}
    </ScrollView>
    </>
}