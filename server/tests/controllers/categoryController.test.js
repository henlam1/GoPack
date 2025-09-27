import request from 'supertest';
import app from '../../app.js';
import {
  insertMockCategory,
  insertMockCategories,
  insertMockPackingList,
  insertMockItems,
} from '../helpers/insertMockData';
import { createMockCategory, createObjectId } from '../helpers/createMockData';

describe('GET /categories', () => {
  it('should return all categories', async () => {
    await insertMockCategories();
    const res = await request(app).get('/api/categories');
    expect(res.status).toBe(200);
    expect(res.body).toHaveLength(3);
  });
  it('should return category by id', async () => {
    const mockCategory = await insertMockCategory({ name: 'Clothes' });
    const mockId = mockCategory._id.toString();
    const res = await request(app).get(`/api/categories/${mockId}`);
    const resCategory = res.body;
    expect(res.status).toBe(200);
    expect(resCategory._id).toBe(mockId);
    expect(resCategory.name).toBe('Clothes');
  });
  it('should return not found error', async () => {
    const mockId = createObjectId();
    const res = await request(app).get(`/api/categories/${mockId}`);
    expect(res.status).toBe(404);
  });
});

describe('POST /categories', () => {
  it('should create a new category', async () => {
    const packingList = await insertMockPackingList();
    const mockCategory = await createMockCategory({
      name: 'Apples',
      packingList: packingList._id,
    });
    const res = await request(app).post('/api/categories').send(mockCategory);
    const newCategory = res.body;
    expect(res.status).toBe(201);
    expect(newCategory.name).toBe('Apples');
  });
  it('should return validation error', async () => {
    const packingList = await insertMockPackingList();
    const mockCategory = await createMockCategory({
      name: '',
      packingList: packingList._id,
    });
    const res = await request(app).post('/api/categories').send(mockCategory);
    expect(res.status).toBe(400);
  });
});

describe('PATCH /categories', () => {
  it('should update an category by id', async () => {
    const mockCategory = await insertMockCategory();
    const mockId = mockCategory._id.toString();
    const res = await request(app)
      .patch(`/api/categories/${mockId}`)
      .send({ name: 'Updated name' });
    const updatedCategory = res.body;
    expect(res.status).toBe(200);
    expect(updatedCategory._id).toBe(mockId);
    expect(updatedCategory.name).toBe('Updated name');
  });
  it('should return not found error', async () => {
    const mockId = createObjectId();
    const res = await request(app).patch(`/api/categories/${mockId}`);
    expect(res.status).toBe(404);
  });
});

describe('DELETE /categories', () => {
  it('should delete an category by id', async () => {
    const packingList = await insertMockPackingList();
    const mockCategory = await insertMockCategory({
      packingList: packingList._id,
    });
    const mockId = mockCategory._id.toString();
    const res = await request(app).delete(`/api/categories/${mockId}`);
    const deletedCategory = res.body;
    expect(res.status).toBe(200);
    expect(deletedCategory._id).toBe(mockId);
    const search = await request(app).get(`/api/categories/${mockId}`);
    expect(search.status).toBe(404);
  });
  it('should return not found error', async () => {
    const mockId = createObjectId();
    const res = await request(app).delete(`/api/categories/${mockId}`);
    expect(res.status).toBe(404);
  });
});

describe('PATCH /:categoryId/mark-all-packed', () => {
  it('should mark all items as packed', async () => {
    const packingList = await insertMockPackingList();
    const category = await insertMockCategory({
      packingList: packingList._id,
    });
    await insertMockItems(undefined, {
      packed: false,
      category: category._id,
    });
    const res = await request(app)
      .patch(`/api/categories/${category._id.toString()}/mark-all-packed`)
      .send({ packed: true });
    expect(res.body.updatedItems).toBe(3);
    expect(res.status).toBe(200);
  });
  it('should mark all items as unpacked', async () => {
    const packingList = await insertMockPackingList();
    const category = await insertMockCategory({
      packingList: packingList._id,
    });
    await insertMockItems(5, {
      packed: true,
      category: category._id,
    });
    const res = await request(app)
      .patch(`/api/categories/${category._id.toString()}/mark-all-packed`)
      .send({ packed: false });
    expect(res.body.updatedItems).toBe(-5);
    expect(res.status).toBe(200);
  });
});
