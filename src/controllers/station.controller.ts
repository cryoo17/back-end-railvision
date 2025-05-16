import { Response } from "express";
import { IPaginationQuery, IReqUser } from "../utils/interfaces";
import response from "../utils/response";
import { FilterQuery } from "mongoose";
import StationModel, { stationDAO, TStation } from "../models/station.model";

export default {
  async create(req: IReqUser, res: Response) {
    try {
      const payload = { ...req.body, createdBy: req.user?.id } as TStation;
      await stationDAO.validate(payload);
      const result = await StationModel.create(payload);
      response.success(res, result, "success create an station");
    } catch (error) {
      response.error(res, error, "failed create an station");
    }
  },
  async findAll(req: IReqUser, res: Response) {
    try {
      const {
        limit = 10,
        page = 1,
        search,
      } = req.query as unknown as IPaginationQuery;

      const query: FilterQuery<TStation> = {};

      if (search) {
        Object.assign(query, {
          ...query,
          $text: {
            $search: search,
          },
        });
      }

      const result = await StationModel.find(query)
        .limit(10)
        .skip((page - 1) * limit)
        .sort({ createdAt: -1 })
        .exec();
      const count = await StationModel.countDocuments(query);

      response.pagination(
        res,
        result,
        {
          current: +page,
          total: count,
          totalPages: Math.ceil(count / limit),
        },
        "success find all stations"
      );
    } catch (error) {
      response.error(res, error, "failed find all stations");
    }
  },
  async findOne(req: IReqUser, res: Response) {
    try {
      const { id } = req.params;
      const result = await StationModel.findById(id);
      response.success(res, result, "success find an station");
    } catch (error) {
      response.error(res, error, "failed find an station");
    }
  },
  async update(req: IReqUser, res: Response) {
    try {
      const { id } = req.params;
      const result = await StationModel.findByIdAndUpdate(id, req.body, {
        new: true,
      });
      response.success(res, result, "success update an station");
    } catch (error) {
      response.error(res, error, "failed update an station");
    }
  },
  async remove(req: IReqUser, res: Response) {
    try {
      const { id } = req.params;
      const result = await StationModel.findByIdAndDelete(id, { new: true });
      response.success(res, result, "success remove an station");
    } catch (error) {
      response.error(res, error, "failed remove an station");
    }
  },
  async findOneBySlug(req: IReqUser, res: Response) {
    try {
      const { slug } = req.params;
      const result = await StationModel.findOne({ slug });
      response.success(res, result, "success find an station by slug");
    } catch (error) {
      response.error(res, error, "failed find an station by slug");
    }
  },
};
