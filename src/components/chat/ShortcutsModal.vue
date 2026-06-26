<script setup lang="ts">
import {
    Modal,
    ModalHeader,
    ModalTitle,
    ModalDescription,
    ModalContent,
    ModalClose,
    Kbd,
} from "@dlbcodes/my-design-system";

const open = defineModel<boolean>("open", { required: true });

const shortcuts = [
    { action: "New chat", keys: ["⌘", "⇧", "O"] },
    { action: "Search conversations", keys: ["⌘", "⇧", "O"] },
    { action: "Toggle sidebar", keys: ["⌘", "B"] },
    { action: "Send message", keys: ["⏎"] },
    { action: "New line", keys: ["⇧", "⏎"] },
];
</script>

<template>
    <Modal v-model="open" size="md">
        <ModalHeader>
            <ModalTitle>Keyboard shortcuts</ModalTitle>
            <ModalDescription
                >Move faster with these shortcuts.</ModalDescription
            >
            <ModalClose />
        </ModalHeader>
        <ModalContent>
            <div class="flex flex-col">
                <div
                    v-for="s in shortcuts"
                    :key="s.action"
                    class="flex items-center justify-between border-b border-border-subtle py-2.5 last:border-b-0"
                >
                    <span class="text-sm text-text-secondary">{{
                        s.action
                    }}</span>
                    <span class="flex items-center gap-1">
                        <Kbd v-for="k in s.keys" :key="k">{{ k }}</Kbd>
                    </span>
                </div>
            </div>
        </ModalContent>
    </Modal>
</template>
