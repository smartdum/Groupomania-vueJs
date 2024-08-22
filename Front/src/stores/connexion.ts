import { defineStore } from 'pinia';

export const useConnexionStore = defineStore('connexion', {
  state: () => ({
    isLoggedIn: false
  }),
  actions: {
    checkLoginStatus() {
      const tokenString = localStorage.getItem('token');
      console.log("tokenString : ", tokenString);
      this.isLoggedIn = !!tokenString; // Convert token existence to boolean
      console.log("isLogged : ", this.isLoggedIn);
      return this.isLoggedIn;
    }, 
    /**
     * Logs in the user by setting the token in local storage and updating the isLoggedIn state.
     *
     * @return {void}
     */
    login(login: string, password: string): void {
      console.log("login : ", login, "password : ", password);
      if (this.isLoggedIn) {
        console.log("Déjà loggué !")
        return
      }
      localStorage.setItem("token", "flkvnklfbn<kldfsnb" as string);
      console.log("token : ", localStorage.getItem("token") as string);
      this.isLoggedIn = true;
      this.checkLoginStatus();
    }, 
    /**
     * Logs out the user by removing the token from local storage and updates the isLoggedIn state.
     *
     * @return {void} No return value
     */
    logout(): void {
      localStorage.removeItem("token");
      this.checkLoginStatus();
    }
  }
});