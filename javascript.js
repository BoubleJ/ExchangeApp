const currencyRatio = {
    VND: {
      USD: 0.000043,
    KRW: 0.057,
    JPY: 0.0059,
    EUR: 0.000039,
    VND: 1,
      unit: "동",
      img: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/21/Flag_of_Vietnam.svg/2560px-Flag_of_Vietnam.svg.png",
    },
    USD: {
      USD: 1,
      KRW: 1341.22,
      JPY: 137.58,
      EUR: 0.91,
      VND: 23465,
      unit: "달러",
      img: "https://cdn-icons-png.flaticon.com/512/555/555526.png",
    },
    KRW: {
      USD: 0.00075, 
    KRW: 1, 
    JPY: 0.1, 
    EUR: 0.00068, 
    VND: 17.49, 
      unit: "원",
      img: "https://cdn.countryflags.com/thumbs/south-korea/flag-400.png",
    },
    JPY: {
      USD: 0.0073, 
    KRW: 9.75, 
    JPY: 1, 
    EUR: 0.0066, 
    VND: 170.58, 
      unit: "엔",
      img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTITfcXvC34EPVBs8URgFogc1JS4eiot5ilbu-S-nIy&s",
    },
    EUR: {
      USD: 1.1,
      KRW: 1471.46,
      JPY: 150.98,
      EUR: 1,
      VND: 25741.34,
      unit: "유로",
      img: "https://i.ytimg.com/vi/hM9KE0u_qFw/maxresdefault.jpg",
    },
  };

  let toButton = document.getElementById("to-button");
  let fromButton = document.getElementById("from-button");
  let toCurrency = "USD";
  let fromCurrency = "USD";
  
  document.querySelectorAll("#from-currency-list li").forEach(function (item) {
    item.addEventListener("click", function () {
      fromCurrency = this.id;
      fromButton.innerHTML = `<img class="flag-img"src="${currencyRatio[fromCurrency]['img']}"/>${fromCurrency}`;
      convert("from");
    });
  });
  
  document.querySelectorAll("#to-currency-list li").forEach(function (item) {
    item.addEventListener("click", function () {
      toCurrency = this.id;
      toButton.innerHTML = `<img class="flag-img"src="${currencyRatio[toCurrency]['img']}"/>${toCurrency}`;
      convert("from");
    });
  });
  
  function convert(type) {
    
    let amount = 0;
    if (type == "from") {
      //입력갑 받기
      amount = document.getElementById("fromAmount").value;
      // 환전하기
      let convertedAmount = amount * currencyRatio[fromCurrency][toCurrency];
      // 환전한값 보여주기
      document.getElementById("toAmount").value = convertedAmount;
      //환전한값 한국어로
      renderKoreanNumber(amount, convertedAmount);
    } else {
      amount = document.getElementById("toAmount").value;
      let convertedAmount = amount * currencyRatio[toCurrency][fromCurrency];
      document.getElementById("fromAmount").value = convertedAmount;
      renderKoreanNumber(convertedAmount, amount);
    }
  }


  function renderKoreanNumber(from, to) {
    document.getElementById("fromNumToKorea").textContent =
      readNum(from) + currencyRatio[fromCurrency].unit;
    document.getElementById("toNumToKorea").textContent =
      readNum(to) + currencyRatio[toCurrency].unit;
  }


  var unitWords = ["", "만", "억", "조", "경"];
  var splitUnit = 10000;



 
  function readNum(num) {
    let resultString = "";
    let resultArray = [];
    for (let i = 0; i < unitWords.length; i++) {
      let unitResult =
        (num % Math.pow(splitUnit, i + 1)) / Math.pow(splitUnit, i);
      unitResult = Math.floor(unitResult);
      if (unitResult > 0) {
        resultArray[i] = unitResult;
      }
    }
    for (let i = 0; i < resultArray.length; i++) {
      if (!resultArray[i]) continue;
      resultString = String(resultArray[i]) + unitWords[i] + resultString;
    }
    return resultString;
  }

