import React from "react";
import { View, Text, StyleSheet, Image, Dimensions } from "react-native";
import PropTypes from "prop-types";
import Icon from "react-native-vector-icons/Ionicons";

import { weatherConditions } from "./utils/WeatherConditions";

const WeatherInfo = ({
  id,
  weatherCondition,
  temperature,
  tempMin,
  tempMax,
  wind,
  visibility,
  direction,
  cloudy,
  humidity,
  pressure,
  isDay
}) => {
  return (
    <View style={styles.container}>
      <View style={styles.top_container}>
        <View style={styles.weather_container}>
          <View style={styles.weather_condition_container}>
            <View style={styles.weather_top_container}>
              {isDay == 0 ? (
                <Image
                  source={weatherConditions[id].icon_night}
                  style={{ width: 125, height: 125 }}
                />
              ) : (
                <Image
                  source={weatherConditions[id].icon_day}
                  style={{ width: 125, height: 125 }}
                />
              )}
            </View>
            <Text style={styles.weather_temperature}>{temperature} °C</Text>
          </View>
        </View>
        <View style={styles.weather_temperature_container}>
          <View style={styles.weather_max_min_temperature_container}>
            <Text style={styles.weather_max_temperature}>{tempMax} °C</Text>
            <View style={styles.border_max_min_temperature} />
            <Text style={styles.weather_min_temperature}>{tempMin} °C</Text>
          </View>
        </View>
      </View>
      <View style={styles.bottom_container}>
        <View style={styles.weather_details}>
          <View style={styles.border_bottom} />
          <View style={styles.inner_container}>
            <Image
              style={styles.icon}
              source={require("../../assets/images/icons/breeze.png")}
            />
            <Text style={styles.inner_label}>Wiatr</Text>
            <Text style={styles.inner_text}>{wind} m/s</Text>
          </View>
          <View style={styles.inner_container}>
            <Image
              style={styles.icon}
              source={require("../../assets/images/icons/visible-status.png")}
            />
            <Text style={styles.inner_label}>Widoczność</Text>
            <Text style={styles.inner_text}>
              {visibility ? (
                <Text>{visibility / 1000} km</Text>
              ) : (
                <Text>N/A</Text>
              )}
            </Text>
          </View>
          <View style={styles.inner_container}>
            <Image
              style={styles.icon}
              source={require("../../assets/images/icons/direction.png")}
            />
            <Text style={styles.inner_label}>Kierunek</Text>
            <Text style={styles.inner_text}>
              {direction == 0 ? (
                <Text style={styles.inner_text}>N</Text>
              ) : direction < 90 ? (
                <Text style={styles.inner_text}>NE</Text>
              ) : direction == 90 ? (
                <Text style={styles.inner_text}>E</Text>
              ) : direction > 90 && direction < 180 ? (
                <Text style={styles.inner_text}>SE</Text>
              ) : direction == 180 ? (
                <Text style={styles.inner_text}>S</Text>
              ) : direction > 180 && direction < 270 ? (
                <Text style={styles.inner_text}>SW</Text>
              ) : direction == 270 ? (
                <Text style={styles.inner_text}>W</Text>
              ) : direction > 270 && direction < 360 ? (
                <Text style={styles.inner_text}>NW</Text>
              ) : (
                <Text style={styles.inner_text}>N/A</Text>
              )}
            </Text>
          </View>
          <View style={styles.inner_container}>
            <Image
              style={styles.icon}
              source={require("../../assets/images/icons/cloudy.png")}
            />
            <Text style={styles.inner_label}>Zachmurzenie</Text>
            <Text style={styles.inner_text}>{cloudy} %</Text>
          </View>
          <View style={styles.inner_container}>
            <Image
              style={styles.icon}
              source={require("../../assets/images/icons/humidity.png")}
            />
            <Text style={styles.inner_label}>Wilgotność</Text>
            <Text style={styles.inner_text}>{humidity}%</Text>
          </View>
          <View style={styles.inner_container}>
            <Image
              style={styles.icon}
              source={require("../../assets/images/icons/barometer.png")}
            />
            <Text style={styles.inner_label}>Ciśnienie</Text>
            <Text style={styles.inner_text}>{pressure} hPa</Text>
          </View>
        </View>
      </View>
    </View>
  );
};

WeatherInfo.propTypes = {
  temperature: PropTypes.number.isRequired,
  weather: PropTypes.string
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "transparent"
  },
  top_container: {
    flex: 1,
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
    flexWrap: "wrap",
    backgroundColor: "transparent",
    marginTop: 100
  },
  weather_container: {
    width: "60%",
    height: "100%",
    flexDirection: "row",
    backgroundColor: "transparent",
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 30
  },
  weather_top_container: {
    width: 145,
    height: 145,
    flexWrap: "wrap",
    justifyContent: "center",
    alignItems: "center"
  },
  weather_condition_container: {
    width: "90%",
    height: "90%",
    justifyContent: "center",
    backgroundColor: "transparent"
  },
  weather_temperature_container: {
    flex: 3,
    width: "40%",
    height: "100%",
    backgroundColor: "transparent",
    borderColor: "transparent",
    borderWidth: 1
  },
  weather_max_min_temperature_container: {
    position: "absolute",
    width: "70%",
    height: "30%",
    bottom: 0,
    left: 0,
    alignItems: "center",
    justifyContent: "center"
  },
  border_max_min_temperature: {
    width: "90%",
    height: 0,
    alignItems: "center",
    justifyContent: "center",
    borderBottomColor: "#000000",
    borderBottomWidth: 0.5,
    marginTop: 6
  },
  border_bottom: {
    width: "90%",
    height: 0,
    alignItems: "center",
    justifyContent: "center",
    borderBottomColor: "rgba(152,152,152,0.6)",
    borderBottomWidth: 0.5
  },
  bottom_container: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height * 0.5,
    backgroundColor: "transparent"
  },
  inner_container: {
    width: "27%",
    height: "35%",
    marginHorizontal: 10,
    marginVertical: 10,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 15,
    backgroundColor: "rgba(0,0,0,0.1)"
  },
  weather_details: {
    position: "relative",
    height: "100%",
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    flexWrap: "wrap",
    backgroundColor: "transparent",
    paddingVertical: 20,
    paddingHorizontal: 20
  },
  weather_condition: {
    backgroundColor: "transparent",
    color: "#000000",
    fontFamily: "Quicksand-Light",
    fontSize: 15,
    paddingVertical: 5,
    marginTop: 0
  },
  weather_temperature: {
    color: "#000000",
    fontFamily: "Quicksand-Light",
    fontSize: 50
  },
  weather_condition_icon: {
    color: "#000000",
    fontFamily: "Quicksand-Light",
    fontSize: 75
  },
  inner_text: {
    color: "#000000",
    fontFamily: "Quicksand-Light",
    fontSize: 17,
    paddingVertical: 5
  },
  inner_label: {
    color: "#000000",
    fontFamily: "Quicksand-Light",
    fontSize: 14,
    paddingVertical: 5
  },
  weather_max_temperature: {
    fontFamily: "Quicksand-Light",
    color: "#000000",
    fontSize: 20
  },
  weather_min_temperature: {
    color: "#000000",
    fontFamily: "Quicksand-Light",
    fontSize: 20
  },
  icon: {
    width: 25,
    height: 25,
    zIndex: 2
  }
});

export default WeatherInfo;
