import React, {
  createContext,
  FC,
  ReactNode,
  useEffect,
  useState,
} from "react";
import { Appearance, useColorScheme } from "react-native";
import { DARK_COLORS, LIGHT_COLORS } from "../consts/colors";

interface Theme {
  isDark: boolean;
  colors: Record<string, string>;
  setColorScheme: (scheme: string) => void;
}

export const ThemeContext = createContext<Theme>({
  isDark: false,
  colors: LIGHT_COLORS,
  setColorScheme: () => {},
});

interface ThemeProviderProps {
  children: ReactNode;
}

export const ThemeProvider: FC<ThemeProviderProps> = ({ children }) => {
  const [colorScheme, setColorScheme] = React.useState(
    Appearance.getColorScheme()
  );
  useEffect(() => {
    Appearance.addChangeListener(({ colorScheme }) =>
      setColorScheme(colorScheme)
    );
  }, []);

  const [isDark, setIsDark] = useState<boolean>(colorScheme === "dark");
  const defaultTheme: Theme = {
    isDark,
    colors: isDark ? DARK_COLORS : LIGHT_COLORS,
    setColorScheme: (scheme: string) => {
      setIsDark(scheme === "dark");
    },
  };

  return (
    <ThemeContext.Provider value={defaultTheme}>
      {children}
    </ThemeContext.Provider>
  );
};
