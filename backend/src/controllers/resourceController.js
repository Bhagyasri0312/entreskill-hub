import asyncHandler from '../utils/asyncHandler.js';

const reservedQueryKeys = new Set(['limit', 'page', 'sort', 'search']);

const isAdmin = (req) => req.user?.role === 'admin';

const buildQueryFilter = (query) =>
  Object.entries(query).reduce((filter, [key, value]) => {
    if (!reservedQueryKeys.has(key) && value !== undefined && value !== '') {
      filter[key] = value;
    }

    return filter;
  }, {});

const buildSearchFilter = (search) => {
  if (!search) {
    return {};
  }

  const regex = new RegExp(search, 'i');

  return {
    $or: [{ name: regex }, { title: regex }, { description: regex }]
  };
};

const canAccessDocument = (document, req, ownerField) => {
  if (isAdmin(req) || !ownerField) {
    return true;
  }

  return document?.[ownerField]?.toString() === req.user?._id.toString();
};

export const createCrudController = (Model, options = {}) => {
  const ownerField = options.ownerField ?? 'userId';
  const publicRead = options.publicRead ?? false;

  return {
    list: asyncHandler(async (req, res) => {
      const limit = Math.min(Number.parseInt(req.query.limit ?? '50', 10) || 50, 100);
      const sort = req.query.sort ?? '-createdAt';
      const baseFilter = buildQueryFilter(req.query);
      const searchFilter = buildSearchFilter(req.query.search);
      const ownershipFilter = publicRead || isAdmin(req) ? {} : { [ownerField]: req.user._id };

      const filter = { ...ownershipFilter, ...baseFilter, ...searchFilter };
      const data = await Model.find(filter).sort(sort).limit(limit);

      return res.json({ data });
    }),

    getById: asyncHandler(async (req, res) => {
      const document = await Model.findById(req.params.id);

      if (!document) {
        return res.status(404).json({ message: 'Resource not found' });
      }

      if (!canAccessDocument(document, req, ownerField) && !publicRead) {
        return res.status(403).json({ message: 'Forbidden' });
      }

      return res.json({ data: document });
    }),

    create: asyncHandler(async (req, res) => {
      const payload = { ...req.body };

      if (ownerField) {
        payload[ownerField] = req.user._id;
      }

      const document = await Model.create(payload);

      return res.status(201).json({ message: 'Resource created', data: document });
    }),

    updateById: asyncHandler(async (req, res) => {
      const document = await Model.findById(req.params.id);

      if (!document) {
        return res.status(404).json({ message: 'Resource not found' });
      }

      if (!canAccessDocument(document, req, ownerField) && !publicRead) {
        return res.status(403).json({ message: 'Forbidden' });
      }

      Object.assign(document, req.body);
      await document.save();

      return res.json({ message: 'Resource updated', data: document });
    }),

    deleteById: asyncHandler(async (req, res) => {
      const document = await Model.findById(req.params.id);

      if (!document) {
        return res.status(404).json({ message: 'Resource not found' });
      }

      if (!canAccessDocument(document, req, ownerField) && !publicRead) {
        return res.status(403).json({ message: 'Forbidden' });
      }

      await document.deleteOne();

      return res.json({ message: 'Resource deleted' });
    })
  };
};

export default createCrudController;