import React from "react";
import { IImage } from "../../../interfaces/image.interface";
import { StyleSheet, Text, View } from "react-native";

const ImageDefault = ({
  text = "",
  borderRadius,
  alt,
  width = 225,
  height = 225,
  fz = 124,
}: IImage): JSX.Element => {
  return (
    <View
      style={{
        width: width,
        height: height,
        backgroundColor: "rgb(101, 170, 221)",
        borderRadius: borderRadius,
        position: "relative",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text
        style={{
          fontSize: fz,
          color: "white",
        }}
      >
        {text[0]?.toUpperCase()}
      </Text>
    </View>
  );
};

export default ImageDefault;

const styles = StyleSheet.create({});
