// =========================================
// THE MALANG
// STEP 1 - NAVBAR
// =========================================

const navbar = document.querySelector(".navbar");


// Change navbar appearance when scrolling

window.addEventListener("scroll", () => {

    if (window.scrollY > 50) {

        navbar.style.background = "rgba(8, 8, 8, 0.92)";
        navbar.style.backdropFilter = "blur(15px)";

    } else {

        navbar.style.background =
            "linear-gradient(to bottom, rgba(0, 0, 0, 0.75), transparent)";

        navbar.style.backdropFilter = "none";
    }

});

// =========================================
// THE MALANG
// MUSIC PLAYER
// =========================================


// SONGS

const songs = [

    {
        title: "AADAT",
        artist: "UBAID AHMAD",
        file: "music/song1.mp3",
        cover: "images/musiccover1.jpeg"
    },

    {
        title: "HALKA HALKA SUROOR",
        artist: "THE MALANG",
        file: "music/song2.mp3",
        cover: "images/musiccover2.jpeg"
    },

    {
        title: "KAAHE MOSE",
        artist: "SUHAIL YOUSUF",
        file: "music/song3.mp3",
        cover: "images/musiccover3.jpeg"
    },



    {
        title: "SONG TITLE 04",
        artist: "THE MALANG",
        file: "music/song5.mp3",
        cover: "images/musiccover5.jpeg"
    },

    {
        title: "SONG TITLE 05",
        artist: "THE MALANG",
        file: "music/song6.mp3",
        cover: "images/musiccover6.jpeg"
    },

    {
        title: "SONG TITLE 06",
        artist: "THE MALANG",
        file: "music/song7.mp3",
        cover: "images/musiccover7.jpeg"
    },

    {
        title: "SONG TITLE 07",
        artist: "THE MALANG",
        file: "music/song8.mp3",
        cover: "images/musiccover8.jpeg"
    },


    {
        title: "SONG TITLE 08",
        artist: "THE MALANG",
        file: "music/song8.mp3",
        cover: "images/musiccover8.jpeg"
    }

];


// AUDIO

const audio = new Audio();

let currentSong = 0;

let isPlaying = false;


// ELEMENTS

const playBtn =
    document.getElementById("playBtn");

const prevBtn =
    document.getElementById("prevBtn");

const nextBtn =
    document.getElementById("nextBtn");

const songTitle =
    document.getElementById("songTitle");

const songArtist =
    document.getElementById("songArtist");

const albumImage =
    document.getElementById("albumImage");

const progressBar =
    document.getElementById("progressBar");

const progressContainer =
    document.getElementById("progressContainer");

const currentTime =
    document.getElementById("currentTime");

const duration =
    document.getElementById("duration");

const volumeControl =
    document.getElementById("volumeControl");

const songItems =
    document.querySelectorAll(".song-item");


// =========================================
// LOAD SONG
// =========================================

function loadSong(index) {

    const song = songs[index];

    songTitle.textContent =
        song.title;

    songArtist.textContent =
        song.artist;

    albumImage.src =
        song.cover;

    audio.src =
        song.file;

    audio.load();

    currentSong = index;

    updateActiveSong();

}


// =========================================
// PLAY SONG
// =========================================

function playSong() {

    audio.play();

    isPlaying = true;

    playBtn.textContent = "Ⅱ";

}


// =========================================
// PAUSE SONG
// =========================================

function pauseSong() {

    audio.pause();

    isPlaying = false;

    playBtn.textContent = "▶";

}


// =========================================
// PLAY / PAUSE
// =========================================

playBtn.addEventListener("click", () => {

    if (isPlaying) {

        pauseSong();

    } else {

        playSong();

    }

});


// =========================================
// NEXT SONG
// =========================================

nextBtn.addEventListener("click", () => {

    currentSong++;

    if (currentSong >= songs.length) {

        currentSong = 0;

    }

    loadSong(currentSong);

    playSong();

});


