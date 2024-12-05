import { TextHeader2 } from "../designGuide";
import InBox from "./InBox";

export const TextBox_header2 = ({ weight, children, ...args }) => {
  return (
    <InBox
      sx={{
        display: "flex",
        justifyContent: "start",
        textAlign: "start",
        marginTop: "24px",
        marginBottom: "32px",
        whiteSpace: "pre-wrap",
      }}
      {...args}
    >
      {/* {typeof children === "string" ? ( */}
      <TextHeader2 weight={weight} color="Black.main">
        {children}
      </TextHeader2>
      {/* ) : (
        children
      )} */}
    </InBox>
  );
};
