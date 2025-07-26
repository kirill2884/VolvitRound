const {ccclass, property} = cc._decorator;

@ccclass
export default class FallingDownController extends cc.Component {

    @property
    maxDownposition: number = -500;
    private processGame:boolean = true;

    onLoad () {
        cc.systemEvent.on('end-game',this.endGame,this)
    }


    endGame(){
        console.log('Game-over');
        this.processGame = false
    }
    // start () {

    // }

    update (dt) {
        if(this.node.y < this.maxDownposition && this.processGame){
            cc.systemEvent.emit('hero-fall');
        }
    }
}