// =========================================
// PREVIOUS SONG
// =========================================

prevBtn.addEventListener("click", () => {

    currentSong--;

    if (currentSong < 0) {

        currentSong =
            songs.length - 1;

    }

    loadSong(currentSong);

    playSong();

});


// =========================================
// SONG LIST
// =========================================
// SONG LIST
songItems.forEach(item => {
    item.addEventListener("click", () => {

        const index = parseInt(item.dataset.index);

        // Load selected song
        loadSong(index);

        // Play selected song
        playSong();

        // Smoothly scroll to the main music player
        document.querySelector(".music-player").scrollIntoView({
            behavior: "smooth",
            block: "start"
        });

    });
});


// =========================================
// PROGRESS UPDATE
// =========================================

audio.addEventListener("timeupdate", () => {

    if (!audio.duration) return;

    const progress =
        (audio.currentTime /
        audio.duration) * 100;

    progressBar.style.width =
        `${progress}%`;


    currentTime.textContent =
        formatTime(audio.currentTime);

});


// =========================================
// DURATION
// =========================================

audio.addEventListener("loadedmetadata", () => {

    duration.textContent =
        formatTime(audio.duration);

});


// =========================================
// CLICK PROGRESS BAR
// =========================================

progressContainer.addEventListener("click", (event) => {

    const width =
        progressContainer.clientWidth;

    const clickX =
        event.offsetX;

    const duration =
        audio.duration;

    audio.currentTime =
        (clickX / width) * duration;

});


// =========================================
// VOLUME
// =========================================

// =========================================
// VOLUME + MUTE
// =========================================

const muteBtn =
    document.getElementById("muteBtn");

let previousVolume = 1;


// VOLUME SLIDER

volumeControl.addEventListener("input", () => {

    const volume =
        parseFloat(volumeControl.value);

    audio.volume = volume;

    if (volume === 0) {

        audio.muted = true;

        muteBtn.textContent = "🔇";

    } else {

        audio.muted = false;

        previousVolume = volume;

        muteBtn.textContent = "🔊";

    }

});


// MUTE / UNMUTE

muteBtn.addEventListener("click", () => {

    if (audio.muted || audio.volume === 0) {

        audio.muted = false;

        audio.volume =
            previousVolume > 0
                ? previousVolume
                : 1;

        volumeControl.value =
            audio.volume;

        muteBtn.textContent = "🔊";

    } else {

        previousVolume =
            audio.volume;

        audio.muted = true;

        muteBtn.textContent = "🔇";

    }

});

// =========================================
// SONG ENDED
// =========================================

audio.addEventListener("ended", () => {

    currentSong++;

    if (currentSong >= songs.length) {

        currentSong = 0;

    }

    loadSong(currentSong);

    playSong();

});


// =========================================
// ACTIVE SONG
// =========================================

function updateActiveSong() {

    songItems.forEach(item => {

        item.classList.remove("active");

    });

    songItems[currentSong]
        .classList.add("active");

}


// =========================================
// TIME FORMAT
// =========================================

function formatTime(seconds) {

    if (isNaN(seconds)) {

        return "0:00";

    }

    const minutes =
        Math.floor(seconds / 60);

    const secs =
        Math.floor(seconds % 60);

    return `${minutes}:${secs
        .toString()
        .padStart(2, "0")}`;

}


// =========================================
// INITIALIZE
// =========================================

loadSong(0);



/* =========================================
   GALLERY LIGHTBOX
========================================= */

const galleryItems =
    document.querySelectorAll(".gallery-item");

const galleryLightbox =
    document.getElementById("galleryLightbox");

const lightboxImage =
    document.getElementById("lightboxImage");

const lightboxClose =
    document.getElementById("lightboxClose");

const lightboxPrev =
    document.getElementById("lightboxPrev");

const lightboxNext =
    document.getElementById("lightboxNext");

const lightboxCounter =
    document.getElementById("lightboxCounter");


let currentImage = 0;


