import type { Conversation } from "../types/chat";
import type { User } from "../types/chat";

export const currentUser: User = {
	name: "Dana Lewis",
	email: "dana@example.com",
	avatar: "https://api.dicebear.com/9.x/avataaars/svg?seed=Dana"
};

const MINUTE = 1000 * 60;
const HOUR = MINUTE * 60;
const now = Date.now();

export const conversations: Conversation[] = [
	{
		id: "1",
		title: "Summarize quarterly report",
		updatedAt: now - 30 * MINUTE,
		messages: [
			{
				id: "1-1",
				role: "user",
				content:
					"Summarize the Q3 report and pull out the key action items.",
				status: "done",
				createdAt: now - 31 * MINUTE,
			},
			{
				id: "1-2",
				role: "assistant",
				content:
					"Here are the highlights from Q3:\n\n- Revenue grew 12% quarter over quarter, driven mostly by the new self-serve plan.\n- Churn dropped to 3.1%, the lowest this year.\n- Support volume rose 18%, so staffing is the main risk heading into Q4.\n\nAction items: finalize Q4 hiring for support, double down on self-serve onboarding, and revisit pricing for the enterprise tier.",
				status: "done",
				createdAt: now - 30 * MINUTE,
			},
		],
	},
	{
		id: "2",
		title: "Draft launch announcement",
		updatedAt: now - 3 * HOUR,
		messages: [
			{
				id: "2-1",
				role: "user",
				content:
					"Turn these notes into a short launch announcement: new theming engine, one-token rebrand, ships next week.",
				status: "done",
				createdAt: now - 3 * HOUR - 2 * MINUTE,
			},
			{
				id: "2-2",
				role: "assistant",
				content:
					"Subject: Rebrand your entire app by changing one token\n\nNext week we're shipping a new theming engine. Override a single set of design tokens and every component restyles instantly, no rebuild, no find-and-replace. One palette, a whole new look. More details at launch.",
				status: "done",
				createdAt: now - 3 * HOUR - 1 * MINUTE,
			},
			{
				id: "2-3",
				role: "user",
				content: "Make it a little less salesy.",
				status: "done",
				createdAt: now - 3 * HOUR,
			},
			{
				id: "2-4",
				role: "assistant",
				content:
					"Subject: New theming engine ships next week\n\nWe've reworked how theming works. You override one set of semantic tokens and the whole component set follows, with no rebuild step. It made our own rebrands a lot less painful, and we think it'll do the same for yours.",
				status: "done",
				createdAt: now - 3 * HOUR + 1 * MINUTE,
			},
		],
	},
	{
		id: "3",
		title: "Debug webhook 307 redirect",
		updatedAt: now - 26 * HOUR,
		messages: [
			{
				id: "3-1",
				role: "user",
				content:
					"My webhook keeps returning a 307 redirect instead of a 200. Any idea why?",
				status: "done",
				attachments: [
					{ id: "3-1-a", name: "webhook-handler.pdf", size: 2840 },
				],
				createdAt: now - 26 * HOUR - 1 * MINUTE,
			},
			{
				id: "3-2",
				role: "assistant",
				content:
					"A 307 usually means the request is being redirected before it reaches your handler, most often a trailing-slash or host mismatch. Check whether your app URL is missing a www (or has one it shouldn't), and whether the route expects a trailing slash. Frameworks often 307-redirect to add or strip the slash, which breaks POST webhooks because the body doesn't survive the redirect.",
				status: "done",
				createdAt: now - 26 * HOUR,
			},
		],
	},
];

export const findConversation = (id: string): Conversation | undefined =>
	conversations.find((c) => c.id === id);