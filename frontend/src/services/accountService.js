import api from "./api";

const accountService = {
  getAccounts() {
    return api.get("/accounts");
  },

  getAccount(accountId) {
    return api.get(`/accounts/${accountId}`);
  },

  getBalance(accountId) {
    return api.get(`/accounts/${accountId}/balance`);
  }
};

export default accountService;