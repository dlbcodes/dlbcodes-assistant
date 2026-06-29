<script setup lang="ts">
import { RouterLink } from "vue-router";
import { Button } from "@dlbcodes/my-design-system";
import { PhArrowRight } from "@phosphor-icons/vue";
import BrandMark from "../components/BrandMark.vue";
// Adjust the path to wherever your icon lives under src/assets.
import SpaceCatIcon from "../assets/icons/space-cat.png";
</script>

<template>
    <div class="flex min-h-dvh w-full flex-col">
        <header class="flex justify-between px-8 py-6">
            <BrandMark />
        </header>

        <main
            class="mx-auto flex w-full max-w-3xl flex-col items-center gap-y-6 py-10 text-center"
        >
            <img :src="SpaceCatIcon" alt="" class="size-60 shrink-0" />
            <div>
                <h1
                    class="text-4xl/10 font-bold tracking-tight text-text-primary"
                >
                    Page not found
                </h1>
                <p class="mt-2 text-base/6 text-text-secondary">
                    We looked everywhere, but this page doesn't exist. Let's
                    head back to safety.
                </p>
            </div>
            <RouterLink to="/app">
                <Button class="w-fit">
                    Back to app
                    <PhArrowRight class="size-4" aria-hidden="true" />
                </Button>
            </RouterLink>
        </main>
    </div>
</template>
