import { useRoute } from "@react-navigation/native";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { useQuery } from "react-query";
import { OrderService } from "../../services/order.service";
import { useViewDate } from "../../hooks/useViewDate";
import {
  getFullYear,
  useDifferenceTime,
  useGenerateDate,
  useGetTime,
} from "../../hooks/useGetTime";
import { monthsInRussian } from "../../consts/month";
import HTML from "react-native-render-html";
import Avatar from "../../components/ui/avatar/Avatar";
import { UserService } from "../../services/user.service";
import { Icon } from "react-native-elements";
import WebDisplay from "../../components/ui/web-display/WebDisplay";
const reviewGrades = [1, 2, 3, 4, 5];
const OrderPage = () => {
  const route = useRoute();
  const orderId = route.params?.orderId;

  const { data: order, isLoading: isLoadingOrder } = useQuery(
    "get-order-by-id",
    () => OrderService.getById(orderId),
    {
      enabled: !!orderId,
    }
  );
  const test = new Date(order?.createdAt);
  let days = test.getDate();
  let month = test.getMonth();
  let year = test.getFullYear();

  let cleanedDescription = order?.description.replace(/<br>/g, "");

  const tagsStyles: any = {
    p: {
      marginBottom: 5,
      marginTop: 5,
      fontSize: 16,
      fontWeight: "400",
      lineHeight: 24,
    },
    h1: {
      marginBottom: 5,
      marginTop: 5,
      fontSize: 16,
      fontWeight: "400",
      lineHeight: 24,
    },
    h2: {
      marginBottom: 5,
      marginTop: 5,
      fontSize: 16,
      fontWeight: "400",
      lineHeight: 24,
    },
    h3: {
      marginBottom: 5,
      marginTop: 5,
      fontSize: 16,
      fontWeight: "400",
      lineHeight: 24,
    },
    h4: {
      marginBottom: 5,
      marginTop: 5,
      fontSize: 16,
      fontWeight: "400",
      lineHeight: 24,
    },
    h5: {
      marginBottom: 5,
      marginTop: 5,
      fontSize: 16,
      fontWeight: "400",
      lineHeight: 24,
    },
    h6: {
      marginBottom: 5,
      marginTop: 5,
      fontSize: 16,
      fontWeight: "400",
      lineHeight: 24,
    },
  };

  const { data: profileOwner, isLoading: isLoadingProfileOwner } = useQuery(
    "get-profile-owner",
    () => UserService.getById(order?.ownerId),
    { enabled: !!order?.ownerId }
  );
  return (
    <ScrollView>
      <View style={styles.order}>
        <View style={styles.order__header}>
          <Text style={styles.order__header__title}>
            Заказ от {days} {monthsInRussian[month]} {year}
          </Text>
        </View>
        <View style={styles.order__info}>
          <Text style={styles.order__info__title}>{order?.title}</Text>
          <View style={styles.order__info__title__budget}>
            <Text style={styles.order__info__title__budget__title}>
              Цена -{" "}
              <Text style={styles.order__info__title__budget__price}>
                {order?.price == 0 ? "Договорная" : order?.price}
              </Text>
            </Text>
          </View>
          <View
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            <View style={styles.order__info__title__view}>
              <Text style={styles.order__info__title__view__title}>
                Просмотров -{" "}
                <Text style={styles.order__info__title__view__count}>
                  {order?.views}
                </Text>
              </Text>
            </View>
            <View style={styles.order__info__title__response}>
              <Text style={styles.order__info__title__response__title}>
                Откликов -{" "}
                <Text style={styles.order__info__title__response__count}>
                  {order?.response}
                </Text>
              </Text>
            </View>
          </View>
        </View>
        <View style={styles.order__description}>
          <Text style={styles.order__description__title}>Описание заказа:</Text>
          {WebDisplay({ html: cleanedDescription })}
        </View>

        <View style={styles.order__owner}>
          <Text style={styles.order__owner__title}>Заказчик</Text>
          <View style={styles.order__owner__body}>
            <Avatar
              border={50}
              fz={14}
              height={48}
              width={48}
              avatar={profileOwner?.avatarPath}
              login={profileOwner?.login}
            />
            <View>
              <Text style={styles.order__owner__body__fio}>
                {profileOwner?.name} {"  "}
                {profileOwner?.surname}
              </Text>
              <View style={styles.order__owner__body__stars}>
                {reviewGrades.map((item, idx) => (
                  <Icon
                    key={idx}
                    name="staro"
                    size={14}
                    color="#878787"
                    type="ant-design"
                  />
                ))}
                <Text style={styles.order__owner__body__stars__count}>
                  0 отзывов
                </Text>
              </View>
            </View>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

export default OrderPage;

const styles = StyleSheet.create({
  order: { paddingHorizontal: 10 },
  order__header: {
    marginTop: 20,
  },
  order__header__title: {
    textAlign: "center",
    fontSize: 18,
    fontWeight: "500",
  },
  order__info: {
    backgroundColor: "#fff",
    marginTop: 10,
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 10,
    borderRadius: 20,
  },
  order__info__title: {
    marginTop: 10,
    fontSize: 24,
    fontWeight: "500",
  },
  order__info__title__budget: {
    marginTop: 10,
  },
  order__info__title__budget__title: {
    fontSize: 16,
  },
  order__info__title__budget__price: {
    fontSize: 16,
    fontWeight: "500",
  },
  order__info__title__response: {
    marginTop: 5,
  },
  order__info__title__response__title: {
    fontSize: 16,
  },
  order__info__title__response__count: {
    fontSize: 16,
    fontWeight: "500",
  },
  order__info__title__view: { marginTop: 5 },
  order__info__title__view__title: {
    fontSize: 16,
  },
  order__info__title__view__count: {
    fontSize: 16,
    fontWeight: "500",
  },
  order__description: {
    backgroundColor: "#fff",
    marginTop: 10,
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 10,
    borderRadius: 20,
  },
  order__description__title: {
    fontSize: 18,
    fontWeight: "500",
  },
  order__owner: {
    backgroundColor: "#fff",
    marginTop: 10,
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 10,
    borderRadius: 20,
  },
  order__owner__title: {
    marginBottom: 10,
    fontSize: 16,
  },
  order__owner__body: {
    flexDirection: "row",
    alignItems: "center",
  },
  order__owner__body__fio: {
    marginLeft: 10,
  },
  order__owner__body__stars: {
    flexDirection: "row",
    alignItems: "center",
    marginLeft: 10,
  },
  order__owner__body__stars__count: {
    color: "#878787",
    fontSize: 15,
    fontStyle: "normal",
    fontWeight: "400",
    marginLeft: 10,
  },
});
