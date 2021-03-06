/*
 * Copyright 2019, GeoSolutions Sas.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import ReactDOM from 'react-dom';
import expect from 'expect';
import Builder from '../Builder';
import STORY from 'json-loader!../../../../test-resources/geostory/sampleStory_1.json';

describe('Builder component', () => {
    beforeEach((done) => {
        document.body.innerHTML = '<div id="container"></div>';
        setTimeout(done);
    });
    afterEach((done) => {
        ReactDOM.unmountComponentAtNode(document.getElementById("container"));
        document.body.innerHTML = '';
        setTimeout(done);
    });
    it('Builder rendering with defaults', () => {
        ReactDOM.render(<Builder />, document.getElementById("container"));
        const container = document.getElementById('container');
        const el = container.querySelector('.ms-geostory-builder');
        expect(el).toExist();
        expect(el.querySelectorAll('button').length).toBe(4);
    });
    it('Builder rendering with sections', () => {
        ReactDOM.render(<Builder story={STORY} />, document.getElementById("container"));
        const container = document.getElementById('container');
        const el = container.querySelector('.ms-geostory-builder');
        expect(el).toExist();
        expect(el.querySelector('.mapstore-side-preview')).toExist();
        expect(el.querySelectorAll('.ms-section-preview-icon').length).toBe(5); // 3 sections + 2 columns with preview enabled

    });
    it('Builder rendering with sections, preview disabled', () => {
        ReactDOM.render(<Builder story={STORY} cardPreviewEnabled={false}/>, document.getElementById("container"));
        const container = document.getElementById('container');
        const el = container.querySelector('.msSideGrid');
        expect(el).toExist();
        expect(el.querySelector('.mapstore-side-preview')).toExist();
        expect(el.querySelectorAll('.ms-section-preview-icon').length).toBe(0); // 3 sections + 2 columns with preview disabled
    });
});
