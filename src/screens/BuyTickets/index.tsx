import { ScrollView, FlatList } from "react-native";
import React, { FC, useState } from "react";
import { StyledView, StyeldText, Container } from "src/StyledComponent";
import { RootStackParamList } from "src/Navigations/NavigationType";
import { StackNavigationProp } from "@react-navigation/stack";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import uuid from "react-native-uuid";
import SeatStatus from "./components/SeatStatus";
import { days, status, times } from "../../../constants";
import DayBtn from "./components/DayBtn";
import TimeBtn from "./components/TimeBtn";
import CustomeBtn from "src/components/CustomeBtn";
import { RouteProp } from "@react-navigation/native";

type BuyTicketNavigationProp = StackNavigationProp<RootStackParamList>;
// to get access of the route from react navigation
type BuyTicketScreenRoutProp = RouteProp<RootStackParamList>;

type BuyTicketType = {
  route: BuyTicketScreenRoutProp;
  navigation: BuyTicketNavigationProp;
};
type Seat = {
  id: unknown;
  seatNum: number;
  selected: boolean;
  available: boolean;
};

const BuyTickets: FC<BuyTicketType> = ({ route, navigation }) => {
  const [seat, setSeat] = useState<Seat[]>(
    Array.from({ length: 48 }, (_, index) => {
      if (index < 2) {
        return {
          id: uuid.v4(),
          seatNum: index + 1,
          selected: true,
          available: true,
        };
      } else if (index < 40 && index > 5) {
        return {
          id: uuid.v4(),
          seatNum: index + 1,
          selected: false,
          available: true,
        };
      } else {
        return {
          id: uuid.v4(),
          seatNum: index + 1,
          selected: false,
          available: false,
        };
      }
    })
  );

  // const navigate = () => {
  //   navigation.replace("details", { id: route.params?.id || "" });
  // };
  return (
    <ScrollView>
      <Container className="items-center gap-y-10 py-5">
        <FlatList
          data={seat}
          nestedScrollEnabled
          keyExtractor={({ id }) => id as string}
          renderItem={(item) => {
            const {
              item: { id, seatNum, available, selected },
            } = item;
            return (
              <MaterialCommunityIcons
                name="seat"
                size={24}
                key={id as string}
                style={{
                  padding: 10,
                }}
                color={
                  available && !selected
                    ? "black"
                    : available && selected
                    ? "orange"
                    : "gray"
                }
              />
            );
          }}
          numColumns={6}
          scrollEnabled={false}
        />
        <FlatList
          keyExtractor={({ title }) => title}
          data={status}
          renderItem={(item) => {
            const {
              item: { title, color },
            } = item;
            return <SeatStatus color={color} title={title} />;
          }}
          numColumns={3}
          scrollEnabled={false}
        />
        <StyeldText className="font-bold text-center text-[16px]">
          Select a Date & Time
        </StyeldText>
        <FlatList
          data={days}
          keyExtractor={({ day }) => day}
          renderItem={(item) => {
            const {
              item: { date, day, selected },
            } = item;
            return (
              <DayBtn
                date={date}
                day={day}
                selelcted={selected}
                select={() => {}}
              />
            );
          }}
          horizontal
          showsHorizontalScrollIndicator={false}
        />
        <FlatList
          data={times}
          renderItem={(item) => {
            const {
              item: { time, selected },
            } = item;
            return <TimeBtn time={time} selected={selected} />;
          }}
          horizontal
          showsHorizontalScrollIndicator={false}
        />
        <StyledView
          className="w-full justify-between gap-y-3"
          style={{ columnGap: 10 }}
        >
          <StyeldText className="text-center font-semibold text-[16px]">
            Total Price: 15 $
          </StyeldText>
          <StyledView className="flex-1">
            {/* <CustomeBtn
              title={"Buy"}
              handlePress={() => {
                console.log("a");
              }}
            /> */}
            <CustomeBtn title="Buy Ticket Now" handlePress={() => {}} />
          </StyledView>
        </StyledView>
      </Container>
    </ScrollView>
  );
};

export default BuyTickets;
