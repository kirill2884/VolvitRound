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
    private leftRestore:boolean = false
    private currentLocation:cc.Node = null;

    @property({ type: [cc.String] })
    locationWitoutGround:string[] = []


     onLoad () {
        cc.systemEvent.on('restore-hero',this.restoreHero,this)

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

        this.currentLocation = cc.instantiate(prefab);

        this.node.removeAllChildren(); 
        const rigidBody = this.mainHero.getComponent(cc.RigidBody);
            
            if(rigidBody){
                rigidBody.active = false;
            }

        this.node.addChild(this.currentLocation); 

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
                    this.leftRestore = true
                    startPoint = this.currentLocation.getChildByName("StartPointLeft");
                }

                if(previus){
                    this.leftRestore = false
                    startPoint = this.currentLocation.getChildByName("StartPointRight");
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

    restoreHero(){
        let restorePosition = null; 
        if(this.leftRestore){
            restorePosition = this.currentLocation.getChildByName("StartPointLeft");
        } else {
            restorePosition = this.currentLocation.getChildByName("StartPointRight");
        }
        this.mainHero.setPosition(restorePosition.getPosition());

    }

    onDestroy(): void {
        cc.systemEvent.off("restore-hero")
    }

}
