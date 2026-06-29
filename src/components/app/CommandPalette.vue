<script setup lang="ts">
import { ref, computed, watch, nextTick } from "vue";
import { useRouter } from "vue-router";
import {
    Modal,
    ModalContent,
    ModalFooter,
    Input,
    Kbd,
    KbdGroup,
} from "@dlbcodes/my-design-system";
import {
    PhMagnifyingGlass,
    PhPlus,
    PhGear,
    PhCreditCard,
    PhKeyboard,
    PhQuestion,
} from "@phosphor-icons/vue";
import type { Component } from "vue";

const open = defineModel<boolean>("open", { required: true });

const emit = defineEmits<{
    "open-shortcuts": [];
    "open-help": [];
}>();

const router = useRouter();

interface Command {
    id: string;
    label: string;
    icon: Component;
    keywords?: string;
    run: () => void;
}

// Static command list — add your own actions here. Each `run` fires on select.
const commands: Command[] = [
    {
        id: "new-chat",
        label: "New chat",
        icon: PhPlus,
        keywords: "create conversation start",
        run: () => router.push("/app"),
    },
    {
        id: "settings",
        label: "Go to settings",
        icon: PhGear,
        keywords: "preferences account",
        run: () => router.push("/app/settings"),
    },
    {
        id: "billing",
        label: "Go to billing",
        icon: PhCreditCard,
        keywords: "plan upgrade subscription usage",
        run: () => router.push("/app/settings?tab=billing"),
    },
    {
        id: "shortcuts",
        label: "Keyboard shortcuts",
        icon: PhKeyboard,
        keywords: "keys hotkeys",
        run: () => emit("open-shortcuts"),
    },
    {
        id: "help",
        label: "Get help",
        icon: PhQuestion,
        keywords: "support contact",
        run: () => emit("open-help"),
    },
];

const query = ref("");
const selected = ref(0);
const inputRef = ref<InstanceType<typeof Input>>();
const listRef = ref<HTMLElement>();

const results = computed<Command[]>(() => {
    const q = query.value.trim().toLowerCase();
    if (!q) return commands;
    return commands.filter((c) =>
        `${c.label} ${c.keywords ?? ""}`.toLowerCase().includes(q),
    );
});

const run = (cmd: Command): void => {
    open.value = false;
    cmd.run();
};

const move = (delta: number): void => {
    const count = results.value.length;
    if (!count) return;
    selected.value = (selected.value + delta + count) % count;
};

const onKeydown = (e: KeyboardEvent): void => {
    if (e.key === "ArrowDown") {
        e.preventDefault();
        move(1);
    } else if (e.key === "ArrowUp") {
        e.preventDefault();
        move(-1);
    } else if (e.key === "Enter") {
        e.preventDefault();
        const cmd = results.value[selected.value];
        if (cmd) run(cmd);
    }
    // Escape is handled by the Modal.
};

// Reset and focus the input each time the palette opens.
watch(open, async (isOpen) => {
    if (!isOpen) return;
    query.value = "";
    selected.value = 0;
    await nextTick();
    const root = inputRef.value?.$el as HTMLElement | undefined;
    (root?.querySelector("input") ?? root)?.focus();
});

// Reset the highlight to the top whenever the filtered list changes.
watch(results, () => {
    selected.value = 0;
});

// Keep the highlighted row in view while arrowing.
watch(selected, async () => {
    await nextTick();
    listRef.value
        ?.querySelector(`[data-index="${selected.value}"]`)
        ?.scrollIntoView({ block: "nearest" });
});
</script>

<template>
    <Modal v-model="open" size="lg">
        <ModalContent class="p-0">
            <!-- Search -->
            <div class="flex items-center border-b border-border-subtle px-4">
                <Input
                    ref="inputRef"
                    v-model="query"
                    placeholder="Type a command or search…"
                    class="border-0 bg-transparent shadow-none focus-within:ring-0"
                    role="combobox"
                    aria-controls="command-list"
                    aria-expanded="true"
                    :aria-activedescendant="
                        results[selected]
                            ? `command-${results[selected].id}`
                            : undefined
                    "
                    @keydown="onKeydown"
                >
                    <PhMagnifyingGlass
                        class="size-5 shrink-0 text-text-tertiary"
                        aria-hidden="true"
                    />
                </Input>
            </div>
            <!-- End Search -->

            <!-- Results -->
            <ul
                id="command-list"
                ref="listRef"
                role="listbox"
                class="max-h-80 overflow-y-auto p-2"
            >
                <li
                    v-for="(cmd, i) in results"
                    :id="`command-${cmd.id}`"
                    :key="cmd.id"
                    :data-index="i"
                    role="option"
                    :aria-selected="i === selected"
                >
                    <button
                        type="button"
                        tabindex="-1"
                        class="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-left text-sm transition-colors"
                        :class="
                            i === selected
                                ? 'bg-bg-surface text-text-primary'
                                : 'text-text-secondary hover:bg-bg-surface'
                        "
                        @click="run(cmd)"
                        @mousemove="selected = i"
                    >
                        <component
                            :is="cmd.icon"
                            class="size-4 shrink-0 text-text-tertiary"
                            aria-hidden="true"
                        />
                        {{ cmd.label }}
                    </button>
                </li>

                <li
                    v-if="!results.length"
                    class="px-3 py-6 text-center text-sm text-text-tertiary"
                >
                    No commands found.
                </li>
            </ul>
            <!-- End Results -->
        </ModalContent>

        <ModalFooter
            class="justify-start gap-2 border-t border-border-subtle font-mono text-xs tracking-tight text-text-tertiary"
        >
            <span class="flex items-center gap-1">
                <KbdGroup>
                    <Kbd>↑</Kbd>
                    <Kbd>↓</Kbd>
                </KbdGroup>
                to navigate
            </span>
            <span class="flex items-center gap-1">
                <Kbd>↵</Kbd>
                to select
            </span>
            <span class="flex items-center gap-1">
                <Kbd>esc</Kbd>
                to close
            </span>
        </ModalFooter>
    </Modal>
</template>
