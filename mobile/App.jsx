import React, {useState, useEffect, createRef} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  WebView,
  Alert,
  BackHandler,
  Button,
  Linking,
} from 'react-native';
import {WebView as RNCWebView} from 'react-native-webview';

import {getStatusBarHeight} from 'react-native-status-bar-height';

function close() {
  Alert.alert('종료하시겠어요?', '확인을 누르면 종료합니다.', [
    {
      text: '취소',
      onPress: () => {},
      style: 'cancel',
    },
    {text: '확인', onPress: () => BackHandler.exitApp()},
  ]);
}

function App() {
  const onShouldStartLoadWithRequest = event => {
    console.log(event);
    if (Platform.OS === 'android' && event.url.includes('intent')) {
      SendIntentAndroid.openChromeIntent(event.url)
        .then(isOpened => {
          console.log(isOpened);
          if (!isOpened) {
            ToastAndroid.show('앱 실행에 실패했습니다.', ToastAndroid.SHORT);
          }
          console.log(event.url);
          return false;
        })
        .catch(err => {
          console.log(err);
        });
      return false;
    } else {
      Linking.openURL(event.url).catch(err => {
        alert(
          '앱 실행에 실패했습니다. 설치가 되어있지 않은 경우 설치하기 버튼을 눌러주세요.',
        );
      });
      return false;
    }
  };
  const restinWeb = 'http://test.restin.co.kr';
  const restinAPI = 'http://test.restin.co.kr:8080';

  const webViewRef = React.useRef(null);

  const handleWebViewMessage = async event => {
    const message = JSON.parse(event.nativeEvent.data);
    // console.log(message);
    if (message.type === 'console') {
      console.log('[ React ] : ', ...message.args);
    }
    if (message.type === 'location') {
      getLocation();
    }
    if (message.type === 'copy') {
      console.log('복사 클릭');
    }
    if (message.type === 'token') {
      // console.log("token RES", message.payload.auth_token);
      const auth_token = message.payload.auth_token;
      const noti_token = await Notifications.getExpoPushTokenAsync();
      fetch(`${restinAPI}/notification/tokenPush`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
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

  //   super(props);
  //   this.webview = React.createRef();
  //   this.state = {
  //     url: "",
  //     canGoBack: false,
  //   };
  // }

  const [currentUrl, setCurrentUrl] = useState('');
  const [canGoBack, setCanGoBack] = useState(false);
  // 이벤트 동작
  const handleBackButton = () => {
    if (canGoBack) {
      if (
        currentUrl === 'http://test.restin.co.kr/app/home' ||
        currentUrl === 'http://test.restin.co.kr/welcome/1' ||
        currentUrl === 'http://test.restin.co.kr/login/isuser'
      ) {
        close();
      } else {
        webViewRef.current.goBack();
      }
    } else {
      close();
    }
    return true;
  };
  // 이벤트 등록
  useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', handleBackButton);
    return () => {
      BackHandler.removeEventListener('hardwareBackPress', handleBackButton);
    };
  }, []);

  return (
    <View style={styles.container}>
      <RNCWebView
        ref={webViewRef}
        source={{uri: restinWeb}}
        javaScriptEnabled={true}
        domStorageEnabled={true}
        allowFileAccess={true}
        onMessage={handleWebViewMessage}
        style={styles.webView}
        // injectedJavaScript={debuggingCode}
        onShouldStartLoadWithRequest={event => {
          return onShouldStartLoadWithRequest(event);
        }}
        // onNavigationStateChange={navState => {
        //   setCurrentUrl(navState.url);
        //   setCanGoBack(navState.canGoBack);
        // }}
      />
      {/* <Button
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
      ></Button> */}
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
    </View>
  );
}

const statusBarHeight = getStatusBarHeight();
const styles = StyleSheet.create({
  container: {
    // marginTop: statusBarHeight,
    flex: 1,
  },
  webView: {
    flex: 1,
  },
});

export default App;
