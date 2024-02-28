import { Text, View, Alert, Platform, SafeAreaView } from "react-native";
import React, { FC, useEffect, useState } from "react";
import { styled } from "nativewind";
import { Ionicons } from "@expo/vector-icons";
import ProfileSection from "./components/ProfileSection";
import CustomeBtn from "../../components/CustomeBtn";
import {
  Avatar,
  Container,
  ContainerView,
  StyledView,
} from "../../StyledComponent";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../../Navigations/NavigationType";
import * as WebBrowser from "expo-web-browser";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useInfoUser } from "src/context/usercontext/useInfoUser";
import { REACT_APP_API_BASE_URL, REACT_APP_MY_ACCOUNT_NUMBER } from "@env";
import { fetcheOptions, postOptions } from "src/hooks/useFetchMovies";

type ProfileScreenNavigationProp = StackNavigationProp<RootStackParamList>;
type ProfileType = {
  navigation: ProfileScreenNavigationProp;
};

const Profile: FC<ProfileType> = ({ navigation }) => {
  const { setUserInfo, userName, sessionId } = useInfoUser();

  const generateRequestTokenOrSessionId = async (
    url: string,
    options: typeof fetcheOptions,
    token: boolean
  ) => {
    try {
      const res = await fetch(url, options);
      const data = await res.json();
      if (token) {
        console.log("data => ", data["success"] ? data["request_token"] : "");
        return data["success"] ? data["request_token"] : "";
      } else {
        return data["success"] ? data["session_id"] : "";
      }
    } catch (err) {
      console.log(err);
    }
  };
  const openWebTab = async (url: string) => {
    try {
      const res = await WebBrowser.openAuthSessionAsync(url);
      return res;
    } catch (err) {
      console.log(err);
    }
  };
  const getUserInfo = async (url: string, options: typeof fetcheOptions) => {
    const res = await fetch(url, options);
    const userData = await res.json();
    return userData;
  };

  const storeSession = async (value: string) => {
    try {
      let data;
      data = JSON.stringify({
        sessionId: value,
      });
      setUserInfo(value);
      await AsyncStorage.setItem("sessions", data);
    } catch (e) {
      console.log(e);
    }
  };
  const getSession = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem("sessions");
      return jsonValue != null ? JSON.parse(jsonValue) : null;
    } catch (e) {
      console.log(e);
    }
  };

  const auth = async () => {
    const url = `${REACT_APP_API_BASE_URL}/authentication/token/new`;
    const url2 = `${REACT_APP_API_BASE_URL}/authentication/session/new`;

    const postOpions: typeof fetcheOptions = {
      ...postOptions,
    };

    try {
      const token = await generateRequestTokenOrSessionId(
        url,
        fetcheOptions,
        true
      );
      await openWebTab(`https://www.themoviedb.org/authenticate/${token}`);
      const sessionId = await generateRequestTokenOrSessionId(
        url2,
        {
          ...postOpions,
          body: JSON.stringify({
            request_token: token,
          }),
        },
        false
      );
      await storeSession(sessionId);
    } catch (err) {
      console.log(err);
    }
  };

  const autoAuth = async () => {
    try {
      let session = await getSession();
      console.log("sessionId => ", session["sessionId"]);
      setUserInfo(session["sessionId"]);
    } catch (e) {
      console.log(e);
    }
  };
  useEffect(() => {
    if (!sessionId) autoAuth();
    else {
      getUserInfo(
        `${REACT_APP_API_BASE_URL}/account/${REACT_APP_MY_ACCOUNT_NUMBER}?session_id=${sessionId}`,
        fetcheOptions
      ).then((res) => setUserInfo(sessionId, res["username"]));
    }
  }, [sessionId]);

  const logOut = async () => {
    try {
      await AsyncStorage.clear();
      setUserInfo(undefined, undefined);
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <SafeAreaView style={{ width: "100%", height: "100%" }}>
      <Container className="h-full justify-end gap-y-[100px] w-[90%] mx-auto">
        <ContainerView className="items-center">
          <ContainerView className="items-center w-full justify-center gap-5">
            <Avatar>
              <Ionicons name="person" size={24} color="black" />
            </Avatar>
            <View style={{ gap: 5 }}>
              <Text style={{ fontSize: 20, fontWeight: "bold" }}>
                {" "}
                {userName ?? "User Name"}
              </Text>
            </View>
          </ContainerView>
        </ContainerView>
        <StyledView
          style={{
            gap: 70,
          }}
          className="justify-start items-center"
        >
          <ProfileSection
            title={"Payment history"}
            iconName={"cart"}
            navigate={() => {
              navigation.navigate("Payment History");
            }}
          />
          <ProfileSection title={"Toggle Mode"} iconName={"settings"} dark />
          <ProfileSection
            title={"Account"}
            iconName={"person"}
            navigate={() => navigation.navigate("signUp")}
          />
        </StyledView>
        {sessionId && (
          <StyledView>
            <CustomeBtn title="Log Out" handlePress={logOut} />
          </StyledView>
        )}
        {!sessionId && (
          <StyledView>
            <CustomeBtn title="Sign In With TMDB" handlePress={auth} />
          </StyledView>
        )}
      </Container>
    </SafeAreaView>
  );
};

