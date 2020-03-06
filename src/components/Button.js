import React from 'react';
import {TouchableOpacity, Text, StyleSheet} from 'react-native';

export default function Button(props) {
  return (
    <TouchableOpacity onPress={props.onPress} style={props.style}>
      <Text style={styles.text}>{props.children}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  text: {
    color: 'white',
    fontFamily: 'Ubuntu-Regular',
    fontSize: 24,
    textAlign: 'center',
  },
});
