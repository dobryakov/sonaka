import React from "react";
import { useTranslation } from "react-i18next";

type EmptyStateProps = {
  message?: string;
};

export const EmptyState: React.FC<EmptyStateProps> = ({ message }) => {
  const { t } = useTranslation();
  return (
    <div style={{ padding: 24, textAlign: "center", color: "#6b7280" }}>
      {message || t("common.empty")}
    </div>
  );
};

export default EmptyState;


