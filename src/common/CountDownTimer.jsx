import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { font } from '../constants';

const CountdownTimer = (props) => {
  useEffect(() => {
    if (props.second < 0) return;
    const interval = setInterval(() => {
      if(props.second != 0)
      {
      props.setSecond(seconds => seconds - 1);
      }
      else{
        clearInterval(interval);
      }
    }, 1000);
    return () => clearInterval(interval);
  }, [props.second, props.setSecond]);

    useEffect(() =>{
     if(props.second == 0){
         props.handleTimer();
        
     }
    },[props.second]) 
  //const [seconds, setSeconds] = useState(10); // Initial countdown value in seconds
  //  useEffect(() =>{
  //   if(seconds == 0){
  //       props.handleTimer();
        
  //   }
  //  },[seconds]) 
  // useEffect(() => {
  //       console.log(props);
  //   const interval = setInterval(() => {
  //     // Decrease seconds by 1 every second
  //     if(seconds != 0)
  //     {
  //       setSeconds(prevSeconds => (prevSeconds!=0) ? prevSeconds - 1 : 0);
  //     }
  //     else{
  //         clearInterval(interval);  
  //     }
      
  //   }, 1000);

  //   // Clear the interval when component unmounts
  //   return () => clearInterval(interval);
  // }, []);



  // Function to format remaining time in HH:MM:SS format
  const formatTime = () => {
    const minutes = Math.floor(props.second / 60);
    const remainingSeconds = props.second % 60;
    return `${minutes < 10 ? '0' : ''}${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}s`;
  };

  return (
    <View style={styles.container}>
      <Text style={styles.timerText}>{formatTime()}</Text>

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop:40
   
  },
  timerText: {
    fontSize: 18,
    color:'#fff',
    fontFamily:font.GoldPlay_SemiBold
    
  },
});

export default CountdownTimer;