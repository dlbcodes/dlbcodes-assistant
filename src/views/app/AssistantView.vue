<script setup lang="ts">
import { ref, nextTick, watch } from "vue";
import { useRoute } from "vue-router";
import { useChat } from "../../composables/useChat";
import type { Attachment } from "../../types/chat";
import ChatComposer from "../../components/chat/ChatComposer.vue";
import MessageList from "../../components/chat/MessageList.vue";
import BrandMark from "../../components/BrandMark.vue";
import {
    PhFileText,
    PhChatText,
    PhMagnifyingGlass,
    PhListChecks,
} from "@phosphor-icons/vue";

const route = useRoute();
const { messages, model, models, isResponding, send } = useChat(
    route.params.id as string | undefined,
);

const scrollRef = ref<HTMLElement | null>(null);

// Keep the conversation scrolled to the latest message as it streams.
watch(
    () => messages.value.map((m) => m.content).join(""),
    async () => {
        await nextTick();
        scrollRef.value?.scrollTo({ top: scrollRef.value.scrollHeight });
    },
);

const onSend = (text: string, attachments: Attachment[]): void => {
    send(text, attachments);
};

const suggestions = [
    {
        icon: PhFileText,
        title: "Summarize a document",
        prompt: "Summarize this document and pull out the key action items.",
    },
    {
        icon: PhChatText,
        title: "Draft an update",
        prompt: "Turn these rough notes into a clear status update.",
    },
    {
        icon: PhMagnifyingGlass,
        title: "Find internal docs",
        prompt: "Help me find the runbook for deploying to production.",
    },
    {
        icon: PhListChecks,
        title: "Plan a project",
        prompt: "Break this goal into owners, steps, and risks.",
    },
];

const useSuggestion = async (prompt: string): Promise<void> => {
    await send(prompt);
};
</script>

<template>
    <div class="flex h-full flex-col">
        <!-- Conversation (or empty state) -->
        <div ref="scrollRef" class="min-h-0 flex-1 overflow-y-auto">
            <div class="mx-auto flex min-h-full max-w-3xl flex-col px-6">
                <!-- Empty state: greeting + suggestions -->
                <div
                    v-if="!messages.length"
                    class="flex flex-1 flex-col justify-center gap-y-8 py-8"
                >
                    <div class="flex items-start gap-x-3">
                        <BrandMark
                            :show-name="false"
                            size="lg"
                            class="shrink-0"
                        />

                        <div class="flex flex-col">
                            <h1 class="text-2xl font-medium text-text-primary">
                                Good morning, Dana.
                            </h1>
                            <p class="text-sm text-text-secondary">
                                What can I help you with today?
                            </p>
                        </div>
                    </div>

                    <div class="grid gap-4 sm:grid-cols-2">
                        <button
                            v-for="s in suggestions"
                            :key="s.title"
                            type="button"
                            class="flex flex-col items-start gap-1.5 rounded-2xl border border-border-subtle bg-bg-raised p-4 text-left transition-colors hover:bg-bg-subtle"
                            @click="useSuggestion(s.prompt)"
                        >
                            <component
                                :is="s.icon"
                                class="size-5 text-brand-200"
                                aria-hidden="true"
                            />
                            <span
                                class="text-sm font-medium text-text-primary"
                                >{{ s.title }}</span
                            >
                            <span class="text-sm text-text-secondary">{{
                                s.prompt
                            }}</span>
                        </button>
                    </div>
                </div>

                <!-- Conversation -->
                <MessageList v-else :messages="messages" class="flex-1 py-8" />
            </div>
        </div>

        <!-- Composer (always at the bottom) -->
        <div class="shrink-0">
            <div class="mx-auto max-w-3xl px-6 pb-6">
                <ChatComposer
                    v-model:model="model"
                    :models="models"
                    :disabled="isResponding"
                    @send="onSend"
                />
            </div>
        </div>
    </div>
</template>
