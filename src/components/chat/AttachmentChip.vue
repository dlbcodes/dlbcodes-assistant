<script setup lang="ts">
import { Button } from "@dlbcodes/my-design-system";
import { PhX } from "@phosphor-icons/vue";
import { iconForFile } from "../../utils/fileIcons";
import type { Attachment } from "../../types/chat";

defineProps<{ attachment: Attachment; removable?: boolean }>();
defineEmits<{ remove: [] }>();
</script>

<template>
    <div
        class="flex items-center gap-x-1 rounded-lg border border-border-subtle bg-bg-raised py-1 pl-2 pr-1 shadow-sm"
    >
        <img
            :src="iconForFile(attachment.name)"
            alt=""
            class="size-6 shrink-0"
        />
        <span
            class="max-w-34 truncate text-sm tracking-tight text-text-primary"
        >
            {{ attachment.name }}
        </span>
        <Button
            v-if="removable"
            variant="icon"
            size="icon-sm"
            class="rounded-md p-0.5"
            :aria-label="`Remove ${attachment.name}`"
            @click="$emit('remove')"
        >
            <PhX class="size-4 shrink-0" aria-hidden="true" />
        </Button>
    </div>
</template>
