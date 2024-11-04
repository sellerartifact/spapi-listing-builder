export class BulletPoint {
  bullet_points: string[]
  constructor(bullet_points: string[] = []) {
    this.bullet_points = bullet_points
  }

  main() {
    return this.bullet_points.map((item) => {
      return {
        value: item,
      }
    })
  }
}
