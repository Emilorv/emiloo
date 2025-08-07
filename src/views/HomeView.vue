
<template>
  <main>
      <section class="top-section">
        <h1 hidden class="title">Emiloo</h1>  
        <img class="image" src="/assets/svg/oter.svg" alt="oter med arbeidshatt">
        <div class="introduction">
            <p class="introduction__bigger"> Hei! Jeg er Emil.</p>
            <br>
            <p>Jeg er dataingeniør med spesialisering i programvaresystemer.</p>
            <br>
            <p>Ved siden av studiene har jeg hatt fartstid som webutvikler.</p>
            <br>
            <p>Jeg synes teknologi er spennende, men aller best liker jeg å samarbeide med andre for å løse problemer.</p>
        </div>
      </section>

      <section id="prosjekter" class="projects section">
        <h2 class="projects-title title" data-scroll-bar>Prosjekter</h2>
        <p class="section__description">Dette er prosjektene jeg er stoltest av.</p>
        <div class="projects-grid">
          <EntryComponent
            v-for="project in projects"
            :key="project.id"
            type="modal"
            :title="project.title"
            :description="project.description"
            :img-src="project.imgSrc"
            :emoji="project.emoji"
            :modal-content="project.content"
            @open-modal="openModal"
          />
        </div>
      </section>

      <section id="ferdigheter" class="skills section">
        <h2 class="skills-title title" data-scroll-bar>Dette har jeg vært borti</h2>
        <p class="section__description">Dette er noen av ferdighetene jeg har tilegnet meg
          gjennom jobb, studie, verv og egne prosjekter.</p>
        <div class="skills-grid">
            <EntryComponent
              v-for="skill in skills"
              :key="skill.id"
              type="modal"
              :title="skill.title"
              :description="skill.description"
              :img-src="skill.imgSrc"
              :emoji="skill.emoji"
              :modal-content="skill.content"
              @open-modal="openModal"
            />
        </div>
      </section>

      <section id="sidequests" class="side-quests section">
        <h2 class="side-quests-title title" data-scroll-bar>Sidequests</h2>
        <p class="section__description">Denne seksjonen er kanskje mer for meg enn for dere, men jeg legger det ved i tilfelle dere er nysgjerrige og vil bli bedre kjent.</p>
        <div class="side-quests-grid">
          <EntryComponent
            v-for="quest in sideQuests"
            :key="quest.id"
            type="link"
            :title="quest.title"
            :description="quest.description"
            :img-src="quest.imgSrc"
            :emoji="quest.emoji"
            :link="quest.link"
          />
        </div>
      </section>
      <Modal 
        :is-open="modalOpen" 
        :data="modalData" 
        @close="closeModal" 
      />
  </main>
</template>

<script setup>
import { ref } from 'vue'
import EntryComponent from '../components/EntryComponent.vue'
import Modal from '../components/Modal.vue'
import { projects, sideQuests } from '../data/projects.js'
import { skills } from '../data/skills.js'

const modalOpen = ref(false)
const modalData = ref({})

const openModal = (data) => {
    modalData.value = data
    modalOpen.value = true
}

const closeModal = () => {
    modalOpen.value = false
    modalData.value = {}
}
</script>

<style scoped lang="scss">

.title{
    position: relative;
    font-size: 40px;
    width: fit-content;
    margin-bottom: 1rem;
    
    @include breakpoint(medium){
        font-size: 60px;
    }
}

.image{
    display: block;
    margin: auto;
    width: 300px;
}

.introduction {
    padding: 4rem 0;
    margin: auto;
    width: 100%;
    max-width: 800px;

    font-size: 2rem;
    &__bigger{
        
        font-size: 3rem;
    }
}

.section{
    max-width: 1440px;
    margin: auto;
    padding: 2rem 1rem;
}

.section__description {
    margin-bottom: 2rem;
    font-size: 1.2rem;
    color: #555;
}

.projects-grid,
.skills-grid,
.side-quests-grid {
    display: grid;
    grid-template-columns: 1fr;
    gap: 2rem;
    margin-top: 2rem;

    @include breakpoint(medium) {
        grid-template-columns: repeat(2, 1fr);
    }

    @include breakpoint(large) {
        grid-template-columns: repeat(3, 1fr);
    }
}

</style>
<script>
import ScrollingBars from '../scripts/scrolling-bars.js'
const scrollBars = new ScrollingBars();
scrollBars.init();

export default {
  mounted() {
    scrollBars.init();

  }
}
</script>