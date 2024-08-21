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
      <section class="content-section">

          <div class="glow-effect"></div>
          <div class="card">
              <h1>Welcome to a Cozy Corner</h1>
              <p>This is a cozy, warm spot on the web.</p>
          </div>
          <a href="/cli">terminal</a>

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

.content-section{
    display: flex;
    align-items: center;
    justify-content: center;
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


.glow-effect {
    background: radial-gradient(circle at top left, rgba(255, 200, 150, 0.5), transparent);
    position: absolute;
    top: 0;
    left: 0;
    width: 300px;
    height: 300px;
    z-index: -1;
}

.card {
    background-color: #fff;
    padding: 20px;
    border-radius: 10px;
    box-shadow: 0 10px 15px rgba(0, 0, 0, 0.1), 0 4px 6px rgba(0, 0, 0, 0.05);
    transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.card:hover {
    transform: translateY(-5px);
    box-shadow: 0 15px 25px rgba(0, 0, 0, 0.2), 0 6px 10px rgba(0, 0, 0, 0.1);
}
</style>
