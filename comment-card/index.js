const template = document.createElement("template");
template.innerHTML = `
<link rel="stylesheet" href="./comment-card/style.css" />
<div class="comment-card">
      <div class="avatar">
        <img />
      </div>

      <div class="details">
        <h2></h2>
        <div class="info">
          <p>Email: <slot name="email" /></p>
          <p>comment: <slot name="comment" /></p>
        </div>

        
        <div class="actions">
            <button id="consent">My consent</button>
            <button id="toggle">View Details</button>
        </div>
      </div>
     
    </div>`;

class CommentCard extends HTMLElement {
  constructor() {
    super();
    this.showInfo = false;
    this.attachShadow({ mode: "open" });
    this.shadowRoot.appendChild(template.content.cloneNode(true));
  }

  static get observedAttributes() {
    return ["name", "avatar"];
  }
  attributeChangedCallback(name, oldValue, newValue) {
    this.shadowRoot.querySelector(".details h2").innerText =
      this.getAttribute("name");
    this.shadowRoot.querySelector(".avatar img").src =
      this.getAttribute("avatar");
    this.shadowRoot.querySelector(".avatar img").alt =
      this.getAttribute("name");
  }
  toggleInfo = () => {
    this.showInfo = !this.showInfo;
    this.shadowRoot.querySelector(".info").style.display = this.showInfo
      ? "block"
      : "none";
    this.shadowRoot.querySelector("#toggle").innerHTML = this.showInfo
      ? "Hide Details"
      : "View Details";
  };
  connectedCallback() {
    this.shadowRoot
      .querySelector("#toggle")
      .addEventListener("click", this.toggleInfo);
    this.shadowRoot
      .querySelector("#consent")
      .addEventListener("click", () =>
        window.alert(
          `I ${this.getAttribute(
            "name"
          )}, agreed to the terms and conditions to share my data with you.`
        )
      );
  }
  disconnectedCallback() {
    this.shadowRoot
      .querySelector("#toggle")
      .removeEventListener("click", this.toggleInfo);
    this.shadowRoot
      .querySelector("#consent")
      .removeEventListener("click", () =>
        window.alert(
          `I ${this.getAttribute(
            "name"
          )}, agreed to the terms and conditions to share my data with you.`
        )
      );
  }
}

export default CommentCard;

/*
web component life cycle
1. constructor() called when the element is created or upgraded
2. connectedCallback() called every time when the element is added to the DOM
3. disconnectedCallback() called every time when the element is added, removed, updated or replaced from the DOM
4. attributeChangedCallback() called every time when the element attribute is changed
5. adoptedCallback() called when the element is moved to a new document
*/
