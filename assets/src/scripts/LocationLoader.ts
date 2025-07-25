const {ccclass, property} = cc._decorator;

@ccclass
export default class LocationLoader extends cc.Component {

    @property(cc.Node)
    mainHero:cc.Node = null;

    @property(cc.Node)
    groundNode:cc.Node = null;
    private groundRigitBody:cc.RigidBody = null;
    private groundSprite:cc.Sprite = null
    private grounSpriteFrame:cc.SpriteFrame = null;


    @property({ type: [cc.String] })
    locationWitoutGround:string[] = []


     onLoad () {

        this.groundRigitBody = this.groundNode.getComponent(cc.RigidBody)  
        this.groundSprite = this.groundNode.getComponent(cc.Sprite)
        this.grounSpriteFrame = this.groundSprite.spriteFrame;
     }

    loadlocation(name: string, previus:boolean, next:boolean) {
       cc.assetManager.resources.load(`prefabs/Level_1/${name}`, cc.Prefab, (err, prefab) => {
        if (err) {
            cc.error(err);
            return;
        }

        const locationNode = cc.instantiate(prefab);

        this.node.removeAllChildren(); 
        const rigidBody = this.mainHero.getComponent(cc.RigidBody);
            
            if(rigidBody){
                rigidBody.active = false;
            }

        this.node.addChild(locationNode); 

        if(this.locationWitoutGround.includes(name)){
            this.groundRigitBody.active = false
            this.groundSprite.spriteFrame = null
        } else {
            this.groundRigitBody.active = true
            this.groundSprite.spriteFrame = this.grounSpriteFrame
        }

        this.scheduleOnce(() => {
            let startPoint = null; 
            if(next){
                startPoint = locationNode.getChildByName("StartPointLeft");
            }

            if(previus){
                startPoint = locationNode.getChildByName("StartPointRight");
            }
            

            if (startPoint && this.mainHero) {
                this.mainHero.setPosition(startPoint.getPosition());

                if (rigidBody) {
                    rigidBody.linearVelocity = cc.v2(0, 0);
                    rigidBody.angularVelocity = 0;
                    rigidBody.active = true;
                }
            } else {
                cc.warn("StartPoint или mainHero не найдены");
            }
        }, 0);

    });
}

}
