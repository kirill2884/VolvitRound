import AbstractButtonView from "./view/AbstractButtonView";

const {ccclass, property} = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {

    @property(AbstractButtonView)
    playButton: AbstractButtonView = null;

    onLoad() {
        this.playButton.node.on('button-clicked', this.onPlayButtonClicked, this);
    }

    private onPlayButtonClicked() {
        cc.systemEvent.emit('game-ready-to-start');
    }

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {}

    start () {

    }

    // update (dt) {}
}
