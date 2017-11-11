/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  Image,
  StatusBar,
  AsyncStorage,
  TouchableOpacity,
  Keyboard,
  Animated,
  Easing
} from 'react-native';
import { Item, Input,Button } from 'native-base';

export default class App extends Component<{}> {

  constructor() {
    super();
    this.state = {
      totalRounds: 0,
      completedRounds: 0,
      count: 0,
      date: new Date().toLocaleDateString(),
      setRounds: 0,
      started: true,
    };
    this.animatedValue = new Animated.Value(0)
  }

  animate() {
    this.animatedValue.setValue(0)
    Animated.timing(
      this.animatedValue,
      {
        toValue: 1,
        duration: 5000,
        easing: Easing.linear
      }
    ).start(() => this.animate())
  }

  componentDidMount() {
    AsyncStorage.getItem('count').then((value) => {
      if (value) {
        let a = JSON.parse(value);
        if (a && a.date === new Date().toLocaleDateString()) {
          this.setState({ count: a.count, totalRounds: a.totalRounds, completedRounds: a.completedRounds, date: new Date().toLocaleDateString() });
        } else {
          this.setState({
            totalRounds: 0,
            completedRounds: 0,
            count: 0,
            date: new Date().toLocaleDateString(),
          });
          AsyncStorage.setItem('count', JSON.stringify({
            totalRounds: 0,
            completedRounds: 0,
            count: 0,
            date: new Date().toLocaleDateString()
          }));
        }
      }
    });
  }

  setRounds = () => {
    let rounds = this.state.setRounds;
    if (rounds !== 0) {
      this.setState({ totalRounds: rounds, setRounds: 0 });
      this.refs.roundsInput._root.setNativeProps({ text: '' });
      Keyboard.dismiss();
    }
  }

  counting = () => {
    if (this.state.totalRounds !== 0 && this.state.totalRounds > this.state.completedRounds) {
      if (this.state.started) {
        this.animate();
      }
      if (this.state.count < 107) {
        this.setState({ count: this.state.count + 1, started: false });
      } else {
        this.setState({ count: 0, completedRounds: this.state.completedRounds + 1, started: false });
      }

      setTimeout(() => {
        AsyncStorage.setItem('count', JSON.stringify({
          totalRounds: this.state.totalRounds,
          completedRounds: this.state.completedRounds,
          count: this.state.count,
          date: new Date().toLocaleDateString(),
          setRounds: this.state.setRounds
        }));
      }, 200)

    }
  }

  reset = () => {
    this.setState({
      totalRounds: 0,
      completedRounds: 0,
      count: 0,
      date: new Date().toLocaleDateString(),
      setRounds: 0
    });
    AsyncStorage.setItem('count', JSON.stringify({
      totalRounds: 0,
      completedRounds: 0,
      count: 0,
      date: new Date().toLocaleDateString(),
      setRounds: 0
    }));
  }

  render() {
    const textSize = this.animatedValue.interpolate({
      inputRange: [0, 0.5, 1],
      outputRange: [20, 32, 20]
    })
    return (
      <View style={styles.container}>
        <StatusBar
          backgroundColor='#FFA500'
          barStyle="light-content"
        />
        <Image
          source={require('./images/1.png')} style={styles.imageContainer}>
          <View style={styles.headerContainer}>
            <Text style={styles.headerText}>Rounds : {this.state.completedRounds} / {this.state.totalRounds}</Text>
            <Text style={styles.headerText}>Count : {this.state.count}</Text>
            <Text style={styles.headerText}>{this.state.date}</Text>
          </View>
          <View style={styles.defaultContainer}>
            <Text style={styles.quoteTextMain}>
              Jai Sri Krishna Chaitanya Prabhu Nityananda Sri Advaita gadhadara srivasadhi goura baktha vrindha .....
            </Text>
          </View>
          <View style={styles.defaultContainer}>
            <Text style={styles.quoteTextMain}>
              Hare Krishna hare Krishna Krishna Krishna hare hare Hare Rama hare Rama Rama Rama hare hare
            </Text>
          </View>
          <View style={styles.container}>
            <Animated.Text
              style={{
                fontSize: textSize,
                marginTop: 10,
                color: 'green',
                fontWeight: 'bold'
              }} >
              Hare Krishna !!!!!!
            </Animated.Text>
          </View>
          <View style={styles.setRoundsContainer}>
            <View style={styles.defaultContainer}>
              <Item rounded style={styles.inputBox}>
                <Input ref='roundsInput' placeholder='Set Rounds' keyboardType={"numeric"} onChangeText={(v) => this.setState({ setRounds: v })} />
              </Item>
            </View>
            <TouchableOpacity style={styles.buttonContainer} onPress={() => this.setRounds()}>
              <Text style={styles.buttonText}>Set</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.resetButtonContainer} onPress={() => this.reset()}>
              <Text style={styles.buttonText}>Reset</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.footerContainer}>
              <Button full success rounded onPress={() => this.counting()}>
                <Text style={styles.buttonText}>Count</Text>
              </Button>
          </View>
        </Image>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  imageContainer: {
    flex: 1,
    resizeMode: Image.resizeMode.contain,
    justifyContent: 'space-between',
    padding: 15
  },
  headerContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  headerText: {
    fontSize: 22,
    color: '#FFA500'
  },
  setRoundsContainer: {
    flex: 1,
    justifyContent: 'space-between',
    flexDirection: 'row',
    margin:5
  },
  defaultContainer: {
    flex: 1,
  },
  quoteTextMain: {
    fontSize: 16,
    color: '#0040ff'
  },
  inputBox: {
    borderColor: '#FFA500',
    borderWidth: 3
  },
  footerContainer: {
    justifyContent: "flex-end",
  },
  subFooter: {
    flexDirection: 'row'
  },
  buttonContainer: {
    width: 100,
    height: 50,
    borderWidth: 2,
    borderColor: '#FFA500',
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFA500'
  },
  resetButtonContainer: {
    width: 100,
    height: 50,
    borderWidth: 2,
    borderColor: 'red',
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'red'
  },
  buttonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white'
  }

});
