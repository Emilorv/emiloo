<template>
    <div class="cli-terminal">
      <div class="output">
        <div v-for="(line, index) in output" :key="index">
          <div v-if="line.type === 'command'"><span class="prompt">$</span> {{ line.text }}</div>
          <div v-else class="output-result ">
            <p class="typewriter">{{ line.text }}</p>
          </div>
        </div>
      </div>
      <div class="input">
        <span class="prompt">$</span>
        <input v-model="currentInput" @keydown.enter="handleCommand"/>
      </div>
    </div>
</template>
<script>
import commandHandler from '../scripts/commandHandler.js'

export default {
  data() {
    return {
      currentInput: '',
      output: [],
      commandHandler: new commandHandler(),
    };
  },
  methods: {
    handleCommand() {
      const command = this.currentInput.trim();
      this.currentInput = '';
      this.processCommand(command);
    },
    processCommand(input) {
      const [command, ...args] = input.split(' ');
      const result = this.commandHandler.execute(input, args);
      this.output.push({type: 'command', text: input});
      if (result && result.clear) {
        this.output = [];
      } else if (result.disco) {
        this.discoCSS()
      } else {
        this.output.push({type: 'response', text: result});
      }
    },
    welcomeMessage() {
      console.log("hello")
      let message = "Velkommen! Skriv 'help' for å få opp kommandoer."
      this.output.push({type: 'response', text: message})
    },
    discoCSS() {
      let elements = document.getElementsByClassName("cli-terminal");
      elements[0].classList.toggle("disco");

    }
  },
  mounted() {
    setTimeout(() => {
      this.welcomeMessage();
    }, 1000);
  }
};
</script>

<style scoped>

.cli-terminal {
  font-family: monospace;
  background-color: #000;
  color: #fff;
  border-radius: 10px;
  border: white solid 2px;
  height: 100%;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  width: 80%;
  max-width: 1000px;
  margin: auto;
}

.output {
  white-space: pre-wrap;
  overflow-wrap: break-word;
  overflow-y: auto;
  flex-grow: 1;
  padding: 10px;
}

.input {
  display: flex;
  align-items: center;
  padding-left: 10px;
  padding-bottom: 5px;
  padding-top: 5px;
  background-color: rgba(232, 224, 224, 0.07);
  width: 100%;
}

.prompt {
  margin-right: 5px;
  color: yellow;
}

input {
  background: none;
  border: none;
  color: #fff;
  flex: 1;
  outline: none;
}

.output-result {
  color: rgba(239, 237, 237, 0.99);
  width: 100%;
}


.typewriter {
  overflow: hidden;
  overflow-wrap: anywhere;
  border-right: .15em solid transparent; /* The typwriter cursor */
  white-space: nowrap; /* Keeps the content on a single line */
  letter-spacing: .10em; /* Adjust as needed */
  animation: typing 2s steps(144, end),
  blink-caret 0.75s step-start 5;
  width: 100%;

}

.disco {
  animation: disco 5s infinite;
}

@keyframes disco {
  0% {
    background-color: red
  }
  25% {
    background-color: yellow
  }
  50% {
    background-color: blue
  }
  75% {
    background-color: green
  }
  100% {
    background-color: red
  }
}


/* The typing effect */
@keyframes typing {
  0% {
    width: 0
  }
  100% {
    width: 100%
  }
}

/* The typewriter cursor effect */
@keyframes blink-caret {
  from, to {
    border-color: transparent
  }
  50% {
    border-color: white;
  }
}
</style>