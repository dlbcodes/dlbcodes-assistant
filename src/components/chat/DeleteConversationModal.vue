<script setup lang="ts">
import {
    Modal,
    ModalHeader,
    ModalTitle,
    ModalDescription,
    ModalContent,
    ModalFooter,
    ModalClose,
    Button,
} from "@dlbcodes/my-design-system";

defineProps<{
    title: string; // the conversation being deleted
}>();

const open = defineModel<boolean>("open", { required: true });

const emit = defineEmits<{
    confirm: [];
}>();

const confirm = (): void => {
    emit("confirm");
    open.value = false;
};
</script>

<template>
    <Modal v-model="open" size="md">
        <ModalHeader>
            <ModalTitle>Delete conversation?</ModalTitle>
            <ModalDescription>This can't be undone.</ModalDescription>
            <ModalClose />
        </ModalHeader>
        <ModalContent>
            <p class="text-sm leading-relaxed text-text-secondary">
                "{{ title }}" and all of its messages will be permanently
                removed.
            </p>
        </ModalContent>
        <ModalFooter>
            <Button variant="secondary" @click="open = false">Cancel</Button>
            <Button variant="destructive" @click="confirm">Delete</Button>
        </ModalFooter>
    </Modal>
</template>
