import React from "react";
import * as style from "./style";

const LoadingDots = () => (
  <style.DotWrapper>
    <style.Dot delay="0s" />
    <style.Dot delay=".1s" />
    <style.Dot delay=".2s" />
  </style.DotWrapper>
);

export default LoadingDots;
