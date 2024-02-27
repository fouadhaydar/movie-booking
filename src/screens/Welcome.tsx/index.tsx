import {
  Image,
  Modal,
  FlatList,
  ScrollView,
  Dimensions,
  View,
  Text,
} from "react-native";
import React, { FC, useCallback, useState } from "react";
import { Container, StyeldText, StyledView } from "../../StyledComponent";
import CustomeBtn from "../../components/CustomeBtn";
import { BottomTabNavigationProp } from "@react-navigation/bottom-tabs";
import { RootStackParamList } from "../../Navigations/NavigationType";
import NowPlayingCard from "../../components/NowPlayingCard";
import { Screen } from "react-native-screens";
import { useFetchData } from "../../hooks/useFetchMovies";
import { Data } from "src/hooks/Data";

type WlecomeScreenNavigationProp = BottomTabNavigationProp<RootStackParamList>;
type WelcomeType = {
  navigation: WlecomeScreenNavigationProp;
};

const Welcome: FC<WelcomeType> = ({ navigation }) => {
  const [modalVisible, setModalVisible] = useState(true);

  const { data, isFetching, isError, isFetched } = useFetchData<Data>(
    "https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=1",
    "Now playing"
  );

  const closeModale = useCallback(() => {
    setModalVisible(false);
  }, []);
  if (isError) {
    return (
      <View>
        <Text>Error</Text>
      </View>
    );
  }
  if (isFetched) {
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
              {data?.results.map((ele) => (
                <StyledView className="items-center" key={ele.id}>
                  <StyledView
                    style={{
                      paddingHorizontal: 10,
                    }}
                  >
                    <NowPlayingCard Movie={ele} closeModal={closeModale} />
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
  }
};

export default Welcome;
