
<template>
  <main>
      <section class="top-section">
        <h1 hidden class="title">Emiloo</h1>  
        <img class="image" src="../assets/svg/oter.svg" alt="oter med arbeidshatt">
        <div class="introduction">
            <p class="introduction__bigger"> Hei! Jeg er Emil.</p>
            <br>
            <p>Jeg er dataingeniør med spesialisering i programvaresystemer.</p>
            <br>
            <p>I tillegg har jeg praktisk erfaring som webutvikler.</p>
        </div>
      </section>

      <section class="projects section">
        <h2 class="projects-title title">Prosjekter</h2>
        <div class="projects-grid">
          <EntryComponent
            v-for="project in projects"
            :key="project.id"
            :title="project.title"
            :description="project.description"
            :img-src="project.imgSrc"
            :emoji="project.emoji"
            :link="project.link"
          />
        </div>
      </section>

      <section class="skills section">
        <h2 class="skills-title title">Dette har jeg vært borti</h2>
        <div>

        </div>
      </section>

      <section class="side-quests section">
        <h2 class="side-quests-title title">Sidequests</h2>
        <div class="side-quests-grid">
          <EntryComponent
            v-for="quest in sideQuests"
            :key="quest.id"
            :title="quest.title"
            :description="quest.description"
            :img-src="quest.imgSrc"
            :emoji="quest.emoji"
            :link="quest.link"
          />
        </div>
      </section>
  </main>
</template>

<script setup>
import EntryComponent from '../components/EntryComponent.vue'
import { projects, sideQuests } from '../data/projects.js'
</script>

<style scoped lang="scss">

.title{
    position: relative;
    font-size: 40px;
    width: fit-content;
    
    @include breakpoint(medium){
        font-size: 60px;
    }

    &::after{
        content: '';
        position: absolute;
        bottom: 0.5rem;
        border-radius: 4px;
        display:block;
        width: 100%;
        height: 0.5rem;
        z-index: -1;
        background-color: #FFD400;
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

.projects-grid,
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
<script setup>
</script>