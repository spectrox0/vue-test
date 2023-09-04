<template>
  <v-form class="form" v-model="valid" @submit="associatedMenus">
    <v-select
      v-if="menus"
      v-model="menus"
      :items="allMenus"
      item-title="name"
      item-value="id"
      label="Select Menus"
      multiple
      chips
      hint="Menus"
      persistent-hint
    ></v-select>

    <v-btn
      type="submit"
      @click="associatedMenus"
      :disabled="!valid || !validateIfChangeExist || associateLoading"
      :loading="loading || loadingAllMenus || associateLoading"
      size="large"
      >Submit</v-btn
    >
  </v-form>
</template>

<script lang="ts" setup>
import { useFetchMenus, useServiceFetch } from "@/composables";
import { userService } from "@/services";
import { handleAPIError, isEqualObject } from "@/utils";
import { ref } from "vue";
import { computed } from "vue";
import { onMounted } from "vue";
import { useToast } from "vue-toastification";

const valid = ref<boolean>(false);
//Define props to receive the user
const emit = defineEmits<{ associate: [] }>();
const { userId } = defineProps({
  userId: {
    type: Number,
    required: true,
  },
});
const {
  data: menus,
  doFetch,
  loading,
} = useServiceFetch(userService.getMenusByUser);

const {
  data: allMenus,
  loading: loadingAllMenus,
  doFetch: menusFetch,
} = useFetchMenus();

const { loading: associateLoading, doFetch: associateFn } = useServiceFetch(
  userService.associateMenusToUser
);

const validateIfChangeExist = computed(() => isEqualObject(menus, userMenus));

const toast = useToast();
const getMenusByUser = async () => {
  if (userId !== undefined) doFetch(userId);
};
onMounted(() => {
  Promise.all([getMenusByUser(), menusFetch(undefined)]);
});

const userMenus = ref<number[]>();

const associatedMenus = async () => {
  if (userId === undefined || !menus?.value) return;
  try {
    const res = await associateFn(userId, menus.value);
    console.log("res associate menus to user", res);
    toast.success("Menus have been successfully associated");
    emit("associate");
  } catch (error) {
    handleAPIError(error);
  }
};
</script>
