import {
  FlatList,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState } from "react";
import { useQuery } from "react-query";
import { OrderService } from "../../services/order.service";
import { FreelancerService } from "../../services/freelancer.service";
import { Icon } from "react-native-elements";
import { useViewDate } from "../../hooks/useViewDate";
import Avatar from "../../components/ui/avatar/Avatar";
import { useNavigation } from "@react-navigation/native";
import { useAuth } from "../../context/AuthContext";
import { UserService } from "../../services/user.service";

const reviewGrades = [1, 2, 3, 4, 5];

const navList = [
  {
    id: 0,
    name: "Заказы",
    type: "order",
  },
  {
    id: 1,
    name: "Фрилансеры",
    type: "freelancer",
  },
  {
    id: 2,
    name: "Конкурсы",
    type: "consumer",
  },
];

const HomePage = () => {
  const { navigate } = useNavigation();
  const [type, setType] = useState("order");
  const { data: orders, isLoading: isLoadingOrer } = useQuery(
    "get-all-orders",
    () => OrderService.getAllOrder()
  );

  console.log(orders);

  const { data: freelancers, isLoading: isLoadingFreelancers } = useQuery(
    "get-all-freelancers",
    () => FreelancerService.getAllFreelancer()
  );
  const { authState, logout } = useAuth();

  let combinedData = [];
  if (type === "order") {
    combinedData = isLoadingOrer ? [] : orders.items;
  } else if (type === "freelancer") {
    combinedData = isLoadingFreelancers ? [] : freelancers?.items;
  }

  const { data: profile, isLoading: isLoadingProfile } = useQuery(
    "get-profile",
    () => UserService.getProfile(authState.accessToken),
    {
      enabled: !!authState.accessToken,
    }
  );
  return (
    <FlatList
      style={styles.home}
      ListHeaderComponent={
        <>
          <Text style={styles.home__title}>
            {profile == undefined
              ? "Здравствуйте!"
              : `Здравствуйте, ${profile.name}! `}
          </Text>
          <Text style={styles.home__subtitle}>
            Пусть сегодня у вас все получится!
          </Text>
          <TouchableOpacity onPress={() => logout()}></TouchableOpacity>
          <View style={styles.home__nav}>
            <FlatList
              horizontal={true}
              data={navList}
              renderItem={(nav) => (
                <TouchableOpacity
                  onPress={() => setType(nav.item.type)}
                  style={
                    type == nav.item.type
                      ? styles.home__nav__item__active
                      : styles.home__nav__item
                  }
                >
                  <Text style={styles.home__nav__item__title}>
                    {nav.item.name}
                  </Text>
                </TouchableOpacity>
              )}
            />
          </View>
        </>
      }
      data={combinedData}
      renderItem={(item) => (
        <>
          {type == "order" && (
            <TouchableOpacity
              onPress={() => {
                navigate("OrderPage", { orderId: item.item.id });
              }}
              style={styles.home__orders__order}
              key={item.item.id}
            >
              <Text style={styles.home__orders__order__title}>
                {item.item.title}
              </Text>
              <View>
                <View style={styles.centeredText}>
                  <Text style={styles.home__orders__order__push}>
                    Заказ опубликован -{" "}
                  </Text>
                  <Text style={styles.home__orders__order__date}>
                    {useViewDate(item.item.createdAt)}
                  </Text>
                </View>
                <View
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                  }}
                >
                  <Text style={styles.home__orders__order__budget__title}>
                    Бюджет -{" "}
                    <Text style={styles.home__orders__order__budget__price}>
                      {item.item.price == 0 ? "Договорная" : item.item.price}
                    </Text>
                  </Text>
                  <View
                    style={{
                      display: "flex",
                      flexDirection: "row",
                    }}
                  >
                    <View style={styles.home__orders__order__view}>
                      <Icon
                        name="eyeo"
                        size={16}
                        color="#878787"
                        backgroundColor="white"
                        type="ant-design"
                      />
                      <Text style={styles.home__orders__order__view__title}>
                        {item.item.views}
                      </Text>
                    </View>
                    <View style={styles.home__orders__order__view}>
                      <Icon
                        name="message1"
                        size={14}
                        color="#878787"
                        backgroundColor="white"
                        type="ant-design"
                      />
                      <Text style={styles.home__orders__order__view__title}>
                        {item.item.response}
                      </Text>
                    </View>
                  </View>
                </View>
              </View>
            </TouchableOpacity>
          )}
          {type == "freelancer" && (
            <View style={styles.home__freelancers}>
              <TouchableOpacity
                onPress={() => {
                  navigate("UserPage", { userId: item.item.id });
                }}
                style={styles.home__freelancers__freelancer}
                key={item.item.id}
              >
                <View style={styles.home__freelancers__freelancer__header}>
                  <Avatar
                    border={50}
                    fz={16}
                    height={48}
                    width={48}
                    login={item.item.login}
                    avatar={item.item.avatarPath}
                  />
                  <View style={{ marginLeft: 10 }}>
                    <Text
                      style={styles.home__freelancers__freelancer__header__fio}
                    >
                      {item.item.name} {item.item.surname}
                    </Text>
                    <View
                      style={
                        styles.home__freelancers__freelancer__header__stars
                      }
                    >
                      {reviewGrades.map((item, idx) => (
                        <Icon
                          key={idx}
                          name="staro"
                          size={14}
                          color="#878787"
                          type="ant-design"
                        />
                      ))}
                      <Text
                        style={
                          styles.home__freelancers__freelancer__header__stars__count
                        }
                      >
                        0 отзывов
                      </Text>
                    </View>
                  </View>
                </View>
                <Text style={styles.home__freelancers__freelancer__desc}>
                  {item.item.smallDescription}
                </Text>
              </TouchableOpacity>
            </View>
          )}
        </>
      )}
    />
  );
};

