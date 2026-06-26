<script setup lang="ts">
import {
    Panel,
    PanelContent,
    Button,
    Badge,
    Progress,
    Separator,
} from "@dlbcodes/my-design-system";

// Stubbed billing data — a forker wires this to their billing provider.
const currentPlan = {
    name: "Pro",
    price: 20,
    renews: "April 12, 2026",
};

// Usage meters: the Progress component's natural home.
const usage = [
    { label: "Messages", used: 1840, limit: 2000, unit: "" },
    { label: "Storage", used: 6.2, limit: 10, unit: " GB" },
    { label: "Team seats", used: 3, limit: 5, unit: "" },
];

const pct = (used: number, limit: number): number =>
    Math.min(100, Math.round((used / limit) * 100));
</script>

<template>
    <div class="flex flex-col gap-8">
        <!-- Current plan -->
        <Panel>
            <PanelContent class="flex items-center justify-between gap-4 p-4">
                <div class="flex flex-col gap-1">
                    <div class="flex items-center gap-2">
                        <span class="text-lg font-semibold text-text-primary">
                            {{ currentPlan.name }}
                        </span>
                        <Badge variant="primary">Current plan</Badge>
                    </div>
                    <p class="text-sm text-text-secondary">
                        ${{ currentPlan.price }}/month · renews
                        {{ currentPlan.renews }}
                    </p>
                </div>
                <Button variant="secondary">Manage plan</Button>
            </PanelContent>
        </Panel>
        <!-- End Current plan -->

        <!-- Usage -->
        <div class="flex flex-col gap-5">
            <h3 class="text-sm font-medium text-text-primary">
                Usage this period
            </h3>
            <div v-for="u in usage" :key="u.label" class="flex flex-col gap-6">
                <div class="flex flex-col gap-2">
                    <div class="flex items-center justify-between text-sm">
                        <span class="text-text-secondary">{{ u.label }}</span>
                        <span class="text-text-tertiary">
                            {{ u.used }}{{ u.unit }} / {{ u.limit }}{{ u.unit }}
                        </span>
                    </div>
                    <Progress
                        :value="pct(u.used, u.limit)"
                        :label="`${u.label} usage`"
                    />
                </div>
            </div>
        </div>
        <!-- End Usage -->

        <Separator />

        <!-- Danger zone -->
        <div class="flex items-center justify-between gap-4">
            <div class="flex flex-col gap-0.5">
                <span class="text-sm font-medium text-text-primary"
                    >Cancel subscription</span
                >
                <span class="text-sm text-text-secondary">
                    You'll keep Pro access until the end of the billing period.
                </span>
            </div>
            <Button variant="destructive">Cancel plan</Button>
        </div>
        <!-- End Danger zone -->
    </div>
</template>
