import React, { useState } from 'react';
import { StyleSheet, Image, View } from 'react-native';

export default function WdHeader() {
  return (
    <View style={headerStyles.container}>
      <Image 
        style={headerStyles.image} 
        source={require('../img/AS.png')}
        accessible={true}
        accessibilityLabel='Workout diary header'
        resizeMode="contain"
      />
    </View>
  );
}

const headerStyles = StyleSheet.create({
  container: {
      backgroundColor: '#141E46',
      alignItems: 'center', //img center
      justifyContent: 'center',
      padding: 4,
  },

  image: {
      width: 90, 
      height: 90, 
  },
});