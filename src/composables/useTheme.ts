import { ref, watch } from "vue";

export type Theme = "lattice" | "slate" | "zinc";


export interface BrandInfo {
	name: string;
	tagline: string;
}

const THEMES: Record<Theme, BrandInfo> = {
	lattice: { name: "Lattice", tagline: "Structure for ambitious teams." },
	slate: { name: "Slate", tagline: "Clarity in every detail." },
	zinc: { name: "Zinc", tagline: "Simple. Sharp. Focused." },
};

const current = ref<Theme>("lattice");

const apply = (theme: Theme): void => {
	document.documentElement.setAttribute("data-theme", theme);
};

watch(current, apply, { immediate: true });

export const useTheme = () => ({
	current,
	themes: THEMES,
	setTheme: (t: Theme): void => {
		current.value = t;
	},
	brand: () => THEMES[current.value],
});