<script setup lang="ts">
import { ref, onMounted, onUnmounted } from "vue";
import { PhCube } from "@phosphor-icons/vue";
import type { Message } from "../../types/chat";
import AttachmentChip from "./AttachmentChip.vue";

defineProps<{ message: Message }>();

const phrases = ["Thinking…", "Gathering context…", "Almost there…"];
const thinkingPhrase = ref(phrases[0]);
let i = 0;
let timer: number;

onMounted(() => {
    timer = window.setInterval(() => {
        i = (i + 1) % phrases.length;
        thinkingPhrase.value = phrases[i];
    }, 1200);
});
onUnmounted(() => clearInterval(timer));
</script>

<template>
    <!-- User: right-aligned bubble -->
    <div v-if="message.role === 'user'" class="flex justify-end">
        <div class="flex max-w-[80%] flex-col items-end gap-2 shrink-0">
            <div
                v-if="message.attachments?.length"
                class="flex flex-wrap justify-end gap-1"
            >
                <AttachmentChip
                    v-for="(file, i) in message.attachments"
                    :key="file.id"
                    :attachment="file"
                />
            </div>
            <div
                class="rounded-2xl bg-bg-elevated px-4 py-2.5 text-sm text-text-primary shrink-0"
            >
                {{ message.content }}
            </div>
        </div>
    </div>

    <!-- Assistant: left-aligned, with avatar -->
    <div v-else class="flex gap-3">
        <div
            class="flex size-7 shrink-0 items-center justify-center rounded-lg bg-accent-pro-200 text-text-inverse"
        >
            <PhCube class="size-4" weight="fill" aria-hidden="true" />
        </div>
        <div
            class="min-w-0 flex-1 pt-0.5 text-sm leading-relaxed text-text-primary"
        >
            <span>{{ message.content }}</span>
            <!-- Streaming caret -->
            <span
                v-if="message.status === 'streaming' && !message.content"
                class="text-text-tertiary"
            >
                {{ thinkingPhrase }}
            </span>
            <p
                v-if="message.status === 'error'"
                class="mt-1 text-sm text-danger-text"
            >
                Something went wrong. Try again.
            </p>
        </div>
    </div>
</template>
