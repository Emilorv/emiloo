<template>
    <a :href="link" class="entry-card">
        <div class="entry-content">
            <img v-if="imgSrc" :src="imgSrc" :alt="title" class="entry-image">
            <span v-else-if="emoji" class="entry-emoji">{{ emoji }}</span>
            <h3 class="entry-title">{{ title }}</h3>
            <p class="entry-description">{{ description }}</p>
        </div>
    </a>
</template>

<script>
export default {
    name: 'EntryComponent',
    props: {
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
            required: true
        },
        emoji: {
            type: String,
            required: false
        },
    }
}
</script>

<style scoped lang="scss">
.entry-card {
    display: block;
    text-decoration: none;
    color: inherit;
    border: 2px solid #ddd;
    border-radius: 8px;
    overflow: hidden;
    transition: all 0.3s ease;

    &:hover {
        border-color: #FFD400;
        transform: translateY(-2px);
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    }
}

.entry-content {
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
}

.entry-description {
    color: #666;
    line-height: 1.5;
}
</style>