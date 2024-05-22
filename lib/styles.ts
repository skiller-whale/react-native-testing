import { Platform, StyleSheet } from "react-native";

export const colors = {
  orcaBlue: "#012e57",
  oceanBlue: "#0063fc",
  turquoise: "#12e6de",
  electricAqua: "#7bf7ff",
  coralOrange: "#fd846f",
  rayYellow: "#ffe380",
  lightGrey: "#f4f5f7",
  midGrey: "#9099b4",
  transparentGrey: "rgba(10, 50, 100, 0.95)",
  white: "#ffffff",
} as const;

export type Color = keyof typeof colors;

export const fontFamilies = {
  sans: "Exo",
  serif: "Alegreya",
} as const;

export type FontFamily = keyof typeof fontFamilies;

export const fontSizes = {
  sm: 12,
  md: 16,
  lg: 20,
  xl: 24,
} as const;

export type FontSize = keyof typeof fontSizes;

export const lineHeightMultipliers = {
  sm: 1.5,
  md: 1.5,
  lg: 1.3,
  xl: 1.2,
} as const;

export type LineHeightMultiplier = keyof typeof lineHeightMultipliers;

export const spacing = {
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
} as const;

export type Spacing = keyof typeof spacing;

export const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.white,
    flex: 1,
  },
  row: {
    flexDirection: "row",
  },
  gap: {
    gap: spacing.md,
  },
  flex1: {
    flex: 1,
  },
  bold: {
    fontWeight: "600",
  },
  text: {
    fontFamily: fontFamilies.sans,
    fontSize: fontSizes.md,
    lineHeight: fontSizes.md * lineHeightMultipliers.md,
    color: colors.orcaBlue,
  },
  shadow: Platform.select({
    ios: {
      shadowColor: "#000000",
      shadowOffset: { width: 3, height: 3 },
      shadowOpacity: 0.2,
    },
    android: {
      elevation: 3,
    },
    default: {
      boxShadow: "0px 0px 6px rgba(0, 0, 0, 0.2)",
    },
  }),
  button: {
    backgroundColor: colors.turquoise,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
    borderRadius: spacing.lg,
    ...Platform.select({
      ios: {
        shadowColor: "#000000",
        shadowOffset: { width: 3, height: 3 },
        shadowOpacity: 0.2,
      },
      android: {
        elevation: 3,
      },
      default: {
        boxShadow: "0px 0px 6px rgba(0, 0, 0, 0.2)",
      },
    }),
  },
  buttonPressed: Platform.select({
    ios: {
      shadowOffset: { width: 1, height: 1 },
    },
    android: {
      elevation: 1,
    },
    default: {
      boxShadow: "0px 0px 3px rgba(0, 0, 0, 0.2)",
    },
  }),
  buttonDisabled: {
    opacity: 0.5,
  },
  buttonText: {
    color: colors.orcaBlue,
    textAlign: "center",
  },
  tableRow: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: colors.midGrey,
  },
  tableCell: {
    padding: spacing.sm,
  },
});
