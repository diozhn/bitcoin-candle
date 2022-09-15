import { config } from "dotenv";
import { Channel, connect } from "amqplib";

export const createMessageChanel = async (): Promise<Channel> => {
  config();
  try {
    const connection = await connect(process.env.AMQP_SERVER);
    const channel = await connection.createChannel();
    await channel.assertQueue(process.env.QUEUE_NAME);
    console.log("Connected on RabbitMQ on chanel");
    return channel;
  } catch (err) {
    console.log(
      "🚀 ~ file: massageChannel.ts ~ line 13 ~ createMessageChanel ~ err",
      err
    );
  }
};
