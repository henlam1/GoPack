import request from 'supertest';
import app from '../../app.js';
import {
  insertMockCategories,
  insertMockPackingList,
  insertMockPackingLists,
  insertMockUser,
} from '../helpers/insertMockData';
import {
  createMockPackingList,
  createObjectId,
} from '../helpers/createMockData';
import { ObjectId } from 'mongodb';
import { addPackingList } from '../../controllers/packingListController.js';

describe('GET /packing-lists', () => {
  it('should return all packing-lists', async () => {
    await insertMockPackingLists();
    const res = await request(app).get('/api/packing-lists');
    expect(res.status).toBe(200);
    expect(res.body).toHaveLength(3);
  });
  it('should return packing list by id', async () => {
    const mockPackingList = await insertMockPackingList({
      name: 'Europe Trip',
    });
    const mockId = mockPackingList._id.toString();
    const res = await request(app).get(`/api/packing-lists/${mockId}`);
    const resPackingList = res.body;
    expect(res.status).toBe(200);
    expect(resPackingList._id).toBe(mockId);
    expect(resPackingList.name).toBe('Europe Trip');
  });
  it('should return not found error', async () => {
    const mockId = createObjectId();
    const res = await request(app).get(`/api/packing-lists/${mockId}`);
    expect(res.status).toBe(404);
  });
});

describe('POST /packing-lists', () => {
  it('should create a new packing list', async () => {
    const mockUser = await insertMockUser();
    const mockPackingList = {
      name: 'Asia Trip',
      startDate: '2025-07-25',
      endDate: '2025-07-25',
      destination: 'Asia',
      description: 'We go around Asia',
    };

    const req = {
      body: mockPackingList,
      user: { userId: mockUser._id.toString() },
    };
    const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
    const next = jest.fn();

    await addPackingList(req, res, next);
    expect(res.status).toHaveBeenCalledWith(201);
  });
  it('should create a validation error', async () => {
    const mockPackingList = await createMockPackingList({ name: '' });
    const res = await request(app)
      .post('/api/packing-lists')
      .send(mockPackingList);
    expect(res.status).toBe(400);
  });
});

describe('PATCH /packing-lists', () => {
  it('should update an packing list by id', async () => {
    const mockPackingList = await insertMockPackingList();
    const mockId = mockPackingList._id.toString();
    const res = await request(app)
      .patch(`/api/packing-lists/${mockId}`)
      .send({ name: 'Updated packing-lists' });
    const updatedPackingList = res.body;
    expect(res.status).toBe(200);
    expect(updatedPackingList._id).toBe(mockId);
    expect(updatedPackingList.name).toBe('Updated packing-lists');
  });
});

describe('DELETE /packing-lists', () => {
  it('should delete an packing list by id', async () => {
    const mockUser = await insertMockUser();
    const mockPackingList = await insertMockPackingList({ user: mockUser._id });
    const mockId = mockPackingList._id.toString();
    mockUser.packingLists.push(new ObjectId(mockId));
    const res = await request(app).delete(`/api/packing-lists/${mockId}`);
    const deletedPackingList = res.body;
    expect(res.status).toBe(200);
    expect(deletedPackingList._id).toBe(mockId);
    const search = await request(app).get(`/api/packing-lists/${mockId}`);
    expect(search.status).toBe(404);
  });
});

describe('GET /packing-lists/categories', () => {
  it('should return categories of a packing list', async () => {
    const packingList = await insertMockPackingList();
    await insertMockCategories(undefined, {
      packingList: packingList._id,
    });
    const res = await request(app).get(
      `/api/packing-lists/${packingList._id.toString()}/categories`,
    );
    expect(res.body).toHaveLength(3);
    expect(res.status).toBe(200);
  });
});
