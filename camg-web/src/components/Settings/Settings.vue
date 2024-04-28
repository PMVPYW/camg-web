<script setup>
import { useUserStore } from "@/stores/user.js";
import { inject, onMounted, ref } from "vue";

const serverBaseUrl = inject("serverBaseUrl");

const userStore = useUserStore();
const user = ref( {...userStore.user});
const errors = ref( {});
onMounted(() => {
  user.value.password = null;
  user.value.password_confirmation = null;
  user.value.old_password = null;
})

async function updateUser() {
  console.log(user.value)
  const resp = await userStore.updateUser(user.value);
  if(resp != true)
  {
    errors.value = resp;
  } else {
    errors.value = {}
    user.value = { ...userStore.user };
    user.value.password = null;
    user.value.password_confirmation = null;
    user.value.old_password = null;
  }

}

const viewing_foto = ref(null);

function handleFileChange(event) {
  const file = event.target.files[0];
  user.value.photo_url = event.target.files[0];
  const reader = new FileReader();

  reader.onload = () => {
    viewing_foto.value = reader.result;
  };

  if (file) {
    reader.readAsDataURL(file);
  }
}
</script>


<template>
  <div class="mx-auto w-full flex items-center">
    <form class="w-11/12 border-2 rounded-xl mx-auto flex">
      <div class="mx-8 w-2/12 flex items-center">
        <input id="foto" accept="image/png, image/gif, image/jpeg" @change="handleFileChange/*user.photo_url = $event.target.files[0]*/" type="file" class="hidden">
        <label for="foto">
          <img class="mx-auto rounded-full w-48 h-48"
               :src="viewing_foto ?  viewing_foto : userStore.profile_photo"><br v-if="errors.photo_url"><span class="font-bold text-sm text-red-600" v-if="errors.photo_url">{{errors?.photo_url[0]}}</span>
        </label>
      </div>
      <div class="w-full">
        <div class="w-full flex mx-auto justify-center">
          <div class="w-1/2 p-4">
            <label for="nome" class="block text-sm font-medium mx-2 mt-4 mb-2">Nome</label>
            <input type="text" name="nome" placeholder="Nome" required v-model="user.nome"
                   class="h-10 mx-2 mb-2 p-2 font-bold text-center border-2 rounded-lg w-full">
            <br v-if="errors.nome"><span class="ml-4 font-bold text-sm text-red-600" v-if="errors.nome">{{errors?.nome[0]}}</span>
          </div>
          <div class="w-1/2 p-4">
            <label for="email" class="block text-sm font-medium mx-2 mt-4 mb-2">Email</label>
            <input type="email" name="email" placeholder="Email" required v-model="user.email"
                   class="h-10 mx-2 mb-2 p-2 font-bold text-center border-2 rounded-lg w-full">
            <br v-if="errors.email"><span class="ml-4 font-bold text-sm text-red-600" v-if="errors.email">{{errors?.email[0]}}</span>
          </div>
        </div>
        <div class="w-full flex mx-auto justify-center">
          <div class="w-full p-4 flex justify-center items-end">
            <div class="mx-auto p-4 w-1/2">
              <label for="nome" class="block text-sm font-medium mx-2 mt-4 mb-2">Nova Password</label>
              <input type="password" name="password" placeholder="password" required v-model="user.password"
                     class="h-10 mx-2 mb-2 p-2 font-bold text-center border-2 rounded-lg w-full">
              <span class="ml-4 font-bold text-sm text-red-600" v-if="errors.password">{{errors?.password[0]}}</span>

            </div>
            <div v-if="user.password" class="mx-auto p-4 w-1/2">
              <label for="nome" class="block text-sm font-medium mx-2 mt-4 mb-2">Confirmar Nova Password</label>
              <input type="password" name="password_conf" placeholder="confirmar password" required
                     v-model="user.password_confirmation"
                     class="h-10 mx-2 mb-2 p-2 font-bold text-center border-2 rounded-lg w-full">
              <span class="ml-4 font-bold text-sm text-red-600" v-if="errors.password">{{errors?.password[0]}}</span>
            </div>
            <div v-if="!user.password" class="mx-auto p-4 w-1/2">
              <input type="submit" value="Atualizar Perfil" @click.prevent="updateUser"
                     class="h-10 mb-2 p-2 mr-0 bg-green-500 text-white hover:bg-green-600 font-bold text-center border-2 rounded-lg w-full">
            </div>
          </div>
        </div>
        <div v-if="user.password" class="w-full flex mx-auto justify-center">
          <div class="w-full p-4 flex justify-center items-end">
            <div class="mx-auto p-4 w-1/2">
              <label for="old_password" class="block text-sm font-medium mx-2 mt-4 mb-2">Password Atual</label>
              <input type="password" name="old_password" placeholder="password atual" required v-model="user.oldValue"
                     class="h-10 mx-2 mb-2 p-2 font-bold text-center border-2 rounded-lg w-full">
              <br v-if="errors.old_password"><span class="ml-4 font-bold text-sm text-red-600" v-if="errors.old_password">{{errors?.old_password[0]}}</span>


            </div>
            <div class="mx-auto p-4 w-1/2">
              <input type="submit" value="Atualizar Perfil" @click.prevent="updateUser"
                     class="h-10 mb-2 p-2 mr-0 bg-green-500 text-white hover:bg-green-600 font-bold text-center border-2 rounded-lg w-full">
              <br v-if="errors.old_password"><span class="ml-4 font-bold text-sm text-transparent" v-if="errors.old_password">{{errors?.old_password[0]}}</span>
            </div>
          </div>
        </div>
      </div>
    </form>
  </div>
</template>
