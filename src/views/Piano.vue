<template>
<main class="piano-page">
    <div class="piano-buttons">
        <template v-for="piece in this.pieces">
            <button class="piano-button" @click="changePiece(piece)">{{ piece.title }}</button>
        </template>
    </div>
    <div class="piano-page__content">
        <div class="piano-controls">
            <div v-if="this.currentPiece" class="piano-piece">
                <div class="piano-controls__info">
                    <h3>{{ this.currentPiece.title }}</h3>
                    <p>Fra: {{ this.currentPiece.origin }}</p>
                    <p>Original komponist: {{ this.currentPiece.originalComposer }}</p>
                </div>
                <audio v-if="this.currentPiece.audioFile"
                    class="piano-controls__audio"
                    ref="audioPlayer"
                    @timeupdate="handleTimeUpdate"
                    controls
                    :key="this.currentPiece.audioFile"
                    >
                    <source :src="this.currentPiece.audioFile" type="audio/mp3">
                    Your browser does not support the audio element.
                </audio>
                <div class="piano-slides">
                    <div 
                        v-for="(slide, index) in this.currentPiece.slides" 
                        class="piano-slide"
                        :class="{ active: currentSlideIndex === index }"
                    >
                        <img :src="slide.image" :alt="`Slide at ${slide.timestamp} seconds`">
                    </div>
                </div>
            </div>
        </div>
    </div>
</main>
</template>

<script>
import { pianoPieces } from '@/data/piano.js';

export default {
    data() {
        return {
            pieces: pianoPieces,
            currentPiece: null,
            currentTimestamp: 0,
            currentSlideIndex: -1
        }
    },
    methods: {
        changePiece(piece){
            this.currentPiece = piece;
            this.currentTimestamp = 0;
            this.currentSlideIndex = -1; 
        },

        handleTimeUpdate() {
            this.currentTime = this.$refs.audioPlayer.currentTime
            this.updateSlide()
        },

        handleAudioEnded() {
            this.currentTime = 0
            this.currentSlideIndex = -1
        },

        updateSlide() {
            let slideIndex = -1;
            for (let i = this.currentPiece.slides.length - 1; i >= 0; i--) {
                if (this.currentTime >= this.currentPiece.slides[i].timestamp) {
                    if (slideIndex !== i) {
                        slideIndex = i;
                    }
                    break;
                }
            }
            this.currentSlideIndex = slideIndex;
        },
    },
    mounted(){
        this.currentPiece = this.pieces[0];
        console.log(this.currentPiece);
    }
}
</script>

<style scoped lang="scss">
.piano-page{
    position: relative;
}

.piano-page__content{
    max-width: 800px;
    padding-top: 1rem;
    margin: auto;
}

.piano-controls{
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    padding: 1rem;
    background-color: rgba(255, 255, 255, 0.8);
    border-radius: 8px;
}

.piano-buttons {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    max-width: 800px;
    margin: auto;
    gap: 1rem;
}

.piano-button {
    margin: 5px;
    padding: 10px 20px;
    font-size: 16px;
    cursor: pointer;
}

.piano-piece {
    display: flex;
    flex-direction: column;
    margin-top: 20px;
    gap: 1rem;
}

.piano-controls__info {
    display: flex;
    gap: 1rem;
    align-items: center;
    flex-shrink: 0;
}

.piano-controls__audio{
    width: 100%;
    margin-top: 10px;
    flex-shrink: 0;
}

.piano-slides {
    display: block;
    flex: 1;
}

.piano-slide {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  opacity: 0;
  z-index: -1;
  transition: opacity 1s ease-in-out;
  image-rendering: pixelated;
}

.piano-slide img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    user-select: none;
    -webkit-user-drag: none; /* Chrome/Safari */
    -webkit-user-select: none; /* Safari */
    -moz-user-select: none; /* Firefox */
    -ms-user-select: none; /* IE/Edge */
    display: block;
}

.piano-slide.active {
  opacity: 1;
}
</style>