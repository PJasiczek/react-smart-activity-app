import React from "react";
import {
  StyleSheet,
  ScrollView,
  Text,
  TouchableHighlight,
  View,
  RefreshControl
} from "react-native";

class DeviceList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      refreshing: false
    };
  }

  onDevicePressed = device => () => {
    if (typeof this.props.onDevicePressed === "function") {
      this.props.onDevicePressed(device);
    }
  };

  onRefresh = async () => {
    if (typeof this.props.onRefresh === "function") {
      this.setState({ refreshing: true });
      await this.props.onRefresh();
      this.setState({ refreshing: false });
    }
  };

  render() {
    const { devices = [] } = this.props;
    const { refreshing } = this.state;

    return (
      <ScrollView
        style={styles.container}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={this.onRefresh} />
        }
      >
        <View style={styles.listContainer}>
          {devices.map(device => (
            <TouchableHighlight
              underlayColor="#eee"
              key={device.id}
              style={styles.listItem}
              onPress={this.onDevicePressed(device)}
            >
              <View style={{ flexDirection: "column" }}>
                <View style={{ flexDirection: "row" }}>
                  <Text
                    style={[
                      styles.listItemStatus,
                      {
                        backgroundColor: device.paired ? "green" : "gray"
                      }
                    ]}
                  >
                    {device.paired ? "PAIRED" : "UNPAIRED"}
                  </Text>
                  <Text
                    style={[
                      styles.listItemStatus,
                      {
                        backgroundColor: device.connected ? "green" : "gray",
                        marginLeft: 5
                      }
                    ]}
                  >
                    {device.connected ? "CONNECTED" : "DISCONNECTED"}
                  </Text>
                </View>
                <View
                  style={{
                    flexDirection: "column"
                  }}
                >
                  <Text style={{ fontWeight: "bold", fontSize: 18 }}>
                    {device.name}
                  </Text>
                  <Text>{`<${device.id}>`}</Text>
                </View>
              </View>
            </TouchableHighlight>
          ))}
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 0.9,
    backgroundColor: "#f5fcff"
  },
  topBar: {
    height: 56,
    paddingHorizontal: 16,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    elevation: 6,
    backgroundColor: "#ffffff"
  },
  heading: {
    fontWeight: "bold",
    fontSize: 16,
    alignSelf: "center",
    color: "#fff"
  },
  enableInfoWrapper: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center"
  },
  listContainer: {
    borderColor: "#ccc",
    borderTopWidth: 0.5
  },
  listItem: {
    flex: 1,
    height: "auto",
    paddingHorizontal: 16,
    borderColor: "#ccc",
    borderBottomWidth: 0.5,
    justifyContent: "center",
    paddingTop: 15,
    paddingBottom: 15
  },
  listItemStatus: {
    paddingLeft: 5,
    paddingRight: 5,
    paddingTop: 2,
    paddingBottom: 2,
    fontWeight: "bold",
    fontSize: 12,
    color: "#fff"
  },
  footer: {
    height: 52,
    borderTopWidth: 1,
    borderTopColor: "#999"
  },
  fixedFooter: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    borderTopWidth: 1,
    borderTopColor: "#ddd"
  },
  button: {
    height: 36,
    margin: 5,
    paddingHorizontal: 16,
    alignItems: "center",
    justifyContent: "center"
  },
  buttonText: {
    color: "#22509d",
    fontWeight: "bold",
    fontSize: 14
  },
  buttonRaised: {
    backgroundColor: "#22509d",
    borderRadius: 2,
    elevation: 2
  }
});

export default DeviceList;
