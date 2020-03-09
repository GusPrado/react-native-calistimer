import React, {Component} from 'react';
import {
  ScrollView,
  Text,
  StyleSheet,
  Image,
  TextInput,
  KeyboardAvoidingView,
  Keyboard,
  View,
  TouchableOpacity,
} from 'react-native';

import Title from '../components/Title';
import Select from '../components/Select';
import Time from '../components/Time';

class EMOMScreen extends Component {
  state = {
    kbVisible: false,
    alerts: 0,
    countdown: 0,
    time: '15',
    isRunning: false,
    countdownValue: 5,
    count: 0,
  };

  componentDidMount() {
    this.kbShow = Keyboard.addListener('keyboardDidShow', () => {
      this.setState({kbVisible: true});
    });
    this.kbHide = Keyboard.addListener('keyboardDidHide', () => {
      this.setState({kbVisible: false});
    });
    //this.play();
  }

  componentWillUnmount() {
    this.kbShow.remove();
    this.kbHide.remove();
  }

  play = () => {
    this.setState({isRunning: true});
    const count = () => {
      this.setState({count: this.state.count + 1}, () => {
        if (this.state.count === parseInt(this.state.time) * 60) {
          clearInterval(this.countTimer);
        }
      });
    };
    //check countdown
    if (this.state.countdown === 1) {
      this.countdownTimer = setInterval(() => {
        this.setState({countdownValue: this.state.countdownValue - 1}, () => {
          if (this.state.countdownValue === 0) {
            clearInterval(this.countdownTimer);
            this.countTimer = setInterval(count, 1000);
          }
        });
      }, 1000);
    } else {
      this.countTimer = setInterval(count, 1000);
    }
  };

  render() {
    if (this.state.isRunning) {
      const percMinute = (this.state.count % 60) / 60;
      const percTime = this.state.count / 60 / parseInt(this.state.time);
      return (
        <View style={[styles.container, {justifyContent: 'center'}]}>
          <Text>Countdown: {this.state.countdownValue}</Text>
          <Text>Count: {this.state.count}</Text>
          <Time time={this.state.count} />
        </View>
      );
    }

    return (
      <KeyboardAvoidingView style={{flex: 1}} behavior="padding">
        <ScrollView style={styles.container}>
          <Title
            title={'EMOM'}
            subTitle={'Every Minute On the Minute'}
            style={{paddingTop: this.state.kbVisible ? 50 : 200}}
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
            current={this.state.alerts}
            onSelected={option => this.setState({alerts: option})}
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
            current={this.state.countdown}
            onSelected={option => this.setState({countdown: option})}
          />
          <Text style={styles.label}>Quanto minutos:</Text>
          <TextInput
            style={styles.input}
            keyboardType="numeric"
            value={this.state.time}
            onChangeText={text => this.setState({time: text})}
          />
          <Text style={styles.label}>minutos</Text>
          <TouchableOpacity style={{alignSelf: 'center'}} onPress={this.play}>
            <Image source={require('../../assets/img/play.png')} />
          </TouchableOpacity>

          <Text>Testar</Text>
        </ScrollView>
      </KeyboardAvoidingView>
    );
  }
}

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
