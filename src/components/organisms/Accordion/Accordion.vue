<template>
  <div class="accordion">
    <!-- list of menu accordions maked with Vuetify 3 Expansion Panels and Recursive with expansion panels -->
    <v-expansion-panels>
      <v-expansion-panel v-for="item in menu" :title="item.name" :key="item.id">
        <Accordion v-if="item.children?.length" :menu="item.children" />
      </v-expansion-panel>
    </v-expansion-panels>
  </div>
</template>

<script lang="ts" setup>
import { ref, toRefs } from "vue";
import type { Menu } from "@/models";
import { PropType } from "vue";
//Receive props from parent component
const props = defineProps({
  menu: {
    type: Array as PropType<Menu[]>,
    required: false,
    default: () => [
      {
        id: 1,
        name: "menu1",
        parent: null,
        children: [
          {
            id: 2,
            name: "menu2",
            parent: 1,
            children: [],
          },
          {
            id: 3,
            name: "menu3",
            parent: 1,
            children: [
              {
                id: 4,
                name: "menu4",
                parent: 1,
                children: [],
              },
            ],
          },
        ],
      },
    ],
  },
});
const { menu } = toRefs(props);
</script>
