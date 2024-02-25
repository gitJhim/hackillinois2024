import React from 'react';
import { Text, Pressable, Image, StyleSheet } from 'react-native';
import {useAppContext} from '../context/AppContext';

const emptyBoxImage = require("../assets/box.png");
const checkBoxImage = require("../assets/checkbox.png");

const TaskItem = ({petId, taskId, task}) => {
    const {state, dispatch} = useAppContext();

const handleTaskCompletion = () => {
    dispatch({
        type: 'TOGGLE_TASK',
        payload: {
            petId: petId,
            taskId: taskId
        }
    });
}
  return <>

            <Pressable style={styles.taskListLineView} onPress={handleTaskCompletion}>

                {task.completed ?
                  <>
                  <Image source={checkBoxImage} style={styles.checkBox}></Image>
                  <Text style={styles.listTextStrilkethrough}>{task.description}</Text>
                  </>
                  :
                  <>
                  <Image source={emptyBoxImage} style={styles.checkBox}></Image>
                  <Text style={styles.listText}>{task.description}</Text>
                  </>
                }

            </Pressable>

  </>;
};

const styles = StyleSheet.create({
  image: {
    width: 100, 
    height: 100,
    resizeMode: 'contain',
  },
    taskListLineView: {
      flexDirection: 'row', 
      margin: 5, 
      alignItems: 'center',
    },
    checkBox: {
        width: 30,
        height: 30,
        resizeMode: 'contain',
    },
    listText: {
        color: 'white',
        margin: 8,
        fontSize: 20,
    },
    listTextStrilkethrough: {
        color: 'white',
        margin: 8,
        fontSize: 20,
        textDecorationLine: 'line-through',
    }
});

export default TaskItem;