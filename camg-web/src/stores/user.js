import axios from "axios";
import { ref, computed, inject } from "vue";
import { defineStore } from "pinia";

import { useRouter } from "vue-router";

export const useUserStore = defineStore("user", () => {
  const serverBaseUrl = inject("serverBaseUrl");
  const socket = inject("socket");

  const user = ref(null);
  const vcards = ref(null)
  const admins = ref(null)


  const userName = computed(() => user.value?.name);
  const userBalance = computed(() => user.value?.balance ?? '0.00');
  const userMaxDebit = computed(() => user.value?.max_debit);
  const userContacts = computed(() => user.value?.contacts ?? []);
  const userId = computed(() => user.value?.id ?? -1);
  const userIsAdmin = computed(() => user.value?.isAdmin ?? false);
  const adminVcards = computed(() => vcards.value?.data ?? [])
  const adminDeletedVcards = computed(() => deletedVcards.value?.data ?? [])
  const adminsList = computed(() => admins.value?.data ?? [])

  const router = useRouter();



  async function loadUser() {
    try {
      const response = await axios.get("my/user");
      user.value = response.data.data;
      console.log(user.value)
    } catch (error) {
      clearUser();
      throw error;
    }
  }



  function clearUser() {
    user.value = null;
  }

  async function signup(credentials) {
    try {
      const response = await axios.post("register", credentials);
      socket.emit("newVcard", response.data)
      return true;
    } catch (error) {
      clearUser();
      return error;
    }
  }

  async function login(credentials) {
    try {
      const response = await axios.post("auth/login", credentials);
      axios.defaults.headers.common.Authorization = "Bearer " + response.data.token;
      await loadUser();
      sessionStorage.setItem("token", response.data.token);
      console.log("TRUE")
      return true;
    } catch (error) {
      console.log(credentials);

      clearUser();
      return error;
    }
  }

  async function logout() {
    try {
      await axios.post("logout");
      sessionStorage.removeItem("token");
      delete axios.defaults.headers.common.Authorization;
      clearUser();

      return true;
    } catch (error) {
      return false;
    }
  }



  return {
    user,
    userId,
    userName,
    userMaxDebit,
    userBalance,
    userContacts,
    userIsAdmin,
    vcards,
    adminVcards,
    adminDeletedVcards,
    admins,
    adminsList,
    loadUser,
    clearUser,
    login,
    logout,
    signup,
  };
});
