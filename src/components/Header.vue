<template>
    <header class="header">
        <a class="logo__link" href="/">
            <div class="logo">
                <span class="logo__text">Emiloo</span>
            </div>
        </a>
        <nav class="extra__nav">
            <ul>
                <li><a href="https://infoboks.emiloo.no"><img class="infoboks__image" src="/src/assets/boks_cropped.png" alt=""></a></li>
                <li><a href="https://github.com/Emilorv"><img width="2rem" src="https://skillicons.dev/icons?i=github" alt=""></a></li>
                <li><a href="https://linkedin.com/in/emil-orvik-olsson"><img width="2rem" src="https://skillicons.dev/icons?i=linkedin" alt=""></a></li>
            </ul>
        </nav>
    </header>
</template>

<style scoped>

.header{
    height: 5rem;
    padding: 1rem;
}

.logo{
    position: relative;
    border: 2px solid black;
    border-radius: 5px;
    padding: 1rem 0.5rem 0 0.5rem;
    width: fit-content;
    text-decoration: none;
    font-size: 2.5rem;
    overflow: hidden;
    z-index: 2;

    &::before{
        z-index: 0;
        content: '';
        display: inline-block;
        height: 0;
        width: 100%;
        position: absolute;
        bottom: 0;
        left: 0;
        background-color: #FFD400;
        transition: all 0.3s ease;
    }

    &:hover::before{
        height: 100%;
    }
}

.logo__link{
    text-decoration: none;
    color: black;
    font-weight: bold;
}

.logo__text{
    position: relative;
    z-index: 2;
}

.extra__nav{
    position: absolute;
    top: 0.5rem;
    right: 2rem;

    ul{
        display: flex;
        flex-direction: column;
        gap: 1rem;
        list-style: none;
        width: fit-content;

        @media (min-width: 600px) {
            flex-direction: row;
        }
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