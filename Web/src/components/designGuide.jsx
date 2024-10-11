import { styled } from "@mui/system";
import { Typography } from "@mui/material";

const Bold = 700;
const Medium = 500;
export const TextHeader1 = styled(Typography)`
  font-family: NotoSansKR, sans-serif, Arial;
  font-weight: ${Bold};
  font-size: 40px;
  letter-spacing: -2%;
`;

export const TextTitle = TextHeader1;
export const TextHeader2 = styled(Typography)`
  font-family: NotoSansKR, sans-serif, Arial;
  font-weight: ${Bold};
  font-size: 28px;
  letter-spacing: -2%;
`;
export const TextHeader3 = styled(Typography)`
  font-family: NotoSansKR, sans-serif, Arial;
  font-weight: ${Bold};
  font-size: 24px;
  letter-spacing: -2%;
`;
export const TextBodyLarge = styled(Typography)`
  font-family: NotoSansKR, sans-serif, Arial;
  font-weight: ${Medium};
  font-size: 20px;
`;
export const TextBody = styled(Typography)`
  font-family: NotoSansKR, sans-serif, Arial;
  font-weight: ${Medium};
  font-size: 14px;
  line-height: 1.4;
`;
export const TextBodySmall = styled(Typography)`
  font-family: NotoSansKR, sans-serif, Arial;
  font-weight: ${Medium};
  font-size: 12px;
  line-height: 1.4;
`;
export const TextBold = styled(Typography)`
  font-family: NotoSansKR, sans-serif, Arial;
  font-weight: ${Bold};
`;
export const TextBtnText = styled(Typography)`
  font-family: NotoSansKR, sans-serif, Arial;
  font-weight: ${Bold};
  font-size: 24px;
  letter-spacing: 3%;
`;
