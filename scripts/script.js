// Select elements that we want to do display on the page
const cryptoDropdown = document.getElementById('crypto-dropdown');
const cryptoName = document.getElementById('name');
const cryptoSymbol = document.getElementById('symbol');
const cryptoSupply = document.getElementById('supply');
const cryptoPrice = document.getElementById('priceUsd');
const cryptoPercentChange = document.getElementById('changePercent24Hr');

// This was done bc was initially running into an issue where the JavaScript would load before
// DOM and would then return null for the drop down menu
// Ensures DOM is fully loaded before the script runs
document.addEventListener('DOMContentLoaded', function() {
    function getCryptoData() {
        // Fetch data from API
        fetch('https://api.coincap.io/v2/assets')
        .then(response => response.json() )
        .then(data => {
            const crypto = data.data;
            
            // Get the names of the cryptocurrencies and add them to the drop-down menu
            crypto.forEach(cryptoCurr => {
                const option = document.createElement('option');
                option.value = cryptoCurr.id;
                option.text = cryptoCurr.name;
                cryptoDropdown.appendChild(option);
            });

            //Event listener for when a cryptocurrency is chosen from drop-down menu
            cryptoDropdown.addEventListener('change', () => {
                const selectedCryptoID = cryptoDropdown.value;
                const selectedCrypto = crypto.find(cryptoCurr => cryptoCurr.id === selectedCryptoID);
                
                // Get the name symbol and supply of the cryptocurrency selected
                if (selectedCrypto) {
                    cryptoName.textContent = selectedCrypto.name;
                    cryptoSymbol.textContent = selectedCrypto.symbol;
                    cryptoSupply.textContent = Math.round(selectedCrypto.supply);
                    
                    // Since we had to fix to two decimal values we had to change the data from string to float
                    // For both the price and the % it changed over the last 24 hours
                    // We hae to convert into a float
                    const priceUsd = parseFloat(selectedCrypto.priceUsd);
                    if (!isNaN(priceUsd)) {
                        cryptoPrice.textContent = priceUsd.toFixed(2);
                    } else {
                        console.error("priceUsd isn't a valid number", selectedCrypto.priceUsd);
                        cryptoPrice.textContent = 'N/A';
                    }

                    const changePercent24Hr = parseFloat(selectedCrypto.changePercent24Hr);
                    if (!isNaN(changePercent24Hr)) {
                        cryptoPercentChange.textContent = changePercent24Hr.toFixed(2);
                    } else {
                        console.error("The 24 Hour Percent Change isn't a valid number", selectedCrypto.changePercent24Hr);
                        changePercent24Hr.textContent = 'N/A'
                    }
                }
            });
        })
    }
    getCryptoData(); 
});

