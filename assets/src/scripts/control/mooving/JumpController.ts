const { ccclass, property } = cc._decorator;

@ccclass
export default class JumpController extends cc.Component {

    @property
    jumpForce: number = 2000;

    @property
    moveSpeed: number = 200;

    private keysPressed: Set<number> = new Set();
    private isOnGround: boolean = false;

    onLoad() {
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_DOWN, this.onKeyDown, this);
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_UP, this.onKeyUp, this);
    }

    onDestroy() {
        cc.systemEvent.off(cc.SystemEvent.EventType.KEY_DOWN, this.onKeyDown, this);
        cc.systemEvent.off(cc.SystemEvent.EventType.KEY_UP, this.onKeyUp, this);
    }

    onKeyDown(e: cc.Event.EventKeyboard) {
        this.keysPressed.add(e.keyCode);
        if ((e.keyCode === cc.macro.KEY.space || e.keyCode === cc.macro.KEY.w) && this.isOnGround) {            
            this.jump();
        }
    }

    onKeyUp(e: cc.Event.EventKeyboard) {
        this.keysPressed.delete(e.keyCode);
    }

    jump() {
        const rb = this.node.getComponent(cc.RigidBody);
        if (rb) {
            console.log("jump");
            console.log(rb.getMass());
            
            rb.awake = true;
            rb.linearVelocity = cc.v2(rb.linearVelocity.x, 0); // сброс текущей вертикальной скорости
            rb.applyLinearImpulse(cc.v2(0, this.jumpForce), rb.getWorldCenter(), true);
            this.isOnGround = false; // прыгнули — уже не на земле
        }
    }

    update(dt: number) {
        const rb = this.node.getComponent(cc.RigidBody);
        if (!rb) return;

        let velocityX = 0;

        if (this.keysPressed.has(cc.macro.KEY.left)) {
            velocityX = -this.moveSpeed;
        } else if (this.keysPressed.has(cc.macro.KEY.right)) {
            velocityX = this.moveSpeed;
        }

        // Меняем только горизонтальную скорость, не трогаем Y
        rb.linearVelocity = cc.v2(velocityX, rb.linearVelocity.y);
    }

    // Вызывается платформами при касании
    public setOnGround(value: boolean) {
        this.isOnGround = value;
    }
}