export default HomePage;

const styles = StyleSheet.create({
  home: {
    height: "100%",
  },
  home__title: {
    marginTop: 20,
    paddingLeft: 20,
    paddingRight: 20,
    fontSize: 24,
    color: "#111",
    fontWeight: "600",
  },
  home__subtitle: {
    marginTop: 10,
    paddingLeft: 20,
    paddingRight: 20,
    fontSize: 20,
    color: "#111",
  },
  home__nav: {
    marginTop: 20,
    paddingLeft: 20,
    paddingRight: 20,
    backgroundColor: "#DCDCDC",
  },
  home__nav__item: {
    paddingTop: 10,
    paddingBottom: 10,
    marginRight: 20,
    paddingHorizontal: 10,
    marginVertical: 5,
  },
  home__nav__item__active: {
    marginVertical: 5,
    paddingTop: 10,
    paddingBottom: 10,
    paddingHorizontal: 10,
    backgroundColor: "#fff",
    marginRight: 20,
    borderRadius: 20,
  },

  home__nav__item__title: {
    fontSize: 16,
    color: "#111",
    fontWeight: "400",
  },
  home__orders: {},
  home__orders__order: {
    paddingTop: 10,
    paddingBottom: 10,
    paddingHorizontal: 10,
    marginVertical: 8,
    marginHorizontal: 20,
    backgroundColor: "#fff",
    borderRadius: 20,
  },
  centeredText: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    marginTop: 5,
    marginBottom: 5,
  },

  home__orders__order__title: {
    color: "#171717",
    fontSize: 22,
    fontStyle: "normal",
    fontWeight: "600",
  },
  home__orders__order__date: {
    color: "#026BCB",
    fontSize: 14,
    fontStyle: "normal",
    fontWeight: "400",
  },
  home__orders__order__push: {
    color: "#878787",
    fontSize: 16,
    fontStyle: "normal",
    fontWeight: "400",
  },
  home__orders__order__budget__title: {
    color: "#878787",
    fontSize: 16,
    fontStyle: "normal",
    fontWeight: "400",
  },
  home__orders__order__budget__price: {
    color: "#32C789",
    fontSize: 14,
    fontStyle: "normal",
    fontWeight: "400",
  },
  home__orders__order__view: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
  home__orders__order__view__title: {
    marginRight: 10,
    marginLeft: 4,
    color: "#878787",
    fontSize: 14,
    fontStyle: "normal",
    fontWeight: "400",
  },
  home__freelancers: {
    marginTop: 20,
    paddingHorizontal: 20,
    maxHeight: 520,
    height: "auto",
  },
  home__freelancers__freelancer: {
    paddingTop: 10,
    paddingBottom: 10,
    paddingHorizontal: 10,
    marginVertical: 5,
    backgroundColor: "#fff",
    borderRadius: 20,
  },
  home__freelancers__freelancer__header: {
    flexDirection: "row",
  },
  home__freelancers__freelancer__header__stars: {
    flexDirection: "row",
    alignItems: "center",
  },
  home__freelancers__freelancer__header__fio: {
    color: "#111",
    fontSize: 18,
    fontStyle: "normal",
    fontWeight: "600",
  },
  home__freelancers__freelancer__header__stars__count: {
    color: "#878787",
    fontSize: 15,
    fontStyle: "normal",
    fontWeight: "400",
    marginLeft: 10,
  },
  home__freelancers__freelancer__desc: {
    marginTop: 10,
    color: "#111",
    fontSize: 18,
    fontStyle: "normal",
    fontWeight: "400",
  },
});
