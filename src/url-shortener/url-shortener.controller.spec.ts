import { Test, TestingModule } from '@nestjs/testing';
import { UrlShortenerController } from './url-shortener.controller';
import { UrlShortenerService } from './url-shortener.service';
import { MongoMemoryServer } from 'mongodb-memory-server';
import { Connection, connect, Model } from 'mongoose';
import { Url, UrlSchema } from './url-shortener.schema';
import { getModelToken } from '@nestjs/mongoose';
import { createMock } from '@golevelup/ts-jest';
import { Response } from 'express';
import { HttpException, HttpStatus } from "@nestjs/common";

describe('Url Shortener controller', () => {
  let moduleRef: TestingModule;
  let controller: UrlShortenerController;
  let mongod: MongoMemoryServer;
  let mongoConnection: Connection;
  let urlModel: Model<Url>;
  let response: Response;

  beforeAll(async () => {
    mongod = await MongoMemoryServer.create();
    const uri = mongod.getUri();
    mongoConnection = (await connect(uri)).connection;
    urlModel = mongoConnection.model(Url.name, UrlSchema);

    moduleRef = await Test.createTestingModule({
      controllers: [UrlShortenerController],
      providers: [
        UrlShortenerService,
        { provide: getModelToken(Url.name), useValue: urlModel },
      ],
    }).compile();

    controller = moduleRef.get<UrlShortenerController>(UrlShortenerController);

    // mock a response obj
    const mockResponse = () => {
      return createMock<Response>({
        json: jest.fn().mockReturnThis(),
        status: jest.fn().mockReturnThis(),
        redirect: jest.fn().mockReturnThis(),
      });
    };

    response = mockResponse();
  });

  // good idea to refactor all these setups into a common file
  afterAll(async () => {
    await mongoConnection.dropDatabase();
    await mongoConnection.close();
    await mongod.stop();
  });

  afterEach(async () => {
    const collections = mongoConnection.collections;
    for (const key in collections) {
      const collection = collections[key];
      await collection.deleteMany({});
    }
  });

  describe('shortenUrl', () => {
    it('should return a shortened url', async () => {
      const input = {
        originalUrl: 'https://www.google.com',
      };
      const response = await controller.shortenUrl(input);
      expect(response).toBeTruthy();
    });
  });

  describe('getOriginalUrl', () => {
    it('should redirect to original url', async () => {
      // shortened an url
      const input = {
        originalUrl: 'https://www.google.com',
      };
      await controller.shortenUrl(input);

      // get url id of the seeded url
      const url = await urlModel.findOne();

      const params = {
        id: url.urlId,
      };

      await controller.getOriginalUrl(params, response);
      expect(response.redirect).toHaveBeenCalledTimes(1);
    });

    it('should throw error when url id is invalid', async () => {
      const params = {
        id: 'randomStringABC',
      };

     await expect(controller.getOriginalUrl(params, response)).rejects.toThrowError(new HttpException('Invalid url id', HttpStatus.NOT_FOUND));
    });
  });
});