/* GET ALL IMAGES */

const galleryImages = [];

galleryItems.forEach((item, index) => {

    const image =
        item.querySelector("img");

    galleryImages.push({
        src: image.src,
        alt: image.alt
    });


    /* CLICK IMAGE */

    item.addEventListener("click", () => {

        currentImage = index;

        openLightbox();

    });

});


/* OPEN LIGHTBOX */

function openLightbox() {

    const image =
        galleryImages[currentImage];

    lightboxImage.src = image.src;

    lightboxImage.alt = image.alt;

    lightboxCounter.textContent =
        `${String(currentImage + 1).padStart(2, "0")} / ${String(galleryImages.length).padStart(2, "0")}`;

    galleryLightbox.classList.add("active");

    document.body.style.overflow = "hidden";

}


/* CLOSE LIGHTBOX */

function closeLightbox() {

    galleryLightbox.classList.remove("active");

    document.body.style.overflow = "";

}


/* NEXT IMAGE */

function nextImage() {

    currentImage++;

    if (currentImage >= galleryImages.length) {

        currentImage = 0;

    }

    openLightbox();

}


/* PREVIOUS IMAGE */

function previousImage() {

    currentImage--;

    if (currentImage < 0) {

        currentImage = galleryImages.length - 1;

    }

    openLightbox();

}


/* BUTTONS */

lightboxClose.addEventListener(
    "click",
    closeLightbox
);

lightboxNext.addEventListener(
    "click",
    nextImage
);

lightboxPrev.addEventListener(
    "click",
    previousImage
);


/* CLICK OUTSIDE IMAGE */

galleryLightbox.addEventListener(
    "click",
    (event) => {

        if (
            event.target === galleryLightbox
        ) {

            closeLightbox();

        }

    }
);


/* KEYBOARD CONTROLS */

document.addEventListener(
    "keydown",
    (event) => {

        if (
            !galleryLightbox.classList.contains(
                "active"
            )
        ) {

            return;

        }

        if (event.key === "Escape") {

            closeLightbox();

        }

        if (event.key === "ArrowRight") {

            nextImage();

        }

        if (event.key === "ArrowLeft") {

            previousImage();

        }

    }
);
/* =========================================
   FORMSPREE BOOKING FORM
========================================= */

const bookingForm = document.getElementById("bookingForm");
const bookingStatus = document.getElementById("bookingStatus");

if (bookingForm) {

    bookingForm.addEventListener("submit", async function (event) {

        event.preventDefault();

        const submitButton =
            bookingForm.querySelector(".booking-submit");

        submitButton.disabled = true;
        submitButton.textContent = "SENDING REQUEST...";

        try {

            const response = await fetch(
                "https://formspree.io/f/mrpbejga",
                {
                    method: "POST",
                    body: new FormData(bookingForm),
                    headers: {
                        "Accept": "application/json"
                    }
                }
            );

            if (response.ok) {

                // Show success message
                bookingStatus.innerHTML =
                    "✓ BOOKING REQUEST SENT SUCCESSFULLY.";

                bookingStatus.style.display = "block";
                bookingStatus.style.color = "#c9a227";

                // Clear form
                bookingForm.reset();

                // Restore button
                submitButton.innerHTML =
                    'SEND BOOKING REQUEST <span>↗</span>';

                submitButton.disabled = false;

            } else {

                bookingStatus.innerHTML =
                    "✕ SOMETHING WENT WRONG. PLEASE TRY AGAIN.";

                bookingStatus.style.display = "block";
                bookingStatus.style.color = "#f5f2ea";

                submitButton.innerHTML =
                    'SEND BOOKING REQUEST <span>↗</span>';

                submitButton.disabled = false;
            }

        } catch (error) {

            console.error("Formspree error:", error);

            bookingStatus.innerHTML =
                "✕ SOMETHING WENT WRONG. PLEASE TRY AGAIN.";

            bookingStatus.style.display = "block";
            bookingStatus.style.color = "#f5f2ea";

            submitButton.innerHTML =
                'SEND BOOKING REQUEST <span>↗</span>';

            submitButton.disabled = false;
        }

    });

}

