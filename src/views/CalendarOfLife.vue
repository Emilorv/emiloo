<template>

    <main>
        <h1 hidden>Livskalenderen</h1>
        <section class="content">
            <div v-if="!savedDate" class="birth-inputs">
                <h2>Skriv inn fødselsdato</h2>
                <p>(Dette lagres kun lokalt i din nettleser)</p>
                
                <div class="date-inputs">
                    <div class="input-group">
                        <label for="day">Dag:</label>
                        <input 
                            id="day"
                            type="number" 
                            v-model.number="birthDay" 
                            min="1" 
                            max="31" 
                            placeholder="DD"
                        />
                    </div>
                    
                    <div class="input-group">
                        <label for="month">Måned:</label>
                        <select id="month" v-model.number="birthMonth">
                            <option value="">Velg måned</option>
                            <option v-for="(month, index) in months" :key="index" :value="index + 1">
                                {{ month }}
                            </option>
                        </select>
                    </div>
                    
                    <div class="input-group">
                        <label for="year">År:</label>
                        <input 
                            id="year"
                            type="number" 
                            v-model.number="birthYear" 
                            :min="currentYear - 120" 
                            :max="currentYear"
                            placeholder="YYYY"
                        />
                    </div>
                    <button @click="saveDate">Lagre dato</button>
                </div>
            </div>

            <div v-if="savedDate" class="calendar-display">
                <p>Din fødselsdato: {{ formatBirthDate }}</p>
                <button @click="resetDate">Endre dato</button>

                <p>Antall uker siden fødsel: {{ weeksSinceBirth }}</p>
                <p>Antall uker siden bursdag i fjor: {{ weeksSinceLastBirthday }}</p>

                <div class="life-calendar">
                    <template v-for="week in 5200" :key="week">
                        <div v-if="week % 52 === 0" class="year-label">{{ Math.floor(week / 52) }}</div>
                        <div v-else-if="week <= weeksSinceBirth" class="week"></div>
                        <div v-else class="week-empty"></div>
                    </template>
                </div>
            </div>

        </section>

    </main>

</template>

<script>

    export default {
        name: 'CalendarOfLife',
        data() {
            return {
                savedDate: false,
                birthDay: null,
                birthMonth: null,
                birthYear: null,
            }
        },
        computed: {
            currentYear() {
                return new Date().getFullYear();
            },
            months() {
                return [
                    'Januar', 'Februar', 'Mars', 'April', 'Mai', 'Juni',
                    'Juli', 'August', 'September', 'Oktober', 'November', 'Desember'
                ];
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
                return Math.floor(diffTime / (1000 * 60 * 60 * 24 * 7));
            },
            formatBirthDate() {
                if (!this.birthDate) return '';
                return this.birthDate.toLocaleDateString('nb-NO', {
                    day: 'numeric',
                    month: 'long',
                    year: 'numeric'
                });
            },
            lastBirthday() {
                if (!this.birthDate) return null;
                return new Date(this.currentYear - 1, this.birthMonth - 1, this.birthDay);
            },
            weeksSinceLastBirthday() {
                if (!this.lastBirthday) return 0;
                const today = new Date();
                const diffTime = today - this.lastBirthday;
                return Math.floor(diffTime / (1000 * 60 * 60 * 24 * 7));
            }
        },
        methods: {
            saveDate() {
                if (this.isDateComplete) {
                    this.savedDate = true;
                    localStorage.setItem('birthDay', this.birthDay);
                    localStorage.setItem('birthMonth', this.birthMonth);
                    localStorage.setItem('birthYear', this.birthYear);
                } else {
                    alert('Vennligst fyll ut alle feltene.');
                }
            },
            resetDate() {
                this.savedDate = false;
                this.birthDay = null;
                this.birthMonth = null;
                this.birthYear = null;
                localStorage.removeItem('birthDay');
                localStorage.removeItem('birthMonth');
                localStorage.removeItem('birthYear');
            }
        },
        mounted() {
            this.birthDay = parseInt(localStorage.getItem('birthDay')) || null;
            this.birthMonth = parseInt(localStorage.getItem('birthMonth')) || null;
            this.birthYear = parseInt(localStorage.getItem('birthYear')) || null;
            if(this.isDateComplete) {
                this.savedDate = true;
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
    padding: 2rem;
}

.birth-inputs {
    text-align: center;
    
    h2 {
        margin-bottom: 0.5rem;
    }
    
    p {
        color: #666;
        margin-bottom: 2rem;
        font-size: 0.9rem;
    }
    
    .date-inputs {
        display: flex;
        gap: 1rem;
        justify-content: center;
        flex-wrap: wrap;
        
        @include breakpoint(medium) {
            flex-wrap: nowrap;
        }
    }
    
    .input-group {
        display: flex;
        flex-direction: column;
        min-width: 120px;
        
        label {
            margin-bottom: 0.5rem;
            font-weight: bold;
            font-size: 0.9rem;
        }
        
        input, select {
            padding: 0.75rem;
            border: 2px solid #ddd;
            border-radius: 5px;
            font-size: 1rem;
            text-align: center;
            
            &:focus {
                border-color: #FFD400;
                outline: none;
            }
        }
        
        input[type="number"] {
            appearance: textfield;
            -moz-appearance: textfield;
            
            &::-webkit-outer-spin-button,
            &::-webkit-inner-spin-button {
                -webkit-appearance: none;
                margin: 0;
            }
        }
        
        select {
            cursor: pointer;
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
    margin-top: 2rem;
    overflow-x: auto;
    
    @include breakpoint(medium){
        gap: 2px;

    }
}

.year-label {
    font-size: 1rem;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: bold;
}

.week, .week-empty {
    width: 10px;
    height: 10px;

    @include breakpoint(medium){
        width: 20px;
        height: 20px;
    }
    border: 1px solid #ddd;
    border-radius: 16px;
    box-sizing: border-box;
}

.week {
    background-color: #000000;
}

.week-empty {
    background-color: #f0f0f0;
}
</style>