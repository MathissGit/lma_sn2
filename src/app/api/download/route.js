import { exec } from "child_process";
import path from "path";
import fs from "fs";

export async function POST(req) {
  const { url } = await req.json();

  if (!url) {
    return new Response(JSON.stringify({ error: "URL manquante" }), {
      status: 400,
    });
  }

  const outputDir = path.resolve(process.cwd(), "public", "downloads");

  // Assurez-vous que le dossier de sortie existe
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  // Définir le chemin de sortie
  const outputFile = path.join(outputDir, "%(title)s.webm");

  // Commande pour télécharger la vidéo au format WebM
  const downloadCommand = `yt-dlp -f "bestvideo[ext=webm]+bestaudio[ext=webm]/best[ext=webm]" --merge-output-format webm --write-thumbnail -o "${outputFile}" ${url}`;

  return new Promise((resolve) => {
    exec(downloadCommand, (error, stdout, stderr) => {
      console.log("stdout:", stdout);
      console.log("stderr:", stderr);
      if (error) {
        console.error("Erreur lors du téléchargement :", stderr);
        resolve(
          new Response(JSON.stringify({ error: "Échec du téléchargement" }), {
            status: 500,
          })
        );
        return;
      }

      console.log("Téléchargement réussi :", stdout);

      // Supposons que le fichier final est correctement créé
      const fileNameMatch = stdout.match(/Merging formats into "(.*)"/);
      const fileName = fileNameMatch
        ? path.basename(fileNameMatch[1])
        : "fichier_inconnu.webm";

      if (!fileName) {
        console.error("Impossible de localiser le fichier final.");
        resolve(
          new Response(
            JSON.stringify({
              error: "Impossible de localiser le fichier final",
            }),
            { status: 500 }
          )
        );
        return;
      }

      resolve(
        new Response(
          JSON.stringify({
            message: "Vidéo téléchargée avec succès",
            downloadPath: `/downloads/${fileName}`,
          }),
          { status: 200 }
        )
      );
    });
  });
}
