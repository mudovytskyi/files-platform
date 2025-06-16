import { Kafka, Producer } from 'kafkajs';
import { FilePlatform } from '@file-platform/shared-lib';

const kafka = new Kafka({
  clientId: 'file-platform',
  brokers: [process.env.KAFKA_BROKER || 'localhost:9092'],
});

export class KafkaService {
  private producer: Producer;
  private static instance: KafkaService;

  private constructor() {
    this.producer = kafka.producer();
  }

  public static async getInstance(): Promise<KafkaService> {
    if (!KafkaService.instance) {
      KafkaService.instance = new KafkaService();
      await KafkaService.instance.initialize();
    }
    return KafkaService.instance;
  }

  private async initialize() {
    try {
      await this.producer.connect();
      console.log('Successfully connected to Kafka');
    } catch (error) {
      console.error('Failed to connect to Kafka:', error);
      throw error;
    }
  }

  async publishFileUploaded(file: FilePlatform) {
    try {
      await this.producer.send({
        topic: 'file_uploaded',
        messages: [
          {
            key: file.id,
            value: JSON.stringify({
              eventType: 'file_uploaded',
              data: file,
              timestamp: new Date().toISOString(),
            }),
          },
        ],
      });
      console.log(`Published file_uploaded event for file: ${file.id}`);
    } catch (error) {
      console.error('Failed to publish file_uploaded event:', error);
      throw error;
    }
  }

  async shutdown() {
    await this.producer.disconnect();
  }
}
