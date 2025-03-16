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

const PointLogItem = ({
  storeUUID,
  description,
  date,
  changePoint,
  afterPoint,
  isDelete,
  pointLogList,
  setPointLogList,
}) => {
  const verifiToken = useSelector((state) => state.tokenR.verifiToken);
  const storeData = useSelector((state) => state.storeR.storeData);
  let storeName;
  if (storeUUID) {
    storeName = storeData.find((item) => item.UUID === storeUUID)?.name;
    storeName =
      storeName === undefined || storeName === null || storeName === ""
        ? "삭제된 가게"
        : storeName;
  } else {
    storeName = description;
  }
  const cancelCharge = async () => {
    const res = await fetch(`${restinAPI}/point/request/charge`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${verifiToken}`,
      },
    });
    const resData = await res.json();
    if (res.status === 200) {
      console.log("충전 취소 성공");
      setPointLogList(pointLogList.filter((i, idx) => idx !== 0));
    } else {
      console.log(resData.error);
    }
  };
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
  if (changePoint > 0) {
    changePoint = `+ ${changePoint}`;
  } else {
    changePoint = `- ${changePoint * -1}`;
  }
  return (
    <Box sx={styles.mainBox}>
      <Box sx={styles.topBox}>
        <TextBodyLarge weight="Bold">{storeName}</TextBodyLarge>
        <TextBodyLarge weight="Bold">{changePoint}</TextBodyLarge>
      </Box>
      <Box sx={styles.bottomBox}>
        {date ? (
          <TextBodySmall color="Gray.c600">{date}</TextBodySmall>
        ) : (
          <TextBodySmall color="Gray.c600"></TextBodySmall>
        )}
        {isDelete ? (
          <TextBodySmall color="PrimaryBrand.main" onClick={cancelCharge}>
            {"충전 취소하기  >"}
          </TextBodySmall>
        ) : (
          <TextBodySmall color="Gray.c600">
            잔여 포인트 {afterPoint}
          </TextBodySmall>
        )}
      </Box>
      <Boxs variant="TextLine" />
    </Box>
  );
};

const PointLogList = () => {
  const verifiToken = useSelector((state) => state.tokenR.verifiToken);

  const loading = useSelector((state) => state.varR.loading);
  const dispatch = useDispatch();
  const [pointLogList, setPointLogList] = useState([]);
  useEffect(() => {
    dispatch(setLoading(true));
    const fetchData = async () => {
      try {
        const res = await fetch(`${restinAPI}/point/loglist`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${verifiToken}`,
          },
        });
        const resData = await res.json();
        if (res.status === 200) {
          setPointLogList(resData.data);
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
        <HeaderInner backArrow={true}>포인트 내역</HeaderInner>

        {!loading ? (
          pointLogList.length > 0 ? (
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
              {pointLogList.map((item) => {
                // console.log(item);
                return (
                  <PointLogItem
                    key={uuidv4()}
                    {...item}
                    pointLogList={pointLogList}
                    setPointLogList={setPointLogList}
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
              }}
            >
              <TextHeader4 color="Black.main">
                아직 포인트 내역이 없어요
              </TextHeader4>
            </InBox>
          )
        ) : (
          <Boxs variant="EmptyBox" />
        )}
      </FullBox>
    </Page>
  );
};

export default PointLogList;
