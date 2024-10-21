import { storage } from "./firebaseConfig";
import { ref, getDownloadURL } from "firebase/storage";

export const getImg = async (Ref) => {
  const pathRef = ref(storage, Ref);
  const imageURL = await getDownloadURL(pathRef);
  return imageURL;
};
export const getImgAll = () => {};
