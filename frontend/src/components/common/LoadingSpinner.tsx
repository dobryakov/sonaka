import React from "react";
import { useTranslation } from "react-i18next";
import styles from "./LoadingSpinner.module.css";

export const LoadingSpinner: React.FC = () => {
  const { t } = useTranslation();
  return (
    <div className={styles.loadingSpinner}>
      <div
        className={styles.spinner}
        aria-label={t("common.loading")}
      />
      <span className={styles.text}>{t("common.loading")}</span>
    </div>
  );
};

export default LoadingSpinner;


