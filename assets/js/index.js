





function windowsLoaded() {
fetch(`https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=AUD`)
.then(convertToJSON)
.then(loadCoinData);

}

function loadCoinData(data){
    const conversionRate=data.bitcoin.aud;
    fetch(`https://api.coingecko.com/api/v3/search/trending`)
    .then(convertToJSON)
    .then(function(data){
        render(data,conversionRate );
    });
    
}

    function render(coinData, conversionRate){
        for (let i=0; i < coinData.coins.length;i++ ){
            const singleCoin= coinData.coins[i].item;
            
            const logo= singleCoin.thumb ; 
            const name= `${singleCoin.name} (${singleCoin.symbol})`;
            const price= Math.round(singleCoin.price_btc * conversionRate * 10000)/10000;
            insertCryptoCard(logo,name,price);
            
        }
       
}   

function insertCryptoCard(thumb, name, price){
const price_para= document.createElement(`p`);
price_para.innerText=`$ ${price}`;

const name_head= document.createElement(`h1`);
name_head.innerText=name;

const right_cointainer= document.createElement(`div`);
right_cointainer.classList.add('f-left')
right_cointainer.appendChild(name_head);
right_cointainer.appendChild(price_para);

const image_element= document.createElement(`img`);
image_element.src=thumb;
image_element.classList.add(`f-left`,`card-image` )
image_element.alt=`Coin Image`;

const card_container= document.createElement(`div`);
card_container.classList.add(`flex-item-small`, `card`);
card_container.appendChild(image_element);
card_container.appendChild(right_cointainer);
document.getElementById(`coins_container`).appendChild(card_container);
}

/**
 * <div class ="flex-item-small card">
    <img class ="f-left card-image" src="/assets/images/cryptocurrency.png" alt="Coin Image" />
    
</div>
 */



window.onload= function() {
    windowsLoaded();
}