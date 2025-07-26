
const {ccclass, property} = cc._decorator;

@ccclass
export default class LifeController extends cc.Component {

    @property(cc.SpriteFrame)
    lifiSprite: cc.SpriteFrame = null;

    @property
    maxCountLife: number = 3;
    private currentCountLife: number;

    onLoad () {
        this.currentCountLife = this.maxCountLife
        this.putAlllife(this.currentCountLife)
        cc.systemEvent.on("hit-enemy",this.decreaseLife, this)
        cc.systemEvent.on("hero-fall",this.decreaseLifeFall, this)
    }

    putAlllife(count:number){
        this.node.removeAllChildren();

        for (let i = 0; i < count; i++) {
            const lifeNode = new cc.Node(`Life_${i}`);
            const sprite = lifeNode.addComponent(cc.Sprite);
            sprite.spriteFrame = this.lifiSprite;

            sprite.sizeMode = cc.Sprite.SizeMode.CUSTOM;
            lifeNode.width = 100;
            lifeNode.height = 100;

            lifeNode.setPosition(i * 120, 0); 
            this.node.addChild(lifeNode);
        }
    }

    decreaseLife(){
        this.currentCountLife--
        if(this.currentCountLife > -1) {
            this.putAlllife(this.currentCountLife)
        }
    }

    decreaseLifeFall(){
        this.decreaseLife()
        console.log("hero fall");
        if(this.currentCountLife > -1){
             cc.systemEvent.emit('restore-hero')
        } else {
             cc.systemEvent.emit('end-game')
        }
       
    }

    start () {

    }

    onDestroy(): void {
         cc.systemEvent.off("hit-enemy")
         cc.systemEvent.off("hero-fall")
    }
}
