import { SafeAreaView } from "react-native";
import { FC } from "react";
import { Container, StyeldText, StyledView } from "../../StyledComponent";
import { Ionicons } from "@expo/vector-icons";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../../Navigations/NavigationType";
import { FlatList, ScrollView } from "react-native-gesture-handler";
import { RouteProp } from "@react-navigation/native";
import ReviewCard from "./components/ReviewCard";
import CustomeBtn from "../../components/CustomeBtn";

type DetailsCardNavigationProp = StackNavigationProp<
  RootStackParamList,
  "Main"
>;
// to get access of the route from react navigation
type DetailsScreenRoutProp = RouteProp<RootStackParamList, "details">;

type DetailsType = {
  navigation: DetailsCardNavigationProp;
  route: DetailsScreenRoutProp;
};

const Details: FC<DetailsType> = ({ navigation, route }) => {
  const data = {
    title: "",
    time: "",
    date: new Date(),
    review: 4,
    trailerUrl: "",
  };
  // TODO: fetch data using id comming form route
  return (
    <SafeAreaView>
      <ScrollView>
        <StyledView>
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
          <StyledView>
            <StyledView className="w-full bg-slate-300 h-[300px]" />
          </StyledView>
        </StyledView>
        <Container className="gap-y-5 mt-[24px]">
          <ReviewCard {...data} />
          <StyledView className="gap-y-2">
            <StyeldText className="text-gray-700">
              Moview Genre:{" "}
              <StyeldText className="font-bold text-black ">
                {" "}
                Action adventure, sci-fi{" "}
              </StyeldText>
            </StyeldText>
            <StyeldText className="text-gray-700">
              Censorship:{" "}
              <StyeldText className="font-bold text-black "> 13 + </StyeldText>
            </StyeldText>
            <StyeldText className="text-gray-700">
              Language:{" "}
              <StyeldText className="font-bold text-black ">
                {" "}
                English{" "}
              </StyeldText>
            </StyeldText>
          </StyledView>
          <StyledView className="gap-y-2">
            <StyeldText className="font-bold text-xl">Storyline</StyeldText>
            <StyeldText>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Odit sint
              nemo officia a laborum voluptatibus temporibus error in doloremque
              asperiores laboriosam nesciunt voluptatem, aliquid incidunt nulla!
              Quae nam dolores provident?
            </StyeldText>
          </StyledView>
          <StyledView className="gap-y-2">
            <StyeldText className="font-bold text-xl">Actors</StyeldText>
            <StyeldText>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Odit sint
              nemo officia a laborum voluptatibus temporibus error in doloremque
              asperiores laboriosam nesciunt voluptatem, aliquid incidunt nulla!
              Quae nam dolores provident?
            </StyeldText>
          </StyledView>
          <StyledView>
            <CustomeBtn title={"Buy Ticket"} handlePress={() => {}} />
          </StyledView>
        </Container>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Details;
