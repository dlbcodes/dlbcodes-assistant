<script setup lang="ts">
import { ref } from "vue";
import { RouterLink } from "vue-router";
import {
    Field,
    FieldLabel,
    FieldContent,
    Input,
    Button,
    Checkbox,
    Label,
    Separator,
    Panel,
    PanelContent,
} from "@dlbcodes/my-design-system";
import { PhGoogleLogo, PhGithubLogo } from "@phosphor-icons/vue";

const email = ref("");
const password = ref("");
const remember = ref(false);
</script>

<template>
    <div class="flex flex-col gap-6">
        <Panel>
            <PanelContent
                class="flex flex-col gap-y-4 py-6 px-8 md:px-12 md:py-8"
            >
                <div class="flex flex-col justify-center items-center mb-2">
                    <h1
                        class="text-2xl tracking-tight font-medium text-text-primary"
                    >
                        Welcome back
                    </h1>
                    <p class="text-sm tracking-tight text-text-secondary">
                        Sign in to your account to continue.
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
                        </FieldContent>
                    </Field>

                    <div class="flex items-center justify-between">
                        <Label
                            class="flex items-center gap-2 text-sm text-text-secondary"
                        >
                            <Checkbox v-model="remember" /> Remember me
                        </Label>

                        <a
                            href="#"
                            class="text-sm text-brand-200 hover:underline"
                        >
                            Forgot password?
                        </a>
                    </div>

                    <Button
                        to="/app"
                        variant="primary"
                        class="w-full justify-center"
                    >
                        Sign in
                    </Button>
                </div>
            </PanelContent>
        </Panel>

        <p class="text-center text-sm text-text-secondary">
            Don't have an account?
            <RouterLink
                to="/signup"
                class="font-medium text-brand-200 hover:underline"
            >
                Sign up
            </RouterLink>
        </p>
    </div>
</template>
