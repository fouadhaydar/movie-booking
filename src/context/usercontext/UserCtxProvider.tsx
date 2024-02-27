import { FC, ReactElement, useCallback, useState } from "react";
import { UserCtx } from "./userContext";

type UserContextProviderType = {
  children: ReactElement;
};
export const UserContextProvider: FC<UserContextProviderType> = ({
  children,
}) => {
  const [userData, setUserData] = useState<{
    sessionId: undefined | string;
    userName: undefined | string;
  }>({
    sessionId: undefined,
    userName: undefined,
  });

  const setNewUser = useCallback((sessionId?: string, userName?: string) => {
    console.log("userdata");
    setUserData({
      sessionId: sessionId ?? undefined,
      userName: userName ?? undefined,
    });
  }, []);

  return (
    <UserCtx.Provider
      value={{
        userName: userData.userName,
        sessionId: userData.sessionId,
        setUserInfo: setNewUser,
      }}
    >
      {children}
    </UserCtx.Provider>
  );
};
