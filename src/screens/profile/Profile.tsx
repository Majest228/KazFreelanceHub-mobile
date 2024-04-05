import {
  FlatList,
  RefreshControl,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React from "react";
import Avatar from "../../components/ui/avatar/Avatar";
import { useQuery } from "react-query";
import { useAuth } from "../../context/AuthContext";
import { UserService } from "../../services/user.service";
import { CityService } from "../../services/city.service";
import { useGetDateRegister } from "../../hooks/useGetDateRegister";
import HTML from "react-native-render-html";
import WebDisplay from "../../components/ui/web-display/WebDisplay";
const Profile = () => {
  const { authState } = useAuth();
  const {
    data: profile,
    isLoading: isLoadingProfile,
    refetch,
  } = useQuery(
    "get-profile",
    () => UserService.getProfile(authState?.accessToken),
    {
      enabled: !!authState?.accessToken,
    }
  );
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
  const { data: profileRegion, isLoading: isLoadingProfilRegion } = useQuery(
    "get-cities",
    () => CityService.getCityById(profile?.regionId),
    {
      enabled: !!profile?.regionId,
    }
  );

  console.log("profileRegion", profile.ProfessionToUser);

  let cleanedDescription = profile?.description.replace(/<br>/g, "");

  const { checkDateRegister } = useGetDateRegister(profile?.createdAt);
  return (
    <View style={styles.profile}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        horizontal={false}
        refreshControl={
          <RefreshControl refreshing={isLoadingProfile} onRefresh={refetch} />
        }
        contentContainerStyle={{ paddingHorizontal: 10, paddingBottom: 10 }}
      >
        <Text style={styles.profile__title}>KAZFL</Text>
        <View style={styles.profile__header}>
          <Avatar
            avatar={isLoadingProfile ? [] : profile.avatarPath}
            border={50}
            fz={48}
            height={104}
            width={104}
            login={isLoadingProfile ? {} : profile.login}
          />
          <Text style={styles.profile__header__fio}>
            {isLoadingProfile ? "" : profile.name + " " + profile.surname}
          </Text>
          <Text style={styles.profile__header__login}>
            {isLoadingProfile ? "" : profile.login}
          </Text>
          <Text style={styles.profile__header__city}>
            {isLoadingProfilRegion ? "" : profileRegion.name}
          </Text>
          <Text style={styles.profile__header__register}>
            {checkDateRegister()}
          </Text>
        </View>
        <View style={styles.profile__about}>
          <View style={styles.profile__about__header}>
            <Text style={styles.profile__about__header__title}>Обо мне</Text>
          </View>
          <View style={styles.profile__about__body}>
            {WebDisplay({ html: cleanedDescription })}
          </View>
        </View>
        <View style={styles.profile__history}>
          <View style={styles.profile__history__header}>
            <Text style={styles.profile__history__header__title}>
              История работ
            </Text>
          </View>
          <View style={styles.profile__history__body}>
            <Text style={styles.profile__history__body__title}>
              Ваша история
            </Text>
          </View>
        </View>
        <View style={styles.profile__skills}>
          <View style={styles.profile__skills__header}>
            <Text style={styles.profile__skills__header__title}>
              Навыки и категории
            </Text>
          </View>
          <View style={styles.profile__skills__body}>
            <Text style={styles.profile__skills__body__title}>
              Ваши категории - {profile?.ProfessionToUser.length}
            </Text>
            <View style={styles.profile__skills__body__items}>
              {profile?.ProfessionToUser.map((item: any) => (
                <View style={styles.profile__skills__body__items__item}>
                  <Text>#{item.Profession.nameRu}</Text>
                </View>
              ))}
            </View>
          </View>
        </View>
        <View style={styles.profile__review}>
          <View style={styles.profile__review__header}>
            <Text style={styles.profile__review__header__title}>Отзывы</Text>
          </View>
          <View style={styles.profile__review__body}>
            <Text style={styles.profile__review__body__title}>Нет отзывов</Text>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default Profile;

const styles = StyleSheet.create({
  profile: {},
  profile__title: {
    fontSize: 26,
    fontWeight: "600",
    textAlign: "center",
  },
  profile__header: {
    backgroundColor: "#fff",
    marginTop: 20,
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 10,
    borderRadius: 20,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
  profile__header__fio: {
    marginTop: 10,
    fontSize: 24,
    fontWeight: "600",
  },
  profile__header__login: {
    marginTop: 5,
    fontSize: 22,
    fontWeight: "500",
  },
  profile__header__city: {
    marginTop: 5,
    fontSize: 16,
    fontWeight: "400",
  },
  profile__header__register: {
    marginTop: 5,
    fontSize: 16,
    color: "#111",
    fontWeight: "400",
  },
  profile__about: {},
  profile__about__header: {
    backgroundColor: "#77a6f7",
    marginTop: 20,
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 10,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  profile__about__header__title: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 20,
  },
  profile__about__body: {
    backgroundColor: "#fff",
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 10,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
  },
  profile__history: {},
  profile__history__header: {
    backgroundColor: "#77a6f7",
    marginTop: 20,
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 10,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  profile__history__header__title: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 20,
  },
  profile__history__body: {
    backgroundColor: "#fff",
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 10,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
  },
  profile__history__body__title: {
    color: "#111",
    fontWeight: "400",
    fontSize: 16,
  },
  profile__review: {},
  profile__review__header: {
    backgroundColor: "#77a6f7",
    marginTop: 20,
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 10,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  profile__review__header__title: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 20,
  },
  profile__review__body: {
    backgroundColor: "#fff",
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 10,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
  },
  profile__review__body__title: {
    color: "#111",
    fontWeight: "400",
    fontSize: 16,
  },
  profile__skills: {},
  profile__skills__header: {
    backgroundColor: "#77a6f7",
    marginTop: 20,
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 10,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  profile__skills__header__title: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 20,
  },
  profile__skills__body: {
    backgroundColor: "#fff",
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 10,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
  },
  profile__skills__body__title: {
    color: "#111",
    fontWeight: "400",
    fontSize: 16,
  },
  profile__skills__body__items: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    flexWrap: "wrap",
  },
  profile__skills__body__items__item: {
    marginRight: 10,
  },
});
