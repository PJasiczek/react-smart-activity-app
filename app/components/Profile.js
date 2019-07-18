import React, { Component } from "react";
import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import { DrawerActions } from "react-navigation";
import Icon from "react-native-vector-icons/Ionicons";
import Icon1 from "react-native-vector-icons/MaterialCommunityIcons";
import moment from "moment";

export default class Profile extends Component {
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.top_container}>
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
          <TouchableOpacity
            onPress={() => this.props.navigation.navigate("Settings")}
            style={styles.settings_button}
          >
            <Icon1 name="settings" size={20} />
          </TouchableOpacity>
          <View style={styles.icon_container}>
            <Image
              style={styles.icon}
              source={require("../../assets/images/Profil_icon.png")}
            />
          </View>

          <Text style={styles.header}>Piotr Jasiczek</Text>
          <Text style={styles.pre_header}>Świdnica</Text>
        </View>
        <View style={styles.border_bottom} />
        <View style={styles.bottom_container} />
      </View>
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
    width: "100%",
    height: "40%",
    alignItems: "center",
    padding: 20,
    backgroundColor: "transparent"
  },
  border_bottom: {
    width: "100%",
    height: 0,
    borderBottomColor: "rgba(152,152,152,0.3)",
    borderBottomWidth: 1,
    transform: [{ rotate: "10deg" }]
  },
  bottom_container: {
    width: "100%",
    height: "60%",
    backgroundColor: "transparent"
  },
  icon_container: {
    marginTop: 20,
    width: 100,
    height: 100,
    borderRadius: 50,
    borderColor: "rgba(152,152,152,0.3)",
    borderWidth: 3
  },
  icon: {
    flex: 1,
    width: null,
    alignSelf: "stretch",
    borderRadius: 50,
    borderColor: "#ffffff",
    borderWidth: 4
  },
  header: {
    marginTop: 10,
    fontFamily: "Quicksand-Bold",
    color: "#000000",
    fontSize: 17
  },
  pre_header: {
    fontFamily: "Quicksand-Light",
    color: "#777777",
    fontSize: 14
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
  },
  settings_button: {
    position: "absolute",
    width: 40,
    height: 40,
    right: 10,
    top: 33,
    borderRadius: 50,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "transparent",
    zIndex: 1
  }
});
