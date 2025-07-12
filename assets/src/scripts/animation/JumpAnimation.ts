const { ccclass, property } = cc._decorator;

@ccclass
export default class JumpAnimation extends cc.Component {

    @property
    Height: number = 30;

    @property
    Duration: number = 0.4;

    onLoad() {
        this.startBouncing();
    }

    startBouncing() {
        const startY = this.node.y;

        cc.tween(this.node)
            .repeatForever(
                cc.tween()
                    .to(this.Duration, { y: startY + this.Height }, { easing: 'sineOut' })
                    .to(this.Duration, { y: startY }, { easing: 'sineIn' })
            )
            .start();
    }
}