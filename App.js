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
  Easing,
  Picker
} from 'react-native';
import { Item, Input, Button } from 'native-base';
const one = require('./images/1.jpg');
const two = require('./images/2.jpg');
const three = require('./images/3.jpg');
const four = require('./images/4.jpg');
const five = require('./images/5.jpg');
const imagePath = [
  one, two, three, four, five
]
const randomNumber = Math.floor(Math.random() * 4);
const backgroundColor = '#1a66ff'
export default class App extends Component<{}> {
  constructor() {
    super();
    this.state = {
      image: imagePath[randomNumber],
      totalRounds: 0,
      completedRounds: 0,
      count: 0,
      date: new Date().toLocaleDateString(),
      setRounds: 0,
      showSet: true
    };
  }

  componentDidMount() {
    AsyncStorage.getItem('count').then((value) => {
      if (value) {
        let a = JSON.parse(value);
        if (a && a.date === new Date().toLocaleDateString()) {
          this.setState({ count: a.count, totalRounds: a.totalRounds, completedRounds: a.completedRounds, date: new Date().toLocaleDateString(), showSet: a.totalRounds > 0 ? false : true });
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
      this.setState({ totalRounds: rounds, setRounds: 0, showSet: false });
    }
  }

  counting = () => {
    if (this.state.totalRounds !== 0 && this.state.totalRounds > this.state.completedRounds) {

      if (this.state.count < 107) {
        this.setState({ count: this.state.count + 1 });
      } else {
        this.setState({ count: 0, completedRounds: this.state.completedRounds + 1 });
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
      setRounds: 0,
      showSet: true
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
    return (
      <View style={styles.container}>
        <StatusBar
          backgroundColor='#ff8c1a'
          barStyle="light-content"
        />
        <View style={styles.mainContainer}>
          <View style={styles.subContainer}>
            <View style={styles.roundsContainer}>
              <Text style={styles.textStyle}>Rounds</Text>
              <Text style={styles.textStyle}>{this.state.totalRounds}</Text>
            </View>
            <View style={styles.roundsContainer}>
              <Text style={styles.textStyle}>Count</Text>
              <Text style={styles.textStyle}>{this.state.count}</Text>
            </View>
            <View style={styles.roundsContainer}>
              <Text style={styles.textStyle}>Completed</Text>
              <Text style={styles.textStyle}>{this.state.completedRounds}</Text>
            </View>
          </View>
          <View style={styles.mainContainer}>
            <View style={styles.quotesContainer}>
              <Text style={styles.quotesText}> Jai Sri Krishna Chaitanya Prabhu Nityananda Sri Advaita gadhadara sri vasadhi goura baktha brundha ..... </Text>
            </View>
            <View style={styles.quotesContainer}>
              <Text style={styles.quotesText}> Hare Krishna hare Krishna Krishna Krishna hare hare Hare Rama hare Rama Rama Rama hare hare </Text>
            </View>
          </View>
        </View>
        <Image
          source={this.state.image} style={styles.imageContainer} />
        <View style={styles.mainContainer}>
          <View style={styles.setRoundsContainer}>
            <View style={[styles.pickerBlock, { backgroundColor: this.state.showSet ? 'yellow' : backgroundColor }]}>
              {this.state.showSet ? <Picker
                selectedValue={this.state.setRounds}
                onValueChange={(itemValue, itemIndex) => this.setState({ setRounds: itemValue })}>
                <Picker.Item label="Select Rounds" value="0" />
                <Picker.Item label="1" value="1" />
                <Picker.Item label="2" value="2" />
                <Picker.Item label="4" value="4" />
                <Picker.Item label="8" value="8" />
                <Picker.Item label="12" value="12" />
                <Picker.Item label="16" value="16" />
                <Picker.Item label="18" value="18" />
                <Picker.Item label="20" value="20" />
                <Picker.Item label="22" value="22" />
                <Picker.Item label="25" value="25" />
                <Picker.Item label="32" value="32" />
                <Picker.Item label="64" value="64" />
              </Picker> : null}
            </View>
            <View style={styles.picker}>
              {this.state.showSet ? <TouchableOpacity style={styles.setButton} onPress={() => this.setRounds()}>
                <Text style={styles.setButtonText}>Set</Text>
              </TouchableOpacity> : null}
            </View>
            <View style={styles.picker}>
              <TouchableOpacity style={styles.resetButton} onPress={() => this.reset()}>
                <Text style={styles.resetButtonText}>Reset</Text>
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.mainContainer}>
            <TouchableOpacity style={styles.countButton} onPress={() => this.counting()}>
              <Text style={styles.countButtonText}>Count</Text>
            </TouchableOpacity>
            <Text style={styles.dateText}>{this.state.date}</Text>
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: backgroundColor
  },
  imageContainer: {
    flex: 1,
    resizeMode: Image.resizeMode.contain,
    alignSelf: 'stretch',
    width: undefined,
    height: undefined
  },
  mainContainer: {
    flex: 1,
    margin: 2
  },
  subContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around'
  },
  roundsContainer: {
    flex: 1,
    margin: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  textStyle: {
    fontSize: 18,
    color: 'white'
  },
  quotesContainer: {
    flex: 1,
    margin: 1
  },
  quotesText: {
    fontSize: 14,
    textAlign: 'center',
    color: 'white'
  },
  setRoundsContainer: {
    flex: 1,
    flexDirection: 'row',
    margin: 5,
    justifyContent: 'space-around',
  },
  picker: {
    flex: 1,
    margin: 1
  },
  pickerBlock: {
    flex: 1,
    height: 50,
    borderRadius: 25
  },
  setButton: {
    width: undefined,
    height: 50,
    backgroundColor: 'green',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 25
  },
  setButtonText: {
    fontSize: 16,
    color: 'white'
  },
  resetButton: {
    width: undefined,
    height: 50,
    backgroundColor: 'red',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 25
  },
  resetButtonText: {
    fontSize: 16,
    color: 'white'
  },
  countButton: {
    width: undefined,
    height: 50,
    backgroundColor: '#ff8c1a',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 25
  },
  countButtonText: {
    fontSize: 16,
    color: 'white'
  },
  dateText: {
    fontSize: 18,
    color: 'white',
    alignSelf:'center'
  }
});
