import { createContext } from "react";
type DefaultValueType = {
  sessionId: string | undefined;
  userName: string | undefined;
  setUserInfo: (sessionId?: string, userName?: string) => void;
};
export const UserCtx = createContext<DefaultValueType>({
  sessionId: undefined,
  userName: undefined,
  setUserInfo: () => {},
});
