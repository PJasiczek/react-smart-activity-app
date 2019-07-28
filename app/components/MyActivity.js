import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  Image,
  ImageBackground,
  Dimensions
} from "react-native";
import { DrawerActions } from "react-navigation";
import Swiper from "react-native-swiper";
import { BoxShadow } from "react-native-shadow";
import LinearGradient from "react-native-linear-gradient";

const { height } = Dimensions.get("window");

export default class Settings extends Component {
  static navigationOptions = {
    header: null
  };

  render() {
    const shadowOptButton = {
      position: "absolute",
      width: 50,
      height: 50,
      right: 30,
      bottom: -20,
      color: "#000000",
      border: 6,
      radius: 25,
      opacity: 0.1,
      x: 0,
      y: 0,
      style: { marginVertical: 5 }
    };
    const shadowOptInnerContainer = {
      position: "absolute",
      width: Dimensions.get("window").width * 0.75,
      height: Dimensions.get("window").height * 0.73,
      color: "#000000",
      border: 6,
      radius: 45,
      opacity: 0.2,
      x: 2,
      y: 5,
      style: { marginVertical: 5 }
    };
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
        <View style={styles.container}>
          <View style={styles.top_container} />
          <View style={styles.bottom_container}>
            <Swiper
              style={styles.wrapper}
              showsButtons={false}
              loop={false}
              activeDotColor="#000000"
            >
              <View style={styles.slide1}>
                <BoxShadow setting={shadowOptInnerContainer}>
                  <View style={styles.inner_container}>
                    <Image
                      source={require("../../assets/images/cycling-background-black.jpg")}
                      style={{
                        width: "100%",
                        height: "100%",
                        position: "absolute",
                        borderRadius: 45,
                        top: 0,
                        left: 0,
                        opacity: 0.9
                      }}
                    />
                    <View style={styles.text_container}>
                      <View style={styles.header_container}>
                        <Text style={styles.text_header}>Kolarstwo</Text>
                      </View>
                      <View style={styles.description_container}>
                        <Text style={styles.text_description}>
                          Wiele naukowych opracowań dowodzi, że ludzie
                          regularnie jeżdżący na rowerze mają mniejsze
                          skłonności do otyłości, cukrzycy, udarów, chorób serca
                          i różnych rodzajów raka.
                        </Text>
                      </View>
                    </View>
                    <View style={styles.shadow_button}>
                      <BoxShadow setting={shadowOptButton}>
                        <TouchableOpacity
                          onPress={() =>
                            this.props.navigation.navigate("ActivityInfo")
                          }
                          style={styles.activity_button}
                        >
                          <Image
                            style={styles.activity_image_button}
                            source={require("../../assets/images/icons/right-arrow.png")}
                          />
                        </TouchableOpacity>
                      </BoxShadow>
                    </View>
                  </View>
                </BoxShadow>
              </View>
              <View style={styles.slide2}>
                <BoxShadow setting={shadowOptInnerContainer}>
                  <View style={styles.inner_container}>
                    <Image
                      source={require("../../assets/images/swim-background-black.jpg")}
                      style={{
                        width: "100%",
                        height: "100%",
                        position: "absolute",
                        borderRadius: 45,
                        top: 0,
                        left: 0,
                        opacity: 0.9
                      }}
                    />
                    <View style={styles.text_container}>
                      <View style={styles.header_container}>
                        <Text style={styles.text_header}>Pływanie</Text>
                      </View>
                      <View style={styles.description_container}>
                        <Text style={styles.text_description}>
                          Istnieje wiele stylów pływania. Do najpopularniejszych
                          należą żabka, kraul, grzbietowy, motylkowy i, ze
                          względu na prostotę, piesek. Pływanie to też jedna z
                          metod rehabilitacji, a także dyscyplina sportu.
                        </Text>
                      </View>
                    </View>
                    <View style={styles.shadow_button}>
                      <BoxShadow setting={shadowOptButton}>
                        <TouchableOpacity
                          onPress={() =>
                            this.props.navigation.navigate("ActivityInfo")
                          }
                          style={styles.activity_button}
                        >
                          <Image
                            style={styles.activity_image_button}
                            source={require("../../assets/images/icons/right-arrow.png")}
                          />
                        </TouchableOpacity>
                      </BoxShadow>
                    </View>
                  </View>
                </BoxShadow>
              </View>
              <View style={styles.slide3}>
                <BoxShadow setting={shadowOptInnerContainer}>
                  <View style={styles.inner_container}>
                    <Image
                      source={require("../../assets/images/surf-background-black.jpg")}
                      style={{
                        width: "100%",
                        height: "100%",
                        position: "absolute",
                        borderRadius: 45,
                        top: 0,
                        left: 0,
                        opacity: 0.9
                      }}
                    />
                    <View style={styles.text_container}>
                      <View style={styles.header_container}>
                        <Text style={styles.text_header}>Surfing</Text>
                      </View>
                      <View style={styles.description_container}>
                        <Text style={styles.text_description}>
                          Największy efekt osiąga się na przybrzeżnych falach
                          oceanicznych. Deska wyposażona w żagiel służy do
                          uprawiania windsurfingu, deski do uprawiania
                          kitesurfingu napędzane są rodzajem latawca -
                          paralotni.
                        </Text>
                      </View>
                    </View>
                    <View style={styles.shadow_button}>
                      <BoxShadow setting={shadowOptButton}>
                        <TouchableOpacity
                          onPress={() =>
                            this.props.navigation.navigate("ActivityInfo")
                          }
                          style={styles.activity_button}
                        >
                          <Image
                            style={styles.activity_image_button}
                            source={require("../../assets/images/icons/right-arrow.png")}
                          />
                        </TouchableOpacity>
                      </BoxShadow>
                    </View>
                  </View>
                </BoxShadow>
              </View>
              <View style={styles.slide4}>
                <BoxShadow setting={shadowOptInnerContainer}>
                  <View style={styles.inner_container}>
                    <Image
                      source={require("../../assets/images/run-background-black.jpg")}
                      style={{
                        width: "100%",
                        height: "100%",
                        position: "absolute",
                        borderRadius: 45,
                        top: 0,
                        left: 0,
                        opacity: 0.9
                      }}
                    />
                    <View style={styles.text_container}>
                      <View style={styles.header_container}>
                        <Text style={styles.text_header}>Bieg</Text>
                      </View>
                      <View style={styles.description_container}>
                        <Text style={styles.text_description}>
                          Według badań przeprowadzonych przez Stanford
                          University School of Medicine, jogging jest skuteczny
                          w zwiększaniu ludzkiej żywotności i zmniejszaniu
                          efektu starzenia, z korzyścią dla układu
                          sercowo-naczyniowego.
                        </Text>
                      </View>
                    </View>
                    <View style={styles.shadow_button}>
                      <BoxShadow setting={shadowOptButton}>
                        <TouchableOpacity
                          onPress={() =>
                            this.props.navigation.navigate("ActivityInfo")
                          }
                          style={styles.activity_button}
                        >
                          <Image
                            style={styles.activity_image_button}
                            source={require("../../assets/images/icons/right-arrow.png")}
                          />
                        </TouchableOpacity>
                      </BoxShadow>
                    </View>
                  </View>
                </BoxShadow>
              </View>
            </Swiper>
          </View>
          <TouchableOpacity
            onPress={() =>
              this.props.navigation.dispatch(DrawerActions.openDrawer())
            }
            style={styles.menu_button}
          >
            <Image
              style={styles.menu_image_button}
              source={require("../../assets/images/icons/menu_v1.png")}
            />
          </TouchableOpacity>
        </View>
      </LinearGradient>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "transparent"
  },
  wrapper: {
    backgroundColor: "transparent"
  },
  slide1: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "transparent"
  },
  slide2: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "transparent"
  },
  slide3: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "transparent"
  },
  slide4: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "transparent"
  },
  top_container: {
    flex: 1,
    width: "90%",
    height: "10%",
    flexWrap: "wrap",
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "transparent",
    marginTop: 50
  },
  bottom_container: {
    position: "relative",
    width: "90%",
    height: "90%",
    flexWrap: "wrap",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "transparent",
    marginTop: 30
  },
  inner_container: {
    position: "relative",
    width: "100%",
    height: "100%",
    marginHorizontal: 2.5,
    marginVertical: 5,
    borderRadius: 45,
    backgroundColor: "rgba(0,0,0,0.05)",
    zIndex: 1
  },
  text_container: {
    position: "absolute",
    width: "100%",
    height: "40%",
    bottom: 0,
    left: 0,
    flexWrap: "wrap",
    flexDirection: "row",
    justifyContent: "center"
  },
  header_container: {
    width: "90%",
    height: "20%",
    flexDirection: "row",
    alignItems: "center",
    borderLeftColor: "#000000",
    borderLeftWidth: 4,
    paddingLeft: 15
  },
  description_container: {
    width: "90%",
    height: "80%"
  },
  activity_image_button: {
    width: 25,
    height: 25,
    zIndex: 2
  },
  activity_button: {
    width: 50,
    height: 50,
    borderRadius: 25,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(255,255,255,1)",
    overflow: "hidden",
    zIndex: 3
  },
  shadow_button: {
    position: "absolute",
    width: 50,
    height: 50,
    right: 30,
    bottom: -20
  },
  menu_image_button: {
    width: 25,
    height: 25,
    zIndex: 2
  },
  menu_button: {
    position: "absolute",
    width: 40,
    height: 40,
    left: 10,
    top: 30,
    borderRadius: 25,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "transparent",
    zIndex: 1
  },
  header: {
    fontFamily: "Quicksand-Bold",
    color: "#000000",
    fontSize: 18,
    marginLeft: 20
  },
  inner_text: {
    position: "absolute",
    fontFamily: "Quicksand-Light",
    color: "#000000",
    fontSize: 16,
    left: 30,
    top: 10,
    opacity: 0.8
  },
  text_description: {
    fontFamily: "Quicksand-Light",
    color: "#ffffff",
    fontSize: 16
  },
  text_header: {
    fontFamily: "Quicksand-Bold",
    color: "#000000",
    fontSize: 18
  }
});
