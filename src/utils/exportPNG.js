import * as htmlToImage from "html-to-image";

export default async function exportPNG(ref, filename = "chart.png") {
  if (!ref?.current) {
    console.warn("exportPNG: ref is not attached");
    return;
  }

  try {
    const dataUrl = await htmlToImage.toPng(ref.current, {
      backgroundColor: "#ffffff",
      pixelRatio: 2, 
    });

    const a = document.createElement("a");
    a.href = dataUrl;
    a.download = filename.endsWith(".png") ? filename : `${filename}.png`;
    document.body.appendChild(a);
    a.click();

    document.body.removeChild(a);
  } catch (err) {
    console.error("PNG Export failed:", err);
  }
}
