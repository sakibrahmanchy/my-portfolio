import { motion } from "framer-motion";
import { Box, Heading, Text } from "@chakra-ui/react";
import styles from "./card.module.css";

export default function Card({ title, content }: CardProps) {
    return (
      <div className={styles.card}>
        <h2>{title}</h2>
        <div className={styles.innerCard}>{content}</div>
      </div>
    );
  }
  