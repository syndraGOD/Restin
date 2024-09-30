import React, { useState, useEffect } from "react";
// React와 필요한 훅들을 가져옵니다. useState는 상태 관리, useEffect는 부수 효과 처리에 사용됩니다.

import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
// React Native의 기본 컴포넌트들을 가져옵니다. UI 구성에 사용됩니다.

import * as WebBrowser from "expo-web-browser";
// Expo의 WebBrowser 모듈을 가져옵니다. 인증 과정에서 웹 브라우저를 열 때 사용됩니다.

import * as Firebase from "firebase/app";
// Firebase 앱 모듈을 가져옵니다. Firebase 초기화에 사용됩니다.

import {
  getAuth,
  signInWithCredential,
  OAuthProvider,
  User,
  UserCredential,
} from "firebase/auth";
// Firebase 인증 관련 함수와 타입들을 가져옵니다. 사용자 인증 처리에 사용됩니다.

import { getFirestore, doc, setDoc } from "firebase/firestore";
// Firebase Firestore 관련 함수들을 가져옵니다. 사용자 데이터 저장에 사용됩니다.

import { initializeApp } from "firebase/app";
// Firebase 앱을 초기화하는 함수를 가져옵니다.

import Constants from "expo-constants";
// Expo의 Constants를 가져옵니다. 앱 설정 값에 접근할 때 사용됩니다.

import * as AuthSession from "expo-auth-session";
// Expo의 AuthSession 모듈을 가져옵니다. 소셜 로그인 처리에 사용됩니다.

import { ResponseType } from "expo-auth-session";
// AuthSession의 ResponseType을 가져옵니다. 인증 응답 타입을 지정할 때 사용됩니다.

WebBrowser.maybeCompleteAuthSession();
// 인증 세션을 완료합니다. 소셜 로그인 후 앱으로 돌아올 때 필요합니다.

// Firebase 설정 타입 정의
interface FirebaseConfig {
  apiKey: string;
  authDomain: string;
  projectId: string;
  // 기타 필요한 설정들...
}
// Firebase 설정에 필요한 속성들의 타입을 정의합니다.

// Firebase 설정
const firebaseConfig: FirebaseConfig = {
  apiKey: Constants.manifest?.extra?.firebaseApiKey as string,
  authDomain: Constants.manifest?.extra?.firebaseAuthDomain as string,
  projectId: Constants.manifest?.extra?.firebaseProjectId as string,
  // 기타 필요한 설정들...
};
// Firebase 설정 객체를 생성합니다. Constants를 통해 환경 변수에서 값을 가져옵니다.

// Firebase 초기화
if (!Firebase.getApps().length) {
  initializeApp(firebaseConfig);
}
// Firebase 앱이 초기화되지 않았다면 초기화합니다.

const auth = getAuth();
// Firebase 인증 객체를 가져옵니다. 사용자 인증에 사용됩니다.

const db = getFirestore();
// Firebase Firestore 객체를 가져옵니다. 데이터베이스 작업에 사용됩니다.

