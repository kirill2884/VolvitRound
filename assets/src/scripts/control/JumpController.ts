const { ccclass, property } = cc._decorator;

@ccclass
export default class JumpController extends cc.Component {

    @property
    height: number = 1;

    @property
    duration: number = 0.5; 

    private isJumping: boolean = false;

    onLoad() {

        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_DOWN, this.handleJump, this);
    }

    handleJump(e: cc.Event.EventKeyboard) {
        
        if(e.keyCode == cc.macro.KEY.space && !this.isJumping){
            this.isJumping = true;
            const originalPosition = this.node.position;

            cc.tween(this.node)
                .to(this.duration, { position: originalPosition.add(cc.v3(0, this.height, 0)) }, { easing: 'cubicOut' })
                .to(this.duration, { position: originalPosition }, { easing: 'cubicIn' })
                .call(() => {
                    this.isJumping = false;
                })
                .start();
        }

    }
}