const { ccclass, property } = cc._decorator;

@ccclass
export default class JumpController extends cc.Component {

    @property
    height: number = 1;

    @property
    width: number = 1;

    @property
    duration: number = 0.5; 

    private isJumping: boolean = false;
    keysPressed: Set<number> = new Set();

    onLoad() {

        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_DOWN, this.onKeyDown, this);
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_UP, this.onKeyUp, this);
    }

    onKeyDown(e: cc.Event.EventKeyboard) {
        this.keysPressed.add(e.keyCode);

        if (this.jumpKeys(e.keyCode) && !this.isJumping) {
            this.handleJump(e);
        }
    }

    onKeyUp(e: cc.Event.EventKeyboard) {
        this.keysPressed.delete(e.keyCode);
    }

    handleJump(e: cc.Event.EventKeyboard) {
        const originalY = this.node.y;
         
        if(this.jumpKeys(e.keyCode) && !this.isJumping){
            this.isJumping = true;

            cc.tween(this.node)
                .to(this.duration, { y: originalY + this.height }, { easing: 'cubicOut' })
                .to(this.duration, { y: originalY }, { easing: 'cubicIn' })
                .call(() => {
                    this.isJumping = false;
                })
                .start();
        }

    }

    jumpKeys(keyCode: number) {
        return keyCode == cc.macro.KEY.space || keyCode == cc.macro.KEY.w
    }

    update(dt: number) {
        
        if (this.isJumping && this.keysPressed.has(cc.macro.KEY.right)) {
            this.node.x += this.width * dt;
        }

        if (this.isJumping && this.keysPressed.has(cc.macro.KEY.left)) {
            this.node.x -= this.width * dt;
        }
    }
}