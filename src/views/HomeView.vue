<script setup>
</script>

<template>
  <main>
      <section class="top-section">
      <h1 class="title">Velkommen til Emiloo.no</h1>
          <img class="image" src="../assets/svg/oter.svg" alt="oter med arbeidshatt">
          <label for="image">Tegning: Emil Orvik Olsson</label>
          <div class="text">
          <p class="bold">Her er det ikke noe innhold enda.</p>
              <br>
            <p>Emil er nok for opptatt med studiet og deltidsjobb, men en gang i fremtiden vil det komme noe kult her!</p>
              <br>
          <p class=""> Hvis du er henvist fra en jobbsøknad anbefaler jeg å sjekke ut lenkene til Github og LinkedIn nedenfor </p>
          </div>
          <div class="arrows">
          <p>|</p>
          <p>V</p>
          </div>
      </section>

      <div class="wave">
          <svg data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
              <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z" class="shape-fill"></path>
          </svg>
      </div>
      <header>
          <nav v-show="false" class="nav">
              <RouterLink class="nav-link" to="cli">Terminal</RouterLink>
          </nav>
      </header>
      <section class="content-container">
              <div class="links">
                  <a href="https://linkedin.com/in/emil-orvik-olsson"><img width="100px" src="https://skillicons.dev/icons?i=linkedin" alt=""></a>
                  <a href="https://github.com/Emilorv"><img width="100px" src="https://skillicons.dev/icons?i=github" alt=""></a>
              </div>
      </section>
  </main>
</template>

<style scoped>
main{
    padding-bottom: 50px;
    min-height: 100vh;
    background-color: rgba(67, 152, 171, 0.49);
}

.top-section{
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background: linear-gradient(180deg, #ffffff 0%, #ffffff 50%);
    position: relative;
    min-height: 50vh;
    padding: 20px;

    p{
    }
}

.title{
    text-align: center;
    font-size: 40px;

    @media (min-width: 600px) {
        font-size: 60px;
    }
}

.image{
    padding: 30px;
    width: 300px;
    
    @media  (min-width: 700px) {
        width: 500px;
    }
}

.text{
    padding: 50px;
    font-size: 30px;
}

.arrows{
    text-align: center;
    font-size: 32px;

    p{
        margin-top: -12px
    }
}

.wave {
    position: relative;
    bottom: 0;
    left: 0;
    width: 100%;
    overflow: hidden;
    line-height: 0;
}

.wave svg {
    position: relative;
    display: block;
    width: calc(100% + 1.3px);
    height: 112px;
    transform: rotateY(180deg);
}

.wave .shape-fill {
    fill: #ffffff;
}

header{
    max-width: 600px;
    display: flex;
    margin: 10px auto 10px auto;
    padding: 10px 0 10px 0;

    .nav {
        list-style: none;
        font-size: 30px;
        padding: 10px 0 10px 0;


        .nav-link{
            padding: 10px;
            color: white;
            text-decoration: none;
            border-radius: 5px;
            &:hover{
                background-color: darkslategray;
            }
        }
    }
    //border-bottom: solid black 3px;
}

.content-container{
    max-width: 600px;
    margin: auto;
}

.links{
    display: flex;
    gap: 30px;
    justify-content: center;
}

</style>
