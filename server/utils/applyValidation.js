import validationMiddleware from '../middleware/validationMiddleware';

// Routes Type: Route[]
// Route Type: { method, path, schema, controller }
// Apply validation middlewares to specified routes
//
// EXAMPLE USAGE IN packingListRoutes.js
// const router = Router()

// const routes = [
//   {method: 'get', path: '/', schema: packingListSchema, controller: getPackingLists}
//    ...
// ]

// applyValidation(router, routes);

const applyValidation = (router, routes) => {
  routes.forEach(({ method, path, schema, controller }) => {
    if (schema) {
      router[method](path, validationMiddleware(schema), controller);
    } else {
      router[method](path, controller);
    }
  });
};

export default applyValidation;
