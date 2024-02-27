import { useContext } from "react";
import { UserCtx } from "./userContext";

export const useInfoUser = () => {
  const { userName, sessionId, setUserInfo } = useContext(UserCtx);
  return { userName, sessionId, setUserInfo };
};
