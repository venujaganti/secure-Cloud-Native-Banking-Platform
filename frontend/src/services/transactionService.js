import api from "./api";

const transactionService = {
  getTransactions(params = {}) {
    const searchParams = new URLSearchParams(params);

    const query = searchParams.toString();

    return api.get(
      `/transactions${query ? `?${query}` : ""}`
    );
  },

  getTransaction(transactionId) {
    return api.get(`/transactions/${transactionId}`);
  }
};

export default transactionService;