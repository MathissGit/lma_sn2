# WeScrap.mp3

WeScrap.mp3 est une application web qui te permet de télécharger des vidéos ou musiques (YouTube, etc.), de les organiser dans ta bibliothèque, de les écouter et de les ajouter à tes favoris.

---

## 🚀 Démarrage rapide (Utilisateur)

1. **Connexion**  
   Connecte-toi ou crée un compte via la page d’accueil.

2. **Télécharger une vidéo ou une musique**  
   - Colle un lien YouTube (ou autre supporté) dans le champ prévu en haut de la page.
   - Clique sur “Entrée” ou le bouton associé.
   - Le terminal à droite t’indique l’état du téléchargement.

3. **Accéder à ta bibliothèque**  
   - Clique sur l’icône “Bibliothèque” dans la barre latérale.
   - Tu y retrouves tous tes fichiers téléchargés, avec miniature, titre, bouton lecture et favoris.

4. **Écouter et gérer tes fichiers**  
   - Clique sur ▶️ pour écouter un fichier.
   - Clique sur le cœur pour l’ajouter/retirer de tes favoris (le cœur devient turquoise si favori).
   - Utilise le lecteur en bas de page pour contrôler la lecture.

5. **Favoris et playlists**  
   - Ajoute des fichiers à tes favoris pour les retrouver facilement.
   - Les playlists sont prêtes à être implémentées (structure présente).

---

## 🛠️ Pour les développeurs

### Prérequis

- Node.js 18+
- [yt-dlp](https://github.com/yt-dlp/yt-dlp) et [ffmpeg](https://ffmpeg.org/) installés et accessibles dans le PATH système
- Un projet [Supabase](https://supabase.com/) (pour l’authentification)

### Installation

```bash
git clone <url-du-repo>
cd lma_sn2
npm install
```

Crée un fichier `.env.local` à la racine avec :
```
NEXT_PUBLIC_SUPABASE_URL=...
NEXT_PUBLIC_SUPABASE_ANON_KEY=...
```
(Renseigne les valeurs depuis ton projet Supabase.)

### Lancer l’application

```bash
npm run dev
```
L’application sera accessible sur [http://localhost:3000](http://localhost:3000).

---

## 📚 Fonctionnalités principales

- **Téléchargement** de vidéos/audio via un lien
- **Terminal interactif** affichant l’état du téléchargement
- **Bibliothèque** avec miniatures, favoris, lecture directe
- **Favoris** (cœur turquoise)
- **Lecteur audio** moderne (play, pause, suivant, précédent, volume, progression)
- **Authentification** via Supabase
- **Interface responsive**

---

## 🤔 FAQ Utilisateur

- **Je ne vois pas mon fichier après téléchargement ?**  
  Recharge la bibliothèque ou attends la fin du message “Scraping terminé avec succès !”.

- **Le cœur ne reste pas turquoise ?**  
  Les favoris sont stockés localement dans ton navigateur.

- **Erreur lors du téléchargement ?**  
  Vérifie que le lien est valide et que le serveur a bien accès à yt-dlp et ffmpeg.

---

## 📁 Structure du projet

- `/src/app` : Pages Next.js (bibliothèque, dashboard, playlists, etc.)
- `/src/components` : Composants UI (Terminal, Sidebar, Footer, Header, etc.)
- `/src/context` : Context React pour le player audio
- `/src/app/api` : Routes API (download, files)
- `/public/downloads` : Fichiers téléchargés

---

## 🔒 Sécurité

- Ne partage pas ta clé Supabase publiquement.
- Les fichiers téléchargés sont accessibles dans `/public/downloads`.

---

## 📝 Licence

Projet à usage pédagogique.

---