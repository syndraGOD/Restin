import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import * as WebBrowser from "expo-web-browser";
import * as Firebase from "firebase/app";
import {
  getAuth,
  signInWithCredential,
  OAuthProvider,
  User,
  UserCredential,
} from "firebase/auth";
import { getFirestore, doc, setDoc } from "firebase/firestore";
import { initializeApp } from "firebase/app";
import Constants from "expo-constants";
import * as AuthSession from "expo-auth-session";
import { ResponseType } from "expo-auth-session";

WebBrowser.maybeCompleteAuthSession();

// Firebase 설정 타입 정의
interface FirebaseConfig {
  apiKey: string;
  authDomain: string;
  projectId: string;
  storageBucket: string;
  messagingSenderId: string;
  appId: string;
  measurementId: string;
  // 기타 필요한 설정들...
}

// Firebase 설정
const firebaseConfig: FirebaseConfig = {
  apiKey: "AIzaSyDQ16qf4yTL8fOHsqJmWD8EIcRyyRY8QkM",
  authDomain: "restin-d570e.firebaseapp.com",
  projectId: "restin-d570e",
  storageBucket: "restin-d570e.appspot.com",
  messagingSenderId: "738247474251",
  appId: "1:738247474251:web:1dabca001c3acc239761ce",
  measurementId: "G-KSK51QQ9YQ",
  // 기타 필요한 설정들...
};

// Firebase 초기화
if (!Firebase.getApps().length) {
  initializeApp(firebaseConfig);
}

const auth = getAuth();
const db = getFirestore();

export default function SocialLoginScreen() {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user: User | null) => {
      setUser(user);
    });

    return () => unsubscribe();
  }, []);

  // 카카오 로그인
  const [kakaoRequest, kakaoResponse, kakaoPromptAsync] =
    AuthSession.useAuthRequest(
      {
        responseType: ResponseType.Code,
        clientId: Constants.manifest?.extra?.kakaoClientId as string,
        scopes: ["profile", "account_email"],
        redirectUri: AuthSession.makeRedirectUri({
          native: "your.app.scheme://kakao-auth",
        }),
      },
      {
        authorizationEndpoint: "https://kauth.kakao.com/oauth/authorize",
        tokenEndpoint: "https://kauth.kakao.com/oauth/token",
      }
    );

  // 애플 로그인
  const [appleRequest, appleResponse, applePromptAsync] =
    AuthSession.useAuthRequest(
      {
        responseType: ResponseType.IdToken,
        clientId: Constants.manifest?.extra?.appleClientId as string,
        scopes: ["name", "email"],
        redirectUri: AuthSession.makeRedirectUri({
          native: "your.app.scheme://apple-auth",
        }),
      },
      {
        authorizationEndpoint: "https://appleid.apple.com/auth/authorize",
      }
    );

  useEffect(() => {
    if (kakaoResponse?.type === "success") {
      const { code } = kakaoResponse.params;
      console.log("Kakao login successful, code:", code);
      // 여기서 백엔드 서버로 코드를 보내 액세스 토큰을 받아야 합니다.
      // 그 후 Firebase Custom Auth를 사용하여 인증을 완료해야 합니다.
    }
  }, [kakaoResponse]);

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
