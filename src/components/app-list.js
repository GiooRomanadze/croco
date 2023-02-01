import { css, html, LitElement } from "lit";
import { cache } from "lit/directives/cache.js";

import "../common/app-skeleton.js";

export class appList extends LitElement {
  static get is() {
    return "app-list";
  }

  static get styles() {
    return css`
      :host {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
        gap: 12px;
        position: relative;
        overflow: hidden;
      }

      .skeleton {
        display: flex;
        height: 178px;
        background-color: #252b33;
        border-radius: 6px;
      }

      .game {
        display: flex;
        flex-direction: column;
        position: relative;
        background-color: #252b33;
        border-radius: 6px;
        overflow: hidden;
        cursor: pointer;
      }

      .game:hover .game-image {
        opacity: 0.5;
      }

      .game:hover {
        background-color: #454d57;
      }

      .game:hover::after {
        content: "PLAY";
        position: absolute;
        width: 80%;
        top: 40%;
        left: 50%;
        transform: translate(-50%, -50%);
        text-align: center;
        background-color: #15af44;
        padding: 8px 0;
        border-radius: 4px;
        color: #ffffff;
        font-family: crocoItalic;
      }

      .game[new]::before {
        content: "NEW";
        left: 10px;
        top: 10px;
        position: absolute;
        background-color: #15af44;
        padding: 2px 12px;
        border-radius: 4px;
        color: #ffffff;
        font-family: crocoItalic;
        font-size: 12px;
      }

      .game-image {
        width: 100%;
      }

      .game-title {
        padding: 11px;
        font-family: crocoRegular;
        font-size: 14px;
        color: #ffffff;
      }
    `;
  }

  render() {
    return [cache(this.games ? this.#gamesPart() : this.#skeletonPart())];
  }

  *#gamesPart() {
    for (const game of this.games) {
      yield html`
        <div class="game" ?new="${game.tags.includes("new")}">
          <img
            class="game-image"
            loading="lazy"
            height="140"
            src="${game.image}"
          />
          <div class="game-title">${game.name}</div>
        </div>
      `;
    }
  }

  *#skeletonPart() {
    for (let i = 0; i < 20; i++) {
      yield html` <app-skeleton class="skeleton"></div> `;
    }
  }

  static get properties() {
    return {
      games: {
        type: Array,
      },
    };
  }
}

customElements.define(appList.is, appList);
