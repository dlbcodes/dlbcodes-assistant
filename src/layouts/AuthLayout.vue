<script setup lang="ts">
import BrandMark from "../components/BrandMark.vue";
import ThemeSwitcher from "../components/ThemeSwitcher.vue";
</script>

<template>
    <div
        class="relative flex min-h-dvh items-center justify-center bg-bg-base px-4"
    >
        <div
            class="pointer-events-none absolute inset-0"
            style="
                background: radial-gradient(
                    60% 50% at 50% 0%,
                    color-mix(
                        in oklch,
                        var(--color-brand-200) 12%,
                        transparent
                    ),
                    transparent
                );
            "
        />

        <div class="relative flex w-full max-w-md flex-col items-center gap-8">
            <RouterLink to="/" aria-label="Home">
                <BrandMark size="lg" />
            </RouterLink>

            <div class="w-full">
                <router-view />
            </div>
        </div>

        <div class="fixed bottom-6 right-6 z-50">
            <ThemeSwitcher />
        </div>
    </div>
</template>
