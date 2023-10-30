console.log('Test One')
const cryptoDropdown = document.getElementById('crypto-dropdown');
const cryptoName = document.getElementById('name');
const cryptoSymbol = document.getElementById('symbol');
const cryptoSupply = document.getElementById('supply');
const cryptoPrice = document.getElementById('priceUsd');
const cryptoPercentChange = document.getElementById('changePercent24Hr');

document.addEventListener('DOMContentLoaded', function() {
    function getCryptoData() {
        fetch('https://api.coincap.io/v2/assets')
        .then(response => response.json() )
        .then(data => {
            const crypto = data.data;
    
            crypto.forEach(cryptoCurr => {
                const option = document.createElement('option');
                option.value = cryptoCurr.id;
                option.text = cryptoCurr.name;
                cryptoDropdown.appendChild(option);
            });
    
            cryptoDropdown.addEventListener('change', () => {
                const selectedCryptoID = cryptoDropdown.value;
                const selectedCrypto = crypto.find(cryptoCurr => cryptoCurr.id === selectedCryptoID);
    
                if (selectedCrypto) {
                    cryptoName.textContent = selectedCrypto.name;
                    cryptoSymbol.textContent = selectedCrypto.symbol;
                    cryptoSupply.textContent = Math.round(selectedCrypto.supply);
                    
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
        .catch(error => {
            console.error('There is an error fetching the data', error);
        });
    }
    // Hello
    getCryptoData(); 
});

