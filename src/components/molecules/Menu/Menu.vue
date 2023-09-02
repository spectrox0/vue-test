<template>
  <v-list>
    <submenu :menu="menu"></submenu>
  </v-list>
</template>

<script lang="ts" setup>
import Submenu from "./Submenu.vue";
import { Menu } from "@/models";
import { toRefs, watch } from "vue";
import { PropType } from "vue";
//Get menu from props
const props = defineProps({
  menu: {
    type: Object as PropType<Menu>,
    required: true,
  },
});
// get menu from props
const { menu } = toRefs(props);

// watch menu to update the menu variable
watch(
  () => props.menu,
  (value) => {
    menu.value = value;
  }
);
</script>
