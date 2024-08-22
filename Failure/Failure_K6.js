import { check, group } from "k6";
import http from "k6/http";

// Import third-party reporter
import { htmlReport } from "https://raw.githubusercontent.com/benc-uk/k6-reporter/main/dist/bundle.js";
import { textSummary } from "https://jslib.k6.io/k6-summary/0.0.1/index.js";

// Konfigurasi failure test
// Failure testing menguji bagaimana sistem merespons kegagalan atau kesalahan.
export const options = {
  stages: [
    { duration: "10s", target: 10 }, // Meningkatkan jumlah VU dari 0 hingga 10 selama 10 detik
    { duration: "30s", target: 10 }, // Menjaga jumlah VU tetap pada 10 selama 30 detik
    { duration: "10s", target: 0 }, // Mengurangi jumlah VU dari 10 menjadi 0 selama 10 detik
  ],
};

export default function () {
  // Group GET request ke URL yang tidak valid
  group("GET Invalid URL", function () {
    let Url_Get = "https://reqres.in/api/invalid_endpoint"; // URL yang sengaja dibuat salah
    let response_get = http.get(Url_Get);
    check(response_get, {
      "is status 404": (r) => r.status === 404, // Memastikan status respons adalah 404 Not Found
    });
  });

  // Group POST request dengan payload yang salah
  group("POST Invalid Payload", function () {
    let Url_Post = "https://reqres.in/api/users";
    let Body = JSON.stringify({
      invalid_field: "value", // Payload yang salah
    });
    let response_post = http.post(Url_Post, Body);
    check(response_post, {
      "is status 400": (r) => r.status === 400, // Memastikan status respons adalah 400 Bad Request
    });
  });
}

export function handleSummary(data) {
  return {
    "Failure_K6.html": htmlReport(data),
    stdout: textSummary(data, { indent: " ", enableColors: true }),
  };
}
