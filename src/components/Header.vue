<template>
    <header class="header">
        <nav class="nav">
            <ul>
                <li><a href="https://infoboks.emiloo.no"><img class="infoboks__image" src="/src/assets/boks_cropped.png" alt=""></a></li>
                <li><a href="https://github.com/Emilorv"><img width="2rem" src="https://skillicons.dev/icons?i=github" alt=""></a></li>
                <li><a href="https://linkedin.com/in/emil-orvik-olsson"><img width="2rem" src="https://skillicons.dev/icons?i=linkedin" alt=""></a></li>
            </ul>
        </nav>
    </header>
</template>

<style scoped>

.nav{
    ul{
        display: flex;
        flex-direction: row;
        gap: 1rem;
        list-style: none;
        width: fit-content;
        margin: 0.5rem 2rem 0 auto;
    }

    img{
        height: 2rem;
        width: 2rem;
        object-fit: contain;
    }
    .infoboks__image{
        width: 3rem;
        object-fit: contain;
    }
}

</style>