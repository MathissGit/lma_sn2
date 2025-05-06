"use client";
import { useState } from 'react';

export default function Home() {
    const [url, setUrl] = useState('');
    const [downloadLink, setDownloadLink] = useState(null);

    const handleDownload = async () => {
        const res = await fetch('/api/download', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ url }),
        });

        const data = await res.json();
    };

    return (
        <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
            <main className="flex flex-col gap-[32px] row-start-2 items-center text-2xl">
                <div className="flex items-center gap-4">
                    <h1>Télécharger une vidéo YouTube</h1>
                    <input
                        type="text"
                        placeholder="Lien YouTube"
                        value={url}
                        onChange={(e) => setUrl(e.target.value)}
                        style={{ width: '300px', marginRight: '10px' }}
                    />
                    <button onClick={handleDownload}>Télécharger</button>

                    {downloadLink && (
                        <div style={{ marginTop: '20px' }}>
                            <a href={downloadLink} download target="_blank">Cliquez ici pour télécharger la vidéo</a>
                        </div>
                    )}
                </div>
            </main>
        </div>
    );
}
