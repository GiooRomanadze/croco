import { css, html, LitElement } from "lit";

const categoriesConfig = [
  {
    value: "web:popular",
    name: "Top Slots",
    icon: "best-seller",
    active: true,
  },
  { value: "web:buy_bonus", name: "All Slots", icon: "giftbox" },
];

export class appFilter extends LitElement {
  static get is() {
    return "app-filter";
  }

  static get styles() {
    return css`
      :host {
        display: flex;
        flex-direction: column;
      }

      .categories {
        display: flex;
        background-color: #1d242c;
      }

      .category {
        display: flex;
        padding: 16px 14px;
        font-family: crocoRegular;
        align-items: center;
        column-gap: 4px;
        color: white;
        cursor: pointer;
        position: relative;
        border-top-left-radius: 8px;
        border-top-right-radius: 8px;
      }

      .category-total {
        position: absolute;
        right: -4px;
        top: 2px;
      }

      .providers {
        display: flex;
        background-color: #272d36;
        border-bottom-left-radius: 8px;
        border-bottom-right-radius: 8px;
      }

      .provider {
        color: #d9e3ef;
        font-size: 14px;
        font-family: crocoRegular;
        padding: 16px 12px 12px 24px;
        cursor: pointer;
        position: relative;
      }

      .provider.last {
        margin-left: auto;
        position: relative;
      }

      .provider.last:hover .provider-dropdown {
        display: flex;
      }

      .provider-dropdown {
        position: absolute;
        top: 80%;
        right: 0;
        display: none;
        flex-direction: column;
        z-index: 1;
        background-color: rgb(37, 43, 51);
        border-radius: 8px;
        white-space: nowrap;
        max-height: 300px;
        overflow-y: scroll;
      }

      .provider-dropdown-item {
        padding: 12px 16px;
        position: relative;
      }

      .provider- [active] .category-total {
        color: #189541;
      }

      [active] .category-icon {
        color: #189541;
      }

      [active]::after {
        content: "";
        position: absolute;
        bottom: 0px;
        left: 0;
        height: 3px;
        width: 100%;
        border-top-left-radius: 10px;
        border-top-right-radius: 10px;
        background-color: rgb(24, 149, 65);
      }
    `;
  }

  render() {
    return [this.#viewPart];
  }

  get #viewPart() {
    if (!this.categories) return;
    return html`
      <div class="categories">
        ${categoriesConfig.map((category) => this.#categoryPart(category))}
      </div>
      <div class="providers">
        ${this.#providersPart} ${this.#providerDropdownPart}
      </div>
    `;
  }

  #categoryPart(category) {
    return html`
      <div
        class="category"
        ?active="${category.active}"
        @click="${(event) => this.#onCategoryClick(event, category.value)}"
      >
        <span class="category-total">
          ${this.#totalGames(category.value)}
        </span>
        <app-icon class="category-icon" icon="${category.icon}"></app-icon>
        <span class="category-title">${category.name}</span>
      </div>
    `;
  }

  #totalGames(category) {
    return this.categories?.find((item) => item.category === category)
      .totalGames;
  }

  get #providersPart() {
    return this.providers
      ?.splice(0, 7)
      .map((provider) => this.#providerPart(provider));
  }

  #providerPart(provider) {
    return html`
      <div
        class="provider"
        @click="${(event) => this.#onProviderClick(event, provider)}"
      >
        <span class="provider-title">${provider.name}</span>
      </div>
    `;
  }

  get #providerDropdownPart() {
    return html`
      <div class="provider last">
        <span class="provider-title">See more </span>
        <div class="provider-dropdown">
          ${this.providers
            ?.splice(7)
            ?.map((provider) => this.#providerDropdownItemPart(provider))}
        </div>
      </div>
    `;
  }

  #providerDropdownItemPart(provider) {
    return html`
      <span
        class="provider-title provider-dropdown-item"
        @click="${(event) => this.#onProviderClick(event, provider)}"
      >
        ${provider.name}
      </span>
    `;
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

  #onCategoryClick(event, category) {
    this.#setActiveCategory(event);
    this.dispatchEvent(
      new CustomEvent("category-change", { detail: { category } })
    );
  }

  #onProviderClick(event, provider) {
    this.#setActiveCategory(event);
    this.dispatchEvent(
      new CustomEvent("provider-change", { detail: { provider } })
    );
  }

  #setActiveCategory({ currentTarget }) {
    const lastActive = this.shadowRoot.querySelector("[active]");
    lastActive?.removeAttribute("active");
    currentTarget.setAttribute("active", "");
  }
}

customElements.define(appFilter.is, appFilter);
