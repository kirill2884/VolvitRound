// Learn TypeScript:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/life-cycle-callbacks.html

const {ccclass, property} = cc._decorator;

@ccclass
export default class FlowerController extends cc.Component {

    private animationFlower:cc.Animation = null
    private currentTimeout: number = null;
    private activeThorns:boolean = false;
    private rigitBody:cc.RigidBody = null;

     onLoad () {
        this.rigitBody = this.node.getComponent(cc.RigidBody)
        this.animationFlower = this.node.getChildByName('visual').getComponent(cc.Animation);
        this.showThorns()

     }

     onBeginContact(contact: cc.PhysicsContact, self: cc.Collider, other: cc.Collider) {
        if (this.activeThorns) {
            if (other.node.name === 'cat') {
                console.log("hit-hero");
                
                // Эмитим событие
                cc.systemEvent.emit('hit-enemy');
            }
        }
    }

    showThorns() {
        const state = this.animationFlower.getAnimationState('show_thorns');
        if (!state.isPlaying) {
            this.animationFlower.play('show_thorns');
            this.clearTimeout();
            this.currentTimeout = setTimeout(() => this.hideThorns(), 3000);
            this.activeThorns = true
        }
    }

    hideThorns() {
        
        const state = this.animationFlower.getAnimationState('remove_thorns');
        if (!state.isPlaying) {
            this.animationFlower.play('remove_thorns');
            this.clearTimeout();
            this.currentTimeout = setTimeout(() => this.showThorns(), 3000);
            this.activeThorns = false
        }
    }

    clearTimeout() {
        if (this.currentTimeout !== null) {
            clearTimeout(this.currentTimeout);
            this.currentTimeout = null;
        }
    }

    start () {

    }

    update (dt) {
        this.rigitBody.active = this.activeThorns;
    }
}
