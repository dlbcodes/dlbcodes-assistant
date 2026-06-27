<script setup lang="ts">
import { RouterLink, useRouter } from "vue-router";
import {
    Dropdown,
    DropdownTrigger,
    DropdownContent,
    DropdownItem,
    Avatar,
    Kbd,
    KbdGroup,
} from "@dlbcodes/my-design-system";
import {
    PhSquaresFour,
    PhGear,
    PhKeyboard,
    PhQuestion,
    PhSignOut,
    PhCaretUpDown,
} from "@phosphor-icons/vue";
import { currentUser } from "../../data/mock";

const router = useRouter();

// The shortcuts/help modals live in AppLayout (so the keyboard shortcuts can
// open them too). This menu just asks the parent to open them.
const emit = defineEmits<{
    "open-shortcuts": [];
    "open-help": [];
}>();

const logout = (): void => {
    // STUB: clear your session here, then redirect.
    router.push("/login");
};
</script>

<template>
    <Dropdown placement="top-start" class="w-full">
        <DropdownTrigger v-slot="{ open }" class="w-full overflow-hidden">
            <div
                class="flex w-full items-center gap-2 px-2 py-2 transition-colors hover:bg-bg-subtle"
                :class="open ? 'bg-bg-subtle' : ''"
            >
                <Avatar
                    :name="currentUser.name"
                    :src="currentUser.avatar"
                    size="sm"
                />
                <div class="min-w-0 flex-1 text-left">
                    <p class="truncate text-sm font-medium text-text-primary">
                        {{ currentUser.name }}
                    </p>
                    <p class="truncate text-xs text-text-tertiary">
                        {{ currentUser.email }}
                    </p>
                </div>
                <PhCaretUpDown
                    class="size-5 shrink-0 text-text-tertiary"
                    aria-hidden="true"
                />
            </div>
        </DropdownTrigger>

        <DropdownContent size="3xs">
            <DropdownItem :as="RouterLink" to="/app">
                <PhSquaresFour class="size-4" aria-hidden="true" /> Overview
            </DropdownItem>
            <DropdownItem
                :as="RouterLink"
                to="/app/settings"
                class="justify-between"
            >
                <span class="flex items-center gap-x-2">
                    <PhGear class="size-4" aria-hidden="true" />
                    Settings
                </span>
                <KbdGroup>
                    <Kbd>⌘</Kbd>
                    <Kbd>,</Kbd>
                </KbdGroup>
            </DropdownItem>
            <DropdownItem
                @click="emit('open-shortcuts')"
                class="justify-between"
            >
                <span class="flex items-center gap-x-2">
                    <PhKeyboard class="size-4" aria-hidden="true" />
                    Keyboard shortcuts
                </span>
                <KbdGroup>
                    <Kbd>?</Kbd>
                </KbdGroup>
            </DropdownItem>
            <DropdownItem @click="emit('open-help')" class="justify-between">
                <span class="flex items-center gap-x-2">
                    <PhQuestion class="size-4" aria-hidden="true" />
                    Get help
                </span>
                <KbdGroup>
                    <Kbd>⌘</Kbd>
                    <Kbd>J</Kbd>
                </KbdGroup>
            </DropdownItem>
            <DropdownItem @click="logout">
                <PhSignOut class="size-4" aria-hidden="true" /> Log out
            </DropdownItem>
        </DropdownContent>
    </Dropdown>
</template>
