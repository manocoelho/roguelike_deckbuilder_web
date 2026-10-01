const vfxManager = {
    spawnLeaves(containerId) {
        const container = document.getElementById(containerId);
        if (!container) return;
        
        const numLeaves = 40;
        for (let i = 0; i < numLeaves; i++) {
            const leaf = document.createElement('div');
            leaf.className = 'leaf';
            
            // Posição horizontal aleatória
            const left = Math.random() * 100;
            // Duração de queda aleatória (entre 5 e 12 segundos)
            const duration = 5 + Math.random() * 7;
            // Delay aleatório negativo para que já comecem no meio da tela
            const delay = Math.random() * 10;
            
            leaf.style.left = `${left}%`;
            leaf.style.animationDuration = `${duration}s`;
            leaf.style.animationDelay = `-${delay}s`;
            
            container.appendChild(leaf);
        }
    },

    // Função mágica para remover fundo branco usando Canvas (chroma keying)
    removeWhiteBg(imageUrl, callback) {
        const img = new Image();
        img.crossOrigin = "Anonymous";
        img.onload = () => {
            const canvas = document.createElement('canvas');
            canvas.width = img.width;
            canvas.height = img.height;
            const ctx = canvas.getContext('2d', { willReadFrequently: true });
            ctx.drawImage(img, 0, 0);
            
            const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
            const data = imageData.data;
            
            // Loop através de todos os pixels
            for (let i = 0; i < data.length; i += 4) {
                const r = data[i];
                const g = data[i+1];
                const b = data[i+2];
                // Se for muito próximo de branco, transforma em transparente
                if (r > 240 && g > 240 && b > 240) {
                    data[i+3] = 0; // Alpha = 0
                }
            }
            
            ctx.putImageData(imageData, 0, 0);
            callback(canvas.toDataURL('image/png'));
        };
        img.src = imageUrl;
    }
};
