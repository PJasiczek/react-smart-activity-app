import React, { Component } from "react";
import { Platform, StyleSheet, Text, View } from "react-native";

import DrawerNavigation from "./navigations/DrawerNavigation";

export default class UserHome extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      header: null
    };
  };

  constructor(props) {
    super(props);
    this.state = {
      id: this.props.navigation.state.params.id
    };
  }

  render() {
    return <DrawerNavigation screenProps={{ id: this.state.id }} />;
  }
}
