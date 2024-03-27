import axios from "axios";
import { ref, computed, inject } from "vue";
import { defineStore } from "pinia";
import { useToast } from "vue-toastification";
import { useTransactionStore } from "./transaction";
import { useRouter } from "vue-router";

export const useUserStore = defineStore("user", () => {
 /* const serverBaseUrl = inject("serverBaseUrl");
  const socket = inject("socket");
  const toast = useToast();

  const user = ref(null);
  const vcards = ref(null)
  const deletedVcards = ref(null)
  const admins = ref(null)
  const vcardToRestore = ref(null)
  const adminToDelete = ref(null)
  const filtersCards = ref(null)
  const sortCards = ref(null)


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


  socket.on('editedUser', (ed_user) => {
    if (userIsAdmin)
    {
      if (user.value.id == ed_user.id)
      {
        Object.assign(user.value, ed_user)
        user.value.photo_url = ed_user.photo_url
        toast.info("Your user has been updated!", {
          toastClassName: "my-custom-toast-class"
        });
      } else {
        if (ed_user.isAdmin) {
          admins.value.data[admins.value.data.indexOf(admins.value.data.find(v => v.id === ed_user.id))] = ed_user
        } else {
          vcards.value.data[vcards.value.data.indexOf(vcards.value.data.find(v => v.phone_number === ed_user.phone_number))] = ed_user
        }
      }
      return;
    } 
    Object.assign(user.value, ed_user)
    user.value.photo_url = ed_user.photo_url
    toast.info("Your user has been updated!", {
      toastClassName: "my-custom-toast-class"
    });
  })

  socket.on("editedUserMaxDebit", (edited_user) => {
    vcards.value.data[vcards.value.data.indexOf(vcards.value.data.find(v => v.phone_number === edited_user.phone_number))] = edited_user
    toast.info("The max debit of an user has been changed!", {
      toastClassName: "my-custom-toast-class"
    });
  })

  socket.on("deletedVcard", (deletedVcard)=>{
    if (userIsAdmin.value)
    {
      vcards.value.data = vcards.value.data.filter(v => v.phone_number !== deletedVcard.phone_number)
      deletedVcards.value.data.unshift(deletedVcard)
      toast.info("A Vcard has been deleted!", {
        toastClassName: "my-custom-toast-class"
      });
    } else if (user.value.phone_number == deletedVcard.phone_number)
    {
      toast.info("Your Account have been deleted!\nPlease contact an administrator.", {
        toastClassName: "my-custom-toast-class"
      });
      logout();
      router.push({name: "login"})
    }
  })

  socket.on('userBlocked', (blocked_user) => {
    if (userIsAdmin.value)
    {
      toast.info(`An user has been ${ blocked_user.blocked == 1 ? 'blocked!' : 'unblocked!'}` , {
        toastClassName: "my-custom-toast-class"
      });
      vcards.value.data[vcards.value.data.indexOf(vcards.value.data.find(v => v.phone_number === blocked_user.phone_number))] = blocked_user
    } else  {
      toast.error(`You have been ${ blocked_user.blocked == 1 ? 'blocked!' : 'unblocked!'}` , {
        toastClassName: "my-custom-toast-class"
      });
      logout()
      router.push("/login")
    }
  })

  socket.on("createdAdmin", (created_admin)=>{
      toast.info("An Administrator has been created!", {
        toastClassName: "my-custom-toast-class"
      });
      admins.value.data.push(created_admin)
  })

  socket.on("deletedAdmin", (deleted_admin) => {
    toast.info("An Administrator has been deleted!", {
      toastClassName: "my-custom-toast-class"
    });
    admins.value.data = admins.value.data.filter(a => a.id != deleted_admin.id)
  })

  socket.on("restoredVcard", (rest_vcard) => {
    toast.info("An Vcard has been restored!", {
      toastClassName: "my-custom-toast-class"
    });
    deletedVcards.value.data = deletedVcards.value.data.filter(v => v.phone_number !== rest_vcard.phone_number)
    vcards.value.data.unshift(rest_vcard);
  })

  socket.on("newVcard", (newVcard) => {
    toast.info("An new Vcard has been registered!", {
      toastClassName: "my-custom-toast-class"
    });
    console.log(newVcard)
    vcards.value.data.unshift(newVcard);
  })*/


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

  async function restoreToken() {
    let storedToken = sessionStorage.getItem("token");

    if (storedToken) {
        axios.defaults.headers.common.Authorization = "Bearer " + storedToken
        await loadUser()
        socket.emit('loggedIn', user.value)
        return true
    }

    clearUser();
    return false;
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
      const response = await axios.post("login", credentials);
      axios.defaults.headers.common.Authorization = "Bearer " + response.data.token;
      await loadUser();
      sessionStorage.setItem("token", response.data.token);
      socket.emit("loggedIn", user.value);
      return true;
    } catch (error) {
      clearUser();
      return error;
    }
  }

  async function logout() {
    try {
      await axios.post("logout");
      socket.emit("loggedOut", user.value);
      sessionStorage.removeItem("token");
      delete axios.defaults.headers.common.Authorization;
      clearUser();

      return true;
    } catch (error) {
      return false;
    }
  }

  async function updateUserInfo(userInfo) {
    try {
      console.log("usr", user.value)
      let response
      userInfo._method = 'PUT'
      const url =  userIsAdmin.value ? `admins/${userId.value}` : `cards/${user.value.phone_number}`
      response = await axios.post(url, userInfo, {headers: {
          'Content-Type': 'multipart/form-data'
      }});
      console.log(user.value.photo_url , response.data.user.photo_url)
        if (user.value.isAdmin)
        {
          user.value.name = response.data.user.name
          user.value.email = response.data.user.email
          user.value.isAdmin = true
        } else {
          user.value = response.data.user
          user.isAdmin = false
        }
        console.log(user.value.photo_url)
        socket.emit('editedUser', user.value)
        toast.success("Profile updated successfully", {
          toastClassName: "my-custom-toast-class"
        });
      
      return true;
    } catch (error) {
      console.log("err", error)
      if (error.status == 413)
      {
        toast.error("File is too big!");
      } else {
        return error;
      }
      
    }
  }

  async function deleteVCard({body, vcard = null}){
    try {
      const transactionStore = useTransactionStore()
      body._method = 'DELETE'
      let response = vcard === null ? await axios.post(`cards/${user.value.phone_number}`, body) : await axios.delete(`cards/${vcard.phone_number}`)
      
      if(userIsAdmin.value){
        if(vcard !== null){
          vcards.value.data = vcards.value.data.filter(v => v.phone_number !== vcard.phone_number)
          deletedVcards.value.data.unshift(vcard)
          vcard.deleted_at = new Date()
          transactionStore.sendMoneyToContact(vcard)
          socket.emit('deletedVcard', vcard)
        }
      } else {
        logout()
        router.push({name: "login"})
      }
      toast.success(`VCard deleted successfully. ${userIsAdmin.value ? 'See it in the deleted vcards tab.' : ''}`, {
        toastClassName: "my-custom-toast-class"
      });

      

      return true
    }catch(e){
      console.log(e)
      toast.error(e.response.data.message + " \n Account not deleted", {
        toastClassName: "my-custom-toast-class"
      });
    }
  }

  async function getAllVCards(endpoint = ""){
    try {
      let response
      if(endpoint == "")
        response = await axios.get("cards");
      else
        response = await axios.get(endpoint);
      
      vcards.value = response.data.data;
      return true;
    } catch (error) {
      toast.error("Error fetching vcards " + error, {
        toastClassName: "my-custom-toast-class"
      });
      return false;
    }
  }

  async function getAllDeletedVCards(endpoint = ""){
    try {
      let response
      if(endpoint == "")
        response = await axios.get("cards/deleted");
      else
        response = await axios.get(endpoint);

      console.log(response.data.data)
      
      deletedVcards.value = response.data.data;
      return true;
    } catch (error) {
      toast.error("Error fetching deleted vcards " + error, {
        toastClassName: "my-custom-toast-class"
      });
      return false;
    }
  }

  async function updateMaxDebitVcard(vcard = null, maxDebit){
    if(vcard == null){
      toast.error("Error updating VCard", {
        toastClassName: "my-custom-toast-class"
      });
      return
    }

    try{
      const transactionStore = useTransactionStore()
      const response = await axios.patch('cards/update/' + vcard.phone_number, {'max_debit' : maxDebit})
      vcards.value.data[vcards.value.data.indexOf(vcards.value.data.find(v => v.phone_number === vcard.phone_number))] = response.data.data
      toast.success("VCard updated successfully", {
        toastClassName: "my-custom-toast-class"
      });
      response.data.data.created_at = vcard.created_at
      transactionStore.sendMoneyToContact(response.data.data)
      socket.emit("editedUserMaxDebit", response.data.data)
    }catch(error){
      toast.error("Error updating VCard: " + error, {
        toastClassName: "my-custom-toast-class"
      });
    }
  }

  async function restoreVcard(){
    if(vcardToRestore.value == null){
      toast.error("Error restoring VCard", {
        toastClassName: "my-custom-toast-class"
      });
      return
    }

    try{
      let number = vcardToRestore.value.phone_number
      const response = await axios.put(`cards/${number}/restore`)
      deletedVcards.value.data = deletedVcards.value.data.filter(v => v.phone_number !== number)
      vcards.value.data.unshift(response.data.data);
      toast.success(`VCard restored with success`, {
        toastClassName: "my-custom-toast-class"
      });
      socket.emit("restoredVcard", response.data.data);
      vcardToRestore.value = null
    }catch(error){
      toast.error("Error updating VCard: " + error.response?.data?.message, {
        toastClassName: "my-custom-toast-class"
      });
    }
  }

  async function blockVCard(vcard = null){
    if(vcard == null){
      toast.error("Error updating VCard", {
        toastClassName: "my-custom-toast-class"
      });
      return
    }

    try{
      const transactionStore = useTransactionStore()
      const response = await axios.patch('cards/update/' + vcard.phone_number, {'blocked' : vcard.blocked ? 0 : 1})
      vcards.value.data[vcards.value.data.indexOf(vcards.value.data.find(v => v.phone_number === vcard.phone_number))] = response.data.data
      console.log("rd", response.data.data)
      socket.emit("blockedUser", user.value, response.data.data)
      toast.success(`VCard ${response.data.data.blocked == 1 ? 'blocked' : 'unblocked'} successfully`, {
        toastClassName: "my-custom-toast-class"
      });
      transactionStore.sendMoneyToContact(response.data.data)
    }catch(error){
      toast.error("Error updating VCard: " + error.response.data.message, {
        toastClassName: "my-custom-toast-class"
      });
    }
  }

  /**
   * Load all admins (only admins can do this)
   */
  async function getAllAdmins(endpoint = ""){
    try{
      let response 
      if(endpoint == "")
        response = await axios.get('admins')
      else
        response = await axios.get(endpoint)
      admins.value = response.data
    }catch(error){
      toast.error("Error fetching admins: " + error.response.data.message, {
        toastClassName: "my-custom-toast-class"
      });
    }
  }

    /**
   * 
   * Delete admin (Only admins can do this)
   */
    async function deleteAdmin(){
      try {
        let response = axios.delete(`admins/${adminToDelete.value.id}`)
        if(adminToDelete.value.id !== user.value.id)
          admins.value.data = admins.value.data.filter(a => a.id != adminToDelete.value.id)

        toast.success("Administrator deleted successfully", {
          toastClassName: "my-custom-toast-class"
        });
        socket.emit("deletedAdmin", adminToDelete.value);
        adminToDelete.value = null
      } catch (error) {
        toast.error("Error deleting admins " + error, {
          toastClassName: "my-custom-toast-class"
        });
        return false;
      }
    }

    /**
   * Add an admins (only admins can do this)
   */
  async function createAdmin(admin){
    try{
      const response = await axios.post('admins', admin)
      toast.success("Administrator created successfully", {
        toastClassName: "my-custom-toast-class"
      });
      admins.value.data.push(response.data.data)
      socket.emit("createdAdmin", response.data.data)
      return true
    }catch(error){
      return error
    }
  }

  async function filtersVcard({sortOrder ="", filters="", trashed="", endpoint=""}) {
    var data = ""
    filtersCards.value = filters
    sortCards.value = sortOrder
    if (filters) {
      data += "&filters=" + filters
    }
    if (sortOrder) {
      data += (filters ? "," : "&filters=") + sortOrder
    }
    if (endpoint) {
      trashed ? console.log(endpoint + data) : console.log(endpoint + data)
      trashed ? getAllDeletedVCards(endpoint + data) : getAllVCards(endpoint + data);
    }else{
      var urldate = "http://172.22.21.108/api/"
      console.log("Sem endpoint:",urldate + "cards?" + data)
      trashed ? getAllDeletedVCards(urldate + "cards/deleted?" + data) : getAllVCards(urldate + "cards?" + data);
    }
  }

  async function filtersAdmin(sortOrder) {
    var data = ""

    if (sortOrder) {
      data = ("filters=") + sortOrder
    }

    var urldate = "http://172.22.21.108/api/"
    console.error(urldate + "admins?" + data)
    getAllAdmins(urldate + "admins?" + data);
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
    deletedVcards,
    adminDeletedVcards,
    vcardToRestore,
    admins,
    adminsList,
    adminToDelete,
    deleteVCard,
    createAdmin,
    deleteAdmin,
    getAllAdmins,
    restoreVcard,
    getAllDeletedVCards,
    updateMaxDebitVcard,
    blockVCard,
    getAllVCards,
    restoreToken,
    loadUser,
    clearUser,
    login,
    logout,
    signup,
    updateUserInfo,
    filtersCards,
    sortCards,
    filtersVcard,
    filtersAdmin
  };
});
