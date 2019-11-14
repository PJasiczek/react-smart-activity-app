import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  TextInput,
  KeyboardAvoidingView,
  Alert,
  Animated,
  ToastAndroid
} from "react-native";
import { HelperText, withTheme, Theme } from "react-native-paper";
import Toast from "@remobile/react-native-toast";
import LinearGradient from "react-native-linear-gradient";

export default class Login extends Component {
  static navigationOptions = {
    header: null
  };

  constructor(props) {
    super(props);
    this.state = {
      userUserName: "",
      userPassword: "",
      errorUserName: "",
      errorPassword: ""
    };
  }

  userLoginFunction = () => {
    const { userUserName } = this.state;
    const { userPassword } = this.state;

    fetch("http://jasiu1047.unixstorm.org/smartactivity/user_login.php", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        username: userUserName,
        password: userPassword
      })
    })
      .then(response => response.json())
      .then(responseJson => {
        if (this.state.userUserName != "" && this.state.userPassword != "") {
          if (responseJson != "Nieprawidłowa nazwa użytkownika lub hasło") {
            this.props.navigation.navigate("UserHome", {
              id: responseJson
            });
          } else {
            Toast.showShortTop(responseJson);
          }
        } else if (this.state.userUserName == "") {
          this.setState({
            errorUserName: "Proszę wpisać poprawną nazwę użytkonika",
            errorPassword: ""
          });
        } else if (this.state.userPassword == "") {
          this.setState({
            errorUserName: "",
            errorPassword: "Proszę wpisać poprawne hasło"
          });
        }
      })
      .catch(error => {
        console.error(error);
      });
  };

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
        <KeyboardAvoidingView behavior="padding" style={styles.container}>
          <View style={styles.logo_container}>
            <Image
              style={styles.logo}
              source={require("../../assets/images/logo.png")}
            />
            <Text style={styles.title}>
              KONTO UMOŻLIWIAJĄCE DOSTĘP DO WSZYSTKICH USŁUG SMART ACTIVITY
            </Text>
          </View>
          {this.state.errorUserName !=
          "Proszę wpisać poprawną nazwę użytkonika" ? (
            <TextInput
              placeholder="Nazwa użytkownika"
              placeholderTextColor="rgba(0,0,0,0.7)"
              returKeyType="next"
              onSubmitEditing={() => this.userPasswordInput.focus()}
              onChangeText={username =>
                this.setState({ userUserName: username })
              }
              value={this.state.userUserName}
              style={styles.input}
            />
          ) : (
            <TextInput
              placeholder="Nazwa użytkownika"
              placeholderTextColor="rgba(255,0,0,1.0)"
              returKeyType="next"
              onSubmitEditing={() => this.userPasswordInput.focus()}
              onChangeText={username =>
                this.setState({ userUserName: username })
              }
              value={this.state.userUserName}
              style={styles.input_error}
            />
          )}
          <HelperText
            type="error"
            padding="none"
            visible={
              this.state.errorUserName == "" ||
              this.state.errorUserName !=
                "Proszę wpisać poprawną nazwę użytkonika"
                ? false
                : true
            }
          >
            {this.state.errorUserName}
          </HelperText>
          {this.state.errorPassword != "Proszę wpisać poprawne hasło" ? (
            <TextInput
              placeholder="Hasło"
              placeholderTextColor="rgba(0,0,0,0.7)"
              secureTextEntry
              returKeyType="go"
              ref={input => (this.userPasswordInput = input)}
              onChangeText={password =>
                this.setState({ userPassword: password })
              }
              style={styles.input}
            />
          ) : (
            <TextInput
              placeholder="Hasło"
              placeholderTextColor="rgba(255,0,0,1.0)"
              secureTextEntry
              returKeyType="go"
              ref={input => (this.userPasswordInput = input)}
              onChangeText={password =>
                this.setState({ userPassword: password })
              }
              value={this.state.userPassword}
              style={styles.input_error}
            />
          )}
          <HelperText
            type="error"
            padding="none"
            visible={
              this.state.errorPassword == "" ||
              this.state.errorPassword != "Proszę wpisać poprawne hasło"
                ? false
                : true
            }
          >
            {this.state.errorPassword}
          </HelperText>
          <TouchableOpacity
            onPress={this.userLoginFunction}
            style={{
              backgroundColor: "#000000",
              borderWidth: 1,
              alignItems: "center",
              borderRadius: 3,
              marginLeft: 5,
              marginRight: 5,
              paddingVertical: 10,
              marginBottom: 10
            }}
          >
            <Text
              style={{
                textAlign: "center",
                fontFamily: "Quicksand-Bold",
                fontSize: 13,
                color: "#ffffff",
                fontWeight: "700"
              }}
            >
              ZALOGUJ SIĘ
            </Text>
          </TouchableOpacity>
          <Text style={styles.adding}>
            Nie jesteś jeszcze członkiem?{" "}
            <Text
              onPress={() => this.props.navigation.navigate("Registration")}
              style={styles.adding_link}
            >
              Dołącz teraz
            </Text>
          </Text>
        </KeyboardAvoidingView>
      </LinearGradient>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    flex: 1,
    backgroundColor: "transparent"
  },
  logo: {
    width: 100,
    height: 100
  },
  logo_container: {
    marginTop: 40,
    marginBottom: 10,
    alignItems: "center",
    flexGrow: 1
  },
  adding: {
    color: "rgba(0,0,0,0.7)",
    fontFamily: "Quicksand-Light",
    fontSize: 11,
    textAlign: "center",
    marginBottom: 30
  },
  adding_link: {
    fontFamily: "Quicksand-Bold"
  },
  title: {
    color: "#000000",
    fontFamily: "Quicksand-Bold",
    fontSize: 16,
    marginTop: 5,
    width: 320,
    textAlign: "center",
    opacity: 0.9
  },
  healper_text: {
    marginBottom: 5
  },
  input: {
    height: 40,
    borderColor: "rgba(0,0,0,0.2)",
    borderWidth: 1,
    borderRadius: 3,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(255,255,255,0.2)",
    marginBottom: 0,
    fontFamily: "Quicksand-Light",
    color: "#000000",
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
