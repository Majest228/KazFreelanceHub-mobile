import React from "react";
import { TextInput, View, Text, StyleSheet } from "react-native";

interface IInput {
  placeholder: string;
  title: string;
  secureTextEntry: boolean;
  inputMode:
    | "text"
    | "decimal"
    | "email"
    | "none"
    | "numeric"
    | "search"
    | "tel"
    | "url";

  onChangeEmail?: any;
  type: "login" | "password" | "email";
  onChangeRoleId?: any;
  onChangePassword?: any;
  onChangeLogin?: any;
}

const Input = ({
  placeholder,
  title,
  secureTextEntry = false,
  inputMode,
  onChangeEmail,
  onChangeLogin,
  onChangePassword,
  onChangeRoleId,
  type,
}: IInput) => {
  return (
    <View style={styles.input__item}>
      <Text style={styles.input__item__text}>{title}</Text>
      <TextInput
        onChange={(e) => {
          if (type == "email") {
            onChangeEmail(e.nativeEvent.text);
          } else if (type == "login") {
            onChangeLogin(e.nativeEvent.text);
          } else if (type == "password") {
            onChangePassword(e.nativeEvent.text);
          }
        }}
        secureTextEntry={secureTextEntry}
        inputMode={inputMode}
        style={styles.input__item__input}
        placeholder={placeholder}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  input__item: {
    marginTop: 20,
  },
  input__item__text: {
    fontWeight: "600",
    fontSize: 18,
    color: "#111",
    marginBottom: 4,
  },
  input__item__input: {
    borderRadius: 8,
    borderWidth: 1,
    borderStyle: "solid",
    width: "100%",
    marginTop: 10,
    fontSize: 16,
    borderColor: "#d1d1d1",
    padding: 16,
  },
});

export default Input;
