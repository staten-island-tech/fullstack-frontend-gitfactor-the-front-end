import createAuth0Client from "@auth0/auth0-spa-js";
import { reactive } from "vue";

export const AuthState = reactive({
  user: null,
  loading: false,
  isAuthenticated: false,
  auth0: null,
});

const config = {
  domain: "dev-0o06df15.us.auth0.com",
  client_id: "8GLHKZmMPunCPpBkN27rrcs1J2rr3X25",
};

export const useAuth0 = (state) => {
  const handleStateChange = async () => {
    state.isAuthenticated = !!(await state.auth0.isAuthenticated());
    state.user = await state.auth0.getUser();
    state.loading = false;
  };

  const initAuth = () => {
    state.loading = true;
    createAuth0Client({
      domain: config.domain,
      client_id: config.client_id,
      cacheLocation: "localstorage",
      redirect_uri: window.location.origin,
    }).then(async (auth) => {
      state.auth0 = auth;
      await handleStateChange();
    });
  };

  const login = async () => {
    await state.auth0.loginWithPopup();
    await handleStateChange();
  };

  const logout = async () => {
    state.auth0.logout({
      returnTo: window.location.origin,
    });
  };

  return {
    login,
    logout,
    initAuth,
  };
};
