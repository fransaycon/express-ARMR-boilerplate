import { MongoMemoryServer } from 'mongodb-memory-server';
import mongoose from 'mongoose';
import { connectTestDatabase, closeTestDatabase, clearTestDatabase } from './in-memory-db-handler';

jest.mock('mongodb-memory-server');

describe('lib/in-memory-db-handler', () => {
  it('should create a connection to the in memory mongodb', async (done) => {
    const mongooseConnect = jest.spyOn(mongoose, 'connect').mockReturnValue(Promise.resolve());
    const memoryServerMockInstance = MongoMemoryServer.mock.instances[0];

    await connectTestDatabase();
    expect(MongoMemoryServer).toHaveBeenCalledTimes(1);
    expect(memoryServerMockInstance.getConnectionString).toHaveBeenCalledTimes(1);
    expect(mongooseConnect).toHaveBeenCalledTimes(1);

    done();
  });

  it('should close the in memory mongodb connection', async (done) => {
    const dropDatabase = jest.spyOn(mongoose.connection, 'dropDatabase').mockReturnValue();
    const closeDatabase = jest.spyOn(mongoose.connection, 'close').mockReturnValue();
    const memoryServerMockInstance = MongoMemoryServer.mock.instances[0];

    await closeTestDatabase();
    expect(dropDatabase).toHaveBeenCalledTimes(1);
    expect(closeDatabase).toHaveBeenCalledTimes(1);
    expect(memoryServerMockInstance.stop).toHaveBeenCalledTimes(1);

    done();
  });

  it('should clear test databases in memory mongodb', async (done) => {
    await clearTestDatabase();
    expect(mongoose.connection.collections).toStrictEqual({});
    done();
  });
});
