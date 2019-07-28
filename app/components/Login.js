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
  Animated
} from "react-native";
import LinearGradient from "react-native-linear-gradient";

export default class Login extends Component {
  static navigationOptions = {
    header: null
  };

  constructor(props) {
    super(props);

    this.state = {
      UserUserName: "",
      UserPassword: ""
    };
  }

  UserLoginFunction = () => {
    const { UserUserName } = this.state;
    const { UserPassword } = this.state;

    fetch("http://192.168.0.2/smartActivity/user_login.php", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        username: UserUserName,
        password: UserPassword
      })
    })
      .then(response => response.json())
      .then(responseJson => {
        if (responseJson === "true") {
          this.props.navigation.navigate("UserHome", {
            username: UserUserName
          });
        } else {
          Alert.alert(responseJson);
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
              source={require("../../assets/images/Logo.png")}
            />
            <Text style={styles.title}>
              KONTO UMOŻLIWIAJĄCE DOSTĘP DO WSZYSTKICH USŁUG SMART ACTIVITY
            </Text>
          </View>
          <TextInput
            placeholder="Nazwa użytkownika"
            placeholderTextColor="rgba(0,0,0,0.7)"
            returKeyType="next"
            onSubmitEditing={() => this.passwordInput.focus()}
            onChangeText={UserUserName => this.setState({ UserUserName })}
            style={styles.input}
          />
          <TextInput
            placeholder="Hasło"
            placeholderTextColor="rgba(0,0,0,0.7)"
            secureTextEntry
            returKeyType="go"
            ref={input => (this.passwordInput = input)}
            onChangeText={UserPassword => this.setState({ UserPassword })}
            style={styles.input}
          />
          <TouchableOpacity
            onPress={() => this.props.navigation.navigate("UserHome")}
            //onPress={this.UserLoginFunction}
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
  input: {
    height: 40,
    borderColor: "rgba(0,0,0,0.2)",
    borderWidth: 1,
    borderRadius: 3,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(255,255,255,0.2)",
    marginBottom: 15,
    fontFamily: "Quicksand-Light",
    color: "#000000",
    paddingHorizontal: 10
  }
});
