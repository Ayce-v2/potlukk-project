// import { AddDishAction, CreateDishFromFormAction, Dish, PopulateDishesAction, UpdateDishesAction } from "../reducers/host-dishes-reducer";
// import { takeEvery, put, all, select } from "@redux-saga/core/effects"
// import { dishesQuery } from "../api/dishes-request";

export function incompleteForNow(){}


// export function* createDishFromFormData(action:CreateDishFromFormAction) {
//     const dish:Dish = {
//     name: action.payload.name,
//     description: action.payload.description,
//     broughtBy: action.payload.broughtBy,
//     serves: action.payload.serves,
//     allergens: action.payload.allergens
//     }

//     yield put({type:"ADD_DISH", payload: dish});
// }


// export function* populateDishes(action:PopulateDishesAction) {
   
// }





// export function* updateDishes(action:UpdateDishesAction) {
    
//     const dishes:Dish[] = yield select(store => store.dishes.dishes)
//     const returnDishes:Dish[] = yield dishesQuery({potlukkId:action.payload, dishes});
//     yield put({type:"SET_DISHES", payload:returnDishes});

// }





// export function* watchCreateDishFromFormData() {
//     yield takeEvery("CREATE_DISH_FROM_FORM", createDishFromFormData);
// }


// export function* watchPopulateDishes() {}



// export function* watchUpdateDishes() {
//     yield takeEvery("UPDATE_DISHES", updateDishes);
// }