class PlayerTank extends BaseTank{
    /** @type {number} */
    fuel = 5000

    constructor(scene, x, y, texture, frame){
        super(scene, x, y, texture, frame)
        this.cursors = scene.input.keyboard.createCursorKeys()
        this.keys = scene.input.keyboard.addKeys({
            w:Phaser.Input.Keyboard.KeyCodes.W,
            a:Phaser.Input.Keyboard.KeyCodes.A,
            s:Phaser.Input.Keyboard.KeyCodes.S,
            d:Phaser.Input.Keyboard.KeyCodes.D
        })
        this.damageMax = 10
        this.currentSpeed = 0
    }
    update(){
        super.update()
        if (this.fuel >= 0.01){
            if(this.keys.w.isDown){
                if(this.currentSpeed < this.tankSpeed){
                    this.currentSpeed += 10
                }
            }else if(this.keys.s.isDown){
                if(this.currentSpeed > -this.tankSpeed){
                    this.currentSpeed -= 10
                    this.maxFuel -= 0.1
                }
            }else(
                this.currentSpeed *= 0.9
            )
            if(this.keys.a.isDown){
                if(this.currentSpeed > 0){
                    this.hull.angle--
                }else{
                    this.hull.angle++
                }
            }else if(this.keys.d.isDown){
                if(this.currentSpeed > 0){
                    this.hull.angle++
                }else{
                    this.hull.angle--
                }
            }
        }
        else if(this.fuel <= 0){
            this.currentSpeed *= 0.5
        }
        if (this.currentSpeed >= 1) {
            this.fuel--
        }
        if (this.currentSpeed <= -1) {
            this.fuel--
        }
        this.scene.physics.velocityFromRotation(this.hull.rotation, this.currentSpeed, this.hull.body.velocity)
        const worldPoint = this.scene.input.activePointer.positionToCamera(this.scene.cameras.main)
        this.turret.rotation = Phaser.Math.Angle.Between(this.turret.x, this.turret.y, worldPoint.x, worldPoint.y)
    }
    damage(){
        this.scene.cameras.main.shake(200, 0.005)
        this.damageCount++
        if(this.isDestroyed()){
            this.burn()
        }
    }
}