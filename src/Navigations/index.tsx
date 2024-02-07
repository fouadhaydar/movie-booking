import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Home from "../screens/Home";
import Tickets from "../screens/Tickets";
import Movies from "../screens/Movies";
import Profile from "../screens/Profile";
import { Ionicons } from "@expo/vector-icons";
import SignUp from "../screens/Profile/Auth/SignUp";
import History from "../screens/History";
import { RootStackParamList, RootTabParamsLits } from "./NavigationType";
import { NavigationContainer } from "@react-navigation/native";
import LogIn from "../screens/Profile/Auth/LogIn";
import Welcome from "../screens/Welcome.tsx";
import Details from "../screens/Details";

const RootStack = createStackNavigator<RootStackParamList>();
const Tab = createBottomTabNavigator<RootTabParamsLits>();

const TabNavigation = () => {
  return (
    <Tab.Navigator
      screenOptions={() => ({
        tabBarStyle: {
          height: 100,
        },
        tabBarIconStyle: {
          marginTop: 15,
        },
        tabBarLabelStyle: {
          fontWeight: "bold",
        },
        headerShown: false,
      })}
    >
      <Tab.Screen
        name="home"
        component={Home}
        options={{
          tabBarIcon: () => <Ionicons name="home" size={24} />,
          title: "Home",
        }}
      />
      <Tab.Screen
        name="tickets"
        component={Tickets}
        options={{
          tabBarIcon: () => <Ionicons name="ticket" size={24} color="black" />,
          title: "Tickets",
        }}
      />
      <Tab.Screen
        name="movies"
        component={Movies}
        options={{
          tabBarIcon: () => (
            <Ionicons name="videocam" size={24} color="black" />
          ),
          title: "Movies",
        }}
      />
      <Tab.Screen
        name="profile"
        component={Profile}
        options={{
          tabBarIcon: () => <Ionicons name="person" size={24} color="black" />,
          title: "Profile",
        }}
      />
    </Tab.Navigator>
  );
};

const RootStackNavigator = () => {
  return (
    <NavigationContainer>
      <RootStack.Navigator
        screenOptions={{
          headerBackTitle: "",
          headerShown: false,
        }}
      >
        <RootStack.Group>
          <RootStack.Screen name="Main" component={TabNavigation} />
          <RootStack.Screen
            name="signUp"
            component={SignUp}
            options={{
              headerTitle: "Sign Up",
              headerShown: false,
            }}
          />
          <RootStack.Screen
            name="logIn"
            component={LogIn}
            options={{
              headerTitle: "Log In",
              headerShown: false,
            }}
          />
          <RootStack.Screen
            name="details"
            component={Details}
            options={{
              headerShown: false,
            }}
          />
          <RootStack.Screen
            name="Payment History"
            component={History}
            options={{
              headerShown: true,
            }}
          />
        </RootStack.Group>
        {/* modale */}
        <RootStack.Group screenOptions={{ presentation: "modal" }}>
          <RootStack.Screen name="modal" component={Welcome} />
        </RootStack.Group>
      </RootStack.Navigator>
    </NavigationContainer>
  );
};

export default RootStackNavigator;
