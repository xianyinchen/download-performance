const { ccclass, property } = cc._decorator;

@ccclass
export default class Loading extends cc.Component {

    @property(cc.Label)
    animation: cc.Label = null;

    @property(cc.Label)
    atlas: cc.Label = null;

    @property(cc.Label)
    audio: cc.Label = null;

    @property(cc.Label)
    font: cc.Label = null;

    @property(cc.Label)
    particles: cc.Label = null;

    @property(cc.Label)
    prefab: cc.Label = null;

    @property(cc.Label)
    textures: cc.Label = null;

    @property(cc.Label)
    tmxs: cc.Label = null;

    @property(cc.Label)
    video: cc.Label = null;

    @property(cc.Label)
    models: cc.Label = null;

    onLoad() {
        cc.assetManager.cacheManager.clearCache();
    }

    start() {
        let time = (new Date()).getTime();
        cc.assetManager.loadBundle('models', (err, res: cc.AssetManager.Bundle) => {
            res.loadDir("list", (err, list) => {
                this.models.string = `models = ${(new Date()).getTime() - time} - ${list.length}`;
                this.loadImages();
            })
        })
    }

    loadImages() {
        let time2 = (new Date()).getTime();
        cc.assetManager.loadBundle('textures', (err, res: cc.AssetManager.Bundle) => {
            res.loadDir("list", (err, list) => {
                this.textures.string = `images = ${(new Date()).getTime() - time2} - ${list.length}`;
                this.loadAudios();
            })
        })
    }

    loadAudios() {
        let time2 = (new Date()).getTime();
        cc.assetManager.loadBundle('audio', (err, res: cc.AssetManager.Bundle) => {
            res.loadDir("list", (err, list) => {
                this.audio.string = `audios = ${(new Date()).getTime() - time2} - ${list.length}`;
                this.loadPlists();
            })
        })
    }

    loadPlists() {
        let time2 = (new Date()).getTime();
        cc.assetManager.loadBundle('atlas', (err, res: cc.AssetManager.Bundle) => {
            res.loadDir("list", (err, list) => {
                this.atlas.string = `plists = ${(new Date()).getTime() - time2} - ${list.length}`;
                this.loadTmxs();
            })
        })
    }

    loadTmxs() {
        let time2 = (new Date()).getTime();
        cc.assetManager.loadBundle('tmxs', (err, res: cc.AssetManager.Bundle) => {
            res.loadDir("list", (err, list) => {
                this.tmxs.string = `tmxs = ${(new Date()).getTime() - time2} - ${list.length}`;
                this.loadVideos();
            })
        })
    }


    loadVideos() {
        let time2 = (new Date()).getTime();
        cc.assetManager.loadBundle('video', (err, res: cc.AssetManager.Bundle) => {
            res.loadDir("list", (err, list) => {
                this.video.string = `videos = ${(new Date()).getTime() - time2} - ${list.length}`;
                this.loadAnims();
            })
        })
    }

    loadAnims() {
        let time2 = (new Date()).getTime();
        cc.assetManager.loadBundle('animation', (err, res: cc.AssetManager.Bundle) => {
            res.loadDir("list", (err, list) => {
                this.animation.string = `anims = ${(new Date()).getTime() - time2} - ${list.length}`;
                this.loadFont();
            })
        })
    }

    loadFont() {
        let time2 = (new Date()).getTime();
        cc.assetManager.loadBundle('font', (err, res: cc.AssetManager.Bundle) => {
            res.loadDir("list/Averia_Serif", (err, list) => {
                this.font.string = `font = ${(new Date()).getTime() - time2} - ${list.length}`;
                this.loadParticles();
            })
        })
    }

    loadParticles() {
        let time2 = (new Date()).getTime();
        cc.assetManager.loadBundle('particles', (err, res: cc.AssetManager.Bundle) => {
            res.loadDir("list", (err, list) => {
                this.particles.string = `particles = ${(new Date()).getTime() - time2} - ${list.length}`;
                this.loadPrefabs();
            })
        })
    }

    loadPrefabs() {
        let time2 = (new Date()).getTime();
        cc.assetManager.loadBundle('prefab', (err, res: cc.AssetManager.Bundle) => {
            res.loadDir("list", (err, list) => {
                this.prefab.string = `prefabs = ${(new Date()).getTime() - time2} - ${list.length}`;
            })
        })
    }
}
