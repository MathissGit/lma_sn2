import fs from "fs";
import path from "path";

export async function GET() {
  const downloadsDir = path.resolve(process.cwd(), "public", "downloads");

  // Vérifiez si le dossier existe
  if (!fs.existsSync(downloadsDir)) {
    return new Response(JSON.stringify({ files: [] }), { status: 200 });
  }

  // Lister les fichiers dans le dossier
  const files = fs.readdirSync(downloadsDir).filter((file) => file.endsWith(".webm")).map((file) => {
    const title = path.basename(file, path.extname(file)); // Extraire le titre sans extension

    // Trouver la miniature correspondante (jpg, webp, png, etc.)
    const thumbnailExtensions = [".jpg", ".webp", ".png"];
    const thumbnail = thumbnailExtensions
      .map((ext) => path.join(downloadsDir, `${title}${ext}`))
      .find((thumbnailPath) => fs.existsSync(thumbnailPath));

    return {
      title,
      thumbnail: thumbnail ? `/downloads/${path.basename(thumbnail)}` : null,
      url: `/downloads/${file}`,
    };
  });

  return new Response(JSON.stringify({ files }), { status: 200 });
}