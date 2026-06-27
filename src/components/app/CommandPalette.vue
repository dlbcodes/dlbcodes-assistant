<script setup lang="ts">
import { ref, computed, watch, nextTick } from "vue";
import { useRouter } from "vue-router";
import {
    Modal,
    ModalContent,
    ModalFooter,
    Input,
    KbdGroup,
    Kbd,
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

// The palette can ask the parent to open the other modals (help, shortcuts).
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

// The command list — a forker adds their own actions here.
const commands = computed<Command[]>(() => [
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
]);

const query = ref("");
const selected = ref(0);
const inputRef = ref();
const listRef = ref<HTMLElement | null>(null);

const results = computed<Command[]>(() => {
    const q = query.value.trim().toLowerCase();
    if (!q) return commands.value;
    return commands.value.filter((c) =>
        `${c.label} ${c.keywords ?? ""}`.toLowerCase().includes(q),
    );
});

// Reset query + selection and focus the input each time the palette opens.
watch(open, async (isOpen) => {
    if (!isOpen) return;
    query.value = "";
    selected.value = 0;
    await nextTick();
    const el = inputRef.value?.$el ?? inputRef.value;
    (el?.querySelector?.("input") ?? el)?.focus?.();
});

// Keep selection in range as the filtered list changes.
watch(results, () => {
    if (selected.value > results.value.length - 1) selected.value = 0;
});

const run = (cmd: Command): void => {
    open.value = false;
    cmd.run();
};

const onKeydown = (e: KeyboardEvent): void => {
    if (e.key === "ArrowDown") {
        e.preventDefault();
        selected.value = (selected.value + 1) % results.value.length;
    } else if (e.key === "ArrowUp") {
        e.preventDefault();
        selected.value =
            (selected.value - 1 + results.value.length) % results.value.length;
    } else if (e.key === "Enter") {
        e.preventDefault();
        const cmd = results.value[selected.value];
        if (cmd) run(cmd);
    }
    // Escape is handled by the Modal itself.
};

// Scroll the highlighted item into view as you arrow through.
watch(selected, () => {
    nextTick(() => {
        listRef.value
            ?.querySelector(`[data-index="${selected.value}"]`)
            ?.scrollIntoView({ block: "nearest" });
    });
});
</script>

<template>
    <Modal v-model="open" size="lg">
        <ModalContent class="p-0">
            <!-- Search -->
            <div
                class="flex items-center gap-2 border-b border-border-subtle px-4"
            >
                <Input
                    ref="inputRef"
                    v-model="query"
                    placeholder="Type a command or search…"
                    class="border-0 bg-transparent shadow-none focus-within:ring-0"
                    @keydown="onKeydown"
                >
                    <PhMagnifyingGlass
                        class="size-5 shrink-0 text-text-tertiary"
                        aria-hidden="true"
                    />
                </Input>
            </div>

            <!-- Results -->
            <div ref="listRef" class="max-h-80 overflow-y-auto p-2">
                <button
                    v-for="(cmd, i) in results"
                    :key="cmd.id"
                    type="button"
                    :data-index="i"
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

                <p
                    v-if="!results.length"
                    class="px-3 py-6 text-center text-sm text-text-tertiary"
                >
                    No commands found.
                </p>
            </div>
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
