import React, { Component } from "react";
import {
  AppRegistry,
  ActivityIndicator,
  ListView,
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  KeyboardAvoidingView,
  ImageBackground,
  ScrollView,
  Dimensions,
  Alert,
  Button,
  TextInput
} from "react-native";
import { HelperText, withTheme, Theme } from "react-native-paper";
import Toast from "@remobile/react-native-toast";
import LinearGradient from "react-native-linear-gradient";
import Icon from "react-native-vector-icons/FontAwesome";
import moment from "moment";

import { activityTypesIcon } from "./utils/ActivityTypes";

const { width, height } = Dimensions.get("window");

export default class ActivityParamsRunning extends Component {
  static navigationOptions = {
    header: null
  };

  constructor(props) {
    super(props);
    this.state = {
      userId: this.props.navigation.state.params.id,
      screenHeight: 0,
      activityType: this.props.navigation.state.params.activityType,
      name: "",
      limitedDistance: "",
      limitedCalories: "",
      limitedSteps: "",
      poolLengths: "",
      errorName: "",
      errorLimitedDistance: "",
      errorLimitedCalories: "",
      errorLimitedSteps: "",
      errorPoolLengths: ""
    };
  }

  NavigateToActivityDetails = () => {
    if (this.state.name != "") {
      if (this.state.limitedDistance != "") {
        if (this.state.limitedCalories != "") {
          if (this.state.limitedSteps != "") {
            this.props.navigation.navigate("ActivityInfo", {
              id: this.state.userId,
              backgroundImageSource: require("../../assets/images/cycling_background_opacity.jpg"),
              activityType: this.state.activityType,
              name: this.state.name,
              limitedDistance: this.state.limitedDistance,
              limitedCalories: this.state.limitedCalories,
              limitedSteps: this.state.limitedSteps,
              poolLengths: this.state.poolLengths
            });
          } else {
            this.setState({
              errorName: this.state.name,
              errorLimitedDistance: this.state.limitedDistance,
              errorLimitedCalories: this.state.limitedCalories,
              errorLimitedSteps: "Proszę wpisać poprawny limit ilości kroków"
            });
          }
        } else {
          this.setState({
            errorName: this.state.name,
            errorLimitedDistance: this.state.limitedDistance,
            errorLimitedCalories: "Proszę wpisać poprawny limit kalorii",
            errorLimitedSteps: this.state.limitedSteps
          });
        }
      } else {
        this.setState({
          errorName: this.state.name,
          errorLimitedDistance: "Proszę wpisać poprawny limit dystansu",
          errorLimitedCalories: this.state.limitedCalories,
          errorLimitedSteps: this.state.limitedSteps
        });
      }
    } else {
      this.setState({
        errorName: "Proszę wpisać poprawną nazwę twojego treningu",
        errorLimitedDistance: this.state.limitedDistance,
        errorLimitedCalories: this.state.limitedCalories,
        errorLimitedSteps: this.state.limitedSteps
      });
    }
  };

  onContentSizeChange = (contentWidth, contentHeight) => {
    this.setState({ screenHeight: contentHeight });
  };

