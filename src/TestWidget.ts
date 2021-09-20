import { Widget } from "@lumino/widgets";

class TestWidget extends Widget {
    constructor() {
        super();
        this.addClass('test-view');
        this.id = 'simple-widget-test';
        this.title.label = 'Widget Test View';
        this.title.closable = true;
    }
}

export default TestWidget;