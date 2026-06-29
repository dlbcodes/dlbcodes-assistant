<script setup lang="ts">
import { ref, computed } from "vue";
import { RouterLink, useRoute, useRouter } from "vue-router";
import {
    SidebarProvider,
    Sidebar,
    SidebarTrigger,
    SidebarHeader,
    SidebarContent,
    SidebarGroup,
    SidebarItem,
    SidebarFooter,
    Dropdown,
    DropdownTrigger,
    DropdownContent,
    DropdownItem,
    Button,
    Kbd,
    KbdGroup,
    Separator,
} from "@dlbcodes/my-design-system";
import {
    PhPlus,
    PhChatCircle,
    PhArrowCircleUp,
    PhDotsThreeVertical,
    PhPencilSimple,
    PhTrash,
    PhMagnifyingGlass,
    PhGithubLogo,
} from "@phosphor-icons/vue";
import BrandMark from "../components/BrandMark.vue";
import ThemeSwitcher from "../components/ThemeSwitcher.vue";
import UserMenu from "../components/chat/UserMenu.vue";
import AppShortcuts from "../components/chat/AppShortcuts.vue";
import DeleteConversationModal from "../components/chat/DeleteConversationModal.vue";
import RenameConversationModal from "../components/chat/RenameConversationModal.vue";
import ShortcutsModal from "../components/chat/ShortcutsModal.vue";
import HelpModal from "../components/chat/HelpModal.vue";
import CommandPalette from "../components/app/CommandPalette.vue";
import { conversations as mockConversations } from "../data/mock";

const route = useRoute();
const router = useRouter();
const pageTitle = computed(() => (route.meta.title as string) ?? "");

const conversations = ref(
    mockConversations.map((c) => ({ id: c.id, title: c.title })),
);

const commandOpen = ref(false);
const renameOpen = ref(false);
const deleteOpen = ref(false);
const activeConversation = ref<{ id: string; title: string } | null>(null);

const openRename = (c: { id: string; title: string }): void => {
    activeConversation.value = c;
    renameOpen.value = true;
};
const openDelete = (c: { id: string; title: string }): void => {
    activeConversation.value = c;
    deleteOpen.value = true;
};

const onRename = (title: string): void => {
    const c = conversations.value.find(
        (x) => x.id === activeConversation.value?.id,
    );
    if (c) c.title = title;
};
const onDelete = (): void => {
    conversations.value = conversations.value.filter(
        (x) => x.id !== activeConversation.value?.id,
    );
};

const newChat = (): void => {
    router.push("/app");
};

const shortcutsOpen = ref(false);
const helpOpen = ref(false);
</script>

