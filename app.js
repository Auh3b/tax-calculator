// location ratios of calculation
let taxDataLoc = "tax.json";

// init Tax
const tax = new Tax();

// get tax parameter
tax
  .getData(taxDataLoc)
  .then((data) => {
    tax
      .getCategory(data)
      .then((category) => {
        tax.getTax(data, category);
      })
      .catch((err) => console.log(err));
  })
  .catch((err) => console.log(err));

$("#input").number(true, 2);
