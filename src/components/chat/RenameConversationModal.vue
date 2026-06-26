<script setup lang="ts">
import { ref, watch } from "vue";
import {
    Modal,
    ModalHeader,
    ModalTitle,
    ModalDescription,
    ModalContent,
    ModalFooter,
    ModalClose,
    Field,
    FieldLabel,
    FieldContent,
    FieldError,
    Input,
    Button,
} from "@dlbcodes/my-design-system";

const props = defineProps<{
    title: string;
}>();

const open = defineModel<boolean>("open", { required: true });

const emit = defineEmits<{
    rename: [title: string];
}>();

const value = ref(props.title);
const error = ref("");

watch(open, (isOpen) => {
    if (isOpen) {
        value.value = props.title;
        error.value = "";
    }
});

watch(value, () => {
    if (error.value && value.value.trim()) error.value = "";
});

const save = (): void => {
    const next = value.value.trim();
    if (!next) {
        error.value = "Title can't be empty.";
        return;
    }
    emit("rename", next);
    open.value = false;
};
</script>

<template>
    <Modal v-model="open" size="md">
        <ModalHeader>
            <ModalTitle>Rename conversation</ModalTitle>
            <ModalDescription>
                Give this conversation a clearer name. Only you will see it.
            </ModalDescription>
            <ModalClose />
        </ModalHeader>
        <ModalContent>
            <Field required :invalid="!!error">
                <FieldLabel>Title</FieldLabel>
                <FieldContent>
                    <Input
                        v-model="value"
                        placeholder="Conversation title"
                        @keydown.enter="save"
                    />
                    <FieldError v-if="error">{{ error }}</FieldError>
                </FieldContent>
            </Field>
        </ModalContent>
        <ModalFooter>
            <Button variant="secondary" @click="open = false">Cancel</Button>
            <Button variant="primary" @click="save">Save</Button>
        </ModalFooter>
    </Modal>
</template>
