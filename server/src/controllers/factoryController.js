import { ApiError } from '../utils/ApiError.js';
import { asyncHandler } from '../utils/asyncHandler.js';
import { sendSuccess } from '../utils/apiResponse.js';

export function createSingletonController(Model) {
  return {
    get: asyncHandler(async (req, res) => sendSuccess(res, await Model.findOne({ singletonKey: 'default' }), 'Resource fetched')),
    update: asyncHandler(async (req, res) => {
      const document = await Model.findOneAndUpdate(
        { singletonKey: 'default' },
        { ...req.validatedBody, singletonKey: 'default' },
        { new: true, upsert: true, runValidators: true }
      );
      return sendSuccess(res, document, 'Resource updated');
    }),
  };
}

export function createCrudController(Model, options = {}) {
  const { populate = '', sort = 'sortOrder createdAt' } = options;
  return {
    list: asyncHandler(async (req, res) => sendSuccess(res, await Model.find().populate(populate).sort(sort), 'Resources fetched')),
    create: asyncHandler(async (req, res) => {
      const document = await Model.create(req.validatedBody);
      const populated = populate ? await document.populate(populate) : document;
      return sendSuccess(res, populated, 'Resource created', 201);
    }),
    update: asyncHandler(async (req, res) => {
      const document = await Model.findByIdAndUpdate(req.params.id, req.validatedBody, { new: true, runValidators: true }).populate(populate);
      if (!document) throw new ApiError(404, 'Resource not found');
      return sendSuccess(res, document, 'Resource updated');
    }),
    remove: asyncHandler(async (req, res) => {
      const document = await Model.findByIdAndDelete(req.params.id);
      if (!document) throw new ApiError(404, 'Resource not found');
      return sendSuccess(res, null, 'Resource deleted');
    }),
  };
}
