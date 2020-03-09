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
import Sound from 'react-native-sound';

import Title from '../components/Title';
import Select from '../components/Select';
import Time from '../components/Time';
import ProgressBar from '../components/ProgressBar';
import BgProgress from '../components/BgProgress';

const alert = require('../../assets/sounds/alert.wav');

class EMOMScreen extends Component {
  state = {
    kbVisible: false,
    alerts: 0,
    countdown: 0,
    time: '2',
    isRunning: false,
    countdownValue: 0,
    count: 0,
  };

  componentDidMount() {
    Sound.setCategory('Playback', true);
    this.alert = new Sound(alert);

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

  stop = () => {
    clearInterval(this.countdownTimer);
    clearInterval(this.countTimer);
    this.setState({isRunning: false});
  };

  play = () => {
    this.setState({
      count: 0,
      countdownValue: this.state.countdown === 1 ? 5 : 0,
    });
    this.setState({isRunning: true});
    const count = () => {
      this.setState({count: this.state.count + 1}, () => {
        if (this.state.count % this.setState.alert === 0) {
          this.alert.play();
        }
        if (this.state.count === parseInt(this.state.time) * 60) {
          clearInterval(this.countTimer);
        }
      });
    };
    //check countdown
    if (this.state.countdown === 1) {
      this.alert.play();
      this.countdownTimer = setInterval(() => {
        this.alert.play();
        this.setState({countdownValue: this.state.countdownValue - 1}, () => {
          if (this.state.countdownValue === 0) {
            clearInterval(this.countdownTimer);
            this.countTimer = setInterval(count, 100);
          }
        });
      }, 1000);
    } else {
      this.countTimer = setInterval(count, 100);
    }
  };

  render() {
    if (this.state.isRunning) {
      const percMinute = parseInt(((this.state.count % 60) / 60) * 100);
      const percTime = parseInt(
        (this.state.count / 60 / parseInt(this.state.time)) * 100,
      );
      return (
        <BgProgress percentage={percMinute}>
          <View style={[{flex: 1, justifyContent: 'center'}]}>
            <View style={{flex: 1}}>
              <Title
                title={'EMOM'}
                subTitle={'Every Minute On the Minute'}
                style={{paddingTop: this.state.kbVisible ? 50 : 100}}
              />
            </View>
            <View style={{flex: 1, justifyContent: 'center'}}>
              <Time time={this.state.count} />
              <ProgressBar percentage={percTime} />
              <Time
                time={parseInt(this.state.time) * 60 - this.state.count}
                type="text2"
                appendedText={' restantes'}
              />
            </View>
            <View style={{flex: 1, justifyContent: 'flex-end'}}>
              {this.state.countdownValue > 0 ? (
                <Text style={styles.countdown}>
                  {this.state.countdownValue}
                </Text>
              ) : null}
              <TouchableOpacity
                style={{alignSelf: 'center', marginBottom: 40}}
                onPress={this.stop}>
                <Image source={require('../../assets/img/stop.png')} />
              </TouchableOpacity>
            </View>
          </View>
        </BgProgress>
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
  countdown: {
    fontFamily: 'Ubuntu-Bold',
    fontSize: 144,
    color: 'white',
    textAlign: 'center',
  },
});

export default EMOMScreen;
