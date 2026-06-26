// src/router/index.ts
import { createRouter, createWebHistory } from "vue-router";
import type { RouteRecordRaw } from "vue-router";
import MarketingLayout from "../layouts/MarketingLayout.vue";
import AppLayout from "../layouts/AppLayout.vue";


const routes: RouteRecordRaw[] = [
	{
		path: "/",
		component: MarketingLayout,
		children: [
			{ path: "", name: "home", component: () => import("../views/marketing/HomeView.vue") },
			{ path: "pricing", name: "pricing", component: () => import("../views/marketing/PricingView.vue") },
		],
	},
	{
		path: "/app",
		component: AppLayout,
		children: [
			{ path: "", name: "assistant", component: () => import("../views/app/AssistantView.vue"), meta: { title: "Assistant" } },
			{ path: "c/:id", name: "conversation", component: () => import("../views/app/AssistantView.vue"), meta: { title: "Conversation" } },
			{ path: "settings", name: "settings", component: () => import("../views/app/SettingsView.vue"), meta: { title: "Settings" } },
		],

	},

];

const router = createRouter({
	history: createWebHistory(),
	routes,
});

export default router;