<script setup lang="ts">
import { ref, computed } from "vue";
import {
    Panel,
    PanelHeader,
    PanelContent,
    PanelFooter,
    Textarea,
    Button,
    Select,
    SelectTrigger,
    SelectContent,
    SelectItem,
} from "@dlbcodes/my-design-system";
import { PhFilePlus, PhArrowUp } from "@phosphor-icons/vue";
import UploadModal from "./UploadModal.vue";
import AttachmentChip from "./AttachmentChip.vue";
import { siteConfig } from "../../config/site.ts";
import type { Attachment, Model, ModelOption } from "../../types/chat";

const props = defineProps<{
    models: readonly ModelOption[];
    disabled?: boolean;
}>();

// model (the selected value) stays a label string:
const model = defineModel<Model>("model", { required: true });

const currentModel = computed(() =>
    props.models.find((m) => m.label === model.value),
);

const emit = defineEmits<{
    send: [text: string, attachments: Attachment[]];
}>();

const prompt = ref("");
const inputRef = ref();
const uploadOpen = ref(false);
const attachments = ref<Attachment[]>([]);

const focusInput = (e: MouseEvent): void => {
    if ((e.target as HTMLElement).closest("button, [role='menu'], a")) return;
    const el = inputRef.value?.$el ?? inputRef.value;
    el?.querySelector?.("textarea")?.focus() ?? el?.focus?.();
};

const submit = (): void => {
    const text = prompt.value.trim();
    if (!text || props.disabled) return;
    emit("send", text, [...attachments.value]);
    prompt.value = "";
    attachments.value = [];
};

const onKeydown = (e: KeyboardEvent): void => {
    if (e.key === "Enter" && !e.shiftKey) {
        e.preventDefault();
        submit();
    }
};

const onAttach = (files: Attachment[]): void => {
    attachments.value.push(...files);
};

const removeAttachment = (i: number): void => {
    attachments.value.splice(i, 1);
};
</script>

<template>
    <Panel class="overflow-visible">
        <!-- Attachment chips -->
        <PanelHeader
            v-if="attachments.length"
            class="flex flex-wrap items-center gap-1 pt-0 pb-1"
        >
            <AttachmentChip
                v-for="(file, i) in attachments"
                :key="file.id"
                :attachment="file"
                removable
                @remove="removeAttachment(i)"
            />
        </PanelHeader>
        <!-- End Attachment chips -->

        <PanelContent
            class="flex cursor-text flex-col gap-2 overflow-visible p-3"
            @click="focusInput"
        >
            <Textarea
                ref="inputRef"
                v-model="prompt"
                autosize
                :rows="3"
                placeholder="Ask anything…"
                class="border-0 bg-transparent shadow-none focus-within:ring-0"
                @keydown="onKeydown"
            />
            <div class="flex items-center justify-between">
                <div class="flex items-center gap-2">
                    <Button
                        variant="secondary"
                        size="icon"
                        aria-label="Attach file"
                        @click="uploadOpen = true"
                    >
                        <PhFilePlus class="size-5" aria-hidden="true" />
                    </Button>
                    <Select v-model="model" class="w-30">
                        <SelectTrigger size="sm">
                            <span class="flex items-center gap-2">
                                <img
                                    v-if="currentModel"
                                    :src="currentModel.icon"
                                    alt=""
                                    class="size-4 shrink-0"
                                />
                                {{ model }}
                            </span>
                        </SelectTrigger>
                        <SelectContent width="3xs">
                            <SelectItem
                                v-for="m in models"
                                :key="m.label"
                                :value="m.label"
                            >
                                <div class="flex items-center gap-x-2">
                                    <img
                                        :src="m.icon"
                                        alt=""
                                        class="size-4 shrink-0"
                                    />
                                    {{ m.label }}
                                </div>
                            </SelectItem>
                        </SelectContent>
                    </Select>
                </div>
                <Button
                    size="icon"
                    aria-label="Send message"
                    :disabled="!prompt.trim() || disabled"
                    @click="submit"
                >
                    <PhArrowUp class="size-5" aria-hidden="true" />
                </Button>
            </div>
        </PanelContent>

        <PanelFooter class="font-mono text-xs tracking-tight">
            {{ siteConfig.name }} can make mistakes. Verify important info.
        </PanelFooter>
    </Panel>

    <UploadModal v-model:open="uploadOpen" @attach="onAttach" />
</template>
