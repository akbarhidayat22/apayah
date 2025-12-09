let moveCount = 0; // Hitungan gerakan
const maxMoves = 5; // Berhenti setelah 5 kali

// --- ⚠️ GANTI NOMOR DI SINI (CONTOH: 62812345678) ---
const nomorWA = "6285394413655"; 

function showQuestion() {
    document.getElementById('section-intro').classList.add('hidden');
    document.getElementById('section-question').classList.remove('hidden');
}

function moveButton() {
    // Jika sudah kabur 5 kali, biarkan tombol diam (agar bisa diklik)
    if (moveCount >= maxMoves) return;

    const noBtn = document.getElementById('btn-no');
    const yesBtn = document.getElementById('btn-yes');
    const container = document.querySelector('#section-question'); // Ambil container yang sedang aktif

    // Jika container tidak ditemukan, hentikan fungsi
    if (!container) return;

    // Pastikan tombol NO posisinya absolute agar bisa dipindah
    noBtn.style.position = 'absolute';

    // Mendapatkan ukuran kotak (container) dan tombol
    const containerRect = container.getBoundingClientRect();
    const btnRect = noBtn.getBoundingClientRect();
    const yesRect = yesBtn.getBoundingClientRect();

    // Hitung batas maksimal pergerakan (Lebar Kotak - Lebar Tombol)
    // Dikurangi 20px agar tidak terlalu mepet pinggir
    let maxX = containerRect.width - btnRect.width - 20;
    let maxY = containerRect.height - btnRect.height - 20;

    // Jaring Pengaman: Jika hasil negatif (error), set ke 0
    if (maxX < 0) maxX = 0;
    if (maxY < 0) maxY = 0;

    let newX, newY;
    let isOverlapping = true;
    let attempts = 0;

    // LOGIKA MENCARI POSISI AMAN (Tidak nabrak tombol YES)
    while (isOverlapping && attempts < 50) {
        newX = Math.random() * maxX;
        newY = Math.random() * maxY;

        // Koordinat Tombol NO yang baru
        const noLeft = newX;
        const noTop = newY;
        const noRight = noLeft + btnRect.width;
        const noBottom = noTop + btnRect.height;

        // Koordinat Tombol YES (relatif terhadap container)
        // Kita hitung posisi YES di dalam kotak
        const yesLeft = yesBtn.offsetLeft;
        const yesTop = yesBtn.offsetTop;
        const yesRight = yesLeft + yesBtn.offsetWidth;
        const yesBottom = yesTop + yesBtn.offsetHeight;

        // Cek Tabrakan
        if (noRight < yesLeft || noLeft > yesRight || noBottom < yesTop || noTop > yesBottom) {
            isOverlapping = false; // Aman, tidak nabrak
        }
        
        attempts++;
    }

    // JIKA GAGAL MENEMUKAN POSISI AMAN (Jarang terjadi, tapi buat jaga-jaga)
    // Taruh tombol di pojok kanan bawah
    if (attempts >= 50) {
        newX = maxX;
        newY = maxY;
    }

    // Terapkan Posisi Baru
    // Tambah 10px biar gak nempel banget sama garis tepi kiri/atas
    noBtn.style.left = `${newX + 10}px`;
    noBtn.style.top = `${newY + 10}px`;

    moveCount++;
}

// Fungsi jika DITERIMA
function accepted() {
    document.getElementById('section-question').classList.add('hidden');
    document.getElementById('section-success').classList.remove('hidden');

    const pesan = "Yesssss";
    
    // Jeda 2 detik baru buka WA
    setTimeout(() => {
        window.open(`https://wa.me/${nomorWA}?text=${encodeURIComponent(pesan)}`, "_blank");
    }, 2000);
}

// Fungsi jika DITOLAK
function rejected() {
    document.getElementById('section-question').classList.add('hidden');
    document.getElementById('section-rejected').classList.remove('hidden');

    const pesan = "Sorry, aku nda mawwu";
    
    // Jeda 2 detik baru buka WA
    setTimeout(() => {
        window.open(`https://wa.me/${nomorWA}?text=${encodeURIComponent(pesan)}`, "_blank");
    }, 2000);
}