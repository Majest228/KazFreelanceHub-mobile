import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { RoleService } from "../../services/role.service";
import { useQuery } from "react-query";
import Login from "../../components/login/Login";
import Register from "../../components/register/Register";

const AuthPage = () => {
  const [type, setType] = useState<"login" | "register">("login");
  const [email, setEmail] = useState("");
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const { onLogin } = useAuth();
  const [roleId, setRoleId] = useState(null);
  const onChangeLogin = (value: string) => {
    setLogin(value);
  };

  const onChangePassword = (value: string) => {
    setPassword(value);
  };
  const onChangeRoleId = (value: any) => {
    setRoleId(value);
  };
  const onChangeEmail = (value: string) => {
    setEmail(value);
  };

  const {
    data: roles,
    isLoading: isLoadingRoles,
    error,
  } = useQuery("all-roles", () => RoleService.getAllRole());

  return (
    <View style={styles.auth}>
      <View style={styles.auth__title}>
        {type == "login" ? (
          <Text style={styles.auth__title__text}>
            Ради видеть тебя снова на{" "}
            <Text style={styles.auth__title__text__sub}>KAZFL</Text>
          </Text>
        ) : (
          <Text style={styles.auth__title__text}>
            Регистрируйся на{" "}
            <Text style={styles.auth__title__text__sub}>KAZFL</Text>
          </Text>
        )}
      </View>
      <View style={styles.auth__content}>
        {type == "login" ? (
          <Login
            onChangeEmail={onChangeEmail}
            onChangePassword={onChangePassword}
          />
        ) : (
          <Register
            onChangeRoleId={onChangeRoleId}
            onChangeEmail={onChangeEmail}
            onChangePassword={onChangePassword}
            onChangeLogin={onChangeLogin}
            roles={isLoadingRoles ? [] : roles}
          />
        )}

        {type == "login" ? (
          <>
            <TouchableOpacity
              style={styles.auth__send}
              onPress={() => {
                onLogin!(email, password);
              }}
            >
              <Text style={styles.auth__send__text}>Войти</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.auth__notAccount}
              onPress={() => setType("register")}
            >
              <Text style={styles.auth__notAccount__text}>Регистрация</Text>
            </TouchableOpacity>
          </>
        ) : (
          <>
            <TouchableOpacity
              style={styles.auth__send}
              onPress={() => {
                console.log("register");
              }}
            >
              <Text style={styles.auth__send__text}>Регистрация</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.auth__notAccount}
              onPress={() => setType("login")}
            >
              <Text style={styles.auth__notAccount__text}>Авторизация</Text>
            </TouchableOpacity>
          </>
        )}
      </View>
    </View>
  );
};

export default AuthPage;

const styles = StyleSheet.create({
  auth: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  auth__content: {
    marginTop: 20,
    maxWidth: 330,
    width: "100%",
  },

  auth__title: {
    justifyContent: "center",
    alignItems: "center",
    maxWidth: 330,
    width: "100%",
  },
  auth__title__text: {
    fontSize: 36,
    textAlign: "center",
    color: "#111",
  },
  auth__title__text__sub: {
    color: "#0D8654",
    fontWeight: "600",
  },
  auth__send: {
    borderRadius: 15,
    backgroundColor: "#32c789",
    maxWidth: 250,
    width: "100%",
    paddingTop: 20,
    paddingBottom: 20,
    marginTop: 20,
    alignItems: "center",
    marginLeft: "auto",
    marginRight: "auto",
  },
  auth__send__text: {
    fontSize: 20,
    textAlign: "center",
    color: "#fff",
    fontWeight: "600",
  },

  auth__notAccount: {},
  auth__notAccount__text: {
    color: "#026bcb",
    fontSize: 18,
    marginTop: 30,
    textAlign: "center",
    fontWeight: "400",
  },
});
