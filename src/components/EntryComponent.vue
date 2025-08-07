<template>
    <div
        :class="['entry-card', `entry-card--${type}`]"
        @click="handleClick"
        :role="type === 'link' ? 'link' : 'button'"
        :tabindex="0"
        @keyup="handleClick"
    >
        <div class="entry-content">
            <img v-if="imgSrc" :src="imgSrc" :alt="title" class="entry-image">
            <span v-else-if="emoji" class="entry-emoji">{{ emoji }}</span>
            <h3 class="entry-title">{{ title }}</h3>
            <p class="entry-description">{{ description }}</p>

            <div class="entry-indicator">
                <span v-if="type === 'modal'" class="indicator-text">Klikk for detaljer</span>
                <span v-else-if="type === 'link'" class="indicator-text">Gå til side →</span>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'EntryComponent',
    props: {
        type: {
            type: String,
            default: 'modal',
            validator: value => ['modal', 'link'].includes(value)
        },
        imgSrc: {
            type: String,
            required: false
        },
        title: {
            type: String,
            required: true
        },
        description: {
            type: String,
            required: true
        },
        link: {
            type: String,
        },
        emoji: {
            type: String,
            required: false
        },
        modalContent: {
            type: String,
            required: false
        }
    },
    methods: {
        handleClick() {
            if (this.type === 'link' && this.link) {
                window.location.href = this.link;
            } else if (this.type === 'modal') {
                this.$emit('open-modal', {
                    title: this.title,
                    description: this.description,
                    content: this.modalContent,
                    imgSrc: this.imgSrc,
                    emoji: this.emoji
                });
            }
        }
    }

}
</script>

<style scoped lang="scss">
.entry-card {
    display: block;
    text-decoration: none;
    border: 2px solid #ddd;
    border-radius: 8px;
    overflow: hidden;
    transition: all 0.3s ease;
    position: relative;
    cursor: pointer;

    &:hover {
        border-color: #FFD400;
        transform: translateY(-2px);
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    }

    &--link::before{
        content: '🔗';
        position: absolute;
        top: 10px;
        right: 10px;
        font-size: 1.2rem;
    }

    &--link {    
        &:hover {
            border-color: #1976D2;
        }

    }
}

.entry-content {
    display: flex;
    flex-direction: column;
    text-align: start;
    padding: 1.5rem;
}

.entry-image {
    width: 100%;
    height: 150px;
    object-fit: contain;
    margin-bottom: 1rem;
}

.entry-emoji{
    display: block;
    font-size: 8rem;
    text-align: center;
}

.entry-title {
    font-size: 1.25rem;
    font-weight: bold;
    margin-bottom: 0.5rem;
    color: #333;
    text-align: center;
}

.entry-description {
    color: #666;
    line-height: 1.5;
    margin-bottom: 1rem;
}

.entry-indicator {
    margin-top: auto;
    text-align: end;
    
    .indicator-text {
        font-size: 0.85rem;
        font-weight: 500;
        opacity: 0.7;
        transition: opacity 0.3s ease;
    }
}

.entry-card:hover .indicator-text {
    opacity: 1;
}
</style>