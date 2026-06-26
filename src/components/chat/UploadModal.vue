<script setup lang="ts">
import { ref } from "vue";
import { useDropZone } from "@vueuse/core";
import {
    Modal,
    ModalHeader,
    ModalTitle,
    ModalDescription,
    ModalContent,
    ModalFooter,
    ModalClose,
    Button,
} from "@dlbcodes/my-design-system";
import { PhX } from "@phosphor-icons/vue";
import uploadIcon from "../../assets/icons/upload.png";
import type { Attachment } from "../../types/chat";
import { iconForFile } from "../../utils/fileIcons";

const open = defineModel<boolean>("open", { required: true });

const emit = defineEmits<{
    attach: [attachments: Attachment[]];
}>();

const ACCEPTED = [".pdf", ".png", ".jpg", ".jpeg"];
const MAX_BYTES = 10 * 1024 * 1024; // 10 MB

const staged = ref<Attachment[]>([]);
const error = ref("");
const fileInputRef = ref<HTMLInputElement | null>(null);
const dropZoneRef = ref<HTMLElement | null>(null);

const uid = (): string => Math.random().toString(36).slice(2, 10);

// Stage files, skipping any that fail the type or size limits the modal advertises.
const addStaged = (list: FileList | File[] | null): void => {
    if (!list) return;
    let skipped = 0;
    for (const f of Array.from(list)) {
        const typeOk = ACCEPTED.some((ext) =>
            f.name.toLowerCase().endsWith(ext),
        );
        const sizeOk = f.size <= MAX_BYTES;
        if (!typeOk || !sizeOk) {
            skipped++;
            continue;
        }
        staged.value.push({ id: uid(), name: f.name, size: f.size });
    }
    error.value = skipped
        ? `${skipped} file${skipped > 1 ? "s" : ""} skipped (wrong type or over 10 MB).`
        : "";
};

const { isOverDropZone } = useDropZone(dropZoneRef, {
    onDrop: (files) => addStaged(files),
});

const openPicker = (): void => {
    fileInputRef.value?.click();
};

const onInputChange = (e: Event): void => {
    const target = e.target as HTMLInputElement;
    addStaged(target.files);
    target.value = ""; // allow re-selecting the same file
};

const removeStaged = (i: number): void => {
    staged.value.splice(i, 1);
};

const confirm = (): void => {
    emit("attach", [...staged.value]);
    staged.value = [];
    error.value = "";
    open.value = false;
};

const cancel = (): void => {
    staged.value = [];
    error.value = "";
    open.value = false;
};

const formatSize = (bytes: number): string => {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(0)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
};
</script>

<template>
    <Modal v-model="open" size="xl">
        <ModalHeader>
            <ModalTitle>Upload files</ModalTitle>
            <ModalDescription>
                Add files to this conversation. PDF, PNG, or JPG up to 10 MB
                each.
            </ModalDescription>
            <ModalClose />
        </ModalHeader>

        <ModalContent>
            <div class="flex flex-col gap-4">
                <!-- Drop zone -->
                <button
                    ref="dropZoneRef"
                    type="button"
                    class="flex flex-col items-center justify-center gap-2 rounded-xl border-2 border-dashed p-8 text-center transition-colors"
                    :class="
                        isOverDropZone
                            ? 'border-brand-200 bg-bg-subtle'
                            : 'border-border-default hover:bg-bg-elevated'
                    "
                    @click="openPicker"
                >
                    <img :src="uploadIcon" alt="" class="size-16 shrink-0" />
                    <div>
                        <span class="text-sm font-medium text-text-primary"
                            >Click to upload</span
                        >
                        <span class="text-sm text-text-secondary">
                            or drag and drop</span
                        >
                    </div>
                    <span class="text-xs text-text-tertiary"
                        >PDF, PNG, JPG up to 10 MB</span
                    >
                </button>

                <input
                    ref="fileInputRef"
                    type="file"
                    multiple
                    accept=".pdf,.png,.jpg,.jpeg"
                    class="hidden"
                    @change="onInputChange"
                />

                <!-- Rejected-files message -->
                <p v-if="error" role="alert" class="text-sm text-danger-text">
                    {{ error }}
                </p>

                <!-- Staged files -->
                <ul
                    v-if="staged.length"
                    class="flex flex-col gap-2"
                    aria-live="polite"
                >
                    <li
                        v-for="(file, i) in staged"
                        :key="file.id"
                        class="flex items-center gap-3 rounded-lg border border-border-subtle bg-bg-raised p-2.5"
                    >
                        <img
                            :src="iconForFile(file.name)"
                            alt=""
                            class="size-10 shrink-0"
                        />
                        <div class="min-w-0 flex-1">
                            <p class="truncate text-sm text-text-primary">
                                {{ file.name }}
                            </p>
                            <p class="text-xs text-text-tertiary">
                                {{ formatSize(file.size) }}
                            </p>
                        </div>
                        <Button
                            variant="icon"
                            size="icon-sm"
                            :aria-label="`Remove ${file.name}`"
                            @click="removeStaged(i)"
                        >
                            <PhX class="size-4" aria-hidden="true" />
                        </Button>
                    </li>
                </ul>
            </div>
        </ModalContent>

        <ModalFooter>
            <Button variant="secondary" @click="cancel">Cancel</Button>
            <Button :disabled="!staged.length" @click="confirm">
                Attach {{ staged.length ? `(${staged.length})` : "" }}
            </Button>
        </ModalFooter>
    </Modal>
</template>
