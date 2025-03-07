import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { Provider as PaperProvider } from 'react-native-paper';


import WdHeader from './components/WdHeader'
import AddWorkout from './components/AddWorkouts'


export default function App() {
  return (
    <View style={styles.container}>
      <WdHeader />
      <AddWorkout />


    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  footerContainer: { backgroundColor: '#333333'},
});
