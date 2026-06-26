<!-- components/app/AppShortcuts.vue — lives inside SidebarProvider -->
<script setup lang="ts">
import { useSidebar } from "@dlbcodes/my-design-system";
import { useMagicKeys, whenever } from "@vueuse/core";
import { useRouter } from "vue-router";

const { toggle } = useSidebar();
const router = useRouter();

const OWNED = [
    (e: KeyboardEvent) =>
        e.key.toLowerCase() === "b" && (e.metaKey || e.ctrlKey) && !e.shiftKey,
    (e: KeyboardEvent) =>
        e.key.toLowerCase() === "o" && (e.metaKey || e.ctrlKey) && e.shiftKey,
];

const keys = useMagicKeys({
    passive: false,
    onEventFired(e) {
        if (e.type === "keydown" && OWNED.some((match) => match(e))) {
            e.preventDefault();
        }
    },
});

// ⌘B / Ctrl+B — toggle sidebar
whenever(keys["Meta+B"], toggle);
whenever(keys["Ctrl+B"], toggle);

// ⌘⇧O / Ctrl+⇧O — new conversation (⌘N is browser-reserved, so we use ⇧O)
const newChat = (): void => {
    console.log("cenas");
    router.push("/app");
};
whenever(keys["Meta+Shift+O"], newChat);
whenever(keys["Ctrl+Shift+O"], newChat);
</script>

<template></template>
