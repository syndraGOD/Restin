import React from "react";
import InBox from "./InBox";
import { TextHeader2 } from "../designGuide";
import FullBox from "./FullBox";

const HeaderText = ({ children, ...props }) => {
  return (
    <FullBox {...props} className="divJCC">
      <InBox className="divJCC" sx={{ alignItems: "start" }}>
        <TextHeader2
          sx={{ margin: "5px 0", alignItems: "start" }}
          color="InfoDark"
        >
          {children}
        </TextHeader2>
      </InBox>
    </FullBox>
  );
};

export default HeaderText;
