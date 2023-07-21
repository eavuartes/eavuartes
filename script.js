
let ubicacionPrincipal  = window.pageYOffset;
window.onscroll = function() {
    let Desplazamiento_Actual = window.pageYOffset;
    if(ubicacionPrincipal >= Desplazamiento_Actual){
        document.getElementById('navbar').style.top = '15px';
    }
    else{
        document.getElementById('navbar').style.top = '-100px';
    }
    ubicacionPrincipal = Desplazamiento_Actual;
}



//The menu js class:
class sikFloatingMenu {
    menuEl = null;
    constructor(_menu) { 
        //The menu element: 
        this.menuEl = typeof _menu === 'string'
                      ? document.querySelector(_menu)
                      : _menu;
        //Attach handlers:
        this.attachHandlers();
    }
    attachHandlers() {
        if (this.menuEl) {
            this._on(this.menuEl, 'click', '.trigger-menu', this._handler.bind(this));
        }
    }
    _open(item) {
        let opened = item.closest('.fmenu').querySelectorAll('.trigger-menu.open');
        for (const ele of opened) {
            this._close(ele);
        }
        item.classList.add('open');
        //expand:
        let list = item.closest('li').querySelector(".floating-menu");
        list.style.setProperty("max-height", this._measureExpandableList(list));
        list.style.setProperty("opacity", "1");
        item.style.setProperty("max-width", this._measureExpandableTrigger(item));
    }
    _close(item) {
        let list = item.closest('li').querySelector(".floating-menu");
        item.classList.remove('open');
        //shrink:
        list.style.removeProperty("max-height");
        list.style.removeProperty("opacity");
        item.style.removeProperty("max-width");
    }
    _measureExpandableList(list) {
        const items = list.querySelectorAll('li');
        return (items.length * this._getHeight(items[0], "outer") + 10) + 'px';
    }
    _measureExpandableTrigger(item) {
        const textEle = item.querySelector('.text');
        const sizeBase = this._getWidth(item, "outer");
        const sizeExpandLabel = this._getWidth(textEle, "outer");
        return (sizeBase + sizeExpandLabel + 6) + 'px';
    }
    _handler(el, ev) {
        if (el.classList.contains('open')) {
            this._close(el);
        } else {
            this._open(el);
        }
    }
    _on(ele, type, selector, handler) {
        ele.addEventListener(type, function(ev) {
            let el = ev.target.closest(selector);
            if (el) handler.call(this, el, ev); //The element is bind to this
        });
    }
    _getWidth(el, type) {
        if (type === 'inner') 
            return el.clientWidth;
        else if (type === 'outer') 
            return el.offsetWidth;
        return 0;
    }
    _getHeight(el, type) {
        if (type === 'inner')
            return el.clientHeight;
        else if (type === 'outer')
            return el.offsetHeight;
        return 0;
    }
}

//Intialize menu: 
window.sik_menu = new sikFloatingMenu("#mymenu");





const quickViewButtons = document.querySelectorAll('[data-quick-view]');
const closeButtons = document.querySelectorAll('[data-close]');
const fullwidthCards = document.querySelectorAll('.fullwidth');
let toggle; // Quick view <button>.
let toggleParent; // <li>.
let fullwidth; // Fullwidth card to be "injected".

const openQuickView = (toggle, toggleParent, fullwidth) => {
    toggle.setAttribute('aria-expanded', 'true');
    toggleParent.classList.toggle('is-selected');
    fullwidth.classList.toggle('is-hidden');
    // Make fullwidth card keyboard focusable. 
    fullwidth.setAttribute('tabIndex', '0');
};

const closeQuickView = (toggle, toggleParent, fullwidth) => {
    toggle.setAttribute('aria-expanded', 'false');
    toggleParent.classList.toggle('is-selected');
    fullwidth.classList.toggle('is-hidden');
    fullwidth.removeAttribute('tabIndex');
};

quickViewButtons.forEach(quickView => {
    // Add appropriate ARIA attributes for "toggle" behaviour.
    fullwidth = quickView.parentElement.nextElementSibling;
    quickView.setAttribute('aria-expanded', 'false');
    quickView.setAttribute('aria-controls', fullwidth.id);

    quickView.addEventListener('click', (e) => {
        toggle = e.target;
        toggleParent = toggle.parentElement;
        fullwidth = toggleParent.nextElementSibling;

        // Open (or close) fullwidth card.
        if (toggle.getAttribute('aria-expanded') === 'false') {
            // Do we have another fullwidth card already open? If so, close it.
            fullwidthCards.forEach(fullwidthOpen => {
                if (!fullwidthOpen.classList.contains('is-hidden')) {
                    toggleParentOpen =
                        fullwidthOpen.previousElementSibling;
                    toggleOpen = toggleParentOpen.querySelector(
                        '[data-quick-view]'
                    );

                    closeQuickView(toggleOpen, toggleParentOpen, fullwidthOpen);
                }
            });

            openQuickView(toggle, toggleParent, fullwidth);
        } else {
            closeQuickView(toggle, toggleParent, fullwidth);
        }
    });
});

closeButtons.forEach(close => {
    close.addEventListener('click', (e) => {
        fullwidth = e.target.parentElement;
        toggleParent = e.target.parentElement.previousElementSibling;
        toggle = toggleParent.querySelector('[data-quick-view]');

        closeQuickView(toggle, toggleParent, fullwidth);
        toggle.focus(); // Return keyboard focus to "toggle" button.
    });
});


feather.replace()
