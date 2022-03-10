import { AssetManager, assetManager, Component, Label, _decorator } from "cc";

const { ccclass, property } = _decorator;

@ccclass
export default class Loading extends Component {

    @property(Label)
    animation: Label = null;

    @property(Label)
    atlas: Label = null;

    @property(Label)
    audio: Label = null;

    @property(Label)
    font: Label = null;

    @property(Label)
    particles: Label = null;

    @property(Label)
    prefab: Label = null;

    @property(Label)
    textures: Label = null;

    @property(Label)
    tmxs: Label = null;

    @property(Label)
    video: Label = null;

    @property(Label)
    models: Label = null;

    start() {
        let time = (new Date()).getTime();
        assetManager.loadBundle('models', (err, res: AssetManager.Bundle) => {
            res.loadDir("list", (err, list) => {
                this.models.string = `models = ${(new Date()).getTime() - time} - ${list.length}`;
                this.loadImages();
            })
        })
    }

    loadImages() {
        let time2 = (new Date()).getTime();
        assetManager.loadBundle('textures', (err, res: AssetManager.Bundle) => {
            res.loadDir("list", (err, list) => {
                this.textures.string = `images = ${(new Date()).getTime() - time2} - ${list.length}`;
                this.loadPrefabs();
            })
        })
    }

    loadPrefabs() {
        let time2 = (new Date()).getTime();
        assetManager.loadBundle('prefab', (err, res: AssetManager.Bundle) => {
            res.loadDir("list", (err, list) => {
                this.prefab.string = `prefabs = ${(new Date()).getTime() - time2} - ${list.length}`;
                this.loadAudios();
            })
        })
    }


    loadAudios() {
        let time2 = (new Date()).getTime();
        assetManager.loadBundle('audio', (err, res: AssetManager.Bundle) => {
            res.loadDir("list", (err, list) => {
                this.audio.string = `audios = ${(new Date()).getTime() - time2} - ${list.length}`;
                this.loadPlists();
            })
        })
    }

    loadPlists() {
        let time2 = (new Date()).getTime();
        assetManager.loadBundle('atlas', (err, res: AssetManager.Bundle) => {
            res.loadDir("list", (err, list) => {
                this.atlas.string = `plists = ${(new Date()).getTime() - time2} - ${list.length}`;
                this.loadTmxs();
            })
        })
    }

    loadTmxs() {
        let time2 = (new Date()).getTime();
        assetManager.loadBundle('tmxs', (err, res: AssetManager.Bundle) => {
            res.loadDir("list", (err, list) => {
                this.tmxs.string = `tmxs = ${(new Date()).getTime() - time2} - ${list.length}`;
                this.loadVideos();
            })
        })
    }


    loadVideos() {
        let time2 = (new Date()).getTime();
        assetManager.loadBundle('video', (err, res: AssetManager.Bundle) => {
            res.loadDir("list", (err, list) => {
                this.video.string = `videos = ${(new Date()).getTime() - time2} - ${list.length}`;
                this.loadAnims();
            })
        })
    }

    loadAnims() {
        let time2 = (new Date()).getTime();
        assetManager.loadBundle('animation', (err, res: AssetManager.Bundle) => {
            res.loadDir("list", (err, list) => {
                this.animation.string = `anims = ${(new Date()).getTime() - time2} - ${list.length}`;
                this.loadFont();
            })
        })
    }

    loadFont() {
        let time2 = (new Date()).getTime();
        assetManager.loadBundle('font', (err, res: AssetManager.Bundle) => {
            res.loadDir("list", (err, list) => {
                this.font.string = `font = ${(new Date()).getTime() - time2} - ${list.length}`;
                this.loadParticles();
            })
        })
    }

    loadParticles() {
        let time2 = (new Date()).getTime();
        assetManager.loadBundle('particles', (err, res: AssetManager.Bundle) => {
            res.loadDir("list", (err, list) => {
                this.particles.string = `particles = ${(new Date()).getTime() - time2} - ${list.length}`;
            })
        })
    }
}
