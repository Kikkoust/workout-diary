import React, { useState } from 'react';
import { Text, TextInput, Image, View, Pressable, StyleSheet, FlatList, Modal, Button } from 'react-native';
import DateTimePicker from "@react-native-community/datetimepicker";
import Icon from 'react-native-vector-icons/FontAwesome';


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
    setWorkouts((prevWorkouts) => [...prevWorkouts, newWorkout]);

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
      
      {/*MODAL*/}
      <Text>View all workouts</Text>
      
      <View style={totalDistances.total}>
        <Button 
        title="Running"
        onPress={() => openWorkoutList('Running')}
        color="blue"/>
        <Button 
        title="Swimming"
        onPress={() => openWorkoutList('Swimming')}
        color="blue"/>
        <Button 
        title="Biking"
        onPress={() => openWorkoutList('Biking')}
        color="blue"/>
      </View>

      <Modal visible={isModalVisible}>
        <View style={{ flex: 1, backgroundColor:"blue"}}>
        <FlatList
      data={selectedWorkoutList}
      keyExtractor={(item, index) => index.toString()}
      renderItem={({ item }) => (
        <View>
          <Text>Distance: {item.distance} km</Text>
          <Text>Time: {item.time} minutes</Text>
          <Text>Date: {item.day}</Text>
        </View>
      )}
    />
          <Button title="Close"
          onPress={() => setIsModalVisible(false)}
          color="blue"/>
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
        <Text>Total distances</Text>
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

/*BODY STYLES*/
const addStyles = StyleSheet.create({
    add: {
        backgroundColor: '',
        alignItems: 'center',
        padding: 2,
    },
  })

const selectedStyles = StyleSheet.create({
  selected: {
    marginBottom: 14,
  },
  text:{
    fontWeight: 'bold',
    color: '#141E46',
  },
});



/*SET DISTANCE/TIME/DAY STYLES*/
const addcontentStyles = StyleSheet.create({
  container: {
    flexDirection: 'row', 
    justifyContent: 'space-between',
  },

  inputContainer: {
    alignItems: 'center',
    backgroundColor: '#141E46',
    marginHorizontal: 15,
    width: 90,
    height: 120,
    justifyContent: 'center',
    borderRadius: 10,
  },

  input: {
    height: 'auto',
    width: 90,
    textAlign: 'center',
    color: '#FFF5E0',
  
  },

  text: {
    color: '#FFF5E0',
    fontWeight: 'bold',
    textAlign: 'center',
    margin: 10,
  },

  calendarText: {
    width: 90,
    height: 40,
    color: '#FFF5E0',
    marginTop: 16,
  },
});

/* BUTTON STYLES */
const buttonStyles = StyleSheet.create({

  button: {
    width: 210,
    height: 60,
    borderRadius: 13,
    borderWidth: 1,
    backgroundColor: '#F06543',
    alignItems: 'center',
    justifyContent: 'center',
    margin: 6,
  },

  buttonText: {
    color: '#141E46',
    fontWeight: 'bold',
    fontSize: 22,
  },
});

/*WORKOUT LIST STYLES*/
const listStyles = StyleSheet.create({
  listContainer:{
    backgroundColor: '#141E46',
    width: 330,
    height: 270,
    borderRadius: 10,
    marginTop: 30,

  },

  list:{
    backgroundColor: '#141E46',
    padding: 10,
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#FFF5E0',
  },

  text:{
    fontSize: 14,
    fontWeight: 'bold',
    color: '#FFF5E0',

  },

});

const selectWorkoutStyles = StyleSheet.create({
  container:{
    flexDirection: 'row',
  },
  
  button:{
    backgroundColor:'#141E46',
    flexDirection: 'row',
    padding: 30,
    borderRadius: 20,
    borderWidth: 1,
    margin: 10,
  },

  text:{
    fontWeight: 'bold',
    color: '#FFF5E0'
  },

  /*SELECTED BUTTON STYLE*/
  selectedButton: {
    backgroundColor: '#F06543',
    shadowColor: 'black',
    

    
  },

  selectedText: {
    color: '#141E46',
    fontWeight: 'bold',

  },

});

const totalDistances = StyleSheet.create({
  total:{
    flexDirection: 'row'
  },
})



