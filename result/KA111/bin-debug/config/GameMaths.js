// TypeScript file
var GameMaths;
(function (GameMaths) {
    function getRandomArray(max, returnnum) {
        var des = [];
        for (var i = 0; i < max; i++) {
            des.push(i);
        }
        var random;
        var temp = [];
        for (var j = 0; j < returnnum; j++) {
            random = Math.ceil(Math.random() * des.length) - 1; //向上取整
            temp.push(des[random]);
            des.splice(random, 1);
        }
        return temp;
    }
    GameMaths.getRandomArray = getRandomArray;
    var factory = null;
    function addArmatureToFactory(name) {
        if (null == factory) {
            factory = dragonBones.EgretFactory.factory;
        }
        var skeletonData = RES.getRes(name + "_ske_json");
        var textureData = RES.getRes(name + "_tex_json");
        var texture = RES.getRes(name + "_tex_png");
        if (null == factory.getDragonBonesData(name)) {
            factory.parseDragonBonesData(skeletonData);
        }
        if (null == factory.getTextureAtlasData(name)) {
            factory.parseTextureAtlasData(textureData, texture);
        }
        return factory;
    }
    GameMaths.addArmatureToFactory = addArmatureToFactory;
    function removeArmatureToFactory(name) {
        if (null == factory) {
            return;
        }
        var skeletonData = RES.getRes(name + "_ske_json");
        var textureData = RES.getRes(name + "_tex_json");
        var texture = RES.getRes(name + "_tex_png");
        if (null == factory.getDragonBonesData(name)) {
            factory.removeDragonBonesData(skeletonData);
        }
        if (null == factory.getTextureAtlasData(name)) {
            factory.removeTextureAtlasData(textureData, texture);
        }
    }
    GameMaths.removeArmatureToFactory = removeArmatureToFactory;
    function hasHit(x, y, width, height, hitX, hitY) {
        if (x < hitX && hitX < x + width && y < hitY && hitY < y + height) {
            return true;
        }
        return false;
    }
    GameMaths.hasHit = hasHit;
})(GameMaths || (GameMaths = {}));
//# sourceMappingURL=GameMaths.js.map