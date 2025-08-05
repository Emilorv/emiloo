<template>
<div class="piano-page">
    <div class="piano-buttons">
        <template v-for="piece in this.pieces">
            <button class="piano-button" @click="changePiece(piece)">{{ piece.title }}</button>
        </template>
    </div>
    <div v-if="this.currentPiece" class="piano-piece">
        <div class="piano-controls__info">
            <h3>{{ this.currentPiece.title }}</h3>
            <p>Fra: {{ this.currentPiece.origin }}</p>
            <p>Original komponist: {{ this.currentPiece.originalComposer }}</p>
        </div>
        <audio
            class="piano-controls__audio"
            ref="audioPlayer"
            @timeupdate="handleTimeUpdate"
            controls>
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

<style>

.piano-page{
    max-width: 800px;
    margin: auto;
}
.piano-buttons {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
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
    height: 600px;
    overflow: hidden;
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
    position: relative;
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
  transition: opacity 1s ease-in-out;
}

.piano-slide img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
}

.piano-slide.active {
  opacity: 1;
}
</style>