import { Text, View } from "react-native";
import React, { FC } from "react";
import { styled } from "nativewind";
import { Ionicons } from "@expo/vector-icons";
import ProfileSection from "./components/ProfileSection";
import CustomeBtn from "../../components/CustomeBtn";
import { Container, StyledView } from "../../StyledComponent";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../../Navigations/NavigationType";

type ProfileScreenNavigationProp = StackNavigationProp<RootStackParamList>;
type ProfileType = {
  navigation: ProfileScreenNavigationProp;
};

const ContainerView = styled(View, "flex flex-row");
const Avatar = styled(
  View,
  "border-[1px] border-solid border-[black] rounded-full w-20 h-20 items-center justify-center"
);

const Profile: FC<ProfileType> = ({ navigation }) => {
  return (
    <Container className="h-full justify-end gap-y-[100px] w-[90%] mx-auto">
      <ContainerView className="items-center">
        <ContainerView className="items-center w-full justify-center gap-5">
          <Avatar>
            <Ionicons name="person" size={24} color="black" />
          </Avatar>
          <View style={{ gap: 5 }}>
            <Text style={{ fontSize: 20, fontWeight: "bold" }}>
              {" "}
              Fouad Haydar
            </Text>
            <Text style={{ fontWeight: "bold", color: "gray" }}>
              fouadhaydar17@gmail.com
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
      <StyledView>
        <CustomeBtn title="Log Out" handlePress={() => {}} />
      </StyledView>
    </Container>
  );
};

export default Profile;
