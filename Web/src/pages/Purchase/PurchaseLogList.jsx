import { Box } from "@mui/material";
import FullBox from "../../components/common/FullBox";
import HeaderText from "../../components/common/HeaderText";
import InBox from "../../components/common/InBox";
import Navigation from "../../components/common/Navigation";
import {
  TextBodyLarge,
  TextHeader3,
  TextHeader4,
} from "../../components/designGuide";
import { Page } from "../../components/Page";
import HeaderInner from "../../components/common/HeaderInner";
import { DefaultBtn } from "@components/common/Btns";
import { useNavigate } from "react-router-dom";
import { restinAPI } from "../../api/config";
import { useDispatch, useSelector } from "react-redux";
import { setLoading } from "../../store/modules/varSlice";
import { useEffect } from "react";

const PurchaseLogList = () => {
  const verifiToken = useSelector((state) => state.tokenR.verifiToken);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(setLoading(true));
    const fetchData = async () => {
      try {
        const res = fetch(`${restinAPI}/usage/uselist`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${verifiToken}`,
          },
        });
        const data = await res.json();
        if (res.status === 200) {
          console.log(data);
        } else {
          console.log(data);
        }
      } catch (error) {
        console.log(error);
      }
      // setLoading(false);
    };
    fetchData();
  }, []);
  const navi = useNavigate();
  return (
    <Page sx={{ backgroundColor: "White.main" }}>
      <FullBox
        sx={{ display: "flex", flexDirection: "column", height: "100%" }}
      >
        <HeaderInner backArrow={false}>사용 내역</HeaderInner>
        <InBox
          className="divJCC"
          sx={{ flex: 1, backgroundColor: "White.main", m: 4 }}
        >
          <TextHeader4 color="Black.main">아직 사용 내역이 없어요</TextHeader4>
          {/* <TextHeader3 color="Black">카페 찾아보기</TextHeader3> */}
          <Box width={"52%"}>
            <DefaultBtn
              onClick={() => {
                navi("/app/home");
              }}
              sx={{ marginTop: 2 }}
            >
              카페 찾아보기
            </DefaultBtn>
          </Box>
        </InBox>
        <Box className="divJCC">
          <Navigation select={"purchase"} />
        </Box>
      </FullBox>
    </Page>
  );
};

export default PurchaseLogList;
