
// type User = {
//     name: string;
//     email: string;
//     isActive: boolean;
// }
// const user = {
//     name: "ravoof",
//     email: "ravoof@gmail.com",
//     isActive: true
// }

// function createUser(user: User): User {
//     return {name: "", email: "", isActive: true}
// }

// createUser({name: "", email: "", isActive: true})



// function createCourse():{name: string, price: number}{
//     return {name: "reactjs", price: 399}
// }

type User = {
    readonly _id: string
    name: string;
    email: string;
    isActive: boolean;
    credcardDetails?: number;
}

let myUser: User = {
    _id: "12345",
    name: "h",
    email: "h@h.com",
    isActive: false
}

type cardNumber = {
    cardnumber: string 
}

type cardDate = {
    cardDate: string
}

type cardDetails = cardNumber & cardDate & {
    cvv: number
}

myUser.email = "h@gmail.com"


export{} 