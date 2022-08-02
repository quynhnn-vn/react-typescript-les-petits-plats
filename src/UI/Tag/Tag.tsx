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

  const selectedTagsInText = Object.values(selectedTags)
    .flat()
    .filter((value) => value.length > 0)
    .map((v) => v.toLowerCase());

  const onRemoveSelectedTags = (tag: string) => {
    const newSelectedTags = {
      ...selectedTags,
    };
    Object.keys(newSelectedTags).forEach((key) => {
      const index = newSelectedTags[key as keyof SelectedTags].indexOf(tag);
      if (index !== -1) {
        newSelectedTags[key as keyof SelectedTags].splice(index, 1);
      }
    });
    setSelectedTags(newSelectedTags);
  };

  return selectedTagsInText.length > 0 ? (
    <section className={styles.TagBar}>
      {tagsList.map((item) => {
        return selectedTags[item.value as keyof SelectedTags].map(
          (tag, index) => (
            <Button
              key={index}
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
          )
        );
      })}
    </section>
  ) : null;
}
