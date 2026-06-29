<script setup lang="ts">
import { useTheme, type Theme } from "../composables/useTheme";
import {
    Dropdown,
    DropdownTrigger,
    DropdownContent,
    DropdownItem,
    Button,
} from "@dlbcodes/my-design-system";
import { PhPalette, PhCheck } from "@phosphor-icons/vue";

const { current, themes, setTheme } = useTheme();
const keys = Object.keys(themes) as Theme[];
</script>

<template>
    <Dropdown>
        <DropdownTrigger>
            <Button variant="secondary" size="sm">
                <PhPalette class="size-4" /> Theme
            </Button>
        </DropdownTrigger>
        <DropdownContent>
            <DropdownItem v-for="t in keys" :key="t" @click="setTheme(t)">
                <span class="text-left flex-1 capitalize">
                    {{ themes[t].name }}
                </span>
                <PhCheck v-if="current === t" class="size-4" />
            </DropdownItem>
        </DropdownContent>
    </Dropdown>
</template>
