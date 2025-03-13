import React, { useState } from 'react';
import { Text, TextInput, Image, View, Pressable, StyleSheet, FlatList, Modal, Button } from 'react-native';
import DateTimePicker from "@react-native-community/datetimepicker";
import Icon from 'react-native-vector-icons/FontAwesome';

import { 
  addStyles, 
  selectedStyles, 
  addcontentStyles, 
  buttonStyles, 
  listStyles, 
  selectWorkoutStyles, 
  totalDistances, 
  modalStyles 
} from '../styles/allStyles';


export default function AddWorkouts() {
  const [distance, setDistance] = useState('');
  const [time, setTime] = useState('');
  const [day, setDay] = useState(new Date());
  const [dateOfWorkout, setDateOfWorkout] = useState(false);
  const [workouts, setWorkouts] = useState([]);
  const [selectedWorkoutType, setSelectedWorkoutType] = useState('Running');
  const [selectedWorkoutList, setSelectedWorkoutList] = useState([]);
  const [modalTitle, setModalTitle] = useState('');

  const addWorkout = () => {
    const newWorkout = { distance, time, day: day.toDateString(), type: selectedWorkoutType };
    setWorkouts((prevWorkouts) => [newWorkout, ...prevWorkouts]);

    console.log("Workout added", newWorkout);

    setDistance('');
    setTime('');
  };

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || day;
    setDateOfWorkout(false);
    setDay(currentDate);
  };

  const isFormValid = distance && time;

  const getWorkoutImage = () => {
    switch (selectedWorkoutType) {
      case 'Running':
        return require('../img/running.png');
      case 'Swimming':
        return require('../img/swimming.png');
      case 'Biking':
        return require('../img/biking.png');

    }
  };
  


  const getTotalDistance = (type) => {
    return workouts
      .filter((workout) => workout.type === type)
      .reduce((total, workout) => total + parseFloat(workout.distance), 0);
  };

  const [isModalVisible, setIsModalVisible] = useState(false);

  const openWorkoutList = (type) => {
    const filteredWorkouts = workouts.filter(workout => workout.type === type);
    setSelectedWorkoutList(filteredWorkouts);
    setModalTitle(`All ${type} Workouts`);
    setIsModalVisible(true);
  };

  return (
    <View style={addStyles.add}>

      {/*SELECTED WORKOUT ICON*/}
      <Text>
      {getWorkoutImage() && (
        <Image source={getWorkoutImage()} resizeMode="contain" />
      )}
      </Text>

      {/*WHAT WORKOUT IS SELECTED*/}
      <View style={selectedStyles.selected}>
        <Text style={selectedStyles.text}>Selected workout type: {selectedWorkoutType}
        </Text>
      </View>


      {/*SET DISTANCE*/}
      <View style={addcontentStyles.container}>
        <View style={addcontentStyles.inputContainer}>
          <Text style={addcontentStyles.text}>Distance (km)</Text>
          <TextInput
            value={distance}
            onChangeText={setDistance}
            keyboardType="numeric"
            placeholder="Set distance"
            placeholderTextColor="#FFF5E0"
            style={addcontentStyles.input}
          />
        </View>

        {/*SET TIME*/}
        <View style={addcontentStyles.inputContainer}>
          <Text style={addcontentStyles.text}>Time (minutes)</Text>
          <TextInput
            value={time}
            onChangeText={setTime}
            keyboardType="numeric"
            placeholder="Set time"
            placeholderTextColor="#FFF5E0"
            style={addcontentStyles.input}
          />
        </View>

        {/*SET DAY/DATETIMEPICKER*/}
        <View style={addcontentStyles.inputContainer}>
          <Text style={addcontentStyles.text}>Select day</Text>

          <Pressable onPress={() => setDateOfWorkout(true)}>
            <TextInput
              value={day.toDateString()}
              editable={false}
              style={addcontentStyles.calendarText}
            />
          </Pressable>

          {dateOfWorkout && (
            <DateTimePicker
              mode="date"
              display="calendar"
              value={day}
              onChange={onChange}
            />
          )}
        </View>
      </View>
      

      {/*ADD WORKOUT BUTTON*/}
      <View>
        <Pressable style={[buttonStyles.button, !isFormValid && { backgroundColor: 'grey' }]} onPress={addWorkout} disabled={!isFormValid}>
          <Text style={buttonStyles.buttonText}>ADD WORKOUT</Text>
        </Pressable>
      </View>
      
      {/*MODAL BUTTONS*/}
      <Text style={{ fontWeight: 'bold', marginTop: 10, }}>View all workouts</Text>
      
      <View style={modalStyles.buttonContainer}>
        <Pressable 
        style={modalStyles.button}
        onPress={() => openWorkoutList('Running')}
        >
        <Text style={modalStyles.buttonText}>Running</Text>
        </Pressable>
  
        <Pressable 
        style={modalStyles.button}
        onPress={() => openWorkoutList('Swimming')}
        >
        <Text style={modalStyles.buttonText}>Swimming</Text>
        </Pressable>
  
        <Pressable 
        style={modalStyles.button}
        onPress={() => openWorkoutList('Biking')}
        >
        <Text style={modalStyles.buttonText}>Biking</Text>
        </Pressable>
      </View>

      {/*MODAL VIEW*/}
      <Modal visible={isModalVisible}>
        <View style={{ flex: 1, backgroundColor:"#141E46"}}>
          {/*MODAL TITLE*/}
          <Text style={modalStyles.text}>{modalTitle}</Text>
        {/*MODAL LIST*/}
        <FlatList
        data={selectedWorkoutList}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
        <View style={modalStyles.list}>
          <Text style={modalStyles.text}>Distance: {item.distance} km</Text>
          <Text style={modalStyles.text}>Time: {item.time} minutes</Text>
          <Text style={modalStyles.text}>Day: {item.day}</Text>
        </View>
      )}
    />
          <Button title="Close"
          onPress={() => setIsModalVisible(false)}
          color="#F06543"/>
        </View>
      </Modal>

      {/*SCROLLABLE WORKOUT LIST*/}
      <FlatList
        style={listStyles.listContainer}
        data={workouts}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <View style={listStyles.list}>
            <Text style={listStyles.text}>
              <Icon name="arrows-h" size={14} color="#FFF5E0" />
              {' '}
              Distance: {item.distance} km</Text>

            <Text style={listStyles.text}>
              <Icon name="clock-o" size={14} color="#FFF5E0" />
              {' '}
              Time: {item.time} minutes</Text>

            <Text style={listStyles.text}>
              <Icon name="calendar" size={14} color="#FFF5E0" />
              {' '}
              Day: {item.day}</Text>

            <Text style={listStyles.text}>{item.type}</Text>
          </View>
        )}
      />

      {/*TOTAL DISTANCE*/}
      <View>
        <Text style={totalDistances.text}>Total distances</Text>
        <Text style={totalDistances.total}>Running: {getTotalDistance('Running')} km Swimming: {getTotalDistance('Swimming')} km Biking: {getTotalDistance('Biking')} km</Text>
      </View>

      {/* WORKOUT TYPES */}
      <View style={selectWorkoutStyles.container}>
        {['Running', 'Swimming', 'Biking'].map((type) => (
          <Pressable
          style={[
            selectWorkoutStyles.button,
            selectedWorkoutType === type && selectWorkoutStyles.selectedButton
          ]}
            key={type}
            onPress={() => setSelectedWorkoutType(type)}
          >
            <Text style={[
            selectWorkoutStyles.text,
            selectedWorkoutType === type && selectWorkoutStyles.selectedText
          ]}>{type}</Text>
          </Pressable>
        ))}
      </View>

    </View>
  );
}


