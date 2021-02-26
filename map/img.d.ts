export interface IMG {
	frames: Frame2[];
	meta: Meta;
}

interface Meta {
	app: string;
	version: string;
	image: string;
	format: string;
	size: SourceSize;
	scale: string;
	smartupdate: string;
}

interface Frame2 {
	filename: string;
	frame: Frame;
	rotated: boolean;
	trimmed: boolean;
	spriteSourceSize: Frame;
	sourceSize: SourceSize;
}

interface SourceSize {
	w: number;
	h: number;
}

interface Frame {
	x: number;
	y: number;
	w: number;
	h: number;
}