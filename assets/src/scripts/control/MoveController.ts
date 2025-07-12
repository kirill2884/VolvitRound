// Learn TypeScript:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/life-cycle-callbacks.html

const {ccclass, property} = cc._decorator;

@ccclass
export default class MoveController extends cc.Component {

    side:number = 0;
    moving:boolean = false;
    // maxPos: number;
    // minPos: number;
    x:number;

    @property
    Delta:number = 20;
    private animationMove:cc.Animation = null


    protected onLoad(): void {

        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_DOWN, this.onKeyDown, this)
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_UP, this.onKeyUp, this)
        this.animationMove = this.node.getComponent(cc.Animation);
        // this.maxPos = this.node.parent.width/2 - this.node.width/2;
        // this.minPos = - this.node.parent.width/2 + this.node.width/2;

        let canvas = this.node.parent
        // canvas.on(cc.Node.EventType.TOUCH_START,this.onTouchStart,this)
        // canvas.on(cc.Node.EventType.TOUCH_END,this.onTouchEnd,this)
        // canvas.on(cc.Node.EventType.TOUCH_MOVE,this.onTouchMove,this)
        // canvas.on(cc.Node.EventType.TOUCH_CANCEL,this.onTouchCancel,this)
        
    }

    onKeyDown(e: cc.Event.EventKeyboard): any{   
        if(this.moveKeys(e.keyCode) || this.jumpKeys(e.keyCode)){
            const state = this.animationMove.getAnimationState('cat_move');

            if (!state.isPlaying) {
                this.animationMove.play('cat_move');
            }

            if(e.keyCode == cc.macro.KEY.left || e.keyCode == cc.macro.KEY.a) {
                this.side = -1
                this.node.scaleX = -0.3
            } else if (e.keyCode == cc.macro.KEY.right || e.keyCode == cc.macro.KEY.d) {
                this.node.scaleX = 0.3
                this.side = 1
            }


        }
        



    }

    moveKeys(keyCode: number) {
        return keyCode == cc.macro.KEY.left || keyCode == cc.macro.KEY.right || keyCode == cc.macro.KEY.a || keyCode == cc.macro.KEY.d
    }

    jumpKeys(keyCode: number) {
        return keyCode == cc.macro.KEY.space || keyCode == cc.macro.KEY.w
    }

    onKeyUp(e: cc.Event.EventKeyboard): any{
        if(this.moveKeys(e.keyCode)) {
            this.side = 0
        } 
        this.animationMove.stop('cat_move')
    }

    // onTouchStart(e:cc.Event.EventTouch){
    //     this.moving = true
    // }

    // onTouchEnd(e:cc.Event.EventTouch){
    //     this.moving = false
        
    // }

    // onTouchCancel(e:cc.Event.EventTouch){
    //     this.moving = false;
        
    // }

    // onTouchMove(e:cc.Event.EventTouch){
    //     if (!this.moving) return;
    //     // Получаем позицию касания в пространстве родительского узла
    //     const touchPos = e.getLocation();
    //     const localPos = this.node.parent.convertToNodeSpaceAR(touchPos);
    //     // Обновляем только X-координату
    //     this.x = localPos.x;
    // }

    protected start(): void {
        
    }

    // touchMoveUpdate(){
    //     // // Ограничиваем позицию платформы
    //     // this.x = cc.misc.clampf(this.x, this.minPos, this.maxPos);
    //     // this.node.x = this.x;
    //     this.setPosition(this.x)

    // }

    keyMoveUpdate(){
        if(this.side == 0) return
        this.setPosition(this.node.x + this.Delta * this.side)
    }

    update (dt) {
        
        // if (this.moving) {
        //     this.touchMoveUpdate()
        //     return
        // }

        this.keyMoveUpdate()
    }

    setPosition(pos:number){
        let newPos = pos

        // if(newPos > this.maxPos){
        //     newPos = this.maxPos
        // } else if (newPos < this.minPos) {
        //     newPos = this.minPos
        // }

        this.node.x = newPos
        this.node.emit('moved',newPos);
    }

    protected onDestroy(): void {
        cc.systemEvent.off(cc.SystemEvent.EventType.KEY_DOWN, this.onKeyDown, this)
        cc.systemEvent.off(cc.SystemEvent.EventType.KEY_UP, this.onKeyUp, this)
            
        // let canvas = this.node.parent;
        
        // canvas.off(cc.Node.EventType.TOUCH_START,this.onTouchStart,this)
        // canvas.off(cc.Node.EventType.TOUCH_END,this.onTouchEnd,this)
        // canvas.off(cc.Node.EventType.TOUCH_MOVE,this.onTouchMove,this)
        // canvas.off(cc.Node.EventType.TOUCH_CANCEL,this.onTouchCancel,this)
    }
}
