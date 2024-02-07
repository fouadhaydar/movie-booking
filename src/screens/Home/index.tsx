import React, { FC, useEffect } from "react";
import { useColorScheme } from "nativewind";
import { Container, StyeldText, StyledView } from "../../StyledComponent";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../../Navigations/NavigationType";
import { Ionicons } from "@expo/vector-icons";
import { FlatList, SafeAreaView, ScrollView } from "react-native";
import CustomeInput from "../../components/CustomeSearch";
import SectionHeader from "../../components/SectionHeader";
import NowPlayingCard from "../../components/NowPlayingCard";
import MovieCard from "../../components/MovieCard";

type HomeScreenNavigationProp = StackNavigationProp<RootStackParamList>;

type HomeType = {
  navigation: HomeScreenNavigationProp;
};

const Home: FC<HomeType> = ({ navigation }) => {
  const { colorScheme, toggleColorScheme } = useColorScheme();

  const bgColor = colorScheme === "dark" ? "bg-slate-800" : "bg-gray-100";
  const textcolor = colorScheme === "dark" ? "text-white" : "text-black";

  useEffect(() => {
    navigation.navigate("modal");
  }, []);

  return (
    <SafeAreaView>
      <ScrollView>
        <Container className="flex flex-row justify-between items-end">
          <StyledView className="pt-3">
            <StyeldText>Hi, Fouad</StyeldText>
            <StyeldText className="text-3xl font-bold">Welcome Back</StyeldText>
          </StyledView>
          <StyledView>
            <Ionicons
              name="notifications"
              size={30}
              color="black"
              style={{ marginBottom: 5 }}
            />
          </StyledView>
        </Container>
        <Container>
          <CustomeInput icon="search" />
        </Container>
        <SectionHeader title={"Now Playing"} />
        <StyledView className="w-[90%] mx-auto mb-5">
          <FlatList
            data={["1", "2", "3", "4"]}
            renderItem={() => <NowPlayingCard id={"1"} />}
            keyExtractor={(item) => item}
            horizontal
            showsHorizontalScrollIndicator={false}
            ItemSeparatorComponent={() => <StyledView style={{ width: 15 }} />}
          />
        </StyledView>
        <SectionHeader title={"Comming Soon"} />
        <StyledView className="w-[90%] mx-auto">
          <FlatList
            data={["1", "2", "3", "4"]}
            renderItem={(i) => <MovieCard id={i.item} />}
            keyExtractor={(item) => item}
            horizontal
            showsHorizontalScrollIndicator={false}
            ItemSeparatorComponent={() => <StyledView style={{ width: 15 }} />}
          />
        </StyledView>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Home;

// <StyledPressable
//   onPress={toggleColorScheme}
//   className={`flex-1 items-center justify-center ${bgColor}`}
// >
//   <StyledText selectable={false} className={`${textcolor}`}>
//     {`Try clicking me! ${colorScheme === "dark" ? "🌙" : "🌞"}`}
//   </StyledText>
// </StyledPressable>
