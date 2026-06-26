<script setup lang="ts">
import { ref } from "vue";
import { RouterLink, useRouter } from "vue-router";
import {
    Dropdown,
    DropdownTrigger,
    DropdownContent,
    DropdownItem,
    Avatar,
} from "@dlbcodes/my-design-system";
import {
    PhSquaresFour,
    PhGear,
    PhKeyboard,
    PhQuestion,
    PhSignOut,
    PhCaretUpDown,
} from "@phosphor-icons/vue";
import ShortcutsModal from "./ShortcutsModal.vue";
import HelpModal from "./HelpModal.vue";

// Stubbed user — a forker swaps this for their auth/session data.
const user = {
    name: "Dana Lewis",
    email: "dana@example.com",
    img: "",
};

const router = useRouter();

const shortcutsOpen = ref(false);
const helpOpen = ref(false);

const logout = (): void => {
    // STUB: clear your session here, then redirect.
    router.push("/login");
};
</script>

<template>
    <Dropdown placement="top-start" class="w-full">
        <DropdownTrigger class="flex w-full items-center gap-2 px-2 py-2">
            <Avatar :name="user.name" :src="user.img" size="sm" />
            <div class="min-w-0 flex-1 text-left">
                <p class="truncate text-sm font-medium text-text-primary">
                    {{ user.name }}
                </p>
                <p class="truncate text-xs text-text-tertiary">
                    {{ user.email }}
                </p>
            </div>
            <PhCaretUpDown
                class="size-5 shrink-0 text-text-tertiary"
                aria-hidden="true"
            />
        </DropdownTrigger>

        <DropdownContent size="3xs">
            <DropdownItem :as="RouterLink" to="/app">
                <PhSquaresFour class="size-4" aria-hidden="true" /> Overview
            </DropdownItem>
            <DropdownItem :as="RouterLink" to="/app/settings">
                <PhGear class="size-4" aria-hidden="true" /> Settings
            </DropdownItem>
            <DropdownItem @click="shortcutsOpen = true">
                <PhKeyboard class="size-4" aria-hidden="true" /> Keyboard
                shortcuts
            </DropdownItem>
            <DropdownItem @click="helpOpen = true">
                <PhQuestion class="size-4" aria-hidden="true" /> Get help
            </DropdownItem>
            <DropdownItem @click="logout">
                <PhSignOut class="size-4" aria-hidden="true" /> Log out
            </DropdownItem>
        </DropdownContent>
    </Dropdown>

    <ShortcutsModal v-model:open="shortcutsOpen" />
    <HelpModal v-model:open="helpOpen" />
</template>
