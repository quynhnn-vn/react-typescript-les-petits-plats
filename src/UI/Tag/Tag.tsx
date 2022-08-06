import React from "react";
import { tagsList } from "../../common/constants";
import { SelectedTags } from "../../types/types";
import closeIcon from "../../assets/close.svg";

import { Button } from "react-bootstrap";

import styles from "./Tag.module.css";

type TagProps = {
  selectedTags: SelectedTags;
  setSelectedTags: React.Dispatch<React.SetStateAction<SelectedTags>>;
};

export default function Tag(props: TagProps) {
  const { selectedTags, setSelectedTags } = props;

  const onRemoveSelectedTags = (tag: string) => {
    const newSelectedTags = {
      ...selectedTags,
    };
    const keysOfNewSelectedTags = Object.keys(newSelectedTags);
    for (let i = 0; i < keysOfNewSelectedTags.length; i++) {
      const key = keysOfNewSelectedTags[i];
      const index = newSelectedTags[key as keyof SelectedTags].indexOf(tag);
      if (index !== -1) {
        newSelectedTags[key as keyof SelectedTags].splice(index, 1);
      }
    }
    setSelectedTags(newSelectedTags);
  };

  const cloneSelectedTags = Object.values(selectedTags).flat();
  let existedSelectedTags = [];
  for (let i = 0; i < cloneSelectedTags.length; i++) {
    if (
      cloneSelectedTags[i].length > 0 &&
      typeof cloneSelectedTags[i] === "string"
    ) {
      existedSelectedTags.push(cloneSelectedTags[i].toLowerCase());
    }
  }

  let content = [];
  for (let j = 0; j < tagsList.length; j++) {
    const item = tagsList[j] as any;

    const tagsOfItem = selectedTags[item.value as keyof SelectedTags];
    for (let k = 0; k < tagsOfItem.length; k++) {
      const tag = tagsOfItem[k];
      content.push(
        <Button
          key={j + "-" + k}
          className={styles.TagBtn}
          onClick={() => onRemoveSelectedTags(tag)}
          style={{
            background: item.color,
            borderColor: item.color,
          }}
        >
          <span>{tag}</span>
          <img src={closeIcon} alt="Close" />
        </Button>
      );
    }
  }

  return existedSelectedTags.length > 0 ? (
    <section className={styles.TagBar}>{content}</section>
  ) : null;
}
