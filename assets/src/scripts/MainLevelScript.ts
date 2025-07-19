
const {ccclass, property} = cc._decorator;

@ccclass
export default class MainLevelScript extends cc.Component {

     private currentLocation:number = 0;

     onLoad () {
        cc.director.getPhysicsManager().enabled = true; // Включаем физику
        cc.director.getCollisionManager().enabled = true;
     }

     public getCurrentlocation(){
         return this.currentLocation
     }

     public incrementLocation(){
         this.currentLocation++
     }

     public decrementLocation(){
         this.currentLocation--
     }

}
