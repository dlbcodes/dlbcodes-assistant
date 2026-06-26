<script setup lang="ts">
// import SiteHeader from "../components/marketing/SiteHeader.vue";
// import SiteFooter from "../components/marketing/SiteFooter.vue";
import ThemeSwitcher from "../components/ThemeSwitcher.vue";
</script>

<template>
    <div class="relative flex min-h-screen flex-col bg-bg-base">
        <!-- <SiteHeader /> -->

        <main class="flex-1">
            <router-view />
        </main>

        <!-- <SiteFooter /> -->

        <!-- Floating theme switcher -->
        <div class="fixed bottom-6 right-6 z-50">
            <ThemeSwitcher />
        </div>
        <!-- End Floating theme switcher -->
    </div>
</template>
