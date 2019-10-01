import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Dimensions,
  ActivityIndicator,
  ScrollView
} from "react-native";
import {
  BallIndicator,
  BarIndicator,
  DotIndicator,
  MaterialIndicator,
  PacmanIndicator,
  PulseIndicator,
  SkypeIndicator,
  UIActivityIndicator,
  WaveIndicator
} from "react-native-indicators";
import { DrawerActions } from "react-navigation";
import LinearGradient from "react-native-linear-gradient";
import Icon from "react-native-vector-icons/Entypo";

import { activityTypesIcon } from "./utils/ActivityTypes";

const { width, height } = Dimensions.get("window");

export default class ActivityHistory extends Component {
  constructor() {
    super();

    this.state = {
      isLoading: true,
      dataSource: []
    };
  }

  componentDidMount() {
    fetch("http://192.168.0.3/smartActivity/activity_history.php", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        username: "jasiu1047"
      })
    })
      .then(response => response.json())
      .then(responseJson => {
        this.setState(
          {
            isLoading: false,
            dataSource: responseJson
          },
          function() {}
        );
      })
      .catch(error => {
        console.error(error);
      });
  }

  render() {
    if (this.state.isLoading) {
      return (
        <LinearGradient
          colors={["rgba(0,0,0,0.3)", "transparent"]}
          style={{
            position: "absolute",
            left: 0,
            right: 0,
            top: 0,
            height: "100%"
          }}
        >
          <View
            style={{
              flex: 1,
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center"
            }}
          >
            <MaterialIndicator size={60} color="#000000" />
          </View>
        </LinearGradient>
      );
    }
    return (
      <LinearGradient
        colors={["rgba(0,0,0,0.3)", "transparent"]}
        style={{
          position: "absolute",
          left: 0,
          right: 0,
          top: 0,
          height: "100%"
        }}
      >
        <View style={styles.container}>
          <TouchableOpacity
            onPress={() =>
              this.props.navigation.dispatch(DrawerActions.openDrawer())
            }
            style={styles.menu_open}
          >
            <Image
              style={styles.menu_button}
              source={require("../../assets/images/icons/menu.png")}
            />
          </TouchableOpacity>
          <View style={styles.history_container}>
            <ScrollView>
              {this.state.dataSource.map(items => (
                <View style={styles.history_inner_container}>
                  <View style={styles.history_inner_right_container}>
                    <View style={styles.history_inner_top_container}>
                      <Image
                        source={activityTypesIcon[items.type].icon}
                        style={styles.activity_image}
                      />
                      <Text style={styles.activity_header}>{items.name}</Text>
                    </View>
                    <View style={styles.history_inner_middle_container}>
                      <View
                        style={styles.history_inner_bottom_left_container}
                      />
                      <View style={styles.history_inner_bottom_right_container}>
                        <View
                          style={
                            styles.history_inner_bottom_right_top_container
                          }
                        >
                          <Text style={styles.history_inner_label}>Czas</Text>
                        </View>
                        <View
                          style={
                            styles.history_inner_bottom_right_bottom_container
                          }
                        >
                          <View
                            style={
                              styles.history_inner_bottom_right_top_bottom_left_container
                            }
                          >
                            <Text style={styles.history_inner_value}>
                              {items.time}{" "}
                              <Text style={styles.history_inner_prefix}>h</Text>
                            </Text>
                          </View>
                        </View>
                      </View>
                      <View style={styles.activity_history_distance_container}>
                        <View
                          style={
                            styles.history_inner_bottom_right_top_container
                          }
                        >
                          <Text style={styles.history_inner_label}>
                            Dystans
                          </Text>
                        </View>
                        <View
                          style={
                            styles.history_inner_bottom_right_bottom_container
                          }
                        >
                          <View
                            style={
                              styles.history_inner_bottom_right_top_bottom_left_container
                            }
                          >
                            <Text style={styles.history_inner_value}>
                              {items.distance}{" "}
                              <Text style={styles.history_inner_prefix}>
                                Km
                              </Text>
                            </Text>
                          </View>
                        </View>
                      </View>
                      <View style={styles.activity_history_calories_container}>
                        <View
                          style={
                            styles.history_inner_bottom_right_top_container
                          }
                        >
                          <Text style={styles.history_inner_label}>
                            Kalorie
                          </Text>
                        </View>
                        <View
                          style={
                            styles.history_inner_bottom_right_bottom_container
                          }
                        >
                          <View
                            style={
                              styles.history_inner_bottom_right_top_bottom_left_container
                            }
                          >
                            <Text style={styles.history_inner_value}>
                              {items.calories}{" "}
                              <Text style={styles.history_inner_prefix}>C</Text>
                            </Text>
                          </View>
                        </View>
                      </View>
                    </View>
                    <TouchableOpacity>
                      <View style={styles.history_inner_bottom_container}>
                        <Icon
                          name="dots-three-horizontal"
                          style={styles.icon}
                          size={21}
                        />
                      </View>
                    </TouchableOpacity>
                  </View>
                </View>
              ))}
            </ScrollView>
          </View>
        </View>
      </LinearGradient>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "transparent"
  },
  history_container: {
    marginTop: 140,
    width: "100%",
    height: "100%",
    alignItems: "center",
    backgroundColor: "transparent",
    paddingBottom: Dimensions.get("window").height * 0.1
  },
  history_inner_container: {
    width: Dimensions.get("window").width * 0.85,
    height: 140,
    marginHorizontal: 10,
    marginVertical: 15,
    flexDirection: "row",
    backgroundColor: "rgba(0,0,0,0.05)",
    borderRadius: 4,
    zIndex: 1,
    paddingVertical: 15,
    paddingHorizontal: 10
  },
  history_inner_right_container: {
    width: "100%",
    height: "100%",
    flexDirection: "column"
  },
  history_inner_top_container: {
    width: "100%",
    height: "21%",
    paddingHorizontal: "-3%",
    flexDirection: "row"
  },
  history_inner_bottom_container: {
    width: "100%",
    height: "20%",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column"
  },
  history_inner_middle_container: {
    width: "100%",
    height: "70%",
    flexDirection: "row",
    paddingVertical: "5%"
  },
  history_inner_bottom_left_container: {
    width: "1%",
    height: "100%",
    borderRightWidth: 0.5,
    borderRightColor: "rgba(0,0,0,0.5)",
    marginRight: 20
  },
  history_inner_bottom_right_container: {
    width: "45%",
    height: "70%",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column"
  },
  history_inner_bottom_right_top_container: {
    width: "100%",
    height: "30%",
    justifyContent: "flex-end",
    paddingVertical: 10
  },
  history_inner_bottom_right_bottom_container: {
    width: "100%",
    height: "60%",
    flexDirection: "row"
  },
  history_inner_bottom_right_top_bottom_left_container: {
    width: "100%",
    height: "100%",
    justifyContent: "flex-end"
  },
  history_inner_label: {
    fontFamily: "Quicksand-Light",
    color: "#777777",
    fontSize: 16
  },
  history_inner_value: {
    fontFamily: "Quicksand-Light",
    color: "#000000",
    fontSize: 32,
    fontWeight: "200"
  },
  history_inner_prefix: {
    fontFamily: "Quicksand-Light",
    color: "#777777",
    fontSize: 16
  },
  activity_image: {
    height: 20,
    width: 20
  },
  activity_header: {
    fontFamily: "Quicksand-Bold",
    color: "rgba(0,0,0,0.5)",
    fontSize: 13,
    marginLeft: 10
  },
  activity_history_distance_container: {
    width: "25%",
    height: "70%",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column"
  },
  activity_history_calories_container: {
    width: "35%",
    height: "70%",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column"
  },
  icon: {},
  menu_button: {
    width: 25,
    height: 25,
    zIndex: 2
  },
  menu_open: {
    position: "absolute",
    width: 40,
    height: 40,
    left: 10,
    top: 30,
    borderRadius: 50,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "transparent",
    zIndex: 1
  }
});
