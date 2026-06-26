<script setup lang="ts">
import { computed } from "vue";
import { useTheme } from "../composables/useTheme";
import { PhCube } from "@phosphor-icons/vue";
import { siteConfig } from "../config/site";

const props = withDefaults(
    defineProps<{
        size?: "sm" | "base" | "lg";
        showName?: boolean;
    }>(),
    { size: "base", showName: true },
);

const { brand } = useTheme();

const box = computed(
    () =>
        ({
            sm: "size-7",
            base: "size-8",
            lg: "size-9",
        })[props.size],
);

const icon = computed(
    () =>
        ({
            sm: "size-4",
            base: "size-5",
            lg: "size-5",
        })[props.size],
);
</script>

<template>
    <div class="flex items-center gap-2">
        <div
            :class="box"
            class="flex shrink-0 items-center justify-center rounded-lg bg-accent-pro-200 text-text-inverse"
        >
            <PhCube :class="icon" weight="fill" aria-hidden="true" />
        </div>
        <span
            v-if="showName"
            class="text-lg font-semibold tracking-tight text-text-primary"
        >
            {{ siteConfig.name }}
        </span>
    </div>
</template>
