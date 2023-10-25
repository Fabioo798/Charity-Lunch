import { Request, Response, NextFunction } from "express";
import { DishModel } from "../../domain/dish.schema.js";
import { Interceptors } from "./interceptors.js";

jest.mock("../../domain/dish.schema.js");

describe("Interceptors", () => {
  let interceptors: Interceptors;
  let req: Request;
  let res: Response;
  let next: NextFunction;

  beforeEach(() => {
    interceptors = new Interceptors();
    req = { body: {} } as Request;
    res = {} as Response;
    next = jest.fn();
  });

  describe("dishInterceptor", () => {

    it("should call the next function with an error if an error occurs", async () => {
      const error = new Error("Some error");
      DishModel.countDocuments = jest.fn().mockRejectedValue(error);

      await interceptors.dishInterceptor(req, res, next);

      expect(next).toHaveBeenCalled();
    });
  });
});