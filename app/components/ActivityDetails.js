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
import * as shape from "d3-shape";

const { height } = Dimensions.get("window");

const ActivityDetails = ({
  info,
  heart,
  limitedSteps,
  steps,
  limitedDistance,
  limitedCalories,
  poolLengths,
  calories,
  paceDataArray,
  heightIncreaseDataArray,
  speedDataArray,
  heartBeatDataArray,
  activityType
}) => {
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
                  progress={distance / Number(limitedDistance)}
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
                    <Text style={styles.distance}>{global.distance} km</Text>
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
                  data={paceDataArray}
                  curve={shape.curveMonotoneX}
                  svg={{ stroke: "rgb(35, 35, 35)", strokeWidth: 3 }}
                  contentInset={{ top: 20, bottom: 20 }}
                />
                <Text style={styles.avg_pace}> {global.pace} min/km</Text>
              </View>
            </View>
            {limitedSteps != "" ? (
              <View style={styles.inner_container}>
                <View style={styles.inner_top_container}>
                  <Text style={styles.steps_label}>Kroki</Text>
                </View>
                <View style={styles.inner_bottom_container}>
                  <ProgressCircle
                    progress={steps / Number(limitedSteps)}
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
                      <Text style={styles.steps}>{steps}</Text>
                    </View>
                  </ProgressCircle>
                </View>
              </View>
            ) : null}
            {activityType == 1 ? (
              <View style={styles.inner_inner_container}>
                <View style={styles.inner_inner_top_container}>
                  <View style={styles.inner_inner_top_top_container}>
                    <Text style={styles.steps_label}>Najlepsza prędkość</Text>
                  </View>
                  <View style={styles.inner_inner_bottom_bottom_container}>
                    <View style={styles.progress_circle_container}>
                      <Text style={styles.steps}>{global.max_speed} km/h</Text>
                    </View>
                  </View>
                </View>
                <View style={styles.inner_inner_top_container}>
                  <View style={styles.inner_inner_top_top_container}>
                    <Text style={styles.steps_label}>Najlepsze tempo</Text>
                  </View>
                  <View style={styles.inner_inner_bottom_bottom_container}>
                    <View style={styles.progress_circle_container}>
                      <Text style={styles.steps}>{global.max_pace} min/km</Text>
                    </View>
                  </View>
                </View>
              </View>
            ) : null}
            {activityType == 2 ? (
              <View style={styles.inner_container}>
                <View style={styles.inner_top_container}>
                  <Text style={styles.steps_label}>Długości basenów</Text>
                </View>
                <View style={styles.inner_bottom_container}>
                  <ProgressCircle
                    progress={
                      distance / Number((limitedDistance * 1000) / poolLengths)
                    }
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
                      <Text style={styles.steps}>
                        {parseFloat(Number(distance / poolLengths)).toFixed(1)}
                      </Text>
                    </View>
                  </ProgressCircle>
                </View>
              </View>
            ) : null}
            <View style={styles.inner_container}>
              <View style={styles.inner_top_container}>
                <Text style={styles.calories_label}>Kalorie</Text>
              </View>
              <View style={styles.inner_bottom_container}>
                <ProgressCircle
                  progress={calories / Number(limitedCalories)}
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
                    <Text style={styles.calories}> {calories} cal</Text>
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
                  data={heightIncreaseDataArray}
                  curve={shape.curveMonotoneX}
                  svg={{ stroke: "rgb(35, 35, 35)", strokeWidth: 3 }}
                  contentInset={{ top: 20, bottom: 20 }}
                />
                <Text style={styles.height_increase}>
                  {parseFloat(global.altitude).toFixed(2)} m
                </Text>
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
                  curve={shape.curveMonotoneX}
                  svg={{ stroke: "rgb(35, 35, 35)", strokeWidth: 3 }}
                  contentInset={{ top: 20, bottom: 20 }}
                />
                <Text style={styles.speed}>{global.speed} km/h </Text>
              </View>
            </View>
            <View style={styles.inner_container_heart_beat}>
              <View style={styles.inner_top_container_heart_beat}>
                <View style={styles.inner_top_left_container_heart_beat}>
                  <Icon name="heart" size={50} color="rgba(0, 0, 0, 0.6)" />
                </View>
                <View style={styles.inner_top_right_container_heart_beat}>
                  <View style={styles.heart_beat_container}>
                    <Text style={styles.heart_beat}>
                      {heart == 0 || heart == null ? "--" : heart}
                    </Text>
                    <Text style={styles.heart_beat_label}>bpm</Text>
                  </View>
                </View>
              </View>
              <View style={styles.inner_bottom_container_heart_beat}>
                <LineChart
                  style={{ height: 100, width: 250 }}
                  data={heartBeatDataArray}
                  curve={shape.curveMonotoneX}
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
  inner_inner_container: {
    width: "39%",
    height: 190,
    marginHorizontal: 10,
    marginVertical: 10,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 15,
    zIndex: 1
  },
  inner_inner_top_container: {
    width: "100%",
    height: 80,
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
  inner_inner_top_top_container: {
    width: "100%",
    height: "30%",
    alignItems: "center"
  },
  inner_inner_bottom_bottom_container: {
    width: "100%",
    height: "70%",
    justifyContent: "center",
    alignItems: "center"
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
