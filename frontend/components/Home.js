import React, { useState, useEffect } from 'react';
import {
    SafeAreaView,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    TextBase,
    useColorScheme,
    View,
    Image,
    TouchableNativeFeedbackBase,
  } from 'react-native';
  import {
    Title,
    TextInput,
    Button,
    List,
    Checkbox,
  } from 'react-native-paper';

  //import CountDown to show the timer
  import CountDown from 'react-native-countdown-component';
  //import moment to help you play with date and time
  import moment from 'moment';

  const styles = StyleSheet.create({
    logo: {
        width: 50,
        height: 50,
        borderRadius: 50,
        position: 'absolute',
        bottom: '3.5%',
        left: '41.5%',
    },
    history: {
      width: 50,
      height: 50,
      //position: 'absolute',
      //bottom: '6.5%',
      //left: '20%',
    },
    flag1: {
      width: 60,
      height: 60,
      borderRadius: 50,
      position: 'absolute',
      left: '35%',
      bottom: '76%',
    },
    flag2: {
      width: 60,
      height: 60,
      borderRadius: 50,
      position: 'absolute',
      left: '48%',
      bottom: '76%',
    },
    flag3: {
      width: 60,
      height: 60,
      borderRadius: 50,
      position: 'absolute',
      left: '58%',
      bottom: '76%',
    },
    user: {
        width: 50,
        height: 50,
        //position: 'absolute',
        //bottom: '0%',
        //left: '50%',
    },
    userBox: {
      flex: 1,
      flexDirection: 'row',
      //position: 'absolute',
      //bottom: '-60%',
      //left: '50%',
    },
    historyBox: {
      flex: 1,
      flexDirection: 'row',
      //position: 'absolute',
      //bottom: '0%',
      //left: '20%',
    },
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
  center: {
      textAlign: 'center',
  },
  statement: {
      textAlign: 'center',
      fontWeight: 'bold',
      color: '#163869',
  },
  button: {
      borderStyle: 'solid',
      borderWidth: 2,
      backgroundColor: '#265A92',
      borderColor: '#265A92',
      boxShadow: "4px 4px 5px lightblue",
      width: 150,
  },
  score: {
      position: 'absolute',
      left: '40%',
      bottom: '90%',
      backgroundColor: '#FFFFFF',
      borderStyle: 'solid',
      borderWidth: 2,
      borderRadius: 15,
      paddingTop: 4,
      paddingBottom: 8,
      fontSize: 25,
      fontWeight: 'bold',
      color: '#265A92',
      textAlign: 'center',
      borderColor: '#265A92',
      boxShadow: "4px 4px 5px lightblue",
      width: 150,
  },
  inputBox: {
      backgroundColor: '#FFFFFF',
      borderStyle: 'solid',
      borderWidth: 2,
      borderRadius: 5,
      borderColor: '#999999',
      boxShadow: "4px 4px 5px lightblue",
      marginBottom: 10,
  },
  line: {
      position: 'absolute',
      left: '40%',
      bottom: '79%',
      borderStyle: 'solid',
      borderWidth: 1,
      borderRadius: 5,
      borderColor: '#777777',
      width: '20%',
  },
  numberText: {
    textAlign: 'center',
    position: 'absolute',
    bottom: '80%',
    fontSize: 15,
  },
  progressBar: {
    position: 'absolute',
    left: '30%',
    bottom: '75%',
    borderStyle: 'solid',
    borderWidth: 2,
    borderRadius: 15,
    borderColor: '#265A92',
    width: '40%',
    paddingTop: 20,
  },
  barFill: {
    position: 'absolute',
    left: '30%',
    bottom: '75%',
    borderStyle: 'solid',
    borderWidth: 12,
    borderRadius: 15,
    borderColor: '#265A92',
    width: '22%',
    paddingTop: 0,  
  },
  taskItem: {
    backgroundColor: '#FFFFFF',
    borderStyle: 'solid',
    borderWidth: 2,
    borderRadius: 7,
    borderColor: '#999999',
    boxShadow: "4px 4px 5px lightblue",
    marginBottom: 10,
    fontSize: 30,
    paddingTop: 10,
    paddingBottom: 12,
    width: '60%'
  },
  hudBar: {
    backgroundColor: "#999999",
    paddingTop: 62,
    position: 'absolute',
    bottom: '6%',
    left: '35%',
    width: '25%',
  },
  bottomBar: {
    flexDirection: 'row',
  },
});

