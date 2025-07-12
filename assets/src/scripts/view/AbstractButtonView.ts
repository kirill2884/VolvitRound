const { ccclass, property } = cc._decorator;

@ccclass
export default class AbstractButtonView extends cc.Component {

    @property
    normalScale: number = 1;

    @property
    pressedScale: number = 1.1;

    @property
    tweenDuration: number = 0.1;

    onLoad() {
        this.node.on(cc.Node.EventType.TOUCH_START, this.onTouchStart, this);
        this.node.on(cc.Node.EventType.TOUCH_END, this.onTouchEnd, this);
        this.node.on(cc.Node.EventType.TOUCH_CANCEL, this.onTouchCancel, this);

        this.node.scale = this.normalScale;
    }

    protected onTouchStart(): void {
        this.animateScale(this.pressedScale);
    }

    protected onTouchEnd(): void {
        this.animateScale(this.normalScale);
        this.emitClick();
    }

    protected onTouchCancel(): void {
        this.animateScale(this.normalScale);
    }

    protected animateScale(targetScale: number): void {
        cc.Tween.stopAllByTarget(this.node);
        cc.tween(this.node).to(this.tweenDuration, { scale: targetScale }).start();
    }

    protected emitClick(): void {
        this.node.emit('button-clicked');
    }
}