  render() {
    const scrollEnabled = this.state.screenHeight > height;
    const { navigate } = this.props.navigation;

    return (
      <ImageBackground
        source={require("../../assets/images/run_background_opacity.jpg")}
        style={{ flex: 1, width: "100%", height: "100%", opacity: 0.9 }}
      >
        <ScrollView
          scrollEnabled={scrollEnabled}
          onContentSizeChange={this.onContentSizeChange}
        >
          <KeyboardAvoidingView behavior="padding" style={styles.container}>
            <View style={styles.top_container}>
              <View style={styles.profile_icon_container}>
                <Image
                  style={styles.logo}
                  source={activityTypesIcon[this.state.activityType].icon}
                />
              </View>
              <Text style={styles.activity_header}>
                Spersonalizuj swój trening dobierając odpowiednie limity
                przebytego dystansu, ilości kroków oraz wartości kalorycznej
                podczas wykonywanej aktywności.
              </Text>
            </View>
            <View style={styles.bottom_container}>
              <View style={styles.inputs_container}>
                {this.state.errorName !=
                "Proszę wpisać poprawną nazwę twojego treningu" ? (
                  <TextInput
                    placeholder="Nazwa treningu"
                    placeholderTextColor="rgba(0,0,0,0.5)"
                    returKeyType="next"
                    onSubmitEditing={() => this.limitedDistanceInput.focus()}
                    onChangeText={name => this.setState({ name: name })}
                    style={styles.input}
                  />
                ) : (
                  <TextInput
                    placeholder="Nazwa treningu"
                    placeholderTextColor="rgba(255,0,0,1.0)"
                    returKeyType="next"
                    onSubmitEditing={() => this.limitedDistanceInput.focus()}
                    onChangeText={name => this.setState({ name: name })}
                    value={this.state.name}
                    style={styles.input_error}
                  />
                )}
                <HelperText
                  type="error"
                  padding="none"
                  visible={
                    this.state.errorName == "" ||
                    this.state.errorName !=
                      "Proszę wpisać poprawną nazwę twojego treningu"
                      ? false
                      : true
                  }
                >
                  {this.state.errorName}
                </HelperText>
                {this.state.errorLimitedDistance !=
                "Proszę wpisać poprawny limit dystansu" ? (
                  <TextInput
                    placeholder="Limit dystansu (km)"
                    keyboardType="numeric"
                    placeholderTextColor="rgba(0,0,0,0.5)"
                    returKeyType="next"
                    onSubmitEditing={() => this.limitedCaloriesInput.focus()}
                    onChangeText={limitedDistance =>
                      this.setState({ limitedDistance: limitedDistance })
                    }
                    ref={input => (this.limitedDistanceInput = input)}
                    style={styles.input}
                  />
                ) : (
                  <TextInput
                    placeholder="Limit dystansu (km)"
                    keyboardType="numeric"
                    placeholderTextColor="rgba(255,0,0,1.0)"
                    returKeyType="next"
                    onSubmitEditing={() => this.limitedCaloriesInput.focus()}
                    onChangeText={limitedDistance =>
                      this.setState({ limitedDistance: limitedDistance })
                    }
                    ref={input => (this.limitedDistanceInput = input)}
                    value={this.state.limitedDistance}
                    style={styles.input_error}
                  />
                )}
                <HelperText
                  type="error"
                  padding="none"
                  visible={
                    this.state.errorLimitedDistance == "" ||
                    this.state.errorLimitedDistance !=
                      "Proszę wpisać poprawny limit dystansu"
                      ? false
                      : true
                  }
                >
                  {this.state.errorLimitedDistance}
                </HelperText>
                {this.state.errorLimitedCalories !=
                "Proszę wpisać poprawny limit kalorii" ? (
                  <TextInput
                    placeholder="Limit kaloryczny (cal)"
                    keyboardType="numeric"
                    placeholderTextColor="rgba(0,0,0,0.5)"
                    returKeyType="next"
                    onSubmitEditing={() => this.limitedStepsInput.focus()}
                    onChangeText={limitedCalories =>
                      this.setState({ limitedCalories: limitedCalories })
                    }
                    ref={input => (this.limitedCaloriesInput = input)}
                    style={styles.input}
                  />
                ) : (
                  <TextInput
                    placeholder="Limit kaloryczny (cal)"
                    keyboardType="numeric"
                    placeholderTextColor="rgba(255,0,0,1.0)"
                    returKeyType="next"
                    onSubmitEditing={() => this.limitedStepsInput.focus()}
                    onChangeText={limitedCalories =>
                      this.setState({ limitedCalories: limitedCalories })
                    }
                    ref={input => (this.limitedCaloriesInput = input)}
                    value={this.state.limitedCalories}
                    style={styles.input_error}
                  />
                )}
                <HelperText
                  type="error"
                  padding="none"
                  visible={
                    this.state.errorLimitedCalories == "" ||
                    this.state.errorLimitedCalories !=
                      "Proszę wpisać poprawny limit kalorii"
                      ? false
                      : true
                  }
                >
                  {this.state.errorLimitedCalories}
                </HelperText>
                {this.state.errorLimitedSteps !=
                "Proszę wpisać poprawny limit ilości kroków" ? (
                  <TextInput
                    placeholder="Limit kroków"
                    keyboardType="numeric"
                    placeholderTextColor="rgba(0,0,0,0.5)"
                    returKeyType="next"
                    ref={input => (this.limitedStepsInput = input)}
                    onChangeText={limitedSteps =>
                      this.setState({ limitedSteps: limitedSteps })
                    }
                    ref={input => (this.limitedStepsInput = input)}
                    style={styles.input}
                  />
                ) : (
                  <TextInput
                    placeholder="Limit kroków"
                    keyboardType="numeric"
                    placeholderTextColor="rgba(0,0,0,0.5)"
                    returKeyType="next"
                    ref={input => (this.limitedStepsInput = input)}
                    onChangeText={limitedSteps =>
                      this.setState({ limitedSteps: limitedSteps })
                    }
                    ref={input => (this.limitedStepsInput = input)}
                    value={this.state.limitedSteps}
                    style={styles.input_error}
                  />
                )}
                <HelperText
                  type="error"
                  padding="none"
                  visible={
                    this.state.errorLimitedSteps == "" ||
                    this.state.errorLimitedSteps !=
                      "Proszę wpisać poprawny limit ilości kroków"
                      ? false
                      : true
                  }
                >
                  {this.state.errorLimitedSteps}
                </HelperText>
                <TouchableOpacity
                  onPress={this.NavigateToActivityDetails}
                  style={{
                    backgroundColor: "#000000",
                    borderWidth: 1,
                    alignItems: "center",
                    borderRadius: 3,
                    marginTop: 10,
                    marginLeft: 5,
                    marginRight: 5,
                    paddingVertical: 10
                  }}
                >
                  <Text
                    style={{
                      textAlign: "center",
                      fontSize: 13,
                      fontFamily: "Quicksand-Bold",
                      color: "#ffffff",
                      fontWeight: "700",
                      textTransform: "uppercase"
                    }}
                  >
                    Rozpocznij
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </KeyboardAvoidingView>
        </ScrollView>
      </ImageBackground>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    flex: 1,
    backgroundColor: "transparent"
  },
  top_container: {
    flex: 1,
    position: "relative",
    width: "100%",
    height: "25%",
    alignItems: "center",
    backgroundColor: "transparent"
  },
  activity_header: {
    fontFamily: "Quicksand-Light",
    color: "#000000",
    fontSize: 13,
    marginTop: 15,
    width: 290,
    textAlign: "center",
    opacity: 0.8
  },
  bottom_container: {
    position: "relative",
    width: "100%",
    height: "75%"
  },
  logo_container: {
    alignItems: "center",
    flexGrow: 1,
    borderColor: "rgba(0,0,0,0.5)",
    borderWidth: 2
  },
  logo: {
    width: 50,
    height: 50
  },
  profile_icon_container: {
    marginTop: 40,
    width: 90,
    height: 90,
    borderRadius: 85,
    borderColor: "rgba(0,0,0,0.5)",
    borderWidth: 2,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center"
  },
  inputs_container: {
    padding: 40
  },
  buttons_container: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 10,
    marginLeft: 5,
    marginRight: 5,
    marginBottom: 20,
    borderColor: "rgba(0,0,0,0.5)",
    borderWidth: 2
  },
  button_container: {
    width: 160,
    backgroundColor: "#ffffff",
    borderColor: "rgba(0,0,0,0.5)",
    borderWidth: 1,
    borderRadius: 3,
    marginLeft: 5,
    marginRight: 5,
    paddingVertical: 10,
    marginBottom: 20,
    borderColor: "rgba(0,0,0,0.5)",
    borderWidth: 2
  },
  button_text: {
    textAlign: "center",
    fontFamily: "Quicksand-Light",
    fontSize: 13,
    color: "rgba(0,0,0,0.5)",
    fontWeight: "700"
  },
  input: {
    height: 40,
    borderColor: "rgba(0,0,0,0.3)",
    borderWidth: 1,
    borderRadius: 3,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(255,255,255,0.2)",
    marginBottom: 0,
    fontFamily: "Quicksand-Light",
    color: "rgba(0,0,0,0.5)",
    paddingHorizontal: 10
  },
  input_error: {
    height: 40,
    borderColor: "rgba(255,0,0,1.0)",
    borderWidth: 1,
    borderRadius: 3,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(255,0,0,0.05)",
    marginBottom: 0,
    fontFamily: "Quicksand-Light",
    color: "rgba(255,0,0,1.0)",
    paddingHorizontal: 10
  }
});
