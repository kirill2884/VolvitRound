import MainLevelScript from "./MainLevelScript";

const { ccclass, property } = cc._decorator;

@ccclass
export default class LevelExitTrigger extends cc.Component {

    @property(cc.Node)
    locationContainer: cc.Node = null;

    @property
    locationNames: string = "location_";

    @property
    lastLocationNumber: number = 3

    private loadPermission:boolean = false;

    private next:boolean = false;
    private previus:boolean = false;

    private parentNode:cc.Node = null;
    private mainLevelScript:MainLevelScript = null;

    onLoad(){
        this.parentNode = this.node.parent
        this.mainLevelScript = this.parentNode.getComponent(MainLevelScript)
    }

    onBeginContact(contact:cc.PhysicsContact, self:cc.PhysicsCollider, other:cc.PhysicsCollider) {        
        const otherNode:cc.Node = other.node
        if (otherNode.name === "cat") {   
            const nextLocationNumber = this.getNextNumberLocation(self); 
            
            if(this.loadPermission){
                const loader = this.locationContainer.getComponent("LocationLoader") as any;
                if (loader && loader.loadlocation) {
                    loader.loadlocation(`${this.locationNames}${nextLocationNumber}`, this.previus, this.next);
                } else {
                    cc.warn("LocationLoader not found");
                }
            }      

        }
    }

    getNextNumberLocation(self: cc.PhysicsCollider): number {
        this.loadPermission = false
        if (self.node.name === 'RightBorder') {
            if (this.mainLevelScript.getCurrentlocation() < this.lastLocationNumber) {
                this.mainLevelScript.incrementLocation();
                this.next = true
                this.previus = false
                this.loadPermission = true
            }

        } else if (self.node.name === 'LeftBorder') {
            if (this.mainLevelScript.getCurrentlocation() > 0) {
                this.mainLevelScript.decrementLocation();
                this.next = false
                this.previus = true
                this.loadPermission = true
            }

        }

        return this.mainLevelScript.getCurrentlocation() ;
    }
}