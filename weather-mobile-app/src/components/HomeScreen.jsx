import React, {useEffect, useState , useCallback} from "react";
import { StyleSheet, Button, Text, View, Image } from "react-native";
import { TextInput } from "react-native-gesture-handler";
import {getWeatherByCityName} from "../servises/index"

export const HomeScreen = () => {
  const [currentCity, setCurrentCity] = useState('Copenhagen');
  const [weatherData, setWeatherData] = useState(null);
  
  const refreshForTheCity = useCallback(
    async () => { 
      try { 
        const weatherForcast = await getWeatherByCityName(currentCity);
        setWeatherData(weatherForcast)
      } catch (error) {
        console.log(error);
      }
    },[currentCity],
  )


  useEffect(() => {
    refreshForTheCity()
    }, [])
  console.log(weatherData)
  return (
    <View style={styles.viewBody}>
        
      <Text style={styles.viewTitle}>Weather App</Text>
      
      <View style={styles.viewHeader}>
        <Text style={{textAlign:"center",padding:10}}>Add</Text>
        <TextInput
          placeholder={ 'Enter City Name'}
          onChangeText={setCurrentCity}
          style={{textAlign:"center",padding:10,flex:2}}
        />
        <Button
          title={'Search'}
          onPress={refreshForTheCity}
          style={{textAlign:"center",padding:20,flex:1}}
        />
      </View>

      <View style={styles.viewMain}>
        <Text style={{fontSize:15,fontWeight:"bold",textAlign:"center",paddingTop:10}}>{`Country : ${weatherData?.sys?.country}`}</Text>
        <Text style={{fontSize:25,textAlign:"center"}}>{ `City : ${weatherData?.name}`}</Text>
        <Image
              style={{width: 320, height: 250}}
              source={{
                uri: `http://openweathermap.org/img/wn/${weatherData?.weather[0]?.icon}@4x.png`
              }}
        />
        <Text style={{fontSize:15,textAlign:"center"}}>{`${weatherData?.weather[0]?.description}`}</Text>
        <Text style={{fontSize:25,textAlign:"center"}}>{`Temperature : ${weatherData?.main?.temp} °F`}</Text>
        
      </View>
      <View style={styles.viewDetails}>

        <Text style={styles.viewDetailsSection}>{`Feels like : ${weatherData?.main?.feels_like}`}</Text>
        <Text style={styles.viewDetailsSection}>{`Wind : ${weatherData?.wind?.speed}`}</Text>
        <Text style={styles.viewDetailsSection}>{`Humidity : ${weatherData?.main?.humidity}`}</Text>
        
      </View>
    
      <View style={styles.viewFooter}>
        <Text style={styles.viewFooterSection}>{`Max-temp : ${weatherData?.main?.temp_max} °F`}</Text>
        <Text style={styles.viewFooterSection}>{ `Min-temp : ${weatherData?.main?.temp_min} °F`}</Text>
      </View>
      </View>
  );
};

const styles = StyleSheet.create({
  viewBody: {
    alignItems: "flex-start",
    backgroundColor: "steelblue",
    flex: 1,
    height: "100%",
    justifyContent: "flex-start",
    paddingTop: 35 ,
    width: '100%',
    textAlign:"center"
  },
  viewHeader: {
    backgroundColor: "skyblue",
    flex: 0.9,
    width: '100%',
    flexDirection: 'row',
    fontSize:15
  },
  viewTitle: {fontSize:30,paddingLeft:120},
  viewMain: {
    flex: 7,
    backgroundColor: "powderblue",
    width: '100%'
  },
  viewDetails: {
    flex: 1,
    backgroundColor: "skyblue",
    height: '100%',
    width: '100%',
    flexDirection: 'row',
  },
  viewDetailsSection: {
    paddingTop: 20,
    fontSize: 15,
    textAlign: "center",
    borderWidth: 1,
    flex: 1
  },
  viewFooter: {
    flex: 1,
    backgroundColor: "steelblue",
    height: '100%',
    width: '100%',
    flexDirection: 'row',
  },
  viewFooterSection: {
    fontSize: 15,
    textAlign: "center",
    flex: 1,
    borderWidth: 1,
    paddingTop: 20  
  }
});
