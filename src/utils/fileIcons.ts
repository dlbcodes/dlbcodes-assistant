import pdfIcon from "../assets/icons/pdf-file.png";
import imageIcon from "../assets/icons/photo-file.png";
import fallbackIcon from "../assets/icons/file-folder.png";

const ICON_BY_EXT: Record<string, string> = {
	pdf: pdfIcon,
	png: imageIcon, jpg: imageIcon, jpeg: imageIcon, gif: imageIcon, webp: imageIcon,
};

export const iconForFile = (name: string): string => {
	const ext = name.split(".").pop()?.toLowerCase() ?? "";
	return ICON_BY_EXT[ext] ?? fallbackIcon;
};