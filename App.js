import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import WdHeader from './components/WdHeader';
import AddWorkout from './components/AddWorkouts';



export default function App() {

  return (
      <View style={styles.container}>
        <WdHeader />
        <AddWorkout />
      </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
});