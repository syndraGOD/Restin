import React, { useState, useEffect, createRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  WebView,
  Alert,
  BackHandler,
  SafeAreaView,
  Button,
  Linking,
} from "react-native";
import { WebView as RNCWebView } from "react-native-webview";
import * as Location from "expo-location";
import * as Notifications from "expo-notifications";
import * as Permissions from "expo-permissions";
import { Payment, PortOneController } from "@portone/react-native-sdk";
import { getStatusBarHeight } from "react-native-status-bar-height";

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

  const controller = createRef();
  // 뒤로가기 버튼을 눌렀을 때 결제창 내부에서 처리
  useEffect(() => {
    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      () => {
        if (controller.current?.canGoBack) {
          controller.current.webview?.goBack();
          return true;
        }
        return false;
      }
    );
    return () => backHandler.remove();
  });
  const uid = Date.now().toString(16);
  return (
    <View style={styles.container}>
      <Button
        title="react native"
        onPress={async () => {
          console.log("시발");
          // const url = "kakaotalk://kakaopay/home"; // 카카오톡의 URL Scheme
          Linking.openURL(
            "intent://pay?payToken=03gpuVw0RAMCjLRBjgqq2d&isBnplShop=true&deviceType=mobile&isTossApp=false&appPayVersion=2.1#Intent;scheme=supertoss;package=viva.republica.toss;end"
          ).catch((err) => console.error("앱을 열 수 없습니다:", err));
          // const response = await PortOne.requestPayment({
          //   storeId: "store-3aaf2448-f4cd-44ca-8162-0c81eb934d6e",
          //   channelKey: "channel-key-453920ce-40b4-4f6d-b50f-c2aa365b9adb",
          //   paymentId: uid,
          //   orderName: "주문명",
          //   totalAmount: 1000,
          //   currency: "CURRENCY_KRW",
          //   payMethod: "EASY_PAY",
          //   // customer: {
          //   //   fullName: "김",
          //   // },
          // });
        }}
      ></Button>
      {/* <SafeAreaView style={{ flex: 1 }}>
        <Payment
          ref={controller}
          request={{
            storeId: "store-3aaf2448-f4cd-44ca-8162-0c81eb934d6e",
            channelKey: "channel-key-453920ce-40b4-4f6d-b50f-c2aa365b9adb",
            paymentId: uid,
            orderName: "주문명",
            totalAmount: 1000,
            currency: "CURRENCY_KRW",
            payMethod: "EASY_PAY",
            // customer: {
            //   fullName: "김",
            // },
          }}
          onError={(error) => {
            console.log("결제 failed!");
            Alert.alert("실패", error.message);
          }}
          onComplete={(complete) => {
            console.log("결제 성공!");
            Alert.alert("완료", JSON.stringify(complete));
          }}
        />
      </SafeAreaView> */}
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

const statusBarHeight = getStatusBarHeight();
const styles = StyleSheet.create({
  container: {
    marginTop: statusBarHeight,
    flex: 1,
  },
  webView: {
    flex: 1,
  },
});
