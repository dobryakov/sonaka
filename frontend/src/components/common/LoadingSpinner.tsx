import React from "react";
import { useTranslation } from "react-i18next";

export const LoadingSpinner: React.FC = () => {
  const { t } = useTranslation();
  return (
    <div style={{ display: "flex", gap: 8, alignItems: "center", padding: 16 }}>
      <div
        aria-label={t("common.loading")}
        style={{
          width: 16,
          height: 16,
          border: "2px solid #a7f3d0",
          borderTopColor: "transparent",
          borderRadius: "50%",
          animation: "spin 1s linear infinite",
        }}
      />
      <span>{t("common.loading")}</span>
      <style>{"@keyframes spin { from { transform: rotate(0deg);} to { transform: rotate(360deg);} }"}</style>
    </div>
  );
};

export default LoadingSpinner;


