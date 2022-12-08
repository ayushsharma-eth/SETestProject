const PaymentMethod = [{
    supportedMethods: 'basic-card',
    data: {
      supportedNetworks: ['visa', 'mastercard', 'amex']
    },
      supportedMethods: '/https://buy.stripe.com/test_5kA8yEd6D34gbE4cMN'
      //https://buy.stripe.com/test_5kA8yEd6D34gbE4cMN
    }]
  

  let amount = document.getElementById("amount");
  let subTotalText = document.getElementById("subTotalText");
  let qty = parseFloat(document.getElementById("amount").value);
  
  amount.addEventListener("click", function() {
    let subtotal = Number(document.getElementById("amount").value * 4.99).toFixed(2);
    subTotalText.innerText = subtotal;
  });

  function displaySuccess() {

    document.getElementById("message").classList.add("success");
    document.getElementById("message").innerHTML = "<span>\u2714</span> Payment received - Foodys thanks you for your order!";    
  }

  function displayError() {
    document.getElementById("message").classList.add("failure");
    document.getElementById("message").innerHTML = "<span>\u2716</span> There was a problem with payment";
  }

  function displayCancel() {
    document.getElementById("message").classList.add("info");
    document.getElementById("message").innerHTML = "<span>&#x1F6C8;</span>Request has been cancelled";
  }

  function displayMessage(mesg) {
    document.getElementById("message").classList.add("info");
    document.getElementById("message").innerHTML = "<span>&#128712;</span>" + mesg;  
  }
  

  document.querySelector('.pay-button').onclick = function (e) {
    //document.getElementById("message").className = ";
    if(window.PaymentRequest) {
      let qty = parseFloat(document.getElementById("amount").value);
      let subtotal = Number(qty * 4.99); 
      let tax = 1.99;
      let shipping = 2.99;
  
      const paymentDetails = {
        total: {
          label: 'Total due',
          amount: { currency: 'USD', value: (subtotal + tax + shipping).toFixed(2) }
        },
        displayItems: [{
          label: 'Sub-total',
          amount: { currency: 'USD', value: subtotal.toFixed(2) }
        }, {
          label: 'Delivery',
          amount: { currency: 'USD', value: 6.99 }
        }, {        
          label: 'Sales Tax',
          amount: { currency: 'USD', value: tax.toFixed(2) }
        }]
      };  
  
    const paymentOptions = { requestPayerEmail: true };
    var options = {
        requestShipping: true,
        requestPayerEmail: true,
        requestPayerPhone: true,
        requestPayerName: true,
        shippingType: 'delivery'
      };
    let request = new PaymentRequest (PaymentMethod, paymentDetails, paymentOptions);

  
    //Show the Native UI
    if (request.canMakePayment) {
        request.canMakePayment().then(function(result) {
            if (result) {
                request.show().then(function(result) {
                    result.complete('success').then(function() {
                        console.log(JSON.stringify(result));
                        displaySuccess();
                    });
                }).catch(function(err) {
                    if (err.message == "Request cancelled") {
                        displayCancel();
                    } else {
                        console.error(err.message);
                displayError();
                    }
                    });
            } else {
                console.log('Cannot make payment');
                displayMessage("Sorry - no valid payment methods available");
            }
        }).catch(function(err) {
            console.log(request, err);
        });


        request
        .show()
        .then(function(result) {
          result.complete('success')
            .then(console.log(JSON.stringify(result)));
        }).catch(function(err) {
          console.error(err.message);
        });
      } else {
        // Fallback to traditional checkout
      }
    };
  }
  var paymentTimeout = window.setTimeout(function() {
    window.clearTimeout(paymentTimeout);
    request.abort().then(function() {
      document.getElementById("message").classList.add("info");
      document.getElementById("message").innerHTML = "<span>&#128712;</span> Request has been timed out due to inactivity"; 
      console.log('Payment timed out after 20 mins.');
    }).catch(function() {
      console.log('Unable to abort, because the user is currently in the process of paying.');
    });
  }, 20000 * 60);
  //export default;

