import { utilService } from "./util.service";


export const reviewService = {
    getReviews,
}

async function getReviews(user){

}



const reviews =[
    {
        _id: utilService.makeId(),
        txt: 'Cool!',
        rate: 1,
        from: {
            _id: 'u101',
            fullName: 'Muki Ben Moshe',
            imgUrl: null 
        },
        on: {
            _id: 'u102',
            fullName: 'Puki Ben Pinhas',
            imgUrl: null
        }
    }
]