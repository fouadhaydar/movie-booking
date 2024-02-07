import React, { FC } from "react";
import { StyeldText, StyledView, TextInputStyled } from "../StyledComponent";
import { useFormikContext } from "formik";
import { Ionicons } from "@expo/vector-icons";
import { InputModeOptions } from "react-native";

type CustomInputType = {
  filed: "User Name" | "Email" | "Password";
  icon?: "mail" | "person" | "eye" | "eye-off";
  pressIcon?: () => void;
  show?: boolean;
};

const CustomInput: FC<CustomInputType> = ({ filed, icon, pressIcon, show }) => {
  type FormType = { "User Name": string; Email: string; Password: string };
  const { handleChange, values, handleBlur, errors, touched } =
    useFormikContext<FormType>();

  return (
    <StyledView className="w-[90%] mx-auto gap-y-1">
      <StyledView
        className={`rounded-full border-[1px] border-solid px-4 py-4 text-[16px] flex flex-row justify-between`}
        style={{
          borderColor: touched[filed] && errors[filed] ? "red" : "black",
        }}
      >
        <TextInputStyled
          onChangeText={handleChange(filed)}
          onBlur={handleBlur(filed)}
          value={values[filed]}
          placeholder={`${[filed]}`}
          className="w-[90%] mr-auto"
          maxLength={filed === "Password" ? 8 : 30}
          autoCapitalize="none"
          inputMode={filed === "Email" ? "email" : "text"}
          secureTextEntry={icon === "eye" && !show ? false : true}
        />
        {icon && (
          <Ionicons name={icon} color={"black"} size={24} onPress={pressIcon} />
        )}
      </StyledView>
      {touched[filed] && errors[filed] && (
        <StyeldText className="text-red-500 px-3 py-2">
          {errors[filed]}
        </StyeldText>
      )}
    </StyledView>
  );
};

export default CustomInput;
