import React, { useState } from 'react';
import { Text, TextInput, Image, View, Pressable, StyleSheet, FlatList } from 'react-native';
import DateTimePicker from "@react-native-community/datetimepicker";


export default function AddWorkouts() {
  const [distance, setDistance] = useState('');
  const [time, setTime] = useState('');
  const [day, setDay] = useState(new Date());
  const [dateOfWorkout, setDateOfWorkout] = useState(false);
  const [workouts, setWorkouts] = useState([]);


  const addWorkout = () => {
    const newWorkout = { distance, time, day: day.toDateString() };
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

  return (
    <View style={addimgStyles.img}>
      <Image
        style={addimgStyles.image}
        source={require('../img/running.png')}
        accessible={true}
        accessibilityLabel='Running logo'
        resizeMode="contain"
      />

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

        <View style={addcontentStyles.inputContainer}>
          <Text style={addcontentStyles.text}>Day</Text>

          <Pressable onPress={() => setDateOfWorkout(true)}>
            <TextInput
              value={day.toDateString()}
              editable={false}
              style={addcontentStyles.input}
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

      <View>
        <Pressable style={[buttonStyles.button, !isFormValid && { backgroundColor: 'grey'}]} onPress={addWorkout}
        disabled={!isFormValid}>
          <Text style={buttonStyles.buttonText}>ADD WORKOUT</Text>
        </Pressable>
      </View>

      <FlatList
        data={workouts}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <View>
            <Text>Distance: {item.distance} km</Text>
            <Text>Time: {item.time} minutes</Text>
            <Text>Day: {item.day}</Text>
          </View>
        )}
      />
    </View>
  );
}


const addimgStyles = StyleSheet.create({
    img: {
        backgroundColor: '',
        alignItems: 'center', //img center
        justifyContent: 'center',
        padding: 4,
        
    },
  
    image: {
        width: 60, 
        height: 60, 
    },
  });



/* INPUT STYLES */
const addcontentStyles = StyleSheet.create({
  container: {
    flexDirection: 'row', 
    justifyContent: 'space-between',
  },

  inputContainer: {
    alignItems: 'center',
    backgroundColor: '#141E46',
    marginHorizontal: 15,
    width: '90',
    height: '120',
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
  }
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

