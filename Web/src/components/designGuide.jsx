import { styled } from "@mui/system";
import { Typography } from "@mui/material";

const Weight = {
  Reguler: 300,
  Medium: 500,
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
  letter-spacing: -0.8%;
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
