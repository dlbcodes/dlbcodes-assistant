<script setup lang="ts">
import { ref } from "vue";
import {
    Field,
    FieldLabel,
    FieldContent,
    FieldDescription,
    Input,
    Button,
} from "@dlbcodes/my-design-system";

const currentPassword = ref("");
const newPassword = ref("");

const save = (): void => {
    // STUB: change password here.
    currentPassword.value = "";
    newPassword.value = "";
};
</script>

<template>
    <div class="flex flex-col gap-6">
        <Field>
            <FieldLabel>Current password</FieldLabel>
            <FieldContent
                ><Input
                    v-model="currentPassword"
                    type="password"
                    placeholder="••••••••"
            /></FieldContent>
        </Field>
        <Field>
            <FieldLabel>New password</FieldLabel>
            <FieldContent>
                <Input
                    v-model="newPassword"
                    type="password"
                    placeholder="••••••••"
                />
                <FieldDescription>At least 8 characters.</FieldDescription>
            </FieldContent>
        </Field>
        <div>
            <Button
                variant="primary"
                :disabled="!currentPassword || !newPassword"
                @click="save"
            >
                Update password
            </Button>
        </div>
    </div>
</template>
