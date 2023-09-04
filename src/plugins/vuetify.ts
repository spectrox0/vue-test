/**
 * plugins/vuetify.ts
 *
 * Framework documentation: https://vuetifyjs.com`
 */

// Styles
import "@mdi/font/css/materialdesignicons.css";
import "vuetify/styles";

// Composables
import { createVuetify } from "vuetify";
import {
  VDataTable,
  VDataTableServer,
  VDataTableVirtual,
} from "vuetify/labs/VDataTable";

// https://vuetifyjs.com/en/introduction/why-vuetify/#feature-guides
export default createVuetify({
  components: {
    VDataTable,
    VDataTableServer,
    VDataTableVirtual,
  },
  theme: {
    defaultTheme: "dark",
    themes: {
      light: {
        colors: {
          primary: "#1867C0",
          secondary: "#5CBBF6",
          background: "#FFFFFF",
        },
      },
      dark: {
        colors: {
          primary: "#1867C0",
          secondary: "#5CBBF6",
          background: "#121212",
        },
      },
    },
  },
  defaults: {
    VTextField: {
      variant: "outlined",
      dense: "compact",
    },
    VBtn: {
      flat: true,
      variant: "outlined",
    },
    VSelect: {
      variant: "outlined",
      dense: "compact",
      flat: true,
    },
    VCard: {
      // variant: "outlined",
      flat: true,
    },
    vTable: {
      variant: "outlined",
      flat: true,
    },
  },
});
