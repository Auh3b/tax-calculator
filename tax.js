class Tax {
  constructor() {
    this.btns = document.querySelectorAll(".category");
    this.calculate = document.getElementById("calculate");
    this.salary = document.getElementById("salary");
    this.input = document.getElementById("input");
    this.tag = document.getElementById("sal-cat");
    // this.category = this.btns
  }
  async getData(url) {
    const response = await fetch(url);
    const responseData = await response.json();
    return responseData;
  }

  async getCategory(data) {
    for (let i = 0; i < this.btns.length; i++) {
      this.btns[i].addEventListener("click", () => {
        this.tag.textContent = this.btns[i].textContent;
        let category = this.btns[i].textContent.toLowerCase();
        this.getTax(data, category);
      });
    }
  }

  getTax(data, category) {
    this.calculate.addEventListener("click", () => {
      //   console.log(data, category);
      for (let i = 0; i < data.length; i++) {
        if (Object.keys(data[i]) == category) {
          if (data[i][category][0] > this.input.value) {
            let netValue = this.input.value;
            this.salary.innerHTML = `${$.number(
              netValue
            )} <p id="caution"><i class="fas fa-exclamation-circle"></i> There's no deductions from this amount</p>`;
          } else if (this.input.value > data[i][category][35]) {
            let netValue =
              this.input.value -
              ((this.input.value - data[i][category][0]) * 0.3 +
                (this.input.value - data[i][category][0]) * 0.35);
            this.salary.textContent = $.number(netValue);
          } else {
            let netValue =
              this.input.value -
              (this.input.value - data[i][category][0]) * 0.3;
            this.salary.textContent = $.number(netValue);
          }
        }
      }
    });
  }
}
