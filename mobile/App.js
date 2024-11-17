import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, WebView } from "react-native";
import { WebView as RNCWebView } from "react-native-webview";
import * as Location from "expo-location";
import * as Notifications from "expo-notifications";
import * as Permissions from "expo-permissions";

export default function App() {
  const webViewRef = React.useRef(null);

  useEffect(() => {
    setupPushNotifications();
    requestLocationPermission();
  }, []);

  const handleWebViewMessage = (event) => {
    const message = JSON.parse(event.nativeEvent.data);

    if (message.type === "location") {
      getLocation();
    }

    console.log("받은 토큰:", message.token);
  };

  const setupPushNotifications = async () => {
    const { status: existingStatus } =
      await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
    if (existingStatus !== "granted") {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }
    if (finalStatus !== "granted") {
      Alert.alert(
        "알림 권한 필요",
        "앱을 사용하기 위해 알림 권한이 필요합니다."
      );
    } else {
      console.log("푸시 알림 권한 허용됨");
    }
  };

  const requestLocationPermission = async () => {
    let { status: foregroundStatus } =
      await Location.requestForegroundPermissionsAsync();
    if (foregroundStatus !== "granted") {
      let { status: backgroundStatus } =
        await Location.requestBackgroundPermissionsAsync();
      if (backgroundStatus !== "granted") {
        Alert.alert("위치 정보 접근 거부", "위치 권한이 필요합니다.");
      }
    }
  };

  const getLocation = async () => {
    try {
      let location = await Location.getCurrentPositionAsync({});
      webViewRef.current?.postMessage(
        JSON.stringify({
          type: "location",
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
        })
      );
    } catch (error) {
      console.error(error);
    }
  };

  const sendPushNotification = async (message) => {
    // 여기에 푸시 알림 전송 로직을 구현합니다.
    // 예:
    // await Notifications.scheduleNotificationAsync({
    //   content: {
    //     title: "새로운 메시지",
    //     body: message,
    //   },
    //   trigger: null,
    // });
  };

  return (
    <View style={styles.container}>
      <RNCWebView
        ref={webViewRef}
        source={{ uri: "https://restin.co.kr" }}
        javaScriptEnabled={true}
        domStorageEnabled={true}
        allowFileAccess={true}
        onMessage={handleWebViewMessage}
        style={styles.webView}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  webView: {
    flex: 1,
  },
});
