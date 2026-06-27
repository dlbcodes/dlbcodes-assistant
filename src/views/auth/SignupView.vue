<script setup lang="ts">
import { ref } from "vue";
import { RouterLink } from "vue-router";
import {
    Field,
    FieldLabel,
    FieldContent,
    FieldDescription,
    Input,
    Button,
    Separator,
    Panel,
    PanelContent,
} from "@dlbcodes/my-design-system";
import { PhGoogleLogo, PhGithubLogo } from "@phosphor-icons/vue";

const name = ref("");
const email = ref("");
const password = ref("");
</script>

<template>
    <div class="flex flex-col gap-6">
        <Panel>
            <PanelContent
                class="flex flex-col gap-y-4 py-6 px-8 md:px-12 md:py-8"
            >
                <div class="mb-2 flex flex-col items-center justify-center">
                    <h1
                        class="text-2xl font-medium tracking-tight text-text-primary"
                    >
                        Create your account
                    </h1>
                    <p class="text-sm tracking-tight text-text-secondary">
                        Start building in minutes.
                    </p>
                </div>

                <div class="flex flex-col gap-2">
                    <Button variant="secondary" class="w-full justify-center">
                        <PhGoogleLogo class="size-4" aria-hidden="true" />
                        Continue with Google
                    </Button>
                    <Button variant="secondary" class="w-full justify-center">
                        <PhGithubLogo class="size-4" aria-hidden="true" />
                        Continue with GitHub
                    </Button>
                </div>

                <div class="flex items-center gap-3">
                    <Separator class="flex-1" />
                    <span class="text-xs text-text-tertiary">or</span>
                    <Separator class="flex-1" />
                </div>

                <div class="flex flex-col gap-4">
                    <Field>
                        <FieldLabel>Full name</FieldLabel>
                        <FieldContent>
                            <Input v-model="name" placeholder="Daniel L" />
                        </FieldContent>
                    </Field>
                    <Field>
                        <FieldLabel>Email</FieldLabel>
                        <FieldContent>
                            <Input
                                v-model="email"
                                type="email"
                                placeholder="you@example.com"
                            />
                        </FieldContent>
                    </Field>
                    <Field>
                        <FieldLabel>Password</FieldLabel>
                        <FieldContent>
                            <Input
                                v-model="password"
                                type="password"
                                placeholder="••••••••"
                            />
                            <FieldDescription>
                                At least 8 characters.
                            </FieldDescription>
                        </FieldContent>
                    </Field>

                    <Button
                        to="/app"
                        variant="primary"
                        class="w-full justify-center"
                    >
                        Create account
                    </Button>
                </div>
            </PanelContent>
        </Panel>

        <p class="text-center text-sm text-text-secondary">
            Already have an account?
            <RouterLink
                to="/login"
                class="font-medium text-brand-200 hover:underline"
            >
                Sign in
            </RouterLink>
        </p>
    </div>
</template>
