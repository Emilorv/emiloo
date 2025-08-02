<template>
    <header class="header">
        <a class="logo__link" href="/">
            <div class="logo">
                <span class="logo__text">Emiloo</span>
            </div>
        </a>

        <nav class="nav">
            <a class="nav-link" href="/#prosjekter">Prosjekter</a>
            <a class="nav-link" href="/#ferdigheter">Ferdigheter</a>
            <a class="nav-link" href="/#sidequests">Sidequests</a>
        </nav>

        <nav class="extra__nav">
            <ul>
                <li><a href="https://infoboks.emiloo.no"><img class="infoboks__image" src="/src/assets/boks_cropped.png" alt=""></a></li>
                <li><a href="https://github.com/Emilorv"><img width="2rem" src="https://skillicons.dev/icons?i=github" alt=""></a></li>
                <li><a href="https://linkedin.com/in/emil-orvik-olsson"><img width="2rem" src="https://skillicons.dev/icons?i=linkedin" alt=""></a></li>
            </ul>
        </nav>
    </header>
</template>

<style scoped lang="scss">

.header{
    display: flex;
    flex-direction: row;
    gap: 2rem;
    align-items: center;
    height: 5rem;
    padding: 1rem;
    max-width: 100%;

    @include breakpoint(medium){
        width: 100%;
        max-width: 1440px;
        margin: auto;
        padding: 2rem 2rem;
    }
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
    display: block;
    text-decoration: none;
    color: black;
    font-weight: bold;
    width: fit-content;
}

.logo__text{
    position: relative;
    z-index: 2;
}

.nav{
    display: none;
    flex-direction: row;
    gap: 0.5rem;
    font-size: 1.5rem;

    @include breakpoint(medium){
        display: flex;
    }
    
    a{
        text-decoration: none;
        font-weight: 700;
        color: black;
    }

    
    .nav-link{
        position: relative;
        &::after{
            position: absolute;
            content: '';
            display: block;
            width: 0;
            height: 4px;
            bottom: 2px;
            background: #FFD400;
            transition: all 0.3s ease;
            z-index: -1;
        }
        &:hover{
            &::after{
                width: 100%;
            }
        }
            
    }
}

.extra__nav{
    position: absolute;
    top: 0.5rem;
    right: 0.1rem;

    @include breakpoint(medium){
        top: 1rem;
        right: 2rem;
    }

    ul{
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;
        gap: 1rem;
        list-style: none;
        width: fit-content;

        @include breakpoint(medium){
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