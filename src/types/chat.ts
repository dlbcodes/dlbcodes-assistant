import gptIcon from "../assets/icons/chatgpt-icon.svg";
import claudeIcon from "../assets/icons/claude-ai-icon.svg";
import geminiIcon from "../assets/icons/google-gemini-icon.svg";
import grokIcon from "../assets/icons/grok-icon.svg";

export type Role = "user" | "assistant";

export type MessageStatus = "sending" | "streaming" | "done" | "error";

export interface User {
	name: string;
	email: string;
	avatar?: string;
}

export interface Attachment {
	id: string;
	name: string;
	size: number;
}

export interface Message {
	id: string;
	role: Role;
	content: string;
	status: MessageStatus;
	attachments?: Attachment[];
	createdAt: number;
}

export interface ModelOption {
	label: string;
	icon: string;
}


export interface Conversation {
	id: string;
	title: string;
	updatedAt: number;
	messages: Message[];
}


export const MODELS = [
	{ label: "ChatGPT", icon: gptIcon },
	{ label: "Claude", icon: claudeIcon },
	{ label: "Gemini", icon: geminiIcon },
	{ label: "Grok", icon: grokIcon },
] as const satisfies readonly ModelOption[];

export type Model = (typeof MODELS)[number]["label"];