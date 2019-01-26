import React from "react";
import * as styled from "./style";
import LoadingDots from "../LoadingDots";

const mapContentToTag = contentArr => {
  return contentArr.map((content, index) => {
    const { v1Line, v2Line, symbol, string } = content;
    let lineCounterColor = "#f4f5f9";
    let contentColor = "#f4f5f9";
    if (symbol === "+") {
      lineCounterColor = "#9DC3C1";
      contentColor = "#D8E6E7";
    } else if (symbol === "-") {
      lineCounterColor = "#ED9282";
      contentColor = "#F7AA97";
    }
    return (
      <styled.LineContainer key={index}>
        <styled.LineCounter backgroundColor={lineCounterColor}>
          {v1Line} {v2Line}
        </styled.LineCounter>
        <styled.Symbol backgroundColor={contentColor}>{symbol}</styled.Symbol>
        <styled.StringContent backgroundColor={contentColor}>
          {string}
        </styled.StringContent>
      </styled.LineContainer>
    );
  });
};

const DiffViewer = ({ content, loading }) => {
  if (loading) {
    return (
      <styled.EmptyPre>
        <LoadingDots />
      </styled.EmptyPre>
    );
  }
  return content.length !== 0 ? (
    <styled.Pre>{mapContentToTag(content)}</styled.Pre>
  ) : (
    <styled.EmptyPre>좌측 파일을 클릭하세요!</styled.EmptyPre>
  );
};

export default DiffViewer;
