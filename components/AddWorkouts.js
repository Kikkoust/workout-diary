import React, { useState } from 'react';
import { ScrollView, Text, StyleSheet, TextInput, Image, View } from 'react-native';

export default function WdHeader() {

const [distance, setDistance] = useState('');
const [time, setTime] = useState('');
const [day, setDay] = useState('');


  return (
    <View style={headerStyles.container}>
        <Image 
            style={headerStyles.image} 
            source={require('../img/running.png')}
            accessible={true}
            accessibilityLabel='Running logo'
            resizeMode="contain"
        />

        

        <View>
          <Text>Distance (km)</Text>
          <TextInput
            value={distance}
            onChangeText={setDistance}
            keyboardType="numeric"
            placeholder="Enter distance"
          />
        </View>

        <View>
          <Text>Time (minutes)</Text>
          <TextInput
            value={time}
            onChangeText={setTime}
            keyboardType="numeric"
            placeholder="Enter time"
          />
        </View>

        <View>
          <Text>Day</Text>
          <TextInput
            value={day}
            onChangeText={setDay}
            keyboardType="numeric"
            placeholder="Enter Day"
          />
        </View>

    

    </View>
  );
}

const headerStyles = StyleSheet.create({
    container: {
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