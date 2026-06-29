import { ref } from "vue";
import type { Message, Model, Attachment } from "../types/chat";
import { MODELS } from "../types/chat";
import { findConversation } from "../data/mock";

// ─────────────────────────────────────────────────────────────────────────
// useChat — the single logic seam for this template.
//
// Everything here is STUBBED so the UI runs with zero backend. To make it real:
//   1. Replace the seed lookup (findConversation) with a fetch for the
//      conversation's messages.
//   2. Replace the body of `send()` with a call to your LLM endpoint, streaming
//      the response into the assistant message's `content`.
// The component layer never changes — it only reads `messages`, `isResponding`,
// and calls `send()`.
// ─────────────────────────────────────────────────────────────────────────

const uid = (): string => Math.random().toString(36).slice(2, 10);

// Placeholder replies streamed back while there's no real backend wired up.
// Swap the loop in send() for your model's output and these go away.
const STUB_REPLIES = [
	"Happy to help with that. Here's how I'd approach it, with a couple of options depending on what you're after.",
	"Good question. Let me break this down into a few clear steps you can follow.",
	"Here's a concise take, plus a couple of things worth keeping in mind as you go.",
	"Sure, I'd start by clarifying the goal, then work through the details from there.",
];

export function useChat(conversationId?: string) {
	// STUB: seed from mock data when opening an existing conversation.
	// Replace with a fetch for this conversation's messages.
	// The messages are copied so streaming/sending never mutates the mock.
	const seed = conversationId
		? (findConversation(conversationId)?.messages ?? [])
		: [];

	const messages = ref<Message[]>(seed.map((m) => ({ ...m })));
	const model = ref<Model>("Claude");
	const isResponding = ref(false);

	/**
	 * Send a user message and get an assistant reply.
	 *
	 * STUB: appends the user message, then simulates a streamed assistant
	 * response with setTimeout. Swap this for your real API call:
	 *
	 *   const res = await fetch("/api/chat", { ... });
	 *   // stream res into `assistant.content`, flipping status to "done" at the end.
	 */
	const send = async (
		text: string,
		attachments: Attachment[] = [],
	): Promise<void> => {
		const trimmed = text.trim();
		if (!trimmed || isResponding.value) return;

		messages.value.push({
			id: uid(),
			role: "user",
			content: trimmed,
			status: "done",
			attachments: attachments.length ? attachments : undefined,
			createdAt: Date.now(),
		});

		// Placeholder assistant message we "stream" into.
		const assistant: Message = {
			id: uid(),
			role: "assistant",
			content: "",
			status: "streaming",
			createdAt: Date.now(),
		};
		messages.value.push(assistant);
		isResponding.value = true;

		// ── STUB: stream a placeholder reply word by word.
		//    Replace this whole block with a call to your model and stream its output. ──
		const reply = STUB_REPLIES[Math.floor(Math.random() * STUB_REPLIES.length)];
		const words = reply.split(" ");
		for (const word of words) {
			await new Promise((r) => setTimeout(r, 40));
			assistant.content += (assistant.content ? " " : "") + word;
		}
		assistant.status = "done";
		isResponding.value = false;
		// ── end STUB ──
	};

	const reset = (): void => {
		messages.value = [];
		isResponding.value = false;
	};

	return { messages, model, models: MODELS, isResponding, send, reset };
}