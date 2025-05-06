"use client";

import { useEffect, useRef } from "react";
import "xterm/css/xterm.css";

interface TerminalComponentProps {
  link: string;
  onReload: () => void;
}

export default function TerminalComponent({ link, onReload }: TerminalComponentProps) {
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
          disableStdin: true,
          cursorStyle: "underline",
          cursorBlink: true,
          fontSize: 16,
          fontFamily: "'Geist', monospace",
          scrollback: 1000,
          
        });
        const style = document.createElement("style");
          style.innerHTML = `
            .xterm .xterm-cursor {
              display: none !important;
            }
          `;
          document.head.appendChild(style);

        if (terminalRef.current) {
          term.open(terminalRef.current);
        }

        term.writeln("\x1b[37mTerminal \x1b[38;2;3;218;198mWeScrap\x1b[37m.mp3\x1b[0m");
        termRef.current = term;
      });
    }
  }, []);

  useEffect(() => {
    if (link && termRef.current) {
      const term = termRef.current;

      term.writeln(`\r\nLien soumis : ${link}`);
      term.writeln("Scraping en cours...");

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

            fetch("/api/files")
              .then((response) => response.json())
              .then((filesData) => {
                if (filesData.files && filesData.files.length > 0) {
                  const latestFile = filesData.files[filesData.files.length - 1]; // Récupère le dernier fichier
                  term.writeln("\nFichier téléchargé :");
                  term.writeln(`- ${latestFile.title}: ${latestFile.url}`);
                } else {
                  term.writeln("\nAucun fichier téléchargé.");
                }

                onReload();
              })
              .catch((error) => {
                term.writeln(`Erreur lors de la récupération des fichiers : ${error.message}`);
                onReload();
              });
          }
        })
        .catch((error) => {
          term.writeln(`Erreur de connexion : ${error.message}`);
          onReload();
        });
    }
  }, [link]);

  return (
    <div className="terminal-container w-full h-[300px] bg-[#1e1e1e] rounded-lg shadow-md">
      <div ref={terminalRef} className="w-full h-full"></div>
    </div>
  );
}