class Moving_Elements {
    // base
    constructor(body_element, id_prefix = "") {
        this.body = body_element;
        this.id_prefix = id_prefix.toString();
        this.els = []; // id name only
    }
    get_id(id) {
        return this.id_prefix + id;
    }
    add_element(id) {
        if (this.els.indexOf(id) != (-1)) {
            return ;
        }
        let nid = this.get_id(id);
        let el = document.createElement('div');
        el.id = nid;
        this.body.appendChild(el);
        this.els.push(id);
        return this.get(id);
    }
    get(id) {
        if (this.els.indexOf(id) == (-1)) {
            console.log(this.els)
            return (void 0);
        }
        return document.getElementById(this.get_id(id));
    }
    remove(id) {
        this.get(id).remove();
    }

    // basic
    set_height(id, height) {
        if (this.els.indexOf(id) == (-1)) {
            return ;
        }
        if (parseInt(height) == height) { // there isn't `px`
            height += "px";
        }
        this.get(id).style.height = height;
    }
    set_width(id, width) {
        if (this.els.indexOf(id) == (-1)) {
            return ;
        }
        if (parseInt(width) == width) { // there isn't `px`
            width += "px";
        }
        this.get(id).style.width = width;
    }
    set_area(id, width, height) {
        this.set_width(id, width);
        this.set_height(id, height);
    }
    set_color(id, color) {
        if (this.els.indexOf(id) == (-1)) {
            return ;
        }
        let el = this.get(id);
        el.style.backgroundColor = color;
    }
    // shape
    create_square(id) {
        return this.add_element(id);
    }
    create_circle(id) {
        let el = this.add_element(id);
        el.style.borderRadius = '50%';
        return el;
    }
    // position
    getAbsolutePosition(element) {
        const rect = element.getBoundingClientRect();
        return {
            x: rect.left + window.pageXOffset,
            y: rect.top  + window.pageYOffset
        };
    }
    get_position(id) {
        if (this.els.indexOf(id) == (-1)) {
            return ;
        }
        let el = this.get(id);
        return this.getAbsolutePosition(el);
    }
    set_position(id, position) {
        /**
         * position: {x: 0, y: 0}
         */
        let el = this.get(id);
        el.style.position = 'absolute';
        el.style.left = position.x + 'px';
        el.style.top  = position.y + 'px';
    }
    // event
    bind_event(id, event, handler) {
        let el = this.get(id);
        if (el) el.addEventListener(event, handler);
    }
    set_event_mousemove(func) {
        document.addEventListener('mousemove', (e) => {
            func(e);
        });
    }
}