const sendMessageToRN = (message) => {
  if (typeof window !== "undefined" && window.ReactNativeWebView) {
    window.ReactNativeWebView.postMessage(JSON.stringify(message));
  } else {
    console.log("웹뷰가 아입니다!");
  }
};

export { sendMessageToRN };
