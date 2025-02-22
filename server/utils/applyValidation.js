import validationMiddleware from "../middleware/validationMiddleware";

//
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
