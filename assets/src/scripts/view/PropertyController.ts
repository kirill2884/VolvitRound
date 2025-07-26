
const {ccclass, property} = cc._decorator;

@ccclass
export default class ProperyController extends cc.Component {

    @property(cc.Node)
    mainCamera:cc.Node = null

    onLoad(){

    }

    start () {

    }

    update (dt) {
        this.node.x = this.mainCamera.x - 880
    }
}
