import { sendMessage } from "./api.js";
import { setStatus } from "./render.js";

const form = document.querySelector("#contact-form");
const status = document.querySelector("#form-status");
const submitButton = document.querySelector("#send");

form.addEventListener("submit", async (event) => {
  event.preventDefault();

  const data = new FormData(form);
  const name = String(data.get("name") || "").trim();
  const email = String(data.get("email") || "").trim();
  const message = String(data.get("message") || "").trim();

  if (!name || !email || message.length < 10) {
    setStatus(status, "تأكدي من الاسم والبريد والرسالة (10 أحرف على الأقل).");
    return;
  }

  submitButton.disabled = true;
  setStatus(status, "جاري الإرسال...");

  try {
    const result = await sendMessage({
      name,
      email,
      body: message
    });

    setStatus(status, `نجح الإرسال التجريبي! رقم الطلب: ${result.id}`);
    form.reset();
  } catch (error) {
    setStatus(status, `فشل الإرسال: ${error.message}`);
  } finally {
    submitButton.disabled = false;
  }
});
