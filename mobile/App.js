import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, WebView } from "react-native";
import { WebView as RNCWebView } from "react-native-webview";
import * as Location from "expo-location";
import * as Notifications from "expo-notifications";
import * as Permissions from "expo-permissions";

const BACKGROUND_NOTIFICATION_TASK = "BACKGROUND-NOTIFICATION-TASK";

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true, // 앱이 실행 중일 때 알림 표시
    shouldPlaySound: true, // 알림 사운드 재생
    shouldSetBadge: false, // 앱 아이콘에 배지 설정 여부
  }),
});
export default function App() {
  const restinWeb = "http://test.restin.co.kr";
  const restinAPI = "http://test.restin.co.kr:8080";

  const webViewRef = React.useRef(null);
  console.log("화면 리렌더링");
  useEffect(() => {
    setupPushNotifications();
    requestLocationPermission();
  }, []);

  const setupPushNotifications = async () => {
    const { status: existingStatus } =
      await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
    console.log("notifi permission : ", existingStatus);
    if (existingStatus !== "granted") {
      const { status } = await Notifications.requestPermissionsAsync();
      console.log("푸쉬알림 요청 완료");
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

  useEffect(() => {
    // 포그라운드 알림 수신 핸들러 등록
    const foregroundSubscription =
      Notifications.addNotificationReceivedListener((notification) => {
        console.log("Notification received in foreground:", notification);
      });

    // 알림 클릭 시 이벤트 핸들러 등록
    const responseSubscription =
      Notifications.addNotificationResponseReceivedListener((response) => {
        console.log("Notification response received:", response);
      });

    // 컴포넌트 언마운트 시 핸들러 제거
    return () => {
      foregroundSubscription.remove();
      responseSubscription.remove();
    };
  }, []);

  const debuggingCode = `
  window.customConsole = {
    log: (...args) => window.ReactNativeWebView.postMessage(JSON.stringify({type: 'console', args: args})),
    debug: (...args) => window.ReactNativeWebView.postMessage(JSON.stringify({type: 'console', args: args})),
    info: (...args) => window.ReactNativeWebView.postMessage(JSON.stringify({type: 'console', args: args})),
    warn: (...args) => window.ReactNativeWebView.postMessage(JSON.stringify({type: 'console', args: args})),
    error: (...args) => window.ReactNativeWebView.postMessage(JSON.stringify({type: 'console', args: args})),
  };
  
  // 기존 console 객체를 덮어쓰기
  window.console = window.customConsole;
`;
  const handleWebViewMessage = async (event) => {
    const message = JSON.parse(event.nativeEvent.data);
    // console.log(message);
    if (message.type === "console") {
      console.log("[ React ] : ", ...message.args);
    }
    if (message.type === "location") {
      getLocation();
    }
    if (message.type === "token") {
      // console.log("token RES", message.payload.auth_token);
      const auth_token = message.payload.auth_token;
      const noti_token = await Notifications.getExpoPushTokenAsync();
      fetch(`${restinAPI}/notification/tokenPush`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${auth_token}`,
        },
        body: JSON.stringify({
          noti_token,
        }),
      });
      // 접속한 유저가 로그인을 할시 유저의 아이디를 웹뷰에서 전송
      // userId와 pushToken을 서버로 전송
      // 서버에서는 token 중복성 검사를
    }

    // console.log("받은 토큰:", message.token);
  };
  return (
    <View style={styles.container}>
      <RNCWebView
        ref={webViewRef}
        source={{ uri: restinWeb }}
        javaScriptEnabled={true}
        domStorageEnabled={true}
        allowFileAccess={true}
        onMessage={handleWebViewMessage}
        style={styles.webView}
        injectedJavaScript={debuggingCode}
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
