const cache = {};
const itemCache = {};
const TTL = 60 * 1000; 

const cacheMiddleware = (req, res, next) => {
    const key = req.originalUrl || req.url;
    const cachedEntry = cache[key];
    const now = Date.now();

    if (cachedEntry && now - cachedEntry.createdAt < TTL) { // cache-hit
        res.set('X-Cache', 'HIT');
        return res.json(cachedEntry.data);
    }

    const originalJson = res.json.bind(res);
    res.json = (body) => {
        if (res.statusCode >= 200 && res.statusCode < 300) {
            cache[key] = {
                data: body,
                createdAt: Date.now()
            };
        }
        res.set('X-Cache', 'MISS');
        return originalJson(body);
    };

    next();
};

const itemCacheMiddleware = (req, res, next) => {
    const id = req.params.id;
    const cachedEntry = itemCache[id];
    const now = Date.now();

    if (cachedEntry && now - cachedEntry.createdAt < TTL) { // cache-hit
        res.set('X-Cache', 'HIT');
        return res.json(cachedEntry.data);
    }

    const originalJson = res.json.bind(res);
    res.json = (body) => {
        if (res.statusCode >= 200 && res.statusCode < 300) {
            itemCache[id] = {
                data: body,
                createdAt: Date.now()
            };
        }
        res.set('X-Cache', 'MISS');
        return originalJson(body);
    };

    next();
};

module.exports = {
    cacheMiddleware,
    itemCacheMiddleware
};
