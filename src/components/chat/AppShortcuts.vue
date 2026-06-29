<!-- components/chat/AppShortcuts.vue — renderless, lives inside SidebarProvider -->
<script setup lang="ts">
import { computed, watch } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useSidebar } from "@dlbcodes/my-design-system";
import { useMagicKeys, whenever, useActiveElement } from "@vueuse/core";

const emit = defineEmits<{
    "open-shortcuts": [];
    "open-help": [];
    "open-command": [];
}>();

const route = useRoute();
const router = useRouter();
const { isMobile, close, toggle } = useSidebar();

watch(
    () => route.fullPath,
    () => {
        if (isMobile.value) close();
    },
);

// Don't fire single-key shortcuts (like "?") while the user is typing.
const activeEl = useActiveElement();
const typing = computed(() => {
    const el = activeEl.value;
    return (
        el?.tagName === "INPUT" ||
        el?.tagName === "TEXTAREA" ||
        el?.isContentEditable === true
    );
});

const OWNED = [
    (e: KeyboardEvent) =>
        e.key.toLowerCase() === "b" && (e.metaKey || e.ctrlKey) && !e.shiftKey,
    (e: KeyboardEvent) =>
        e.key.toLowerCase() === "o" && (e.metaKey || e.ctrlKey) && e.shiftKey,
    (e: KeyboardEvent) =>
        e.key.toLowerCase() === "k" && (e.metaKey || e.ctrlKey),
    (e: KeyboardEvent) => e.key === "," && (e.metaKey || e.ctrlKey),
    (e: KeyboardEvent) =>
        e.key.toLowerCase() === "j" && (e.metaKey || e.ctrlKey),
    (e: KeyboardEvent) => e.key === "?" && !typing.value,
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

// ⌘⇧O / Ctrl+⇧O — new conversation (⌘N is browser-reserved)
const newChat = (): void => {
    router.push("/app");
};
whenever(keys["Meta+Shift+O"], newChat);
whenever(keys["Ctrl+Shift+O"], newChat);

// ⌘K / Ctrl+K — command palette
whenever(keys["Meta+K"], () => emit("open-command"));
whenever(keys["Ctrl+K"], () => emit("open-command"));

// ⌘, / Ctrl+, — settings
const openSettings = (): void => {
    router.push("/app/settings");
};
whenever(keys["Meta+,"], openSettings);
whenever(keys["Ctrl+,"], openSettings);

// ⌘J / Ctrl+J — help (letter key, so it's the same on every keyboard layout)
whenever(keys["Meta+J"], () => emit("open-help"));
whenever(keys["Ctrl+J"], () => emit("open-help"));

// ? — keyboard shortcuts (guarded so it doesn't fire while typing)
whenever(keys["?"], () => {
    if (!typing.value) emit("open-shortcuts");
});
</script>

<template></template>
