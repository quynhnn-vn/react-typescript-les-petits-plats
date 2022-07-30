import React from "react";
import { dropdownList } from "../../common/constants";
import { TagInput } from "../../types/types";
import closeIcon from "../../assets/close.svg";

import { Button } from "react-bootstrap";

import styles from "./Tag.module.css";

type TagProps = {
  tagInput: TagInput;
  setTagInput: React.Dispatch<React.SetStateAction<TagInput>>;
};

export default function Tag(props: TagProps) {
  const { tagInput, setTagInput } = props;

  const onRemoveTagInput = (tag: string) => {
    const newTagInput = {
      ...tagInput,
    };
    Object.keys(newTagInput).forEach((key) => {
      const index = newTagInput[key as keyof TagInput].indexOf(tag);
      if (index !== -1) {
        newTagInput[key as keyof TagInput].splice(index, 1);
      }
    });
    setTagInput(newTagInput);
  };

  return Object.values(tagInput)
    .flat()
    .filter((value) => value.length > 0)
    .map((v) => v.toLowerCase()).length > 0 ? (
    <section className={styles.TagBar}>
      {dropdownList.map((item) => {
        return tagInput[item.value as keyof TagInput].map((tag, index) => (
          <Button
            key={index}
            className={styles.TagBtn}
            onClick={() => onRemoveTagInput(tag)}
            style={{
              background: item.variant,
              borderColor: item.variant,
            }}
          >
            <span>{tag}</span>
            <img src={closeIcon} alt="Close" />
          </Button>
        ));
      })}
    </section>
  ) : null;
}
