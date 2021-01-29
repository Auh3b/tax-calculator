let btns = document.querySelectorAll(".category");
// for (let i = 0; i < btns.length; i++) {
//   btns[i].addEventListener("click", () => {
//     console.log(btns[i]);
//   });
// }
for (let i = 0; i < btns.length; i++) {
  btns[i].addEventListener("click", () => {
    // btns[i].classList.add("selected");
    document.getElementById("sal-cat").textContent = btns[i].textContent;
    let category = btns[i].textContent.toLowerCase();
    // console.log(btns[i].textContent.toLowerCase());
    document.getElementById("calculate").addEventListener("click", () => {
      data(taxDataLoc)
        .then((data) => {
          for (let i = 0; i < data.length; i++) {
            if (Object.keys(data[i]) == category) {
              if (
                (data[i][category][35] >
                  document.getElementById("input").value) &
                (data[i][category][0] < document.getElementById("input").value)
              ) {
                let netValue =
                  document.getElementById("input").value -
                  document.getElementById("input").value * 0.3;
                document.getElementById("salary").textContent = netValue;
              } else {
                let netValue =
                  document.getElementById("input").value -
                  (document.getElementById("input").value * 0.3 +
                    document.getElementById("input").value * 0.35);
                document.getElementById("salary").textContent = netValue;
              }
            }
          }
        })
        .catch((err) => console.log(err));
    });
  });
}

let taxDataLoc = "tax.json";

async function data(url) {
  const response = await fetch(url);
  const responseData = await response.json();
  return responseData;
}

// let category = "weekly";

// let input = document.getElementById("input").value;
// console.log(input)

// document.getElementById("calculate").addEventListener("click", () => {
//   console.log(document.getElementById("input").value);
// });

// data(taxDataLoc)
//   .then((data) => {
//     // console.log(Object.keys(data[1]) == "fortnightly");
//     for (let i = 0; i < data.length; i++) {
//       if (Object.keys(data[i]) == category) {
//         console.log(data[i][category][35]);
//         if (data[i].weekly[35] > input) {
//           let netValue = input - input * 0.3;
//           document.getElementById("salary").textContent = netValue;
//         }
//       }
//     }
//   })
//   .catch((err) => console.log(err));
