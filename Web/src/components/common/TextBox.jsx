import { TextHeader2 } from "../designGuide";
import InBox from "./InBox";

export const TextBox_header2 = ({ children, ...args }) => {
  return (
    <InBox
      sx={{
        display: "flex",
        justifyContent: "start",
        textAlign: "start",
        marginTop: "24px",
        marginBottom: "32px",
      }}
      {...args}
    >
      <TextHeader2 color="Black.main">{children}</TextHeader2>
    </InBox>
  );
};
