import { css, html, LitElement } from "lit";
import "../common/app-icon.js";

export class appNavbar extends LitElement {
  static get is() {
    return "app-navbar";
  }

  static get styles() {
    return css`
      :host {
        display: flex;
        flex-direction: column;

        height: 100vh;
        position: sticky;
        top: 0;
        background-color: #2a3139;
      }

      .logo {
        cursor: pointer;
        padding: 10px 10px 20px 10px;
      }

      .category {
        position: relative;
        padding: 20px 10px;
        display: flex;
        flex-direction: column;
        align-items: center;
        color: #6a7787;
        row-gap: 10px;
        cursor: pointer;
      }

      .category[active] {
        color: #fff;
      }

      .category:hover {
        color: #fff;
      }

      .category[active]::before {
        content: "";
        position: absolute;
        left: 0;
        top: 0;
        height: 100%;
        width: 3px;
        border-top-right-radius: 10px;
        border-bottom-right-radius: 10px;
        background-color: #189541;
      }

      .category-icon {
        --icon-size: 30px;
      }

      .category-title {
        font-family: crocoRegular;
      }
    `;
  }

  render() {
    return [
      html`<img class="logo" src="/icons/croco.svg" />`,
      this.#categoriesPart,
    ];
  }

  get #categoriesPart() {
    const categories = ["casino", "live", "slot", "sport"];
    return categories.map((category) => this.#categoryPart(category));
  }

  #categoryPart(category) {
    return html`
      <div class="category" ?active="${category === "slot"}">
        <app-icon class="category-icon" icon="${category}"></app-icon>
        <span class="category-title">${category}</span>
      </div>
    `;
  }

  static get properties() {
    return {};
  }
}

customElements.define(appNavbar.is, appNavbar);
