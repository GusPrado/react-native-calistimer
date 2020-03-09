import React, {useState} from 'react';
import {
  ScrollView,
  Text,
  StyleSheet,
  Image,
  TextInput,
  KeyboardAvoidingView,
  Keyboard,
} from 'react-native';

import Title from '../components/Title';
import Select from '../components/Select';

const EMOMScreen = props => {
  const [kbVisible, setKbVisible] = useState(false);
  const [emomState, setEmomState] = useState({
    alerts: 0,
    countdown: 0,
    time: '15',
  });

  //DidMount
  const kbShow = Keyboard.addListener('keyboardDidShow', () => {
    setKbVisible(true);
  });
  const kbHide = Keyboard.addListener('keyboardDidHide', () => {
    setKbVisible(false);
  });

  //WillUnmount
  // kbShow.remove()
  // kbHide.remove()

  return (
    <KeyboardAvoidingView style={{flex: 1}} behavior="padding">
      <ScrollView style={styles.container}>
        <Title
          title={'EMOM'}
          subTitle={'Every Minute On the Minute'}
          style={{paddingTop: kbVisible ? 50 : 200}}
        />
        <Image
          style={{alignSelf: 'center', marginBottom: 17}}
          source={require('../../assets/img/settings.png')}
        />
        <Select
          label="Alertas:"
          options={[
            {
              id: 0,
              label: 'Desligado',
            },
            {
              id: 15,
              label: '15s',
            },
            {
              id: 30,
              label: '30s',
            },
            {
              id: 45,
              label: '45s',
            },
          ]}
          current={emomState.alerts}
          onSelected={option => setEmomState({alerts: option})}
        />
        <Select
          label="Contagem Regressiva:"
          options={[
            {
              id: 1,
              label: 'sim',
            },
            {
              id: 0,
              label: 'não',
            },
          ]}
          current={emomState.countdown}
          onSelected={option => setEmomState({countdown: option})}
        />
        <Text style={styles.label}>Quanto minutos:</Text>
        <TextInput
          style={styles.input}
          keyboardType="numeric"
          value={emomState.time}
          onChangeText={text => setEmomState({time: text})}
        />
        <Text style={styles.label}>minutos</Text>
        <Image
          style={{alignSelf: 'center'}}
          source={require('../../assets/img/play.png')}
        />
        <Text>Testar</Text>
        <Text>{JSON.stringify(emomState, kbVisible)}</Text>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#D6304A',
  },
  label: {
    textAlign: 'center',
    color: 'white',
    fontFamily: 'Ubuntu-Regular',
    fontSize: 24,
  },
  input: {
    textAlign: 'center',
    color: 'black',
    fontFamily: 'Ubuntu-Regular',
    fontSize: 48,
  },
});

export default EMOMScreen;
