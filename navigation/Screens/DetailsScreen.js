import * as React from 'react';
import {useAppContext} from '../../context/AppContext';
import { View, Text } from 'react-native';
import PetListItem from '../../components/PetListItem';

export default function DetailsScreen({navigation}) {
    const {state, dispatch} = useAppContext();

    return<>
    {state.pets.map(pet => (<PetListItem name={pet.name}/>))}
    </>
}