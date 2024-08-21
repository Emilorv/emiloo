<template>
    <div class="terminal-page">
        <RouterLink to="/" class="back"><</RouterLink>
      <CliTerminal class="terminal"></CliTerminal>
    </div>
</template>

<script>
import CliTerminal from "@/components/CliTerminal.vue";

export default {
    name: "TerminalView",
    components: {CliTerminal}
}
</script>
<style scoped>
.terminal-page{
    height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    background: rgb(255,255,255);
    background: radial-gradient(circle, rgba(255,255,255,1) 0%, rgba(101,101,101,1) 27%, rgba(0,0,0,1) 39%);
}

.terminal{
    height: 50vh;
}
.back{
    left: 20px;
    top: 20px;
    position: absolute;
    color: white;
    font-size: 60px;
    text-decoration: none;
}
</style>