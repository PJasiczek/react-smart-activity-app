import React, { Component } from "react";
import { StyleSheet, Text, View } from "react-native";
import { createStackNavigator, createAppContainer } from "react-navigation";

import Home from "./app/components/Home";
import Login from "./app/components/Login";
import Registration from "./app/components/Registration";
import CreateAccount from "./app/components/CreateAccount";
import UserHome from "./app/components/UserHome";

const Navigation = createStackNavigator({
  Home: {
    screen: Home
  },
  Login: {
    screen: Login
  },
  Registration: {
    screen: Registration
  },
  CreateAccount: {
    screen: CreateAccount
  },
  UserHome: {
    screen: UserHome
  }
});

export default createAppContainer(Navigation);
