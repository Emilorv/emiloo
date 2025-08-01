<template>

    <main>
        <h1 hidden>Livskalenderen</h1>
        <section>
            <div>
                <label>Day:</label>
                <input type="number" v-model="birthDay" min="1" max="31" />

                <label>Month:</label>
                <select v-model="birthMonth">
                    <option disabled value="">Month</option>
                    <option v-for="(month, index) in months" :key="index" :value="index + 1">
                    {{ month }}
                    </option>
                </select>

                <label>Year:</label>
                <input type="number" v-model="birthYear" min="1900" :max="currentYear" />
            </div>

        </section>

    </main>

</template>

<script>

    export default {
        name: 'CalendarOfLife',
        data() {
            return {
                birthday: null,
            }
        }
    }
</script>