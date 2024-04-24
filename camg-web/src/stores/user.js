import axios from "axios";
import { ref, computed, inject } from "vue";
import { defineStore } from "pinia";

import { useRouter } from "vue-router";
import {useToast} from "vue-toastification";

export const useUserStore = defineStore("user", () => {
  const serverBaseUrl = inject("serverBaseUrl");
  const socket = inject("socket");

  const user = ref(null);
  const admins = ref(null);

  const toast = useToast();
  const router = useRouter();

  async function loadUser() {
    try {
      const response = await axios.get("user");
      user.value = response.data;
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
      axios.defaults.headers.common.Authorization = "Bearer " + response.token;
      sessionStorage.setItem("token", response.data.token);
      return true;
    } catch (error) {
      console.log(credentials);
      toast.warning(error.response.data.message);
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

  async function restoreToken() {
    let storedToken = sessionStorage.getItem("token");

    if (storedToken) {
      axios.defaults.headers.common.Authorization = "Bearer " + storedToken
      await loadUser();
      return true
    }

    clearUser();
    return false;
  }



  return {
    restoreToken,
    user,
    admins,
    loadUser,
    clearUser,
    login,
    logout,
    signup,
  };
});
