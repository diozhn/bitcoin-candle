
# Bitcoin-candle 🕯

This script generates candles with a history of bitcoin values ​​in dollars. Then this candle is sent to a queue using rabbitmq



## Instalation

Clone this repository https://github.com/diozhn/bitcoin-candle.git

#### Run using npm
```bash
    # Install dependencies
  npm install
    # Run script
  npm run start
```
    
## Variáveis de Ambiente


To run this project, you will need to add the following environment variables to your .env

`PRICES_API`

`QUEUE_NAME`

`AMQP_SERVER`


## Used stack

**Back-end:** Node, Typescript, RabbitMq

