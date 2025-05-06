"use client";

import { useEffect, useRef } from "react";
import "xterm/css/xterm.css";

interface TerminalComponentProps {
  link: string;
}

export default function TerminalComponent({ link }: TerminalComponentProps) {
  const terminalRef = useRef<HTMLDivElement>(null);
  const termRef = useRef<any>(null);

  useEffect(() => {
    if (typeof window !== "undefined" && terminalRef.current) {
      import("xterm").then(({ Terminal }) => {
        const term = new Terminal({
          theme: {
            background: "#000000",
            foreground: "#ffffff",
          },
          cursorBlink: true,
          fontSize: 16,
          fontFamily: "'Courier New', monospace",
          scrollback: 1000,
        });

        if (terminalRef.current) {
          term.open(terminalRef.current);
        }

        term.writeln("Bienvenue dans le terminal !");
        term.write("$ ");
        termRef.current = term;
      });
    }
  }, []);

  useEffect(() => {
    if (link && termRef.current) {
      const term = termRef.current;

      term.writeln(`\r\nLien soumis : ${link}`);
      term.writeln("Scraping en cours...");
      term.write("$ "); // Affiche une nouvelle invite de commande

      // Appeler l'API pour démarrer le scraping
      fetch("/api/download", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ url: link }),
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.error) {
            term.writeln(`Erreur : ${data.error}`);
          } else {
            term.writeln("Scraping terminé avec succès !");
            term.write("$ ");

            // Appeler l'API pour récupérer les fichiers téléchargés
            fetch("/api/files")
              .then((response) => response.json())
              .then((filesData) => {
                if (filesData.files && filesData.files.length > 0) {
                  term.writeln("\nFichiers téléchargés :");
                  filesData.files.forEach((file: { title: string; url: string }) => {
                    term.writeln(`- ${file.title}: ${file.url}`);
                  });
                } else {
                  term.writeln("\nAucun fichier téléchargé.");
                }
                term.write("$ ");
              })
              .catch((error) => {
                term.writeln(`Erreur lors de la récupération des fichiers : ${error.message}`);
                term.write("$ ");
              });
          }
        })
        .catch((error) => {
          term.writeln(`Erreur de connexion : ${error.message}`);
          term.write("$ ");
        });
    }
  }, [link]);

  return (
    <div className="terminal-container w-full h-[300px] bg-[#1e1e1e] rounded-lg shadow-md">
      <div ref={terminalRef} className="w-full h-full"></div>
    </div>
  );
}