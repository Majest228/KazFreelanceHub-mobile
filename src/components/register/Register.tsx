import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState } from "react";
import { IRole } from "../../interfaces/role.interface";
import Input from "../input/Input";

interface IRegister {
  roles: IRole[] | any;
  onChangeEmail: any;
  onChangeRoleId: any;
  onChangePassword: any;
  onChangeLogin: any;
}

const Register = ({
  roles,
  onChangeEmail,
  onChangeLogin,
  onChangePassword,
  onChangeRoleId,
}: IRegister) => {
  const [selectedRole, setSelectedRole] = useState<number | null>();
  const checkRoleToRegister = !roles
    ? []
    : roles.filter((role: IRole) => role.name != "Администратор");

  const checkChecked = (check: number) => {
    if (selectedRole == check) {
      setSelectedRole(null);
    } else {
      setSelectedRole(check);
    }
  };
  return (
    <View style={styles.container}>
      <Input
        type="email"
        onChangeEmail={onChangeEmail}
        inputMode="email"
        secureTextEntry={false}
        placeholder="Введите логин или почту"
        title="Почта"
      />
      <Input
        type="login"
        onChangeLogin={onChangeLogin}
        inputMode="text"
        secureTextEntry={false}
        placeholder="Введите логин"
        title="Логин"
      />
      <Input
        type="password"
        onChangePassword={onChangePassword}
        inputMode="text"
        secureTextEntry={true}
        placeholder="Введите пароль"
        title="Пароль"
      />
      <View style={styles.rolesContainer}>
        <FlatList
          horizontal={true}
          data={checkRoleToRegister}
          showsHorizontalScrollIndicator={false}
          renderItem={(role) => (
            <View style={styles.auth__role}>
              <TouchableOpacity
                onPress={() => {
                  checkChecked(role.item.id);
                  onChangeRoleId(role.item.id);
                }}
                style={styles.checkBox}
              >
                <Text style={styles.checkBox__accept}>
                  {selectedRole == role.item.id ? "✓" : ""}
                </Text>
              </TouchableOpacity>
              <Text style={styles.checkBox__title}>{role.item.name}</Text>
            </View>
          )}
        />
      </View>
    </View>
  );
};
export default Register;

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  rolesContainer: {
    marginTop: 20,
    alignItems: "center",
    justifyContent: "center",
    alignContent: "space-between",
  },
  auth__role: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: 20,
  },
  checkBox: {
    marginRight: 10,
    width: 26,
    height: 26,
    borderWidth: 2,
    borderColor: "#d1d1d1",
    justifyContent: "center",
  },
  checkBox__title: {
    fontSize: 16,
    color: "#111",
  },
  checkBox__accept: {
    textAlign: "center",
    fontSize: 16,
  },
});
