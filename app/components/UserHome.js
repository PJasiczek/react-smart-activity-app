import React, { Component } from "react";
import { Platform, StyleSheet, Text, View } from "react-native";

import DrawerNavigation from "./navigations/DrawerNavigation";

export default class UserHome extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      header: null
    };
  };
  render() {
    return <DrawerNavigation />;
  }
}
