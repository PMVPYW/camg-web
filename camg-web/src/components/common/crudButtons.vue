<script setup>
import { ref, watch, onMounted, onBeforeUnmount } from "vue";
import { data } from "autoprefixer";

const props = defineProps({
    create_callback: Function,
    change_create_state: Boolean,
    create_form: Object,
    delete_callback: Function,
    edit_callback: Function,
    obj_to_edit: Object,
    obj_to_create: Object,
    delete_form: Object,
    create_visible: {
        type: Boolean,
        default: true,
    },
    update_visible: {
        type: Boolean,
        default: true,
    },
    delete_visible: {
        type: Boolean,
        default: true,
    },
});
const emit = defineEmits(["clearSelected", "create_canceled"]);
const creating = ref(false);
const editing = ref(false);
const deleting = ref(false);
const errors = ref({});

const obj_to_edit_cpy = ref(props.obj_to_edit);
const obj_to_create_cpy = ref(props.obj_to_create);

watch(
    //whenever toogleCreating changes to true
    () => props.change_create_state,
    (newState) => {
        if (newState === true) {
            togleCreating();
        }
    },
);

watch(
    () => props.obj_to_edit,
    (new_obj) => {
        obj_to_edit_cpy.value = { ...new_obj };
        if (editing.value) {
            togleEditing();
            setTimeout(togleEditing, 0);
        }
    },
);

watch(
    () => props.obj_to_create,
    (new_obj) => {
        obj_to_create_cpy.value = { ...new_obj };
        if (editing.value) {
            togleEditing();
            setTimeout(togleEditing, 0);
        }
    },
);
const handleKeyDown = (event) => {
    let pressed_keys = "";
    const current =
        Object.keys(obj_to_edit_cpy.value).length > 0 ? true : false;
    if (event.shiftKey && event.altKey) {
        if (event.key.toLowerCase() == "n") {
            togleCreating();
        } else if (current) {
            if (event.key.toLowerCase() == "e") {
                togleEditing();
            }
            if (event.key.toLowerCase() == "d" || event.key == "Delete") {
                togleDeleting();
            }
        }
    }
};

onMounted(() => {
    window.addEventListener("keydown", handleKeyDown);
});

onBeforeUnmount(() => {
    window.removeEventListener("keydown", handleKeyDown);
});

const togleCreating = () => {
    editing.value = false;
    creating.value = !creating.value;
    deleting.value = false;
    if (!creating.value) {
        //acabou de cancelar
        emit("create_canceled");
    }
    //clearSelected();
};
const togleEditing = () => {
    editing.value = !editing.value;
    creating.value = false;
    deleting.value = false;
};
const togleDeleting = () => {
    editing.value = false;
    creating.value = false;
    deleting.value = !deleting.value;
};

const clearSelected = () => {
    emit("clearSelected");
};

const createEntity = (data) => {
    const result = props.create_callback(data);
    result.then((response) => {
        console.error("repsonse,", response);
        if (response === true) {
            errors.value = {};
            togleCreating();
        } else {
            errors.value = response;
            console.warn(errors.value, "errors_crud_value!=true");
        }
    });
};

const editEntity = (data) => {
    const result = props.edit_callback(data, obj_to_edit_cpy.value.id);
    result.then((response) => {
        if (response === true) {
            errors.value = {};
            togleEditing();
            clearSelected();
        } else {
            errors.value = response;
        }
    });
};

const deleteEntity = () => {
    const result = props.delete_callback(obj_to_edit_cpy.value.id);
    result.then((response) => {
        if (response === true) {
            errors.value = {};
        } else {
            errors.value = response;
        }
        togleDeleting();
        clearSelected();
    });
};
</script>

<template>
    <div class="w-11/12 my-8 rounded-lg justify-center mx-auto bg-[#f8f9fe]">
        <div class="flex justify-center mx-auto bg-[#f8f9fe] w-full h-16 text">
            <button
                v-if="props.create_visible"
                @click="togleCreating"
                type="button"
                class="md:w-3/12 sm:w-full text-center opacity-85 my-2 mx-2 py-3 px-4 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-green-600 bg-green-800 text-white shadow-sm hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none dark:bg-green-800 dark:border-green-600 dark:text-white dark:hover:bg-gray-800 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600 justify-center"
            >
                {{ creating ? "Cancelar" : "Criar" }}
            </button>
            <button
                v-if="props.delete_visible"
                @click="togleDeleting"
                type="button"
                :disabled="!obj_to_edit_cpy.id"
                class="md:w-3/12 sm:w-full justify-center opacity-85 my-2 mx-2 py-3 px-4 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-red-600 bg-red-800 text-white shadow-sm hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none dark:bg-red-800 dark:border-red-600 dark:text-white dark:hover:bg-gray-800 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
            >
                {{ deleting ? "Cancelar" : "Eliminar" }}
            </button>
            <button
                v-if="props.update_visible"
                @click="togleEditing"
                type="button"
                :disabled="!obj_to_edit_cpy.id"
                class="md:w-3/12 sm:w-full justify-center opacity-85 my-2 mx-2 py-3 px-4 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-gray-700 bg-slate-900 text-white shadow-sm hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-900 dark:border-gray-700 dark:text-white dark:hover:bg-gray-800 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
            >
                {{ editing ? "Cancelar" : "Editar" }}
            </button>
        </div>
        <div class="mx-auto w-full items-center">
            <Transition>
                <create_form
                    @create="(data) => createEntity(data)"
                    :obj_to_edit="{ ...obj_to_create_cpy }"
                    v-if="creating"
                    :errors="errors"
                ></create_form>
            </Transition>
            <Transition>
                <create_form
                    @edit="(data) => editEntity(data)"
                    :obj_to_edit="{ ...obj_to_edit_cpy }"
                    v-if="editing && Object.keys(obj_to_edit_cpy).length != 0"
                    :errors="errors"
                    :editing="true"
                ></create_form>
            </Transition>
            <Transition>
                <delete_form
                    @delete="deleteEntity"
                    @cancel="togleDeleting"
                    :obj_to_delete="{ ...obj_to_edit_cpy }"
                    v-if="deleting && Object.keys(obj_to_edit_cpy).length != 0"
                ></delete_form>
            </Transition>
        </div>
    </div>
</template>

<style>
.v-enter-active,
.v-leave-active {
    transition: all 0.3s ease-out;
}

.v-enter-from,
.v-leave-to {
    transition: all 0.29s cubic-bezier(1, 0.5, 0.8, 1);
}

.v-enter-from,
.v-leave-to {
    transform: translateY(-20px);
    opacity: 0;
}
</style>
