export const USERNAME = "lameeralharbi8";

const BASE = "https://api.github.com";

export async function requestJson(url, options = {}) {
  let response;

  try {
    response = await fetch(url, options);
  } catch (error) {
    throw new Error("تعذر الاتصال بالإنترنت. تحقق من الشبكة وحاول مجددًا.");
  }

  if (response.status === 404) {
    throw new Error("404: الحساب أو المورد غير موجود. تحقق من اسم المستخدم.");
  }

  if (response.status === 403 || response.status === 429) {
    throw new Error("تم الوصول إلى حد الطلبات المسموح. حاول لاحقًا.");
  }

  if (!response.ok) {
    throw new Error(`فشل الطلب: HTTP ${response.status}`);
  }

  return response.json();
}

export const getUser = () =>
  requestJson(`${BASE}/users/${encodeURIComponent(USERNAME)}`);

export const getRepos = () =>
  requestJson(`${BASE}/users/${encodeURIComponent(USERNAME)}/repos?per_page=100&sort=updated`);

export const sendMessage = (payload) =>
  requestJson("https://jsonplaceholder.typicode.com/posts", {
    method: "POST",
    headers: {
      "Content-Type": "application/json; charset=UTF-8"
    },
    body: JSON.stringify(payload)
  });
