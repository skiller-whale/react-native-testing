import { type TextProps, Text } from "react-native";
import type { Color, FontFamily, FontSize } from "./styles.ts";
import {
  colors,
  fontFamilies,
  fontSizes,
  lineHeightMultipliers,
  styles,
} from "./styles.ts";

type StyledTextProps = TextProps & {
  font?: FontFamily;
  size?: FontSize;
  color?: Color;
};

export const StyledText = ({
  children,
  font,
  size,
  color,
  style,
  ...rest
}: StyledTextProps) => (
  <Text
    style={[
      {
        fontFamily: font ? fontFamilies[font] : styles.text.fontFamily,
        fontSize: size ? fontSizes[size] : styles.text.fontSize,
        lineHeight: size
          ? fontSizes[size] * lineHeightMultipliers[size]
          : styles.text.lineHeight,
        color: color ? colors[color] : styles.text.color,
      },
      style,
    ]}
    {...rest}
  >
    {children}
  </Text>
);
