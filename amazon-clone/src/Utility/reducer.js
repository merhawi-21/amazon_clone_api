

import { Type } from "./action.type";

export const initialState = {
  basket: [],
  user:null
};

export const reducer = (state, action) => {
  switch (action.type) {
    case Type.ADD_TO_BASKET:
      // Check if the item already exists in the basket
      const existingItem = state.basket.find((item) => item.id === action.item.id);
      // console.log(existingItem);

      if (!existingItem) {
        // console.log("Adding new item to basket:", action.item);
        return {
          ...state,
          basket: [...state.basket, { ...action.item, amount: 1 }],
        };
      } else {
        const updatedBasket = state.basket.map((item) =>{
         return item.id === action.item.id
            ? { ...item, amount: item.amount + 1 } // Properly return updated item
            : item
          } );
        // console.log(updatedBasket);

        return {
          ...state,
          basket: updatedBasket,
        };
      }
      case Type.REMOVE_FROM_BASKET:
      const index = state.basket.findIndex((item) => item.id === action.id);
      const newBasket = [...state.basket];

      if (index >= 0) { // Fix: Allow index 0
        if (newBasket[index].amount > 1) {
          // Decrease the amount
          newBasket[index] = { ...newBasket[index], amount: newBasket[index].amount - 1 };
        } else {
          // Remove the item from the basket
          newBasket.splice(index, 1);
        }
      }
      // console.log( newBasket);

      return {
        ...state,
        basket: newBasket,
      };
      case Type.EMPTY_BASKET:
        return{
          ...state,
          basket:[]
        }
      case Type.SET_USER:
        return {
          ...state,
          user:action.user,
        }

    default:
      return state;
  }
};