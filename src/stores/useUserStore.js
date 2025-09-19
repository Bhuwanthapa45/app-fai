import { create } from "zustand";
const useUserStore = create((set) => ({
  user:{
  
    email:null,
    name: null,
  },

  setUser: (user) => set({user}),
  clearUser: () => set({
    user:{
      email: null,
      name: null,
    },
  }),


 

  
}))
export default useUserStore
