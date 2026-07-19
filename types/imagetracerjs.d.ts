/**
 * imagetracerjs ships no types (UMD, last released 2022). Only the one entry
 * point the Lab uses is declared here.
 */
declare module "imagetracerjs" {
  export interface TracerOptions {
    /** Palette size the image is quantized to before tracing. */
    numberofcolors?: number;
    /** Line fit tolerance. Higher is smoother and less faithful. */
    ltres?: number;
    /** Curve fit tolerance. */
    qtres?: number;
    /** Drop paths whose area is below this, killing speckle. */
    pathomit?: number;
    /** 0 disabled, 1 random, 2 deterministic. */
    colorsampling?: number;
    blurradius?: number;
    scale?: number;
  }

  const ImageTracer: {
    imagedataToSVG(data: ImageData, options?: TracerOptions): string;
  };

  export default ImageTracer;
}
