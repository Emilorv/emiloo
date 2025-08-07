<template>
    <div v-if="isOpen" class="modal-overlay" @click="closeModal">
        <div class="modal-content" @click.stop>
            <button class="modal-close" @click="closeModal">×</button>
            
            <div class="modal-header">
                <img v-if="data.imgSrc" :src="data.imgSrc" :alt="data.title" class="modal-image">
                <span v-else-if="data.emoji" class="modal-emoji">{{ data.emoji }}</span>
                <h2 class="modal-title">{{ data.title }}</h2>
            </div>
            
            <div class="modal-body">
                <p class="modal-description">{{ data.description }}</p>
                <div v-if="data.content" class="modal-extra-content" v-html="data.content"></div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'Modal',
    props: {
        isOpen: {
            type: Boolean,
            default: false
        },
        data: {
            type: Object,
            default: () => ({})
        }
    },
    methods: {
        closeModal() {
            this.$emit('close');
        }
    },
    mounted() {
        // Close modal on Escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && this.isOpen) {
                this.closeModal();
            }
        });
    }
}
</script>

<style scoped lang="scss">
.modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: calc(100% - 2rem);
    height: 100%;
    background: rgba(0, 0, 0, 0.6);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000;
    padding: 1rem;
}

.modal-content {
    background: white;
    border-radius: 16px;
    padding: 2rem;
    max-width: 600px;
    width: 100%;
    max-height: 80vh;
    overflow-y: auto;
    position: relative;
    box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
}

.modal-close {
    position: absolute;
    top: 1rem;
    right: 1rem;
    background: none;
    border: none;
    font-size: 2rem;
    cursor: pointer;
    color: #666;
    transition: color 0.3s ease;
    
    &:hover {
        color: #333;
    }
}

.modal-header {
    text-align: center;
    margin-bottom: 2rem;
}

.modal-image {
    width: 80px;
    height: 80px;
    object-fit: contain;
    border-radius: 12px;
    margin-bottom: 1rem;
}

.modal-emoji {
    font-size: 4rem;
    display: block;
    margin-bottom: 1rem;
}

.modal-title {
    font-size: 2rem;
    font-weight: bold;
    color: #333;
    margin: 0;
}

.modal-body {
    .modal-description {
        font-size: 1.1rem;
        line-height: 1.6;
        color: #555;
        margin-bottom: 1.5rem;
    }
    
    .modal-extra-content {
        font-size: 1rem;
        line-height: 1.6;
        color: #666;
        
        h3 {
            color: #333;
            margin-top: 1.5rem;
            margin-bottom: 0.5rem;
        }
        
        ul {
            padding-left: 1.5rem;
            
            li {
                margin-bottom: 0.5rem;
            }
        }
    }
}
</style>