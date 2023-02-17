import { Theme, useTheme } from "@react-navigation/native";
import React from "react";
import { Divider } from "react-native-paper";



const DividerComponent = () => {
    const { colors }: Theme = useTheme();

    return (
        <Divider
          style={{
            backgroundColor: colors.background,
            height: 1.5,
            opacity: 0.2,
          }}
        />
      );
}

export default DividerComponent;
  
