import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  ScrollView,
  SafeAreaView,
  StatusBar,
  Dimensions
} from "react-native";
import { ProgressCircle, LineChart } from "react-native-svg-charts";
import Icon from "react-native-vector-icons/FontAwesome";
import Toast from "@remobile/react-native-toast";

const { height } = Dimensions.get("window");

const ActivityDetails = ({
  info,
  steps,
  distance,
  speed,
  distanceDataArray,
  speedDataArray,
  calories
}) => {
  const data = [
    distance,
    10,
    40,
    95,
    -4,
    -24,
    85,
    91,
    35,
    53,
    -53,
    24,
    50,
    -20,
    -80
  ];
  return (
    <ScrollView>
      <View style={styles.container}>
        <View style={styles.top_container}>
          <View style={styles.activity_details}>
            <View style={styles.inner_container}>
              <View style={styles.inner_top_container}>
                <Text style={styles.distance_label}>Dystans</Text>
              </View>
              <View style={styles.inner_bottom_container}>
                <ProgressCircle
                  progress={0.7}
                  progressColor={"rgb(35, 35, 35)"}
                  strokeWidth={7}
                  style={{
                    height: 100,
                    width: 100,
                    flexDirection: "row",
                    justifyContent: "center",
                    alignItems: "center"
                  }}
                >
                  <View style={styles.progress_circle_container}>
                    <Text style={styles.distance}>{distance} m</Text>
                  </View>
                </ProgressCircle>
              </View>
            </View>
            <View style={styles.inner_container}>
              <View style={styles.inner_top_container}>
                <Text style={styles.avg_pace_label}>Śr. Tempo</Text>
              </View>
              <View style={styles.inner_bottom_container}>
                <LineChart
                  style={{ height: 100, width: 100 }}
                  data={data}
                  svg={{ stroke: "rgb(35, 35, 35)", strokeWidth: 3 }}
                  contentInset={{ top: 20, bottom: 20 }}
                />
                <Text style={styles.avg_pace}> {info} min/km</Text>
              </View>
            </View>
            <View style={styles.inner_container}>
              <View style={styles.inner_top_container}>
                <Text style={styles.steps_label}>Kroki</Text>
              </View>
              <View style={styles.inner_bottom_container}>
                <ProgressCircle
                  progress={steps / 6500}
                  progressColor={"rgb(35, 35, 35)"}
                  strokeWidth={7}
                  style={{
                    height: 100,
                    width: 100,
                    flexDirection: "row",
                    justifyContent: "center",
                    alignItems: "center"
                  }}
                >
                  <View style={styles.progress_circle_container}>
                    <Text style={styles.steps}>{steps} </Text>
                  </View>
                </ProgressCircle>
              </View>
            </View>
            <View style={styles.inner_container}>
              <View style={styles.inner_top_container}>
                <Text style={styles.calories_label}>Kalorie</Text>
              </View>
              <View style={styles.inner_bottom_container}>
                <ProgressCircle
                  progress={calories / 500}
                  progressColor={"rgb(35, 35, 35)"}
                  strokeWidth={7}
                  style={{
                    height: 100,
                    width: 100,
                    flexDirection: "row",
                    justifyContent: "center",
                    alignItems: "center"
                  }}
                >
                  <View style={styles.progress_circle_container}>
                    <Text style={styles.calories}>{calories} C </Text>
                  </View>
                </ProgressCircle>
              </View>
            </View>
            <View style={styles.inner_container}>
              <View style={styles.inner_top_container}>
                <Text style={styles.height_increase_label}>
                  Wzrost wysokości
                </Text>
              </View>
              <View style={styles.inner_bottom_container}>
                <LineChart
                  style={{ height: 100, width: 100 }}
                  data={distanceDataArray}
                  svg={{ stroke: "rgb(35, 35, 35)", strokeWidth: 3 }}
                  contentInset={{ top: 20, bottom: 20 }}
                />
                <Text style={styles.height_increase}>{steps} </Text>
              </View>
            </View>
            <View style={styles.inner_container}>
              <View style={styles.inner_top_container}>
                <Text style={styles.speed_label}>Prędkość</Text>
              </View>
              <View style={styles.inner_bottom_container}>
                <LineChart
                  style={{ height: 100, width: 100 }}
                  data={speedDataArray}
                  svg={{ stroke: "rgb(35, 35, 35)", strokeWidth: 3 }}
                  contentInset={{ top: 20, bottom: 20 }}
                />
                <Text style={styles.speed}>{distance / 1000} km/h </Text>
              </View>
            </View>
            <View style={styles.inner_container_heart_beat}>
              <View style={styles.inner_top_container_heart_beat}>
                <View style={styles.inner_top_left_container_heart_beat}>
                  <Icon name="heart" size={50} color="rgba(0, 0, 0, 0.6)" />
                </View>
                <View style={styles.inner_top_right_container_heart_beat}>
                  <View style={styles.heart_beat_container}>
                    <Text style={styles.heart_beat}>129</Text>
                    <Text style={styles.heart_beat_label}>bpm</Text>
                  </View>
                </View>
              </View>
              <View style={styles.inner_bottom_container_heart_beat}>
                <LineChart
                  style={{ height: 100, width: 250 }}
                  data={data}
                  svg={{ stroke: "rgb(35, 35, 35)", strokeWidth: 3 }}
                  contentInset={{ top: 20, bottom: 20 }}
                />
              </View>
            </View>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "transparent"
  },
  top_container: {
    width: Dimensions.get("window").width,
    height: 1000,
    backgroundColor: "transparent",
    flexDirection: "row",
    justifyContent: "center",
    paddingVertical: 30
  },
  activity_details: {
    position: "relative",
    height: "90%",
    width: "90%",
    flexWrap: "wrap",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "transparent"
  },
  inner_container: {
    width: "39%",
    height: 190,
    marginHorizontal: 10,
    marginVertical: 10,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 15,
    paddingVertical: 10,
    paddingHorizontal: 10,
    backgroundColor: "rgba(0,0,0,0.1)",
    zIndex: 1
  },
  inner_container_heart_beat: {
    width: "85%",
    height: 200,
    marginHorizontal: 10,
    marginVertical: 10,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 15,
    paddingVertical: 10,
    paddingHorizontal: 10,
    backgroundColor: "rgba(0,0,0,0.1)",
    zIndex: 1
  },
  inner_top_container_heart_beat: {
    width: "100%",
    height: "40%",
    flexWrap: "nowrap",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center"
  },
  heart_beat_container: {
    width: "70%",
    height: "70%",
    justifyContent: "center",
    alignItems: "center"
  },
  inner_top_left_container_heart_beat: {
    width: "50%",
    height: "100%",
    alignItems: "center",
    justifyContent: "center"
  },
  inner_top_right_container_heart_beat: {
    width: "50%",
    height: "100%",
    alignItems: "center",
    justifyContent: "center"
  },
  inner_bottom_container_heart_beat: {
    width: "100%",
    height: "60%",
    justifyContent: "center",
    alignItems: "center"
  },
  inner_top_container: {
    width: "100%",
    height: "30%",
    alignItems: "center"
  },
  inner_bottom_container: {
    width: "100%",
    height: "70%",
    justifyContent: "center",
    alignItems: "center"
  },
  progress_circle_container: {
    justifyContent: "center",
    alignItems: "center",
    zIndex: 2
  },
  distance: {
    fontFamily: "Quicksand-Light",
    color: "#000000",
    fontSize: 15
  },
  avg_pace: {
    fontFamily: "Quicksand-Light",
    color: "#000000",
    fontSize: 15,
    justifyContent: "center",
    alignItems: "center",
    zIndex: 2
  },
  height_increase: {
    fontFamily: "Quicksand-Light",
    color: "#000000",
    fontSize: 15,
    justifyContent: "center",
    alignItems: "center",
    zIndex: 2
  },
  calories: {
    fontFamily: "Quicksand-Light",
    color: "#000000",
    fontSize: 15
  },
  steps: {
    fontFamily: "Quicksand-Light",
    color: "#000000",
    fontSize: 15
  },
  speed: {
    fontFamily: "Quicksand-Light",
    color: "#000000",
    fontSize: 15
  },
  distance_label: {
    fontFamily: "Quicksand-Light",
    color: "#000000",
    fontSize: 13,
    zIndex: 2
  },
  avg_pace_label: {
    fontFamily: "Quicksand-Light",
    color: "#000000",
    fontSize: 13
  },
  height_increase_label: {
    fontFamily: "Quicksand-Light",
    color: "#000000",
    fontSize: 13
  },
  calories_label: {
    fontFamily: "Quicksand-Light",
    color: "#000000",
    fontSize: 13
  },
  steps_label: {
    fontFamily: "Quicksand-Light",
    color: "#000000",
    fontSize: 13
  },
  speed_label: {
    fontFamily: "Quicksand-Light",
    color: "#000000",
    fontSize: 13
  },
  heart_beat_label: {
    fontFamily: "Quicksand-Light",
    color: "#000000",
    fontSize: 16
  },
  heart_beat: {
    fontFamily: "Quicksand-Bold",
    color: "#000000",
    fontSize: 35
  }
});

export default ActivityDetails;
