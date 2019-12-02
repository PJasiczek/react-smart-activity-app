import "react-native";
import React from "react";
import renderer from "react-test-renderer";
import ActivityInfo from "../app/components/ActivityInfo";

it("Api test case", async function() {
  expect(ActivityInfo.fetchWeather).toEqual(true);
});
