import { storage } from "./firebaseConfig";
import { ref, getDownloadURL, listAll } from "firebase/storage";

export const getImg = async (Ref) => {
  const pathRef = ref(storage, Ref);
  const imageURL = await getDownloadURL(pathRef);
  return imageURL;
};
export const getImgList = async (Ref) => {
  const pathRef = ref(storage, Ref);
  const a = await listAll(pathRef);
  return a;
};
