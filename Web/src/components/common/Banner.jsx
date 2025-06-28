import { Box } from "@mui/material";
import Slider from "react-slick/lib/slider";
import { restinAPI } from "../../api/config";
import { useSelector } from "react-redux";
import { useState, useEffect } from "react";

const settings = {
  dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
  useCSS: true,
  nextArrow: <></>, // nextn=button delete
};
export const AnnounceBanner = () => {
  const auth_Token = useSelector((state) => state.tokenR.verifiToken);
  const [AnnounceImgs, setAnnounceImgs] = useState([]);
  useEffect(() => {
    const getImgs = async () => {
      const res = await fetch(`${import.meta.env.VITE_RESTIN_API}/imgs/announce_list`, {
        mode: "cors",
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          authorization: "Bearer " + auth_Token,
        },
      });
      const RESjson = await res.json();
      const imgs = RESjson.data;
      console.log("imgs:", imgs);
      setAnnounceImgs(imgs);
    };
    getImgs();
  }, []);
  return (
    <Box>
      {/* <Slider {...settings}>
        {AnnounceImgs.map((URL, idx) => {
          if (idx === imgs.length - 1) return null;
          return (
            <div key={URL}>
              <img src={URL} alt="cafeImage" width={"100%"} />
            </div>
          );
        })}
      </Slider>
      <Box component="img" src></Box> */}
    </Box>
  );
};
