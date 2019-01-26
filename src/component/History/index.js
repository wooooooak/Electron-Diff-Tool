import React from "react";
import * as style from "./style";

const genUniqKey = (str, id) => {
  return str + id;
};

const mapHistoryToCard = (history, onClickHistoryCard) => {
  let uniqId = 1;
  return history.map((el, index) => {
    if (index === 0) {
      return (
        <style.CurrentCard
          key={genUniqKey(el.name, uniqId++)}
          onClick={() => onClickHistoryCard(el)}
        >
          <style.Name>{el.name}</style.Name>
        </style.CurrentCard>
      );
    }
    return (
      <style.RemainCard
        key={genUniqKey(el.name, uniqId++)}
        onClick={() => onClickHistoryCard(el)}
      >
        <style.Name>{el.name}</style.Name>
      </style.RemainCard>
    );
  });
};

const History = ({ history, onClickHistoryCard, clearHistory }) => {
  let clearButtonVisible = "hidden";
  if (history.length > 0) {
    clearButtonVisible = "visible";
  }
  return (
    <style.Container>
      <style.TitleBar>
        <style.Title>HISTORY</style.Title>
        <style.ClearButton
          visibility={clearButtonVisible}
          onClick={clearHistory}
        />
      </style.TitleBar>
      {history.length > 0
        ? mapHistoryToCard(history, onClickHistoryCard)
        : null}
    </style.Container>
  );
};

export default History;
