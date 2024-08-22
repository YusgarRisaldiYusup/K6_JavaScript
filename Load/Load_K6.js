import { check, group } from "k6";
import http from "k6/http";

// Import third-party reporter
import { htmlReport } from "https://raw.githubusercontent.com/benc-uk/k6-reporter/main/dist/bundle.js";
import { textSummary } from "https://jslib.k6.io/k6-summary/0.0.1/index.js";

// Load test configuration
// Load Testing mengukur bagaimana sistem berperforma di bawah beban yang diharapkan selama operasi normal. Tujuan dari pengujian ini adalah untuk memastikan bahwa sistem dapat menangani jumlah pengguna atau beban yang direncanakan tanpa masalah, seperti penurunan performa atau kegagalan.
export const options = {
  stages: [
    { duration: "10s", target: 10 }, // Meningkatkan jumlah pengguna virtual (VU) dari 0 hingga 10 selama 10 detik
    { duration: "30s", target: 10 }, // Menjaga jumlah VU tetap pada 10 selama 30 detik
    { duration: "10s", target: 0 }, // Mengurangi jumlah VU dari 10 menjadi 0 selama 10 detik
  ],
};

export default function () {
  // Group GET request
  group("GET User", function () {
    // Inisialisasi URL untuk permintaan GET
    let Url_Get = "https://reqres.in/api/users?page=2";

    // Melakukan permintaan GET ke URL
    let response_get = http.get(Url_Get);

    // Pemeriksaan Assertion: Memastikan status respons adalah 200 OK
    check(response_get, {
      "is status 200": (r) => r.status === 200,
    });
  });

  // Group POST request
  group("POST new user", function () {
    // Inisialisasi URL untuk permintaan POST
    let Url_Post = "https://reqres.in/api/users";

    // Inisialisasi Payload Body untuk permintaan POST
    let Body = JSON.stringify({
      name: "morpheus",
      job: "leader",
    });

    // Melakukan permintaan POST ke URL dengan Payload Body
    let response_post = http.post(Url_Post, Body);

    // Pemeriksaan Assertion: Memastikan status respons adalah 201 Created
    check(response_post, {
      "is status 201": (r) => r.status === 201,
    });

    // Sub-group untuk scenario POST yang berbeda
    group("POST new user - Scenario 2", function () {
      // Mengubah Payload Body untuk skenario kedua
      let Body = JSON.stringify({
        name: "neo",
        job: "developer",
      });

      // Melakukan permintaan POST ke URL dengan Payload Body yang baru
      let response_post = http.post(Url_Post, Body);

      // Pemeriksaan Assertion: Memastikan status respons adalah 201 Created
      check(response_post, {
        "is status 201": (r) => r.status === 201,
      });
    });
  });
}

export function handleSummary(data) {
  return {
    "Loadk6.html": htmlReport(data),
    stdout: textSummary(data, { indent: " ", enableColors: true }),
  };
}
