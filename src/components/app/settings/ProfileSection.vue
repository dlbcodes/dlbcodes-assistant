<script setup lang="ts">
import { ref } from "vue";
import {
    Field,
    FieldLabel,
    FieldContent,
    FieldDescription,
    Input,
    Button,
    Separator,
    Avatar,
} from "@dlbcodes/my-design-system";
import { currentUser } from "../../../data/mock";

const name = ref(currentUser.name);
const email = ref(currentUser.email);
const avatar = ref(currentUser.avatar);

const save = (): void => {
    // STUB: persist profile changes here.
};
</script>

<template>
    <div class="flex flex-col gap-6">
        <div class="flex items-center gap-4">
            <Avatar :name="name" :src="avatar" size="lg" />
            <Button variant="secondary" size="sm">Change photo</Button>
        </div>
        <Separator />
        <Field required>
            <FieldLabel>Full name</FieldLabel>
            <FieldContent>
                <Input v-model="name" />
            </FieldContent>
        </Field>
        <Field required>
            <FieldLabel>Email</FieldLabel>
            <FieldContent>
                <Input v-model="email" type="email" />
                <FieldDescription
                    >Used for sign-in and notifications.</FieldDescription
                >
            </FieldContent>
        </Field>
        <div>
            <Button variant="primary" @click="save">Save changes</Button>
        </div>
    </div>
</template>
