<script setup lang="ts">
import { computed } from "vue";
import { useRoute, useRouter } from "vue-router";
import {
    Tabs,
    TabsList,
    TabsTrigger,
    TabsPanels,
    TabsContent,
} from "@dlbcodes/my-design-system";
import {
    PhUser,
    PhSliders,
    PhShieldCheck,
    PhCreditCard,
} from "@phosphor-icons/vue";
import ProfileSection from "../../components/app/settings/ProfileSection.vue";
import PreferencesSection from "../../components/app/settings/PreferencesSection.vue";
import SecuritySection from "../../components/app/settings/SecuritySection.vue";
import BillingSection from "../../components/app/settings/BillingSection.vue";
import { currentUser } from "../../data/mock";

const route = useRoute();
const router = useRouter();

const TABS = ["profile", "preferences", "security", "billing"] as const;

const activeIndex = computed(() => {
    const i = TABS.indexOf(route.query.tab as (typeof TABS)[number]);
    return i === -1 ? 0 : i;
});

const onChange = (index: number): void => {
    router.replace({ query: { ...route.query, tab: TABS[index] } });
};
</script>

<template>
    <div class="flex flex-col gap-y-8 max-w-3xl px-6 md:px-20 py-10">
        <div class="flex flex-col">
            <h1 class="text-xl font-medium text-text-primary">
                Welcome, {{ currentUser.name.split(" ")[0] }}!
            </h1>
            <p class="mt-1 text-sm text-text-secondary">
                Manage your account, preferences, security, and billing.
            </p>
        </div>

        <Tabs :selected-index="activeIndex" @change="onChange">
            <TabsList
                class="no-scrollbar md:w-fit w-full max-w-full justify-start overflow-x-auto"
            >
                <TabsTrigger>
                    <PhUser class="size-4" aria-hidden="true" />
                    Profile
                </TabsTrigger>
                <TabsTrigger>
                    <PhSliders class="size-4" aria-hidden="true" />
                    Preferences
                </TabsTrigger>
                <TabsTrigger>
                    <PhShieldCheck class="size-4" aria-hidden="true" />
                    Security
                </TabsTrigger>
                <TabsTrigger>
                    <PhCreditCard class="size-4" aria-hidden="true" />
                    Billing
                </TabsTrigger>
            </TabsList>

            <TabsPanels class="mt-8">
                <TabsContent>
                    <ProfileSection />
                </TabsContent>
                <TabsContent>
                    <PreferencesSection />
                </TabsContent>
                <TabsContent>
                    <SecuritySection />
                </TabsContent>
                <TabsContent>
                    <BillingSection />
                </TabsContent>
            </TabsPanels>
        </Tabs>
    </div>
</template>
