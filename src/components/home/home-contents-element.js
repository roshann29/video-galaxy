import { LitElement, html, css } from "lit-element";
import { singletonManager } from "singleton-manager";

import VideoGridElement from "../app/video-grid-element";
import { OBJECT_KEYS, DEFAULT_CONTENTS_PARAMS } from "../../data/config";


export default class HomeContentsElement extends LitElement {

    #recommendedData;
    #ytApi;

    constructor() {
        super();
        this.#ytApi = singletonManager.get(OBJECT_KEYS.Youtube_Data_Api);
    }

    static get properties() { 
        return { 
            data: { type: Object }
        };
    }

    static get styles() {
        return css`
            :host {
                display: block;
            }
        `;
    } 


    async connectedCallback() {
        this.#recommendedData = await this.#ytApi.loadContents(DEFAULT_CONTENTS_PARAMS.home);
        super.connectedCallback();
    }

    render() {
        console.log('render home...', this.#recommendedData);
        return html`<video-grid-element snippet='${JSON.stringify(this.#recommendedData)}' heading='Pick for you'></video-grid-element>`;
    }
}
customElements.define('home-contents-element', HomeContentsElement);