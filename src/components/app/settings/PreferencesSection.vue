<script setup lang="ts">
import { ref } from "vue";
import {
    Field,
    FieldLabel,
    FieldDescription,
    Switch,
    Separator,
} from "@dlbcodes/my-design-system";

const emailNotifications = ref(true);
const productUpdates = ref(false);
</script>

<template>
    <div class="flex flex-col gap-4">
        <Field>
            <div class="flex items-center justify-between gap-4">
                <div class="flex flex-col gap-0.5">
                    <FieldLabel class="text-text-primary">
                        Email notifications
                    </FieldLabel>
                    <FieldDescription>
                        Get notified when something needs your attention.
                    </FieldDescription>
                </div>
                <Switch v-model="emailNotifications" />
            </div>
        </Field>
        <Separator />
        <Field>
            <div class="flex items-center justify-between gap-4">
                <div class="flex flex-col gap-0.5">
                    <FieldLabel class="text-text-primary">
                        Product updates
                    </FieldLabel>
                    <FieldDescription>
                        Occasional news about new features.
                    </FieldDescription>
                </div>
                <Switch v-model="productUpdates" />
            </div>
        </Field>
    </div>
</template>
