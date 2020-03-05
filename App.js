/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

const App: () => React$Node = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.welcome}>CalisTimer</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  welcome: {
    fontSize: 48,
    textAlign: 'center',
    fontFamily: 'Ubuntu-Bold',
  },
});

export default App;
