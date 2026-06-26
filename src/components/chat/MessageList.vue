<script setup lang="ts">
import MessageBubble from "./MessageBubble.vue";
import type { Message } from "../../types/chat";

defineProps<{ messages: Message[] }>();
</script>

<template>
    <div class="flex flex-col gap-6">
        <MessageBubble
            v-for="message in messages"
            :key="message.id"
            :message="message"
        />
    </div>
</template>
