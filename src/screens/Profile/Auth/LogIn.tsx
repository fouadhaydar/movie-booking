import { View } from "react-native";
import { Formik } from "formik";
import { FC, useCallback, useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import { StyeldText, StyledView } from "../../../StyledComponent";
import CustomeBtn from "../../../components/CustomeBtn";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../../../Navigations/NavigationType";
import { logIn } from "./Validation";
import CustomInput from "../../../components/CustomInput";

interface MyFormValues {
  email: string;
  password: string;
}
type LogInScreenNavigationProp = StackNavigationProp<RootStackParamList>;

type LogInUpType = {
  navigation: LogInScreenNavigationProp;
};

export const LogIn: FC<LogInUpType> = ({ navigation }) => {
  const initialValues: MyFormValues = { email: "", password: "" };
  const [show, setShow] = useState(false);
  const handleEye = useCallback(() => {
    setShow((prev) => !prev);
  }, []);
  return (
    <View>
      <Ionicons
        name="arrow-back"
        size={24}
        color="black"
        style={{
          marginLeft: 10,
          top: 50,
          zIndex: 10,
        }}
        onPress={() => {
          navigation.navigate("Main");
        }}
      />
      <Formik
        initialValues={initialValues}
        onSubmit={(values, actions) => {
          console.log({ values, actions });
          alert(JSON.stringify(values, null, 2));
          actions.setSubmitting(false);
        }}
        validationSchema={logIn}
      >
        {() => (
          <StyledView className="justify-end h-full gap-y-12 pb-20">
            <StyledView style={{ gap: 16 }}>
              <CustomInput filed={"Email"} icon="mail" />
              <CustomInput
                filed={"Password"}
                icon={show ? "eye-off" : "eye"}
                pressIcon={handleEye}
                show={show}
              />
            </StyledView>

            <StyledView style={{ gap: 16 }} className="w-[90%] mx-auto">
              <CustomeBtn title={"Sign Up"} handlePress={() => {}} />
              <CustomeBtn title={"Sign Up By Google"} handlePress={() => {}} />
            </StyledView>
            <StyeldText
              className="text-blue-600 text-[16px] text-center"
              onPress={() => {
                navigation.navigate("signUp");
              }}
            >
              Create New Account
            </StyeldText>
          </StyledView>
        )}
      </Formik>
    </View>
  );
};

export default LogIn;
