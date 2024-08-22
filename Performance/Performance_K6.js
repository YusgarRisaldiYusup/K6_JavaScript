import { check, group } from "k6";
import http from "k6/http";

// Import third-party reporter
import { htmlReport } from "https://raw.githubusercontent.com/benc-uk/k6-reporter/main/dist/bundle.js";
import { textSummary } from "https://jslib.k6.io/k6-summary/0.0.1/index.js";

// Konfigurasi performance test
// Performance testing mengukur seberapa baik sistem merespons di bawah beban yang berbeda.
export const options = {
  stages: [
    { duration: "10s", target: 10 }, // Meningkatkan jumlah VU dari 0 hingga 10 selama 10 detik
    { duration: "30s", target: 10 }, // Menjaga jumlah VU tetap pada 10 selama 30 detik
    { duration: "10s", target: 0 }, // Mengurangi jumlah VU dari 10 menjadi 0 selama 10 detik
  ],
};

export default function () {
  // Group GET request
  group("GET User", function () {
    let Url_Get = "https://reqres.in/api/users?page=2";
    let response_get = http.get(Url_Get);
    check(response_get, {
      "is status 200": (r) => r.status === 200,
    });
  });

  // Group POST request
  group("POST new user", function () {
    let Url_Post = "https://reqres.in/api/users";
    let Body = JSON.stringify({
      name: "morpheus",
      job: "leader",
    });
    let response_post = http.post(Url_Post, Body);
    check(response_post, {
      "is status 201": (r) => r.status === 201,
    });
  });
}

export function handleSummary(data) {
  return {
    "Performance_K6.html": htmlReport(data),
    stdout: textSummary(data, { indent: " ", enableColors: true }),
  };
}
