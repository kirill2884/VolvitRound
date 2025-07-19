const {ccclass, property} = cc._decorator;

@ccclass
export default class Platform extends cc.Component {

    onBeginContact(contact: cc.PhysicsContact, self: cc.PhysicsCollider, other: cc.PhysicsCollider) {
    if (other.node.name === "cat") {
        const normal = contact.getWorldManifold().normal;
        
        // Проверяем, что герой сверху платформы
        if (normal.y > 0.5) {
            const jumpCtrl = other.node.getComponent("JumpController");
            if (jumpCtrl) {
                jumpCtrl.setOnGround(true);
            }
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
