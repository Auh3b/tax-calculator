class Tax {
  constructor() {
    this.btns = document.querySelectorAll(".category");
    this.calculate = document.getElementById("calculate");
    this.salary = document.getElementById("salary");
    this.input = document.getElementById("input");
    this.tag = document.getElementById("sal-cat");
    this.rateTable = document.getElementById("tax-rate");
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
        let category = this.btns[i].textContent.trim().toLowerCase();
        this.getTax(data, category);
      });
    }
  }

  getTax(data, category) {
    this.calculate.addEventListener("click", () => {
      for (let i = 0; i < data.length; i++) {
        if (Object.keys(data[i]) == category) {
          let table = `
          <table class = 'table'>
            <thead class = 'thead'>
              <tr>
                <th>Rate %</th>
                <th>Category Threshold</th>
              </tr>
            </thead>
            <tbody id="tbody">
              <tr>
                <td>0</td>
                <td><i class="fas fa-less-than-equal"></i> &nbsp &nbsp MWK ${$.number(
                  data[i][category][0]
                )}</td>
              </tr>
              <tr>
                <td>30</td>
                <td><i class="fas fa-less-than-equal"></i>  &nbsp &nbsp MWK ${$.number(
                  data[i][category][30]
                )}</td>
              </tr>
              <tr>
                <td>35</td>
                <td><i class="fas fa-greater-than-equal"></i>  &nbsp &nbsp MWK ${$.number(
                  data[i][category][35]
                )}</td>
              </tr>
            </tbody>
          </table>
          `;
          if (data[i][category][0] > +this.input.value) {
            let netValue = +this.input.value;
            this.salary.innerHTML = `${$.number(
              netValue
            )} <p id="caution" class="bg-warning rounded px-1"><i class=" fas fa-exclamation-circle"></i> There's no deductions from this amount</p>`;
            this.rateTable.innerHTML = "";
          } else if (+this.input.value > data[i][category][35]) {
            let netValue =
              +this.input.value -
              ((+this.input.value - data[i][category][0]) * 0.3 +
                (+this.input.value - data[i][category][0]) * 0.35);
            this.salary.textContent = $.number(netValue);
            this.rateTable.innerHTML = table;
          } else {
            let netValue =
              +this.input.value -
              (+this.input.value - data[i][category][0]) * 0.3;
            this.salary.textContent = $.number(netValue);
            this.rateTable.innerHTML = table;
          }
        }
      }
    });
  }

  // taxRate() {
  //   const layout = `
  //                 <table class = 'table'>
  //                   <thead>
  //                     <tr>
  //                       <th>Rate %</th>
  //                       <th>Category Threshold</th>
  //                     </tr>
  //                   </thead>
  //                   <tbody id="tbody">
  //                   </tbody>
  //                 </table>
  //                 `;
  //   const content = `
  //                 <tr>
  //                   <td>0</td>
  //                   <td>${data[i][category][0]}</td>
  //                 </tr>
  //                 <tr>
  //                   <td>30</td>
  //                   <td>${data[i][category][30]}</td>
  //                 </tr>
  //                 <tr>
  //                   <td>35</td>
  //                   <td>${data[i][category][35]}</td>
  //                 </tr>
  //   `;
  //   this.rateTable.innerHTML = layout;
  //   this.tableContent.innerText = content;
  // }
}
