import React, { Component } from "react";
import { View, Text } from "react-native";
import { createDrawerNavigator, createAppContainer } from "react-navigation";

import Profile from "../Profile";
import MyActivity from "../MyActivity";
import Map from "../Map";
import ActivityInfo from "../ActivityInfo";
import Settings from "../Settings";
import CreateAccount from "../CreateAccount";

import DrawerComponent from "./DrawerComponent";

const NavigationStack = createDrawerNavigator(
  {
    Profile: { screen: Profile },
    MyActivity: { screen: MyActivity },
    Map: { screen: Map },
    ActivityInfo: { screen: ActivityInfo },
    Settings: { screen: Settings },
    CreateAccount: { screen: CreateAccount }
  },
  {
    contentComponent: DrawerComponent,
    drawerBackgroundColor: "rgba(255,255,255,0.7)"
  }
);

const DrawerNavigation = createAppContainer(NavigationStack);

export default DrawerNavigation;
