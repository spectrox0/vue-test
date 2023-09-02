<template>
  <v-list-group v-if="menu?.children?.length" :value="menu.name">
    <template v-slot:activator="{ props }">
      <v-list-item
        class="align-start"
        v-bind="props"
        :title="menu.name"
      ></v-list-item>
    </template>
    <submenu v-for="item in menu.children" :key="item.id" :menu="item" />
  </v-list-group>
  <!-- else only show options without collapse -->
  <v-list-item v-else :value="menu.name" class="align-start">
    <v-list-item-content>
      <v-list-item-title>{{ menu.name }}</v-list-item-title>
    </v-list-item-content>
  </v-list-item>
</template>

<script lang="ts" setup>
import { Menu } from "@/models";
import { toRefs, watch, PropType } from "vue";
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
