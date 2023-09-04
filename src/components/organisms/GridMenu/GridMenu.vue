<template>
  <v-row align="start"
    ><v-col
      cols="12"
      sm="12"
      md="12"
      lg="6"
      xl="6"
      v-for="itemMenu in menus"
      :key="itemMenu.id"
      ><v-card class="mx-auto" variant="outlined"
        ><menu-vue :menu="itemMenu" /></v-card></v-col
  ></v-row>
</template>

<script lang="ts" setup>
import MenuVue from "@/components/molecules/Menu/Menu.vue";
import { Menu } from "@/models";
import { ref } from "vue";
const props = defineProps({
  menus: {
    type: Array as () => Menu[],
    required: true,
  },
});
const menus = ref(props.menus);
</script>
