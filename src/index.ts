import { config } from "dotenv";
import axios from "axios";
import { Period } from "./enums/period";
import { Candle } from "./models/candle";
import { createMessageChanel } from "./messages/massageChannel";

config();

const readMarketPrice = async (): Promise<number> => {
  const { data } = await axios.get(process.env.PRICES_API as string);
  const price = data.bitcoin.usd;
  return price;
};

const generateCandles = async () => {
  const messageChannel = await createMessageChanel();

  if (messageChannel) {
    while (true) {
      const loopTimes = Period.TEN_MINUTES / Period.TEN_SECONDS;
      const candle = new Candle("BTC", new Date());

      console.log("Generating new candle...");

      for (let i = 0; i < loopTimes; i++) {
        const price = await readMarketPrice();
        candle.addValue(price);
        console.log(`Market price #${i + 1} of ${loopTimes}.`);
        await new Promise((r) => {
          setTimeout(r, Period.TEN_SECONDS);
        });
      }

      candle.closeCandle();
      console.log("Candle close!");
      const candleObj = candle.toSimpleObject();
      console.log(candleObj);
      const candleJson = JSON.stringify(candleObj);
      messageChannel.sendToQueue(
        process.env.QUEUE_NAME,
        Buffer.from(candleJson)
      );
      console.log("Candle send to queue");
    }
  }
};

generateCandles();
