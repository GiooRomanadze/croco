import { css, html, LitElement } from "lit";

export class appSkeleton extends LitElement {
  static get is() {
    return "app-skeleton";
  }

  static get styles() {
    return css`
      :host {
        position: relative;
        display: flex;
        overflow: hidden;
        animation: loading 1.5s infinite;
      }

      :host::after {
        display: block;
        content: "";
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: linear-gradient(
          80deg,
          transparent,
          rgba(255, 255, 255, 0.3),
          transparent
        );
        animation: glow 2s infinite normal;
      }

      ::slotted(*) {
        background-color: rgb(239, 239, 239);
      }

      @keyframes glow {
        from {
          transform: translateX(-100%);
        }
        to {
          transform: translateX(100%);
        }
      }
    `;
  }

  render() {
    return [this.#viewPart];
  }

  get #viewPart() {
    return html` <slot></slot> `;
  }

  static get properties() {
    return {};
  }
}

customElements.define(appSkeleton.is, appSkeleton);