export default Profile;

// const auth = async (request_token: string) => {
//   const url = `https://www.themoviedb.org/authenticate/${request_token}?redirect_to=com.moovie`;
//   // const res = await WebBrowser.openAuthSessionAsync(url, rediretTo);

//   try {
//     const supported = await Linking.openURL(url);
//     console.log("supported => ", supported);
//   } catch (err) {
//     console.log(err);
//   }
// };

// const { data: userToken } = useQuery<{
//   expires_at: string;
//   request_token: string;
//   success: boolean;
// }>({
//   queryKey: ["token"],
//   queryFn: async () => {
//     try {
//       const res = await fetch(
//         "https://api.themoviedb.org/3/authentication/token/new",
//         options
//       );
//       const r = await res.json();
//       setToken(r["request_token"]);
//       return r;
//     } catch (error) {
//       console.log(error);
//     }
//   },
//   enabled: getToken,
// });
// console.log("token => ", token);

// useEffect(() => {
//   if (userToken) {
//     auth(userToken["request_token"]);
//   }
// }, [userToken]);
{
  /* {token && (
        <WebView
          source={{
            uri: `https://www.themoviedb.org/authenticate/${token}`,
          }}
          onError={() => console.log("error")}
        />
      )} */
}

// handlePress={async () => {
//   if (Platform.OS === "android") {
//     try {
//       // const available = await Linking.canOpenURL(
//       //   "android.intent.action.VIEW"
//       // );
//       await Linking.sendIntent(
//         "android.intent.action.POWER_USAGE_SUMMARY"
//       );
//       // if (available) {
//       //   // console.log("availble", available);
//       //   // await Linking.sendIntent(
//       //   //   "android.intent.action.POWER_USAGE_SUMMARY"
//       //   // );
//       // } else {
//       //   Alert.alert(
//       //     "Not Available",
//       //     "Power Usage Summary feature is not available on this device."
//       //   );
//       // }
//     } catch (err) {
//       console.error("Error launching intent:", err);
//       Alert.alert("Error", "Failed to open Power Usage Summary.");
//     }
//   } else {
//     Alert.alert(
//       "Android Only",
//       "This feature is only available on Android devices."
//     );
//   }
// }}

// useEffect(() => {
//   const listener = Linking.addEventListener(
//     "url",
//     (event: { url: string }) => {
//       console.log(event.url);
//     }
//   );
//   return () => {
//     console.log("remove");
//     listener.remove();
//   };
// }, []);

// async () => {
//   const googleUrl = "https://google.com";
//   try {
//     const bol = await Linking.canOpenURL(googleUrl);
//     if (bol) {
//       Linking.openURL(googleUrl);
//     } else {
//       Alert.alert(`Don't know how to open this URL: ${googleUrl}`);
//     }
//   } catch (err) {}
// }
