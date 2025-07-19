const { ccclass, property } = cc._decorator;

@ccclass
export default class Ground extends cc.Component {

    onBeginContact(contact: cc.PhysicsContact, self: cc.PhysicsCollider, other: cc.PhysicsCollider) {
        if (other.node.name === "cat") {
            const jumpCtrl = other.node.getComponent("JumpController");
            if (jumpCtrl) {
                jumpCtrl.setOnGround(true);
            }
        }
    }

    onEndContact(contact: cc.PhysicsContact, self: cc.PhysicsCollider, other: cc.PhysicsCollider) {
        if (other.node.name === "cat") {
            const jumpCtrl = other.node.getComponent("JumpController");
            if (jumpCtrl) {
                jumpCtrl.setOnGround(false);
            }
        }
    }
}