export default function SocialLoginScreen() {
  // 소셜 로그인 화면 컴포넌트를 정의합니다.

  const [user, setUser] = useState<User | null>(null);
  // 현재 로그인한 사용자 상태를 관리합니다. User 타입 또는 null이 될 수 있습니다.

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user: User | null) => {
      setUser(user);
    });
    // Firebase의 인증 상태 변화를 감지하고 user 상태를 업데이트합니다.

    return () => unsubscribe();
    // 컴포넌트가 언마운트될 때 리스너를 제거합니다.
  }, []);

  // 카카오 로그인
  const [kakaoRequest, kakaoResponse, kakaoPromptAsync] =
    AuthSession.useAuthRequest(
      {
        responseType: ResponseType.Code,
        // 응답 타입을 'code'로 설정합니다.
        clientId: Constants.manifest?.extra?.kakaoClientId as string,
        // 카카오 앱 클라이언트 ID를 설정합니다.
        scopes: ["profile", "account_email"],
        // 요청할 권한 범위를 지정합니다.
        redirectUri: AuthSession.makeRedirectUri({
          native: "your.app.scheme://kakao-auth",
        }),
        // 리다이렉트 URI를 설정합니다. 실제 앱 스킴으로 변경해야 합니다.
      },
      {
        authorizationEndpoint: "https://kauth.kakao.com/oauth/authorize",
        // 카카오 인증 엔드포인트 URL을 지정합니다.
        tokenEndpoint: "https://kauth.kakao.com/oauth/token",
        // 카카오 토큰 엔드포인트 URL을 지정합니다.
      }
    );
  // 카카오 로그인을 위한 AuthSession 요청을 설정합니다.

  // 애플 로그인
  const [appleRequest, appleResponse, applePromptAsync] =
    AuthSession.useAuthRequest(
      {
        responseType: ResponseType.IdToken,
        // 응답 타입을 'id_token'으로 설정합니다.
        clientId: Constants.manifest?.extra?.appleClientId as string,
        // 애플 서비스 ID를 설정합니다.
        scopes: ["name", "email"],
        // 요청할 권한 범위를 지정합니다.
        redirectUri: AuthSession.makeRedirectUri({
          native: "your.app.scheme://apple-auth",
        }),
        // 리다이렉트 URI를 설정합니다. 실제 앱 스킴으로 변경해야 합니다.
      },
      {
        authorizationEndpoint: "https://appleid.apple.com/auth/authorize",
        // 애플 인증 엔드포인트 URL을 지정합니다.
      }
    );
  // 애플 로그인을 위한 AuthSession 요청을 설정합니다.

  useEffect(() => {
    if (kakaoResponse?.type === "success") {
      const { code } = kakaoResponse.params;
      console.log("Kakao login successful, code:", code);
      // 카카오 로그인 성공 시 받은 코드를 콘솔에 출력합니다.
      // 여기서 백엔드 서버로 코드를 보내 액세스 토큰을 받아야 합니다.
      // 그 후 Firebase Custom Auth를 사용하여 인증을 완료해야 합니다.
    }
  }, [kakaoResponse]);
  // 카카오 로그인 응답을 처리합니다.

  useEffect(() => {
    if (appleResponse?.type === "success") {
      const { id_token } = appleResponse.params;
      const provider = new OAuthProvider("apple.com");
      const credential = provider.credential({
        idToken: id_token,
        rawNonce: appleRequest?.nonce,
      });
      handleFirebaseAuth(credential);
    }
  }, [appleResponse]);
  // 애플 로그인 응답을 처리하고 Firebase 인증을 시작합니다.

  const handleFirebaseAuth = async (credential: any) => {
    try {
      const userCredential: UserCredential = await signInWithCredential(
        auth,
        credential
      );
      await saveUserToFirestore(userCredential.user);
    } catch (error) {
      console.error("Firebase auth failed", error);
    }
  };
  // Firebase 인증을 처리하고 성공 시 사용자 정보를 Firestore에 저장합니다.

  const saveUserToFirestore = async (user: User) => {
    try {
      await setDoc(
        doc(db, "users", user.uid),
        {
          uid: user.uid,
          email: user.email,
          displayName: user.displayName,
          photoURL: user.photoURL,
          createdAt: new Date(),
        },
        { merge: true }
      );
    } catch (error) {
      console.error("Saving user to Firestore failed", error);
    }
  };
  // 사용자 정보를 Firestore에 저장합니다. merge: true 옵션으로 기존 데이터와 병합합니다.

  return (
    <View style={styles.container}>
      <Text style={styles.title}>소셜 로그인</Text>
      <TouchableOpacity
        style={styles.kakaoButton}
        onPress={() => kakaoPromptAsync()}
        disabled={!kakaoRequest}
      >
        <Text style={styles.kakaoButtonText}>카카오톡으로 시작하기</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.appleButton}
        onPress={() => applePromptAsync()}
        disabled={!appleRequest}
      >
        <Text style={styles.appleButtonText}>Apple로 시작하기</Text>
      </TouchableOpacity>
      {user && (
        <Text style={styles.userInfo}>
          로그인 됨: {user.displayName || user.email}
        </Text>
      )}
    </View>
  );
  // UI를 렌더링합니다. 카카오와 애플 로그인 버튼, 그리고 로그인된 사용자 정보를 표시합니다.
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    backgroundColor: "#f5f5f5",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 30,
  },
  kakaoButton: {
    backgroundColor: "#FEE500",
    padding: 15,
    borderRadius: 5,
    width: "100%",
    alignItems: "center",
    marginBottom: 10,
  },
  kakaoButtonText: {
    color: "#000000",
    fontSize: 16,
    fontWeight: "bold",
  },
  appleButton: {
    backgroundColor: "#000000",
    padding: 15,
    borderRadius: 5,
    width: "100%",
    alignItems: "center",
  },
  appleButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "bold",
  },
  userInfo: {
    marginTop: 20,
    fontSize: 16,
  },
});
// 컴포넌트의 스타일을 정의합니다. 각 요소의 레이아웃과 디자인을 설정합니다.
