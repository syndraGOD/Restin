import { styled } from "@mui/system";
import { Typography } from "@mui/material";
/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";

const Weight = {
  Reguler: 300,
  Medium: 400,
  Bold: 700,
};
export const TextTitle1 = styled(Typography)`
  font-family: NotoSansKR, sans-serif, Arial;
  font-weight: ${({ weight }) => (weight ? Weight[weight] : Weight.Medium)};
  font-size: 40px;
  letter-spacing: -1.2%;
`;
export const TextTitle2 = styled(Typography)`
  font-family: NotoSansKR, sans-serif, Arial;
  font-weight: ${({ weight }) => (weight ? Weight[weight] : Weight.Medium)};
  font-size: 36px;
  letter-spacing: -1.2%;
`;
export const TextTitle3 = styled(Typography)`
  font-family: NotoSansKR, sans-serif, Arial;
  font-weight: ${({ weight }) => (weight ? Weight[weight] : Weight.Medium)};
  font-size: 32px;
  letter-spacing: -1.2%;
`;
export const TextHeader1 = styled(Typography)`
  font-family: NotoSansKR, sans-serif, Arial;
  font-weight: ${({ weight }) => (weight ? Weight[weight] : Weight.Medium)};
  font-size: 28px;
  letter-spacing: -0.8%;
`;

export const TextHeader2 = styled(Typography)`
  font-family: NotoSansKR, sans-serif, Arial;
  font-weight: ${({ weight }) => (weight ? Weight[weight] : Weight.Medium)};
  font-size: 24px;
  letter-spacing: -0.8;
`;
export const TextHeader3 = styled(Typography)`
  font-family: NotoSansKR, sans-serif, Arial;
  font-weight: ${({ weight }) => (weight ? Weight[weight] : Weight.Medium)};
  font-size: 20px;
  letter-spacing: -0.8%;
`;
export const TextHeader4 = styled(Typography)`
  font-family: NotoSansKR, sans-serif, Arial;
  font-weight: ${({ weight }) => (weight ? Weight[weight] : Weight.Medium)};
  font-size: 18px;
  letter-spacing: -0.8%;
`;
export const TextBodyLarge = styled(Typography)`
  font-family: NotoSansKR, sans-serif, Arial;
  font-weight: ${({ weight }) => (weight ? Weight[weight] : Weight.Medium)};
  font-size: 16px;
  letter-spacing: 0%;
`;
export const TextBody = styled(Typography)`
  font-family: NotoSansKR, sans-serif, Arial;
  font-weight: ${({ weight }) => (weight ? Weight[weight] : Weight.Medium)};
  font-size: 14px;
  letter-spacing: 0%;
`;
export const TextBodySmall = styled(Typography)`
  font-family: NotoSansKR, sans-serif, Arial;
  font-weight: ${({ weight }) => (weight ? Weight[weight] : Weight.Medium)};
  font-size: 12px;
  letter-spacing: 0%;
`;

export const style_TextTitle1 = css`
  font-family: NotoSansKR, sans-serif, Arial;
  font-size: 40px;
  letter-spacing: -1.2%;
`;
export const style_TextTitle2 = css`
  font-family: NotoSansKR, sans-serif, Arial;
  font-size: 36px;
  letter-spacing: -1.2%;
`;
export const style_TextTitle3 = css`
  font-family: NotoSansKR, sans-serif, Arial;
  font-size: 32px;
  letter-spacing: -1.2%;
`;
export const style_TextHeader1 = css`
  font-family: NotoSansKR, sans-serif, Arial;
  font-size: 28px;
  letter-spacing: -0.8%;
`;

export const style_TextHeader2 = css`
  font-family: NotoSansKR, sans-serif, Arial;
  font-size: 24px;
  letter-spacing: -0.8%;
`;
export const style_TextHeader3 = css`
  font-family: NotoSansKR, sans-serif, Arial;
  font-size: 20px;
  letter-spacing: -0.8%;
`;
export const style_TextHeader4 = css`
  font-family: NotoSansKR, sans-serif, Arial;
  font-size: 18px;
  letter-spacing: -0.8%;
`;
export const style_TextBodyLarge = css`
  font-family: NotoSansKR, sans-serif, Arial;
  font-size: 16px;
  letter-spacing: 0%;
`;
export const style_TextBody = css`
  font-family: NotoSansKR, sans-serif, Arial;
  font-size: 14px;
  letter-spacing: 0%;
`;
export const style_TextBodySmall = css`
  font-family: NotoSansKR, sans-serif, Arial;
  font-size: 12px;
  letter-spacing: 0%;
`;

export const Boxs = styled("div", {
  name: "MuiBoxs",
  overridesResolver: (props, styles) => {
    return [styles.root];
  },
})();
// export const Badges = styled("div", {
//   name: "MuiBoxs",
//   overridesResolver: (props, styles) => {
//     return [styles.root];
//   },
// })();
