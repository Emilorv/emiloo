<template>

    <main>
        <h1 hidden>Livskalenderen</h1>
        <section class="content">
            <div v-if="!savedDate" class="birth-inputs">
                <h2>Skriv inn fødselsdato</h2>
                <p>(Dette lagres kun lokalt i din nettleser)</p>
                
                <div class="date-input-container">
                    <label for="birthdate">Fødselsdato:</label>
                    <input 
                        id="birthdate"
                        type="text" 
                        v-model="birthDateInput"
                        placeholder="DD.MM.YYYY"
                        maxlength="10"
                        @input="formatDateInput"
                        @change="parseDateInput"
                        :class="{ 'error': birthDateInput && !isValidDateFormat }"
                    />
                    <small v-if="birthDateInput && !isValidDateFormat" class="error-text">
                        Ugyldig format. Bruk DD.MM.YYYY
                    </small>
                    <button @click="saveDate" :disabled="birthDateInput && !isValidDateFormat">Lagre dato</button>
                </div>
            </div>

            <section v-if="savedDate" class="calendar-display">
                <p>Din fødselsdato: {{ formatBirthDate }}</p>
                <button @click="resetDate">Endre dato</button>

                <p>Antall uker siden fødsel: {{ weeksSinceBirth }}</p>
                <p>Antall uker siden bursdag i fjor: {{ weeksSinceLastBirthday }}</p>
                <p>Bonusuker: {{ bonusWeeks }} </p>

            </section>
            <p>En dott representerer en uke i livet ditt.</p>
            <div v-if="savedDate" class="life-calendar">
                <template v-for="week in 5200" :key="week">
                    <div v-if="week % 52 === 0" class="year-label">{{ Math.floor(week / 52) }}</div>
                    <div
                        v-else-if="week <= weeksSinceBirth" 
                        class="week" 
                        :class="{ 'animate-in': shouldAnimate }"
                        :style="shouldAnimate ? { animationDelay: `${week * 1}ms` } : {}" >
                    </div>
                    <div
                        v-else 
                        class="week-empty" 
                       >
                    </div>
                </template>
            </div>
            <section class="text-section">
               <p>Kalenderen er inspirert av Kurtzgesagts "Calendar of your Life" som igjen er inspirert av 
                <a href="https://waitbutwhy.com/2014/05/life-weeks.html">"Your Life in Weeks" av Tim Urban</a>.</p>
                
                <p></p>

               <iframe class="video-embed" width="420" height="315"
                 src="https://www.youtube.com/embed/JXeJANDKwDc" frameborder="0" allowfullscreen>
                </iframe>
            </section>
        </section>

    </main>

</template>

<script>

    export default {
        name: 'CalendarOfLife',
        data() {
            return {
                savedDate: false,
                birthDateInput: '',
                birthDay: null,
                birthMonth: null,
                birthYear: null,
                shouldAnimate: false,
            }
        },
        computed: {
            currentYear() {
                return new Date().getFullYear();
            },
            isDateComplete() {
                return this.birthDay && this.birthMonth && this.birthYear;
            },
            birthDate() {
                if (!this.isDateComplete) return null;
                return new Date(this.birthYear, this.birthMonth - 1, this.birthDay);
            },
            weeksSinceBirth() {
                if (!this.birthDate) return 0;
                const today = new Date();
                const diffTime = today - this.birthDate;
                const extraTimeDueToLeapYears = Math.floor((today.getFullYear() - this.birthDate.getFullYear())/ 4 *5/7);
                return Math.floor(diffTime / (1000 * 60 * 60 * 24 * 7) - (extraTimeDueToLeapYears || 0));
            },
            bonusWeeks() {
                if (!this.birthDate) return 0;
                const today = new Date();
                const extraTimeDueToLeapYears = Math.floor((today.getFullYear() - this.birthDate.getFullYear())/ 4 *5/7);
                return extraTimeDueToLeapYears;
            },
            lastBirthday() {
                if (!this.birthDate) return null;
                let today = new Date();

                return new Date(this.currentYear - 1, this.birthMonth - 1, this.birthDay);
            },
            weeksSinceLastBirthday() {
                if (!this.lastBirthday) return 0;
                const today = new Date();
                const diffTime = today - this.lastBirthday;
                return Math.floor(diffTime / (1000 * 60 * 60 * 24 * 7));
            },
            isValidDateFormat() {
                const dateRegex = /^\d{2}\.\d{2}\.\d{4}$/;
                return dateRegex.test(this.birthDateInput);
            },
            formatBirthDate() {
                if (!this.birthDate) return '';
                return this.birthDate.toLocaleDateString('nb-NO', {
                    day: 'numeric',
                    month: 'long',
                    year: 'numeric'
                });
            },
        },
        methods: {
            formatDateInput(event) {
                let value = event.target.value.replace(/[^\d]/g, ''); // Remove non-digits
                
                if (value.length >= 3 && value.length <= 4) {
                    value = value.substring(0, 2) + '.' + value.substring(2);
                } else if (value.length >= 5) {
                    value = value.substring(0, 2) + '.' + value.substring(2, 4) + '.' + value.substring(4, 8);
                }
                
                this.birthDateInput = value;
            },
            parseDateInput() {
                if (!this.isValidDateFormat) {
                    this.birthDay = null;
                    this.birthMonth = null;
                    this.birthYear = null;
                    return;
                }
                
                const parts = this.birthDateInput.split('.');
                const day = parseInt(parts[0]);
                const month = parseInt(parts[1]);
                const year = parseInt(parts[2]);
                
                // Validate date values
                const currentYear = new Date().getFullYear();
                if (day >= 1 && day <= 31 && 
                    month >= 1 && month <= 12 && 
                    year >= currentYear - 120 && year <= currentYear) {
                    
                    // Additional validation for valid date
                    const testDate = new Date(year, month - 1, day);
                    if (testDate.getDate() === day && 
                        testDate.getMonth() === month - 1 && 
                        testDate.getFullYear() === year) {
                        
                        this.birthDay = day;
                        this.birthMonth = month;
                        this.birthYear = year;
                        return;
                    }
                }
                this.birthDay = null;
                this.birthMonth = null;
                this.birthYear = null;
            },
            saveDate() {
                if (this.isDateComplete) {
                    this.savedDate = true;
                    localStorage.setItem('birthDateInput', this.birthDateInput);
                    this.shouldAnimate = true;
                } else {
                    alert('Vennligst skriv inn en gyldig fødselsdato.');
                }
            },
            resetDate() {
                this.savedDate = false;
                this.shouldAnimate = false;
                this.birthDateInput = '';
                this.birthDay = null;
                this.birthMonth = null;
                this.birthYear = null;
                localStorage.removeItem('birthDateInput');
            }
        },
        mounted() {
            this.birthDateInput = localStorage.getItem('birthDateInput') || '';
            this.parseDateInput();

            
            if(this.isDateComplete) {
                this.savedDate = true;
                this.shouldAnimate = false;
            } else {
                this.savedDate = false;
            }
        }
    }
