//https://api.coingecko.com/api/v3/coins/bitcoin?localization=false&tickers=false&market_data=true&community_data=false&developer_data=false&sparkline=false

function loadData(){
    const url_string=window.location.href;
    const url_obj= new URL(url_string);
    const params= new URLSearchParams(url_obj.search);
    if (!params.has('id')){
        windows.location.href="/";
    }
    fetch(`https://api.coingecko.com/api/v3/coins/${params.get('id')}?localization=false&tickers=false&market_data=true&community_data=false&developer_data=false&sparkline=false
    `)
    .then(convertToJSON)
    .then(render);

    fetch(`https://api.coingecko.com/api/v3/coins/${params.get('id')}/market_chart?vs_currency=aud&days=1&interval=hourly`)
    .then(convertToJSON)
    .then(renderChart);
  
}

function render(data){
const name=`${data.name} (${data.symbol.toUpperCase()})`;
const description=data.description.en;
const aud =data.market_data.current_price.aud;
const usd =data.market_data.current_price.usd ;
const gbp =data.market_data.current_price.gbp;
const logo= data.image.large;
document.getElementById('coin-name').innerText=name;
document.getElementById('coin-description').innerHTML=description;
document.getElementById('coin-logo').src=logo;
document.getElementById('aud-price').innerText= aud;
document.getElementById('usd-price').innerText= usd;
document.getElementById('gbp-price').innerText=gbp ;
}


window.onload=function(){
    loadData();
}

function renderChart(data){
const prices=data.prices;
const timeStamp=[];
const pricesAud=[];
    for (let i=0; i<prices.length; i++){
    const single_Price = prices[i];
    const dateObj=new Date(single_Price[0]);
    let hrs =dateObj.getHours();
        if (hrs<10){
        hrs="0"+hrs;
        }
        let minutes = dateObj.getMinutes();
        if (minutes<10){
        minutes="0"+minutes;
         }  
            timeStamp.push(`${hrs}:${minutes}`);
            pricesAud.push(single_Price[1]);
       }


        const ctx = document.getElementById('myChart');

        new Chart(ctx, {
         type: 'line',
            data: {
            labels: timeStamp,
            datasets: [{
            label: 'Price (in AUD)',
            data: pricesAud,
            borderWidth: 1,
            tension:0.4
            }]
            },
                options: {
                    plugins: {
                    legend: {
                    display: false,
                    }
                 }
               }

    });


}