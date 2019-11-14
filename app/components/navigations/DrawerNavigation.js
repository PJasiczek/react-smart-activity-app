import React, { Component } from "react";
import { View, Text } from "react-native";
import { createDrawerNavigator, createAppContainer } from "react-navigation";

import Profile from "../Profile";
import MyActivity from "../MyActivity";
import ActivityMap from "../ActivityMap";
import ActivityInfo from "../ActivityInfo";
import ActivityHistory from "../ActivityHistory";
import Map from "../Map";
import Settings from "../Settings";
import CreateAccount from "../CreateAccount";
import ModifyProfile from "../ModifyProfile";
import ActivityParamsCycling from "../ActivityParamsCycling";
import ActivityParamsSwimming from "../ActivityParamsSwimming";
import ActivityParamsRunning from "../ActivityParamsRunning";
import ActivityParamsWalking from "../ActivityParamsWalking";

import DrawerComponent from "./DrawerComponent";

const NavigationStack = createDrawerNavigator(
  {
    Profile: {
      screen: props => (
        <Profile navigation={props.navigation} id={props.screenProps.id} />
      )
    },
    MyActivity: {
      screen: props => (
        <MyActivity navigation={props.navigation} id={props.screenProps.id} />
      )
    },
    ActivityMap: { screen: ActivityMap },
    ActivityInfo: { screen: ActivityInfo },
    ActivityHistory: {
      screen: props => (
        <ActivityHistory
          navigation={props.navigation}
          id={props.screenProps.id}
        />
      )
    },
    Map: { screen: Map },
    Settings: { screen: Settings },
    CreateAccount: { screen: CreateAccount },
    ModifyProfile: { screen: ModifyProfile },
    ActivityParamsCycling: { screen: ActivityParamsCycling },
    ActivityParamsSwimming: { screen: ActivityParamsSwimming },
    ActivityParamsRunning: { screen: ActivityParamsRunning },
    ActivityParamsWalking: { screen: ActivityParamsWalking }
  },
  {
    contentComponent: props => (
      <DrawerComponent
        navigation={props.navigation}
        id={props.screenProps.id}
      />
    ),
    drawerBackgroundColor: "rgba(255,255,255,0.7)"
  }
);

const DrawerNavigation = createAppContainer(NavigationStack);

export default DrawerNavigation;
