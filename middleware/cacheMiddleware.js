const cache = {};

const cacheMiddleware = (req, res, next) => {
    const key = req.originalUrl || req.url;
    const cachedData = cache[key];

    if (cachedData){//cache-hit
        res.set('X-Cache', 'HIT');
        return res.json(cachedData);
    }

    const originalJson = res.json.bind(res);
    res.json = (body) => {
        if (res.statusCode >= 200 && res.statusCode < 300){
            cache[key] = body;
        }
        res.set('X-Cache', 'MISS');
        return originalJson(body);
    };

    next();
};

module.exports = cacheMiddleware;
