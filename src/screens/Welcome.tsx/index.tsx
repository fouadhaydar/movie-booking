import { Image, Modal, FlatList, ScrollView, Dimensions } from "react-native";
import React, { FC, useCallback, useState } from "react";
import { Container, StyeldText, StyledView } from "../../StyledComponent";
import CustomeBtn from "../../components/CustomeBtn";
import { BottomTabNavigationProp } from "@react-navigation/bottom-tabs";
import { RootStackParamList } from "../../Navigations/NavigationType";
import NowPlayingCard from "../../components/NowPlayingCard";
import { Screen } from "react-native-screens";

type WlecomeScreenNavigationProp = BottomTabNavigationProp<RootStackParamList>;
type WelcomeType = {
  navigation: WlecomeScreenNavigationProp;
};

const Welcome: FC<WelcomeType> = ({ navigation }) => {
  const [modalVisible, setModalVisible] = useState(true);
  const closeModale = useCallback(() => {
    setModalVisible(false);
  }, []);
  return (
    <Modal
      animationType="slide"
      visible={modalVisible}
      onRequestClose={() => {
        setModalVisible(!modalVisible);
      }}
      presentationStyle="formSheet"
    >
      <Container>
        <StyledView className="h-[70%]">
          <StyeldText className="text-2xl font-bold text-center py-10">
            Mooboking
          </StyeldText>
          {/* try to show about top 5 */}
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {["1", "2", "3", "4"].map((ele) => (
              <StyledView className="items-center">
                <StyledView
                  style={{
                    paddingHorizontal: 10,
                  }}
                  key={ele}
                >
                  <NowPlayingCard id={ele} closeModal={closeModale} />
                </StyledView>
              </StyledView>
            ))}
          </ScrollView>
        </StyledView>
        <Container className="h-[30%]" style={{ gap: 16 }}>
          <CustomeBtn
            title={"Sign In"}
            handlePress={() => {
              setModalVisible(false);
              navigation.navigate("logIn");
            }}
          />
          <CustomeBtn
            title={"Sign Up"}
            handlePress={() => {
              setModalVisible(false);
              navigation.navigate("signUp");
            }}
          />
          <StyeldText
            className="text-blue-600 text-[16px] text-center py-1"
            onPress={() => {
              setModalVisible(false);
              navigation.navigate("Main");
            }}
          >
            Skipe For Now
          </StyeldText>
        </Container>
      </Container>
    </Modal>
  );
};

export default Welcome;
