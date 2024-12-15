import { Box } from "@mui/material";
import FullBox from "../../components/common/FullBox";
import InBox from "../../components/common/InBox";
import Navigation from "../../components/common/Navigation";
import {
  Boxs,
  TextBodyLarge,
  TextBodySmall,
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
import { useEffect, useState } from "react";
import { ImportExport } from "@mui/icons-material";
import { v4 as uuidv4 } from "uuid";

const PurchaseLogItem = ({
  storeUUID,
  // description,
  date,
  changePoint,
  // afterPoint,
  // isDelete,
  purchaseLogList,
  setPurchaseLogList,
}) => {
  const verifiToken = useSelector((state) => state.tokenR.verifiToken);
  const storeData = useSelector((state) => state.storeR.storeData);
  let storeName;
  if (storeUUID) {
    storeName = storeData.find((item) => item.UUID === storeUUID).name;
  } else {
    storeName = "카페 이용";
  }
  const styles = {
    mainBox: {
      width: "100%",
      height: "66px",
      boxSizing: "border-box",
      display: "flex",
      flexDirection: "column",
      //간격?
      gap: 1,
      mb: 1,
    },
    topBox: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
    },
    bottomBox: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
    },
  };
  // if (changePoint > 0) {
  //   changePoint = `+ ${changePoint}`;
  // } else {
  //   changePoint = `- ${changePoint * -1}`;
  // }
  return (
    <Box sx={styles.mainBox}>
      <Box sx={styles.topBox}>
        <TextBodyLarge weight="Bold">{storeName}</TextBodyLarge>
        <TextBodyLarge weight="Bold">{changePoint}원</TextBodyLarge>
      </Box>
      <Box sx={styles.bottomBox}>
        {date ? (
          <TextBodySmall color="Gray.c600">{date}</TextBodySmall>
        ) : (
          <TextBodySmall color="Gray.c600"></TextBodySmall>
        )}
        <TextBodySmall color="Gray.c600">
          {/* 잔여 포인트 {afterPoint} */}
        </TextBodySmall>
      </Box>
      <Boxs variant="TextLine" />
    </Box>
  );
};

const PurchaseLogList = () => {
  const verifiToken = useSelector((state) => state.tokenR.verifiToken);
  const dispatch = useDispatch();
  const [purchaseLogList, setPurchaseLogList] = useState([]);
  useEffect(() => {
    dispatch(setLoading(true));
    const fetchData = async () => {
      try {
        const res = await fetch(`${restinAPI}/purchase/loglist`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${verifiToken}`,
          },
        });
        const resData = await res.json();
        if (res.status === 200) {
          setPurchaseLogList(resData.data);
          console.log(resData.data);
        } else {
          console.log(resData.error);
        }
      } catch (error) {
        console.log(error);
      }
      dispatch(setLoading(false));
    };
    fetchData();
  }, []);
  const navi = useNavigate();
  return (
    <Page sx={{ backgroundColor: "White.main" }}>
      <FullBox
        sx={{ display: "flex", flexDirection: "column", height: "100%" }}
      >
        <HeaderInner backArrow={false}>포인트 내역</HeaderInner>
        {purchaseLogList.length > 0 ? (
          <InBox
            sx={{
              my: 3,
              flex: 1,
              backgroundColor: "White.main",
              overflowY: "auto",
              "&::-webkit-scrollbar": {
                display: "none",
              },
            }}
          >
            {purchaseLogList.map((item) => {
              console.log(item);
              return (
                <PurchaseLogItem
                  key={uuidv4()}
                  {...item}
                  purchaseLogList={purchaseLogList}
                  setPurchaseLogList={setPurchaseLogList}
                />
              );
            })}
          </InBox>
        ) : (
          <InBox
            sx={{
              display: "flex",
              justifyContent: "center",
              alignContent: "center",
              flexDirection: "column",
              textAlign: "center",
              flex: 1,
              backgroundColor: "White.main",
              m: 4,
            }}
          >
            <TextHeader4 color="Black.main">
              아직 이용 내역이 없어요
            </TextHeader4>
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
        )}
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignContent: "center",
            flexDirection: "column",
            textAlign: "center",
          }}
        >
          <Navigation select={"purchase"} />
        </Box>
      </FullBox>
    </Page>
  );
};

export default PurchaseLogList;
