import { Text, View } from "react-native";

import { WebView } from "react-native-webview";
// import Constants from "expo-constants";
import { StyleSheet } from "react-native";
export default function Index() {
  return (
    <>
      <WebView
        style={styles.container}
        source={{ uri: "https://syndragod.github.io/Restin/Web/dist/" }}
      />
      {/* <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Text>Edit app/index.tsx to.</Text>
      </View> */}
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // marginTop: Constants.statusBarHeight,
  },
});
