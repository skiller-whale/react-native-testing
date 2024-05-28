export const DrivingLevel = {
  verySafe: "Very Safe",
  safe: "Safe",
  unsafe: "Unsafe",
  dangerous: "Dangerous",
} as const;

export const DrivingLevelDisplay = {
  [DrivingLevel.verySafe]: {
    summary: "Your driving behaviour is very safe, keep up the good work!",
    color: "rgb(134 239 172)",
  },
  [DrivingLevel.safe]: {
    summary:
      "Your driving behaviour is safe, but there's still room for improvement.",
    color: "rgb(147 197 253)",
  },
  [DrivingLevel.unsafe]: {
    summary:
      "Your driving behaviour is considered unsafe, pay more attention to driving safely to improve your score.",
    color: "rgb(253 186 116)",
  },
  [DrivingLevel.dangerous]: {
    summary:
      "Your driving behaviour is dangerous, urgent action is required to remedy this!",
    color: "rgb(252 165 165)",
  },
};