import axios from 'axios';
import { TouchableHighlight, TouchableOpacity } from 'react-native-gesture-handler';

const api = axios.create({
  baseURL: 'http://localhost:25484'
})

  const Login = ({navigation}) => {
    const[username, setUN] = React.useState(""); 
    const[password, setpass] = React.useState(""); 
    const tasks = ['one', 'two', 'three', 'four'];
    const [totalDuration, setTotalDuration] = useState(0);
    const duration = useState(0);
    const [isSelected1, setSelection1] = useState(false);
    const [isSelected2, setSelection2] = useState(false);
    const [isSelected3, setSelection3] = useState(false);
    const [isSelected4, setSelection4] = useState(false);
    const points = useState(0);

    const profileFunction = () => {
      navigation.navigate("Profile");
    }

    useEffect(() => {
      //We are showing the coundown timer for a given expiry date-time
      //If you are making a quize type app then you need to make a simple timer
      //which can be done by using the simple like given below
      //that.setState({ totalDuration: 30 }); //which is 30 sec
      var date = moment().utcOffset('+05:30').format('YYYY-MM-DD hh:mm:ss');
      //Getting the current date-time with required formate and UTC
      var expirydate = '2022-04-23 04:00:45'; //You can set your own date-time
      //Let suppose we have to show the countdown for above date-time
      var diffr = moment.duration(moment(expirydate).diff(moment(date)));
      //difference of the expiry date-time given and current date-time
      var hours = parseInt(diffr.asHours());
      var minutes = parseInt(diffr.minutes());
      var seconds = parseInt(diffr.seconds());
      var d = hours * 60 * 60 + minutes * 60 + seconds;
      //converting in seconds
      setTotalDuration(d);
      //Settign up the duration of countdown in seconds to re-render
      /*
      <CountDown
          until={totalDuration}
          timetoShow={('H', 'M', 'S')}
          onFinish={() => alert('Challenges Refresh Now')}
          size={27}
        />
      */
    }, []);

    const increasePoints = () => {
      points += 100;
    }

    return (
        <View style = {styles.container}>

        {/*This is a placeholder for the actual value of points the user has*/}
        <Text style = {styles.score}>
          {points} / 1000
        </Text>

        <Text style = {styles.numberText} >
          <strong style={{fontSize: 25}}>3</strong> DAYS  <strong style={{fontSize: 25}}>22</strong> HOURS  <strong style={{fontSize: 25}}>17</strong> MINUTES  <strong style={{fontSize: 25}}>44</strong> SECONDS
        </Text>
        <Text style = {styles.line}></Text>

        

        {/*Database items get loaded here*/}
        <Text style = {styles.taskItem}>
          <Checkbox
            value={isSelected1}
            onValueChange={setSelection1}
          />
          Run a mile
          <strong style={{fontSize: 25, position: 'absolute', left: '70%', color: "#265A92"}}>100</strong>
        </Text>
        <Text style = {styles.taskItem}>
          <Checkbox
            value={isSelected2}
            onValueChange={setSelection2}
          />
          Try a new recipe
          <strong style={{fontSize: 25, position: 'absolute', left: '70%', color: "#265A92"}}>100</strong>
        </Text>
        <Text style = {styles.taskItem}>
          <Checkbox
            value={isSelected3}
            onValueChange={setSelection3}
          />
          Hit the gym 3 times
          <strong style={{fontSize: 25, position: 'absolute', left: '70%', color: "#265A92"}}>100</strong>
        </Text>
        <Text style = {styles.taskItem}>
          <Checkbox
            value={isSelected4}
            onValueChange={setSelection4}
          />
          Work on the yard
          <strong style={{fontSize: 25, position: 'absolute', left: '70%', color: "#265A92"}}>100</strong>
        </Text>

        <br></br><br></br>

        <View style={styles.bottomBar}>
        <TouchableHighlight onPress={profileFunction}>
          <Image
              style = {styles.user}
              source={{uri: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/7c/User_font_awesome.svg/1024px-User_font_awesome.svg.png', }}
          />
        </TouchableHighlight>

        </View>
        
        </View>
    )
  };
export default Login; 
