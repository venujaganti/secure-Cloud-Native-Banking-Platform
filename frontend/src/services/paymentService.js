import api from "./api";

const paymentService = {
  transfer(data) {
    return api.post("/payments/transfer", data);
  },

  getBeneficiaries() {
    return api.get("/payments/beneficiaries");
  },

  addBeneficiary(data) {
    return api.post("/payments/beneficiaries", data);
  },

  deleteBeneficiary(id) {
    return api.delete(`/payments/beneficiaries/${id}`);
  }
};

export default paymentService;