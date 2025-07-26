const {ccclass, property} = cc._decorator;

@ccclass
export default class CameraController extends cc.Component {
    @property(cc.Node)
    target: cc.Node = null;

    private left:boolean = true;

    public restorePosition(){
        this.node.x = 0
    }

    public setLeft (parametr:boolean) {
        this.left = parametr
    }

    update(dt: number) {
        // console.log(this.target.x );
        console.log(this.left) 
        if (this.target && (this.target.x > 150 && this.target.x < 1040)) {
           
            if(this.left){
                this.node.x = this.target.x - 150; 
            } else {
                this.node.x = this.target.x + 20; 
            }
            
        }

        // if (this.target && (this.target.x > 150 && this.target.x < 1040) && !this.left ) {
        //     this.node.x = this.target.x - 150; 
        // }
    }
}