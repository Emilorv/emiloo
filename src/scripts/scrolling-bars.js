

export default class ScrollingBars {
    constructor() {
        this.titles = [];
        this.init();
    }

    init() {
        this.titles = document.querySelectorAll('[data-scroll-bar]');
        
        if (this.titles.length === 0) return;
    
        this.handleScroll = this.handleScroll.bind(this);
        window.addEventListener('scroll', this.handleScroll);
        
        this.handleScroll();
    }

    handleScroll() {
        const viewportHeight = window.innerHeight;

        const barStart = viewportHeight * 2 / 6;
        const bartStop = viewportHeight * 5 / 6;

        console.log('barStart:', barStart, 'bartStop:', bartStop);

        this.titles.forEach(title => {
            const rect = title.getBoundingClientRect();
            const titleCenter = rect.top + (rect.height / 2);
            
            let progress = 0;
            if (titleCenter >= barStart && titleCenter <= bartStop) {
                const animationRange = bartStop - barStart;
                let currentPosition = bartStop - titleCenter;
                progress = currentPosition / animationRange;
                progress = Math.max(0, Math.min(1, progress));
            } else if (titleCenter < barStart) {
                progress = 1;
            } else{
                progress = 0;
            }
            const widthPercentage = progress * 100;
            title.style.setProperty('--scroll-bar-width', `${widthPercentage}%`);
        });
    }

    destroy() {
        window.removeEventListener('scroll', this.handleScroll);
    }
}