/* =========================================
   SMOOTH SCROLLING
========================================= */

document.querySelectorAll('a[href^="#"]').forEach(link => {

    link.addEventListener("click", function (event) {

        const targetId =
            this.getAttribute("href");

        if (
            !targetId ||
            targetId === "#"
        ) {
            return;
        }

        const target =
            document.querySelector(targetId);

        if (!target) {
            return;
        }

        event.preventDefault();

        target.scrollIntoView({
            behavior: "smooth",
            block: "start"
        });

    });

});


/* =========================================
   MOBILE MENU
========================================= */

/* =========================================
   MOBILE MENU
========================================= */

const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");

if (menuToggle && navLinks) {

    menuToggle.addEventListener("click", function () {

        navLinks.classList.toggle("active");
        menuToggle.classList.toggle("active");

    });


    /* CLOSE MENU WHEN LINK IS CLICKED */

    const navItems = navLinks.querySelectorAll("a");

    navItems.forEach(function (link) {

        link.addEventListener("click", function () {

            navLinks.classList.remove("active");
            menuToggle.classList.remove("active");

        });

    });

}

/* =========================================
   SCROLL REVEAL
========================================= */

const revealElements =
    document.querySelectorAll(
        ".section-label, " +
        ".about-content, " +
        ".about-image, " +
        ".member-card, " +
        ".music-player, " +
        ".reel-card, " +
        ".gallery-item, " +
        ".event-card, " +
        ".booking-info, " +
        ".booking-form-wrapper, " +
        ".social-link"
    );


revealElements.forEach(element => {

    element.classList.add(
        "scroll-reveal"
    );

});


const revealObserver =
    new IntersectionObserver(
        (entries, observer) => {

            entries.forEach(entry => {

                if (entry.isIntersecting) {

                    entry.target.classList.add(
                        "revealed"
                    );

                    observer.unobserve(
                        entry.target
                    );

                }

            });

        },
        {
            threshold: 0.12
        }
    );


revealElements.forEach(element => {

    revealObserver.observe(element);

});


/* =========================================
   NAVBAR SCROLL
========================================= */

function updateNavbar() {

    if (!navbar) {
        return;
    }

    if (window.scrollY > 50) {

        navbar.classList.add(
            "scrolled"
        );

    } else {

        navbar.classList.remove(
            "scrolled"
        );

    }

}


window.addEventListener(
    "scroll",
    updateNavbar
);

updateNavbar();



/* =========================================
   EVENT DATE
========================================= */

const eventDate =
    document.getElementById("eventDate");


if (eventDate) {

    const today =
        new Date()
            .toISOString()
            .split("T")[0];

    eventDate.min = today;

}


/* =========================================
   GLOBAL ESCAPE
========================================= */

document.addEventListener(
    "keydown",
    (event) => {

        if (event.key !== "Escape") {
            return;
        }


        if (
            menuToggle &&
            navLinks
        ) {

            menuToggle.classList.remove(
                "active"
            );

            navLinks.classList.remove(
                "active"
            );

        }

    }
);




/* =========================================
   CLIENT REVIEWS
========================================= */

const reviewsMoreBtn =
    document.getElementById("reviewsMoreBtn");

const moreReviews =
    document.getElementById("moreReviews");

if (reviewsMoreBtn && moreReviews) {

    reviewsMoreBtn.addEventListener("click", function () {

        const isOpen =
            moreReviews.classList.contains("show");

        if (!isOpen) {

            moreReviews.classList.add("show");

            reviewsMoreBtn.innerHTML =
                `SHOW LESS <span>↑</span>`;

        } else {

            moreReviews.classList.remove("show");

            reviewsMoreBtn.innerHTML =
                `VIEW MORE REVIEWS <span>↗</span>`;

        }

    });

}