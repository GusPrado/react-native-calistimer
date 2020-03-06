import React, {useState} from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';

const Select = props => {
  const [current, setCurrent] = useState(props.current);

  const handlePress = option => () => {
    setCurrent(option);
    if (props.onSelected) {
      props.onSelected(option);
    }
  };

  const {options, label} = props;
  return (
    <View style={{flex: 1}}>
      <Text style={styleSelect.label}>{label}</Text>
      <View style={styleSelect.optValues}>
        {options.map(option => {
          let id = '';
          let labelOpt = '';
          if (typeof option === 'string') {
            id = option;
            labelOpt = option;
          } else if (typeof option === 'object') {
            id = option.id;
            labelOpt = option.label;
          }

          return (
            <TouchableOpacity
              key={id}
              style={[
                styleSelect.opt,
                id === current ? styleSelect.optSelected : null,
              ]}
              onPress={handlePress(id)}>
              <Text style={styleSelect.optLabel}>{labelOpt}</Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
};

const styleSelect = StyleSheet.create({
  label: {
    textAlign: 'center',
    color: 'white',
    fontFamily: 'Ubuntu-Regular',
    fontSize: 24,
  },
  opt: {
    padding: 8,
  },
  optSelected: {
    backgroundColor: 'rgba(255, 255, 255, 0.6)',
  },
  optLabel: {
    color: 'white',
    fontFamily: 'Ubuntu-Regular',
    fontSize: 24,
    opacity: 1,
  },
  optValues: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
});

export default Select;