<template>
    <SidebarProvider>
        <div class="flex h-dvh">
            <Sidebar>
                <!-- Brand -->
                <SidebarHeader class="flex items-center justify-between">
                    <BrandMark />
                    <Button
                        @click="commandOpen = true"
                        variant="secondary"
                        size="icon"
                    >
                        <PhMagnifyingGlass class="size-4" aria-hidden="true" />
                    </Button>
                </SidebarHeader>
                <!-- End Brand -->

                <SidebarContent>
                    <!-- New chat -->
                    <div class="px-2 pb-2">
                        <Button
                            variant="secondary"
                            class="flex justify-between items-center w-full px-2"
                            @click="newChat"
                        >
                            <div class="flex flex-1 items-center gap-x-1">
                                <PhPlus class="size-4" aria-hidden="true" />
                                New chat
                            </div>
                            <KbdGroup>
                                <Kbd>⌘</Kbd>
                                <Kbd>⇧</Kbd>
                                <Kbd>O</Kbd>
                            </KbdGroup>
                        </Button>
                    </div>
                    <!-- End New chat -->

                    <!-- History -->
                    <SidebarGroup label="Recent">
                        <SidebarItem
                            v-for="c in conversations"
                            :key="c.id"
                            :as="RouterLink"
                            :to="`/app/c/${c.id}`"
                            :active="
                                route.name === 'conversation' &&
                                route.params.id === c.id
                            "
                            class="group [&>svg]:text-brand-200"
                        >
                            <PhChatCircle
                                class="size-4 shrink-0"
                                aria-hidden="true"
                            />
                            <span class="flex-1 truncate">{{ c.title }}</span>

                            <Dropdown placement="bottom-start">
                                <DropdownTrigger
                                    class="opacity-0 transition-opacity focus-visible:opacity-100 group-hover:opacity-100 group-aria-[current=page]:opacity-100"
                                    @click.stop.prevent
                                >
                                    <PhDotsThreeVertical
                                        class="size-5"
                                        weight="bold"
                                        aria-hidden="true"
                                    />
                                </DropdownTrigger>
                                <DropdownContent size="fit">
                                    <DropdownItem @click="openRename(c)">
                                        <PhPencilSimple
                                            class="size-4"
                                            aria-hidden="true"
                                        />
                                        Rename
                                    </DropdownItem>
                                    <DropdownItem @click="openDelete(c)">
                                        <PhTrash
                                            class="size-4"
                                            aria-hidden="true"
                                        />
                                        Delete
                                    </DropdownItem>
                                </DropdownContent>
                            </Dropdown>
                        </SidebarItem>
                    </SidebarGroup>
                    <!-- End History -->
                </SidebarContent>

                <!-- Footer -->
                <SidebarFooter>
                    <UserMenu
                        @open-shortcuts="shortcutsOpen = true"
                        @open-help="helpOpen = true"
                    />
                    <Separator class="my-2" />
                    <Button
                        to="/app/settings?tab=billing"
                        variant="outline"
                        class="group flex items-center w-full px-2 bg-bg-raised"
                    >
                        <div class="flex flex-1 items-center gap-x-2">
                            <PhArrowCircleUp
                                class="size-6 shrink-0 group-hover:text-brand-200"
                                aria-hidden="true"
                            />
                            Upgrade to <span class="text-brand-200">Pro</span>
                        </div>
                        <div class="flex items-center">
                            <span
                                class="dot size-3 rounded-full bg-[#e4f221] ring-2 ring-bg-raised"
                            ></span>
                            <span
                                class="dot -ml-1 size-3 rounded-full bg-[#934cff] ring-2 ring-bg-raised"
                            ></span>
                            <span
                                class="dot -ml-1 size-3 rounded-full bg-[#fb4d00] ring-2 ring-bg-raised"
                            ></span>
                        </div>
                    </Button>
                    <a
                        href="https://my-design-system-beta.vercel.app/"
                        target="_blank"
                        class="flex justify-center text-center text-xs text-text-tertiary hover:text-text-primary transition-colors pt-2"
                    >
                        Documentation ↗
                    </a>
                </SidebarFooter>
                <!-- End Footer -->
            </Sidebar>

            <!-- Main area -->
            <div class="flex min-w-0 flex-1 flex-col">
                <header
                    class="flex items-center gap-2 border-b border-border-subtle p-3"
                >
                    <SidebarTrigger />
                    <span
                        class="font-serif text-2xl tracking-wide text-text-primary"
                    >
                        {{ pageTitle }}
                    </span>
                    <div class="ml-auto flex items-center gap-x-2">
                        <Button
                            as="a"
                            to="https://github.com/dlbcodes/dlbcodes-assistant"
                            target="_blank"
                            variant="icon"
                            size="icon"
                        >
                            <PhGithubLogo />
                        </Button>
                        <ThemeSwitcher />
                    </div>
                </header>

                <main class="min-h-0 flex-1 overflow-auto">
                    <router-view :key="route.path" />
                </main>
            </div>
            <!-- End Main area -->
        </div>
        <AppShortcuts
            @open-shortcuts="shortcutsOpen = true"
            @open-help="helpOpen = true"
            @open-command="commandOpen = true"
        />
    </SidebarProvider>

    <ShortcutsModal v-model:open="shortcutsOpen" />
    <HelpModal v-model:open="helpOpen" />

    <CommandPalette
        v-model:open="commandOpen"
        @open-shortcuts="shortcutsOpen = true"
        @open-help="helpOpen = true"
    />

    <RenameConversationModal
        v-if="activeConversation"
        v-model:open="renameOpen"
        :title="activeConversation.title"
        @rename="onRename"
    />
    <DeleteConversationModal
        v-if="activeConversation"
        v-model:open="deleteOpen"
        :title="activeConversation.title"
        @confirm="onDelete"
    />
</template>
