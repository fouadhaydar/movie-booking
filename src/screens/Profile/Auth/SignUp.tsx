import { Button, Pressable, TouchableOpacity, View } from "react-native";
import React, { FC, useCallback, useState } from "react";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../../../Navigations/NavigationType";
import { Formik } from "formik";
import { Ionicons } from "@expo/vector-icons";
import { StyeldText, StyledView } from "../../../StyledComponent";
import CustomeBtn from "../../../components/CustomeBtn";
import { signUp } from "./Validation";
import CustomInput from "../../../components/CustomInput";

type SignUpScreenNavigationProp = StackNavigationProp<RootStackParamList>;
type SignUpType = {
  navigation: SignUpScreenNavigationProp;
};

interface MyFormValues {
  "user Name": string;
  Email: string;
  Password: string;
}

const SignUp: FC<SignUpType> = ({ navigation }) => {
  const [show, setShow] = useState(false);
  const handleEye = useCallback(() => {
    setShow((prev) => !prev);
  }, []);
  const initialValues: MyFormValues = {
    "user Name": "",
    Email: "",
    Password: "",
  };

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
        validationSchema={signUp}
      >
        {() => {
          return (
            <StyledView className="justify-end h-full gap-y-12 pb-20">
              <StyledView style={{ gap: 16 }}>
                <CustomInput filed={"User Name"} icon="person" />
                <CustomInput filed={"Email"} icon="mail" />
                <CustomInput
                  filed={"Password"}
                  show={show}
                  pressIcon={handleEye}
                  icon={show ? "eye-off" : "eye"}
                />
              </StyledView>
              <StyledView
                style={{
                  gap: 16,
                }}
                className="w-[90%] mx-auto"
              >
                <CustomeBtn title={"Sign Up"} handlePress={() => {}} />
                <CustomeBtn
                  title={"Sign Up By Google"}
                  handlePress={() => {}}
                />
              </StyledView>
              <StyeldText
                className=" text-blue-600 text-[16px] text-center"
                onPress={() => {
                  navigation.navigate("logIn");
                }}
              >
                Log In To Your Existing Account
              </StyeldText>
            </StyledView>
          );
        }}
      </Formik>
    </View>
  );
};

export default SignUp;
