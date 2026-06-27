<script setup lang="ts">
import { ref, watch, nextTick } from "vue";
import {
    Modal,
    ModalHeader,
    ModalTitle,
    ModalDescription,
    ModalContent,
    ModalFooter,
    ModalClose,
    Field,
    FieldLabel,
    FieldContent,
    Input,
    Textarea,
    Button,
} from "@dlbcodes/my-design-system";

const open = defineModel<boolean>("open", { required: true });

const subject = ref("");
const message = ref("");
const subjectRef = ref();

watch(open, async (isOpen) => {
    if (!isOpen) return;
    await nextTick();
    const el = subjectRef.value?.$el ?? subjectRef.value;
    (el?.querySelector?.("input") ?? el)?.focus?.();
});

const sendHelp = (): void => {
    subject.value = "";
    message.value = "";
    open.value = false;
};

const cancel = (): void => {
    subject.value = "";
    message.value = "";
    open.value = false;
};
</script>

<template>
    <Modal v-model="open" size="md">
        <ModalHeader>
            <ModalTitle>Get help</ModalTitle>
            <ModalDescription>
                Have a question or need a hand? Send us a message and we'll get
                back to you.
            </ModalDescription>
            <ModalClose />
        </ModalHeader>
        <ModalContent>
            <div class="flex flex-col gap-4">
                <Field required>
                    <FieldLabel>Subject</FieldLabel>
                    <FieldContent>
                        <Input
                            ref="subjectRef"
                            v-model="subject"
                            placeholder="What's this about?"
                        />
                    </FieldContent>
                </Field>
                <Field required>
                    <FieldLabel>Message</FieldLabel>
                    <FieldContent>
                        <Textarea
                            v-model="message"
                            placeholder="Tell us what's going on…"
                        />
                    </FieldContent>
                </Field>
            </div>
        </ModalContent>
        <ModalFooter>
            <Button variant="secondary" @click="cancel">Cancel</Button>
            <Button
                variant="primary"
                :disabled="!subject.trim() || !message.trim()"
                @click="sendHelp"
            >
                Send message
            </Button>
        </ModalFooter>
    </Modal>
</template>
