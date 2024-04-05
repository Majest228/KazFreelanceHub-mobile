import { StyleSheet, Text, View } from "react-native";
import React from "react";
import Input from "../input/Input";

interface ILogin {
  onChangeEmail: (value: string) => void;
  onChangePassword: (value: string) => void;
}
const Login = ({ onChangeEmail, onChangePassword }: ILogin) => {
  return (
    <View>
      <Input
        onChangeEmail={onChangeEmail}
        type="email"
        inputMode="text"
        secureTextEntry={false}
        placeholder="Введите логин или почту"
        title="Логин или почта"
      />
      <Input
        onChangePassword={onChangePassword}
        type="password"
        inputMode="text"
        secureTextEntry={true}
        placeholder="Введите пароль"
        title="Пароль"
      />
    </View>
  );
};

export default Login;

const styles = StyleSheet.create({});
