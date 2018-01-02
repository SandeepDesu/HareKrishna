import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  Image,
  Alert,
  StatusBar,
  AsyncStorage,
  TouchableOpacity,
  Picker
} from 'react-native';
import { Item, Input, Button } from 'native-base';
import Icon from 'react-native-vector-icons/FontAwesome';

export default class App extends Component<{}> {
  constructor() {
    super();
    this.state = {
      totalRounds: 0,
      completedRounds: 0,
      count: 0,
      date: new Date().toLocaleDateString(),
      setRounds: 0,
      showSet: true,
      showCancel: false
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
      this.setState({ totalRounds: rounds, setRounds: 0, showSet: false, showCancel: false });
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
      }, 200);
    }
  }

  reset = () => {
    Alert.alert(
      'Reset',
      'Are you sure you want to reset ? ',
      [
        { text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel' },
        {
          text: 'OK', onPress: () => {
            this.setState({
              totalRounds: 0,
              completedRounds: 0,
              count: 0,
              date: new Date().toLocaleDateString(),
              setRounds: 0,
              showSet: true,
              showCancel:false
            });
            AsyncStorage.setItem('count', JSON.stringify({
              totalRounds: 0,
              completedRounds: 0,
              count: 0,
              date: new Date().toLocaleDateString(),
              setRounds: 0,
            }));
          }
        },
      ],
      { cancelable: false }
    );
  }


  render() {
    return (
      <View style={styles.mainContainer}>
        <StatusBar
          backgroundColor='#ff8c1a'
          barStyle="light-content"
        />
        <Image
          source={require('./images/background.jpg')} style={styles.backgroundImage}>
          <View style={styles.topContainer}>
            <View style={[styles.circleView, styles.topLeftView]}>
              <Text style={styles.defaultText}>Rounds</Text>
              <Text style={styles.defaultText}>{this.state.totalRounds}</Text>
            </View>
            <Text style={styles.dateText}>{this.state.date}</Text>
            <View style={[styles.circleView, styles.topRightView]}>
              <Text style={styles.defaultText}>Count</Text>
              <Text style={styles.defaultText}>{this.state.count}</Text>
            </View>
          </View>
          <View style={styles.quoteContainer}>
            <Text style={styles.quotesText}> Jai Sri Krishna Chaitanya Prabhu Nityananda Sri Advaita gadhadara sri vasadhi goura baktha brundha ..... </Text>
            <Text style={styles.quotesText}> Hare Krishna hare Krishna Krishna Krishna hare hare Hare Rama hare Rama Rama Rama hare hare </Text>
          </View>
          <View style={styles.bottomContainer}>
            {this.state.showSet ? <View style={styles.setRoundsContainer}>
              <View style={styles.pickerContainer}>
                <Picker
                  style={styles.picker}
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
                </Picker>
              </View>
              <View style={styles.setButtonContainer}>
                <TouchableOpacity style={styles.setButton} onPress={() => this.setRounds()}>
                  <Text style={styles.setButtonText}>Set</Text>
                </TouchableOpacity>
              </View>
            </View> : null}
            {!this.state.showSet ? <View style={styles.changeContainer}>
              <TouchableOpacity style={[styles.circleView, styles.middleLeftView]} onPress={() => this.setState({ showSet: true, showCancel: true })}>
                <Text style={styles.defaultText}>Change</Text>
              </TouchableOpacity>
            </View> : null}
            <View style={styles.bottomButtonsContainer}>
              <View style={[styles.circleView, styles.bottomLeftView]}>
                <Text style={styles.defaultText}>Completed</Text>
                <Text style={styles.defaultText}>{this.state.completedRounds}</Text>
              </View>
              {!this.state.showSet ? <TouchableOpacity style={[styles.circleView, styles.bottomMiddleView]} onPress={() => this.counting()}>
                <Text style={styles.defaultText}>Count</Text>
              </TouchableOpacity> : null}
              {!this.state.showSet && !this.state.showCancel ? <TouchableOpacity style={[styles.circleView, styles.bottomRightView]} onPress={() => this.reset()}>
                <Icon name="trash" size={30} color="#900" />
              </TouchableOpacity> : null}
              {this.state.showCancel ? <TouchableOpacity style={[styles.circleView, styles.bottomRightView]} onPress={() => this.setState({ showSet: false, showCancel: false })}>
                <Icon name="remove" size={30} color="#900" />
              </TouchableOpacity> : null}
            </View>
          </View>
        </Image>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1
  },
  backgroundImage: {
    flex: 1,
    width: undefined,
    height: undefined,
    resizeMode: 'cover'
  },
  topContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: "space-between"
  },
  circleView: {
    height: 100,
    width: 100,
    elevation:5,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 50,
    borderColor: '#ff8c1a',
    borderWidth: 2
  },
  topLeftView: {
    left: -25,
    top: -25
  },
  topRightView: {
    right: -25,
    top: -25
  },
  defaultText: {
    color: 'white',
    fontSize: 14
  },
  quoteContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  quotesText: {
    color: 'white',
    textAlign: 'center',
    fontSize: 16
  },
  bottomContainer: {
    flex: 2,
  },
  setRoundsContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  pickerContainer: {
    flex: 1,
    height: 50,
    borderColor: 'green',
    borderWidth: 2,
    borderRadius: 25
  },
  setButtonContainer: {
    flex: 1
  },
  setButton: {
    width: undefined,
    height: 50,
    borderColor: 'green',
    borderWidth: 2,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 25
  },
  setButtonText: {
    fontSize: 16,
    color: 'white'
  },
  picker: {
    color: 'white'
  },
  dateText: {
    fontSize: 18,
    color: 'white',
    alignSelf: 'center'
  },
  resetContainer: {
    flex: 1
  },
  resetButton: {
    width: undefined,
    height: 50,
    borderColor: 'red',
    borderWidth: 2,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 25
  },
  resetButtonText: {
    fontSize: 16,
    color: 'white'
  },
  bottomButtonsContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end'
  },
  bottomLeftView: {
    left: -15,
    bottom: -25
  },
  bottomRightView: {
    right: -25,
    bottom: -25
  },
  bottomMiddleView: {
    bottom: -25
  },
  changeContainer: {
    flex: 1
  },
  middleLeftView: {
    left: -20,
  }

});
