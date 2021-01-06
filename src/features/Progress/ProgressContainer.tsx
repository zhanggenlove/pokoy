import React from "react";
import { Sound } from "./Sound";
import { ProgressDrawer } from "./ProgressDrawer";

export const FibonacciProgress = ({ value }: { value: number }) => {
  return (
    <>
      <Sound progress={value} />
      <ProgressDrawer progress={value} />
    </>
  );
};
