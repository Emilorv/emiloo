<script setup>
</script>

<template>
  <main>
      <section class="top-section">
      <h1 class="title">Velkommen til Emiloo.no</h1>

      </section>

      <div class="wave">
          <svg data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
              <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z" class="shape-fill"></path>
          </svg>
      </div>
      <header>
          <nav class="nav">
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
    height: 100vh;
    background-color: #56423E;
}

.top-section{
    display: flex;
    flex-direction: column;
    justify-content: center;
    background: linear-gradient(180deg, #ffcdb6 0%, #BEA6A1 50%);
    position: relative;
    height: 50vh;
}

.title{
    text-align: center;
    font-size: 40px;

    @media (min-width: 600px) {
        font-size: 60px;
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
    fill: #BEA6A1  ;
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
    border-bottom: solid black 3px;
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
