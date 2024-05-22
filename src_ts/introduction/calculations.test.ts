import {
  calculateDrivingLevel,
  calculateDrivingScore,
} from "./calculations.ts";
import { DrivingLevel } from "./constants.ts";

describe("driving score calculations are correct", () => {
  const testCases = [
    { distance: 100, incidents: 0, expected: 100 },
    { distance: 100, incidents: 50, expected: 50 },
    { distance: 100, incidents: 100, expected: 0 },
    { distance: 100, incidents: 101, expected: 0 },
  ];

  test("distance 100, incidents 0 -> driving score 100", () => {
    const output = calculateDrivingScore(100, 0);
    expect(output).toBe(100);
  });

  test("distance 100, incidents 0 -> driving score 100", () => {
    const output = calculateDrivingScore(100, 50);
    expect(output).toBe(50);
  });

  test("distance 100, incidents 0 -> driving score 100", () => {
    const output = calculateDrivingScore(100, 100);
    expect(output).toBe(0);
  });

  test("distance 100, incidents 0 -> driving score 100", () => {
    const output = calculateDrivingScore(100, 101);
    expect(output).toBe(0);
  });
});

describe("driving level calculations are correct", () => {
  const testCases = [
    { score: 100, expected: DrivingLevel.verySafe },
    { score: 90, expected: DrivingLevel.verySafe },
    { score: 89, expected: DrivingLevel.safe },
    { score: 70, expected: DrivingLevel.safe },
    { score: 69, expected: DrivingLevel.unsafe },
    { score: 30, expected: DrivingLevel.unsafe },
    { score: 29, expected: DrivingLevel.dangerous },
    { score: 0, expected: DrivingLevel.dangerous },
  ];
});
