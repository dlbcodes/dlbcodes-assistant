<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from "vue";
import { useClipboard, useTimeAgo } from "@vueuse/core";
import { PhCopy, PhCheck } from "@phosphor-icons/vue";
import type { Message } from "../../types/chat";
import AttachmentChip from "./AttachmentChip.vue";
import BrandMark from "../BrandMark.vue";
import { Button } from "@dlbcodes/my-design-system";

const props = defineProps<{ message: Message }>();

const { copy, copied } = useClipboard({ copiedDuring: 1500 });

const timeAgo = useTimeAgo(computed(() => props.message.createdAt));

const phrases = ["Thinking…", "Gathering context…", "Almost there…"];
const thinkingPhrase = ref(phrases[Math.floor(Math.random() * phrases.length)]);
let i = phrases.indexOf(thinkingPhrase.value);
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
    <!-- User -->
    <div
        v-if="message.role === 'user'"
        class="group flex flex-col items-end gap-1"
    >
        <div class="flex max-w-[80%] shrink-0 flex-col items-end gap-2">
            <div
                v-if="message.attachments?.length"
                class="flex flex-wrap justify-end gap-1"
            >
                <AttachmentChip
                    v-for="file in message.attachments"
                    :key="file.id"
                    :attachment="file"
                />
            </div>
            <div
                class="shrink-0 rounded-2xl bg-bg-elevated px-4 py-2.5 text-sm text-text-primary"
            >
                {{ message.content }}
            </div>
        </div>

        <!-- Hover actions -->
        <div
            class="flex items-center gap-1 opacity-0 transition-opacity group-hover:opacity-100 focus-within:opacity-100"
        >
            <span class="capitalize px-1 text-xs text-text-tertiary">
                {{ timeAgo }}</span
            >
            <Button
                variant="icon"
                size="icon-sm"
                :aria-label="copied ? 'Copied' : 'Copy message'"
                @click="copy(message.content)"
            >
                <component
                    :is="copied ? PhCheck : PhCopy"
                    class="size-4"
                    aria-hidden="true"
                />
            </Button>
        </div>
        <!-- Hover actions -->
    </div>
    <!-- End User -->

    <!-- Assistant -->
    <div v-else class="group flex items-start gap-3">
        <BrandMark
            :show-name="false"
            size="sm"
            class="shrink-0 transition-transform"
            :class="
                message.status === 'streaming' &&
                !message.content &&
                'animate-breathe'
            "
        />
        <div class="min-w-0 flex-1">
            <div class="pt-0.5 text-sm leading-relaxed text-text-primary">
                <span class="whitespace-pre-wrap">{{ message.content }}</span>
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

            <!-- Hover actions -->
            <div
                v-if="message.status === 'done'"
                class="mt-1 flex items-center gap-1 opacity-0 transition-opacity group-hover:opacity-100 focus-within:opacity-100"
            >
                <span class="capitalize px-1 text-xs text-text-tertiary">{{
                    timeAgo
                }}</span>
                <Button
                    variant="icon"
                    size="icon-sm"
                    :aria-label="copied ? 'Copied' : 'Copy message'"
                    @click="copy(message.content)"
                >
                    <component
                        :is="copied ? PhCheck : PhCopy"
                        class="size-4"
                        aria-hidden="true"
                    />
                </Button>
            </div>
            <!-- End Hover actions -->
        </div>
    </div>
    <!-- End Assistant -->
</template>
