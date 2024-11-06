module.exports = {
  env: {
    es6: true,
    node: true,
  },
  parserOptions: {
    ecmaVersion: 2020,
  },

  extends: ["eslint:recommended", "google"],
  rules: {
    "linebreak-style": "off", // LF/CRLF 관련 경고 무시
    // quotes: ["error", "double", { avoidEscape: true }], // 따옴표 관련 규칙 완화
    "object-curly-spacing": ["error", "always"], // 중괄호 안쪽 간격 일관성
    "quote-props": ["error", "as-needed"], // 필요한 경우에만 속성에 따옴표 사용
    "no-console": "off", // console.log 허용
    "no-unused-vars": "off", // 사용하지 않는 변수는 경고로 표시
    "spaced-comment": ["off"],
    "no-unused-expressions": "off",
    "require-jsdoc": "off",
    quotes: ["off"],
    "max-len": ["off"],
    camelcase: "off",
    "new-cap": "off",
  },

  overrides: [
    {
      files: ["**/*.spec.*"],
      env: {
        mocha: true,
      },
      rules: {},
    },
  ],
  globals: {},
};
