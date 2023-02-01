import { css, LitElement } from "lit";
import { until } from "lit/directives/until.js";
import { unsafeSVG } from "lit/directives/unsafe-svg.js";

export class AppIcon extends LitElement {
  static get is() {
    return "app-icon";
  }

  static get styles() {
    return css`
      :host {
        display: inline-flex;
        --icon-size: 24px;

        width: var(--icon-size);
        height: var(--icon-size);
      }

      svg {
        width: var(--icon-size);
        height: var(--icon-size);
        fill: var(--fill-color, transparent);
        color: var(--stroke-color, currentColor);
      }
    `;
  }

  render() {
    return until(this._iconPart, "");
  }

  static get properties() {
    return {
      icon: {
        type: String,
      },
      _unsafeSvg: {
        type: String,
      },
    };
  }

  get _iconPart() {
    if (!this.icon) return "";
    return fetch(`/icons/${this.icon}.svg`)
      .then((res) => res.text())
      .then((unsafeSvg) => unsafeSVG(unsafeSvg));
  }
}

customElements.define(AppIcon.is, AppIcon);
