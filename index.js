document.addEventListener('DOMContentLoaded', async() => {
    const footer = document.querySelector('footer');
    const main = document.querySelector('main');


    const json = await fetch('/data.json');
    const data = await json.json();

    const filters = document.querySelectorAll('.card__time-item');

    const elems = data.map((item) => {

        const { title, timeframes } = item;
        
        const section = document.createElement('section');
        section.classList.add('activity');
        section.setAttribute('data-activity', title.toLowerCase().replace(' ', '-'));

        const activities = Object.keys(timeframes).map((key, i) => {
            const classes = i === 1 ? 'activity__spent activity__spent_visible' : 'activity__spent';
            const prefix = key === 'daily' ? 'Yesterday' : key === 'monthly' ? 'Last Month' : 'Last Week';
            const current = timeframes[key].current === 1 ? '1hr' : timeframes[key].current + 'hrs';
            const previous = timeframes[key].previous === 1 ? '1hr' : timeframes[key].previous + 'hrs';
            return (
                `<div data-time="${key}" class="${classes}">
                    <p class="activity__current">${current}</p>
                    <p class="activity__previous">${prefix} - ${previous}</p>
                </div>`
            );
        });

        const inner = 
        `<div class="activity__inner">
            <div class="activity__details-trigger"></div>
            <h2 class="activity__description">${title}</h2>
            ${activities.join('')}
        </div>
        `;

        section.innerHTML = inner;
        return section;
    });

    document.querySelector('main').append(...elems);


    filters.forEach(filter => {
        
        filter.addEventListener('click', (e)=>{ 
            const activities = document.querySelectorAll('.activity__spent');
            const attribute = filter.getAttribute('data-time');
            activities.forEach(activity => {
                if(activity.getAttribute('data-time') === attribute) {
                   activity.classList.add('activity__spent_visible'); 
                } else {
                    activity.classList.remove('activity__spent_visible'); 
                }
            });
            filters.forEach(filter => {
                if(filter === e.target){
                    filter.classList.add('card__time-item_chosen');
                } else {
                    filter.classList.remove('card__time-item_chosen');
                }
            })
        }); 
    });

    if (window.scrollY + window.innerHeight > main.scrollHeight + main.offsetTop) {
        footer.classList.replace('footer_hidden', 'footer_shown');
    } else {
        footer.classList.replace('footer_shown', 'footer_hidden');
    }

    window.addEventListener('resize', (e) => {
        if (window.scrollY + window.innerHeight > main.scrollHeight + main.offsetTop) {
            footer.classList.replace('footer_hidden', 'footer_shown');
        } else {
            footer.classList.replace('footer_shown', 'footer_hidden');
        }
    });

    document.addEventListener('scroll', (e) => {
        if (window.scrollY + window.innerHeight > main.scrollHeight + main.offsetTop) {
            footer.classList.replace('footer_hidden', 'footer_shown');
        } else {
            footer.classList.replace('footer_shown', 'footer_hidden');
        }
    });
})