import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Dimensions,
  ScrollView
} from "react-native";
import { DrawerActions } from "react-navigation";
import LinearGradient from "react-native-linear-gradient";

const { width, height } = Dimensions.get("window");

export default class ActivityHistory extends Component {
  render() {
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
          <View style={styles.top_container}>
            <View style={styles.top_inner_container} />
          </View>
          <View style={styles.header_container}>
            <Text style={styles.bottom_header}>Ostatnie trenigni</Text>
          </View>
          <View style={styles.bottom_container}>
            <ScrollView>
              <View style={styles.bottom_inner_container} />
              <View style={styles.bottom_inner_container} />
              <View style={styles.bottom_inner_container} />
              <View style={styles.bottom_inner_container} />
              <View style={styles.bottom_inner_container} />
              <View style={styles.bottom_inner_container} />
              <View style={styles.bottom_inner_container} />
              <View style={styles.bottom_inner_container} />
              <View style={styles.bottom_inner_container} />
              <View style={styles.bottom_inner_container} />
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
  top_container: {
    flex: 1,
    position: "relative",
    width: "100%",
    height: "43%",
    alignItems: "center",
    backgroundColor: "transparent"
  },
  header_container: {
    width: "100%",
    height: "5%",
    justifyContent: "center",
    paddingHorizontal: 20
  },
  bottom_container: {
    width: "100%",
    height: "52%",
    alignItems: "center",
    backgroundColor: "transparent"
  },
  bottom_header: {
    fontFamily: "Quicksand-Bold",
    color: "#777777",
    fontSize: 15
  },
  top_inner_container: {
    width: "85%",
    height: "65%",
    marginTop: 90,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 10,
    backgroundColor: "rgba(0,0,0,0.1)",
    zIndex: 1
  },
  bottom_inner_container: {
    width: Dimensions.get("window").width * 0.85,
    height: 40,
    marginHorizontal: 10,
    marginVertical: 7,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 4,
    paddingVertical: 10,
    paddingHorizontal: 10,
    backgroundColor: "rgba(255,255,255,1)",
    zIndex: 1
  },
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
