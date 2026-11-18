export default class Alert {
  constructor() {
    this.alerts = [];
  }

  async init() {
    const response = await fetch("/json/alerts.json");
    this.alerts = await response.json();

    if (this.alerts.length > 0) {
      const alertSection = document.createElement("section");
      alertSection.classList.add("alert-list");

      this.alerts.forEach((alert) => {
        const paragraph = document.createElement("p");

        paragraph.textContent = alert.message;
        paragraph.style.backgroundColor = alert.background;
        paragraph.style.color = alert.color;

        alertSection.appendChild(paragraph);
      });

      document.querySelector("main").prepend(alertSection);
    }
  }
}