import { Image, SafeAreaView, ScrollView } from "react-native";
import { FC, useEffect, useState } from "react";
import { Container, StyeldText, StyledView } from "../../StyledComponent";
import { Ionicons } from "@expo/vector-icons";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../../Navigations/NavigationType";
import { RouteProp } from "@react-navigation/native";
import ReviewCard from "./components/ReviewCard";
import CustomeBtn from "../../components/CustomeBtn";
import { useFetchData } from "src/hooks/useFetchMovies";
import { MovieDetail } from "src/hooks/Data";
import { REACT_APP_API_BASE_URL } from "@env";
import { baseImagePath } from "src/util/util";

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
  const { data, isError } = useFetchData<MovieDetail>(
    `${REACT_APP_API_BASE_URL}/movie/${route.params.id}?language=en-US`,
    `Details-${route.params.id}`
  );

  if (isError) {
    return (
      <StyledView>
        <StyeldText>Some error was append</StyeldText>
      </StyledView>
    );
  } else {
    const ReviewData = {
      title: data?.title || "",
      time: "",
      date: data?.release_date || "",
      review: data?.vote_average || "No Review Yet",
      trailerUrl: data?.video || "",
    };
    return (
      <ScrollView>
        <StyledView>
          {/* <Ionicons
            name="arrow-back"
            size={24}
            color="black"
            style={{
              marginLeft: 10,
              top: 50,
              zIndex: 10,
              color: "white",
            }}
            onPress={() => {
              navigation.navigate("Main");
            }}
          /> */}
          <StyledView>
            <Image
              source={{
                uri: baseImagePath("w780", data?.poster_path || ""),
              }}
              style={{
                width: "100%",
                height: 500,
              }}
            />
          </StyledView>
        </StyledView>
        <Container className="gap-y-5 mt-[24px]">
          <ReviewCard {...ReviewData} />
          <StyledView className="gap-y-2">
            <StyledView className="flex-row gap-x-1">
              <StyeldText>Movie Genre:</StyeldText>
              {data?.genres.map((genre, index) => {
                return (
                  <StyeldText className="text-gray-700" key={genre.id}>
                    {genre.name}
                    {index !== data.genres.length - 1 ? "," : "."}
                  </StyeldText>
                );
              })}
            </StyledView>
            <StyeldText className="text-gray-700">
              Censorship:{" "}
              <StyeldText className="font-bold text-black "> 13 + </StyeldText>
            </StyeldText>
            <StyeldText className="font-bold text-blackflex-row">
              Spoken Languages:{" "}
              {data?.spoken_languages.map((lan, index) => (
                <StyeldText
                  className=" font-normal text-gray-700"
                  key={lan.name}
                >
                  {" "}
                  {lan.name}
                  {index !== data.spoken_languages.length - 1 ? "," : "."}
                </StyeldText>
              ))}
            </StyeldText>
          </StyledView>
          <StyledView className="gap-y-2">
            <StyeldText className="font-bold text-xl">Overview</StyeldText>
            <StyeldText>{data?.overview}</StyeldText>
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
            <CustomeBtn
              title={"Select a Seat"}
              handlePress={() => {
                navigation.navigate("buyTickets", { id: route.params.id });
              }}
            />
          </StyledView>
        </Container>
      </ScrollView>
    );
  }
};

export default Details;
