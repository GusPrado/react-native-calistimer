import React from 'react';
import {View, StyleSheet} from 'react-native';

import Title from '../components/Title';
import Select from '../components/Select';

const EMOMScreen = props => {
  return (
    <View style={styles.container}>
      <Title title={'EMOM'} subTitle={'Every Minute On the Minute'} />
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
        current={0}
        onSelected={option => console.log(option)}
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
        current={0}
        onSelected={option => console.log(option)}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#D6304A',
    paddingTop: 200,
  },
});

export default EMOMScreen;
