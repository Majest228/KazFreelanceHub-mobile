import React from "react";
import { View, useWindowDimensions } from "react-native";
import RenderHTML from "react-native-render-html";

const WebDisplay = ({ html }: any) => {
  const { width: contentWidth } = useWindowDimensions();
  const tagsStyles: any = React.useMemo(
    () => ({
      a: {
        textDecorationLine: "none",
      },
      p: {
        marginBottom: 5,
        marginTop: 5,
        fontSize: 16,
        fontWeight: "400",
        lineHeight: 24,
      },
    }),
    []
  );
  return (
    <View>
      <RenderHTML
        contentWidth={contentWidth}
        source={{ html }}
        tagsStyles={tagsStyles}
      />
    </View>
  );
};

export default WebDisplay;
