import React, { Component } from "react";
import { View, Text } from "react-native";
import { createDrawerNavigator, createAppContainer } from "react-navigation";

import Profile from "../Profile";
import MyActivity from "../MyActivity";
import Map from "../Map";
import ActivityMap from "../ActivityMap";
import ActivityInfo from "../ActivityInfo";
import ActivityHistory from "../ActivityHistory";
import Settings from "../Settings";
import Bluetooth from "../Bluetooth";
import CreateAccount from "../CreateAccount";
import ModifyProfile from "../ModifyProfile";

import DrawerComponent from "./DrawerComponent";

const NavigationStack = createDrawerNavigator(
  {
    Profile: { screen: Profile },
    MyActivity: { screen: MyActivity },
    Map: { screen: Map },
    ActivityMap: { screen: ActivityMap },
    ActivityInfo: { screen: ActivityInfo },
    ActivityHistory: { screen: ActivityHistory },
    Settings: { screen: Settings },
    Bluetooth: { screen: Bluetooth },
    CreateAccount: { screen: CreateAccount },
    ModifyProfile: { screen: ModifyProfile }
  },
  {
    contentComponent: DrawerComponent,
    drawerBackgroundColor: "rgba(255,255,255,0.7)"
  }
);

const DrawerNavigation = createAppContainer(NavigationStack);

export default DrawerNavigation;
