import { getUser } from "./api.js";
import { setStatus } from "./render.js";

const status = document.querySelector("#status");
const profile = document.querySelector("#profile");

async function loadProfile() {
  setStatus(status, "جاري تحميل الحساب...");

  try {
    const user = await getUser();

    const avatar = document.createElement("img");
    avatar.src = user.avatar_url;
    avatar.alt = "صورة الحساب";
    avatar.width = 120;
    avatar.height = 120;

    const name = document.createElement("h2");
    name.textContent = user.name || user.login;

    const bio = document.createElement("p");
    bio.textContent = user.bio || "لا توجد نبذة";

    const followers = document.createElement("p");
    followers.textContent = `المتابعون: ${user.followers}`;

    const repos = document.createElement("p");
    repos.textContent = `المستودعات العامة: ${user.public_repos}`;

    const link = document.createElement("a");
    link.href = user.html_url;
    link.textContent = "زيارة حساب GitHub";
    link.target = "_blank";
    link.rel = "noopener noreferrer";

    profile.replaceChildren(
      avatar, name, bio, followers, repos, link
    );

    setStatus(status, "");
  } catch (error) {
    setStatus(status, error.message);
  }
}

loadProfile();
