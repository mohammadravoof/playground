interface User {
    readonly dbId: number
    email: string,
    userId: number,
    googleId?: string,
    // startTrail: () => string
    startTrail(): string,
    getCoupon(couponname: string, value: number): number
}

const hitesh: User = { dbId: 22, email: "h@h.com", userId: 211, startTrail:() => {return ""}
, getCoupon: (name: "ravoof", discout: 10) => {
    return 10
}}

hitesh.email = "h@gc.com"