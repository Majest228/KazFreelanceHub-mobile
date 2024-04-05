import { IImage } from "../../../interfaces/image.interface";
import React from "react";
import { Image, View } from "react-native";

const ImageComponent = ({
  image,
  borderRadius,
  alt,
  width = 225,
  height = 225,
}: IImage): JSX.Element => {
  return (
    <View style={{ width: width, height: height }}>
      <Image
        src={image}
        alt={alt}
        style={{
          width: "100%",
          height: "100%",
          borderRadius: borderRadius,
        }}
      />
    </View>
  );
};

export default ImageComponent;
