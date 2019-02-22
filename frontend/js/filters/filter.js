// JavaScript Document
myApp.filter("myFilter", function() {
  // In the return function, we must pass in a single parameter which will be the data we will work on.
  // We have the ability to support multiple other parameters that can be passed into the filter optionally
  return function(input, optional1, optional2) {
    var output;

    // Do filter work here
    return output;
  };
});

myApp.filter("indianCurrency", function() {
  return function(getNumber) {
    if (!isNaN(getNumber)) {
      var numberArr = getNumber.toString().split(".");
      var lastThreeDigits = numberArr[0].substring(numberArr[0].length - 3);
      var otherDigits = numberArr[0].substring(0, numberArr[0].length - 3);
      if (otherDigits != "") {
        lastThreeDigits = "," + lastThreeDigits;
      }
      var finalNumber =
        otherDigits.replace(/\B(?=(\d{2})+(?!\d))/g, ",") + lastThreeDigits;
      if (numberArr.length > 1) {
        var getRoundedDecimal = parseInt(numberArr[1].substring(0, 2)) + 1;
        finalNumber += "." + getRoundedDecimal;
      }
      // return '₹' + finalNumber;
      return finalNumber;
    }
  };
});

myApp.filter("uploadpath", function() {
  return function(input, width, height, style) {
    var other = "";
    if (width && width !== "") {
      other += "&width=" + width;
    }
    if (height && height !== "") {
      other += "&height=" + height;
    }
    if (style && style !== "") {
      other += "&style=" + style;
    }
    if (input) {
      if (input.indexOf("https://") == -1) {
        return imgpath + "?file=" + input + other;
      } else {
        return input;
      }
    }
  };
});

myApp.filter("youtubethumb", function() {
  return function(input, onlyid, type) {
    console.log(type);
    if (input) {
      if (onlyid == false) {
        if (type) {
          return "https://img.youtube.com/vi/" + input + "/" + type + ".jpg";
        } else {
          return "https://img.youtube.com/vi/" + input + "/mqdefault.jpg";
        }
      } else if (onlyid == true) {
        return videoid[1];
      }
    } else {
      return input;
    }
  };
});

myApp.filter("INR", function() {
  return function(input) {
    if (!isNaN(input)) {
      var currencySymbol = "₹";
      //var output = Number(input).toLocaleString('en-IN');   <-- This method is not working fine in all browsers!
      var result = input.toString().split(".");

      var lastThree = result[0].substring(result[0].length - 3);
      var otherNumbers = result[0].substring(0, result[0].length - 3);
      if (otherNumbers != "") lastThree = "," + lastThree;
      var output =
        otherNumbers.replace(/\B(?=(\d{2})+(?!\d))/g, ",") + lastThree;

      if (result.length > 1) {
        output += "." + result[1];
      }

      return output;
      // currencySymbol +
    }
  };
});