</script>

<style scoped lang="scss">
.content {
    max-width: 1440px;
    margin: 0 auto;
    padding: 2rem 0;
}

.birth-inputs {
    position: relative;
    height: calc(100vh - 200px);
    text-align: center;
    
    h2 {
        margin-top: 20vh;
        margin-bottom: 0.5rem;
    }
    
    p {
        color: #666;
        margin-bottom: 2rem;
        font-size: 0.9rem;
    }
    
    .date-input-container {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 1rem;
        
        label {
            font-weight: bold;
            font-size: 1.1rem;
        }
        
        input[type="text"] {
            padding: 1rem;
            border: 2px solid #ddd;
            border-radius: 5px;
            font-size: 1.5rem;
            text-align: center;
            width: 200px;
            letter-spacing: 2px;
            
            &:focus {
                border-color: #FFD400;
                outline: none;
            }
            
            &.error {
                border-color: #ff4444;
            }
            
            &::placeholder {
                color: #aaa;
                letter-spacing: 1px;
            }
        }
        
        .error-text {
            color: #ff4444;
            font-size: 0.85rem;
            margin-top: -0.5rem;
        }
        
        button {
            padding: 1rem 2rem;
            background-color: #FFD400;
            border: none;
            border-radius: 5px;
            cursor: pointer;
            font-size: 1.1rem;
            font-weight: bold;
            transition: all 0.3s ease;
            
            &:hover:not(:disabled) {
                background-color: #e6c000;
                transform: translateY(-2px);
            }
            
            &:disabled {
                background-color: #ccc;
                cursor: not-allowed;
            }
        }
    }
}

.calendar-display {
    text-align: center;
    
    p {
        font-size: 1.2rem;
        margin-bottom: 1rem;
    }
    
    button {
        padding: 0.5rem 1rem;
        background-color: #FFD400;
        border: none;
        border-radius: 5px;
        cursor: pointer;
        
        &:hover {
            background-color: #e6c000;
        }
    }
}

.life-calendar {
    display: grid;
    grid-template-columns: 1fr repeat(51, 1fr);
    justify-items: center;
    align-items: center;
    margin-top: 2rem;
    overflow-x: auto;
    
    @include breakpoint(medium){
        gap: 2px;

    }
}

.year-label {
    font-size: 0.25rem;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: bold;

    @include breakpoint(medium){
        font-size: 1rem;
    }
}

.week, .week-empty {
    width: 5px;
    height: 5px;
    border: 1px solid #ddd;
    border-radius: 16px;
    box-sizing: border-box;

    opacity: 1;
    transform: scale(1);


    @include breakpoint(medium){
        width: 20px;
        height: 20px;
    }
}

.week {
    background-color: #000000;
     &.animate-in {
       background-color: #f0f0f0;
        animation: weekSpawnIn 0.2s ease forwards;
    }
}

.week-empty {
    background-color: #f0f0f0;
}

@keyframes weekSpawnIn {
    0% {
        background-color: #f0f0f0;
    }
    100% {
        background-color: #000000;
    }
}

.text-section{
    margin-top: 2rem;
    font-size: 1.2rem;
}

.video-embed {
    display: block;
    width: 100%;
    height: auto;
    max-width: 1000px;
    margin: 2rem auto;
    border: none;
    aspect-ratio: 16/9;
}
</style>