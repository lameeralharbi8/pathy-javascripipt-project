import { getRepos } from "./api.js";
import { setStatus, createElement } from "./render.js";

const status = document.querySelector("#status");
const projects = document.querySelector("#projects");

const FEATURED = ["dev-card", "todo-app"];

async function loadProjects() {
  setStatus(status, "جاري تحميل المشاريع...");

  try {
    // اختبار رسالة الخطأ عند إضافة ?test-error للرابط
    const testError = new URLSearchParams(window.location.search)
      .has("test-error");

    if (testError) {
      throw new Error("تعذر تحميل المشاريع. تحقق من اتصال الإنترنت وحاول مرة أخرى.");
    }

    const repos = await getRepos();

    const filtered = repos.filter(repo => !repo.fork);

    const sorted = filtered.sort((a, b) =>
      new Date(b.updated_at) - new Date(a.updated_at)
    );

    const featured = sorted.filter(repo =>
      FEATURED.includes(repo.name)
    );

    const selected = (featured.length ? featured : sorted).slice(0, 5);

    projects.replaceChildren();

    if (selected.length === 0) {
      setStatus(status, "ما فيه مستودعات");
      return;
    }

    selected.forEach(repo => {
      const card = document.createElement("article");
      card.className = "card";

      const title = createElement("h3", repo.name);
      const description = createElement(
        "p",
        repo.description || "بدون وصف"
      );

      const link = document.createElement("a");
      link.href = repo.html_url;
      link.textContent = "عرض المشروع";
      link.target = "_blank";
      link.rel = "noopener noreferrer";

      card.append(title, description, link);
      projects.append(card);
    });

    setStatus(status, "");
  } catch (error) {
    setStatus(status, error.message);
  }
}

loadProjects();
