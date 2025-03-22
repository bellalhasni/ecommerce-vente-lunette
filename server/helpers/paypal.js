const paypal = require("paypal-rest-sdk");

paypal.configure({
  mode: "sandbox",
  client_id: "AX4WZGT56n1Lu7zZhLuZe4f_PfM55NeLLIoJwHPsw4NL3ckuc-NTJed8A0arCr7dMr_4DHlV304qNr4L",
  client_secret: "EBBW2CpDtO72QYVPsta2l83sO-tN7DQFZsHfb5ZvK4jSB4TZhJPUv2JKkfAwzbZz-QbeNQuN4VWKUbiW",
});

module.exports = paypal;
