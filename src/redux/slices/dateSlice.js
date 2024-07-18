// import { createSlice } from '@reduxjs/toolkit';

// const getNextDeliveryTimes = (selectedDate) => {
//   const now = new Date();
//   const selected = new Date(selectedDate);
//   const times = [];
//   const slots = [9, 12, 15, 18];
  
//   if (selected.toDateString() === now.toDateString()) {
//     // Today
//     slots.forEach(slot => {
//       if (slot > now.getHours() || (slot === now.getHours() && now.getMinutes() < 60)) {
//         const date = new Date(now);
//         date.setHours(slot, 0, 0, 0);
//         times.push(date.toISOString());
//       }
//     });
//   } else {
//     // Future date
//     slots.forEach(slot => {
//       const date = new Date(selected);
//       date.setHours(slot, 0, 0, 0);
//       times.push(date.toISOString());
//     });
//   }

//   return times;
// };


// const initialState = {
//   deliveryTimes: [],
// };

// const dateSlice = createSlice({
//   name: 'date',
//   initialState,
//   reducers: {
//     updateDeliveryTimes: (state, action) => {
//       state.deliveryTimes = getNextDeliveryTimes(action.payload);
//     },
//   },
// });

// export const { updateDeliveryTimes } = dateSlice.actions;
// export default dateSlice.reducer;