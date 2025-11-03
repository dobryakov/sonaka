import i18n from "i18next";
import { initReactI18next } from "react-i18next";

const resources = {
  ru: {
    translation: {
      common: {
        empty: "Пока нет данных",
        loading: "Загрузка...",
      },
      sidebar: {
        dashboard: "Главная",
        orders: "Мои заказы",
      },
      orders: {
        status: {
          pending: "Ожидается",
          processing: "В обработке",
          completed: "Завершён",
          cancelled: "Отменён",
        },
        details: "Подробнее",
        empty: "У вас пока нет заказов",
      },
      stats: {
        total_orders: "Всего заказов",
        total_amount: "Общая сумма",
      },
    },
  },
};

i18n.use(initReactI18next).init({
  resources,
  lng: "ru",
  fallbackLng: "ru",
  interpolation: { escapeValue: false },
});

export default i18n;


