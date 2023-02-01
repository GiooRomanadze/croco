import { css, html, LitElement } from "lit";
import {
  getCategoriesApi,
  getProviderGamesApi,
  getProvidersApi,
} from "./api.js";

import "./components/app-navbar.js";
import "./components/app-filter.js";
import "./components/app-list.js";

export class appMain extends LitElement {
  static get is() {
    return "app-main";
  }

  static get styles() {
    return css`
      :host {
        display: grid;
        grid-template-columns: min-content 1fr;
        min-width: 100vw;
        min-height: 100vh;
        background-color: #1a1e23;
      }

      .container {
        display: flex;
        flex-direction: column;
      }

      .line {
        display: flex;
        height: 60px;
        background-color: #252b33;
      }

      .content {
        display: flex;
        flex-direction: column;

        padding: 8px;
        row-gap: 8px;
      }

      .content-banner {
        width: 100%;
      }
    `;
  }

  render() {
    return [html` <app-navbar></app-navbar> `, this.#contentPart];
  }

  get #contentPart() {
    return html`
      <div class="container">
        <div class="line"></div>

        <div class="content">
          <img class="content-banner" src="/images/banner.png" />
          <app-filter
            .categories="${this.#categoriesNames}"
            .providers="${this.providers}"
            @category-change="${this.#onCategoryChange}"
            @provider-change="${this.#onProviderChange}"
          ></app-filter>
          <app-list id="list"></app-list>
        </div>
      </div>
    `;
  }

  constructor() {
    super();

    this.#loadCategories();
    this.#loadProviders();
  }

  static get properties() {
    return {
      providers: {
        type: Array,
      },
      categories: {
        type: Array,
      },
    };
  }

  get #listNode() {
    return this.shadowRoot.querySelector("#list");
  }

  get #categoriesNames() {
    return this.categories?.map((item) => ({
      category: item.category,
      totalGames: item.totalGames,
    }));
  }

  async #loadCategories() {
    this.categories = await getCategoriesApi();
    this.#onCategoryChange({ detail: { category: "web:popular" } });
  }

  async #loadProviders() {
    this.providers = await getProvidersApi();
  }

  #onCategoryChange(event) {
    const value = event.detail.category;
    const games = this.categories.find(
      (category) => category.category === value
    ).games;
    this.#listNode.games = null;
    this.#listNode.games = games;
  }

  async #onProviderChange(event) {
    const provider = event.detail.provider.provider;
    this.#listNode.games = null;
    this.#listNode.games = await getProviderGamesApi(provider);
  }
}

customElements.define(appMain.is, appMain);
