import React from "react"
import styles from "./styles.module.css"

type Props = {}

export const Tip = (props: Props) => (
  <span className={styles["tip"]}>Нажми на круг чтобы начать</span>
)

Tip.defaultProps = {}
