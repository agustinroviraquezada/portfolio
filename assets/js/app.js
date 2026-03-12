const projectsList = document.getElementById("projects-list");
const tagFilters = document.getElementById("tag-filters");

let activeTag = "All";

function getAllTags() {
  const tags = new Set();

  projects.forEach(p => {
    p.tags.forEach(tag => tags.add(tag));
  });

  return ["All", ...tags];
}

function renderTagFilters() {
  const tags = getAllTags();

  tags.forEach(tag => {
    const button = document.createElement("button");

    button.textContent = tag;
    button.className = "tag-button";

    button.onclick = () => {
      activeTag = tag;
      renderProjects();
    };

    tagFilters.appendChild(button);
  });
}

function renderProjects() {

  projectsList.innerHTML = "";

  const filtered =
    activeTag === "All"
      ? projects
      : projects.filter(p => p.tags.includes(activeTag));

  filtered.forEach(project => {

    const card = document.createElement("article");
    card.className = "project-card";

    const title = document.createElement("h3");
    title.textContent = project.name;

    const desc = document.createElement("p");
    desc.textContent = project.description;

    const tags = document.createElement("div");
    tags.className = "project-tags";

    project.tags.forEach(tag => {
      const span = document.createElement("span");
      span.className = "tag";
      span.textContent = tag;
      tags.appendChild(span);
    });

    const links = document.createElement("div");
    links.className = "project-links";

    const repo = document.createElement("a");
    repo.href = project.repoUrl;
    repo.textContent = "Repositorio";
    repo.target = "_blank";

    links.appendChild(repo);

    if (project.demoUrl) {
      const demo = document.createElement("a");
      demo.href = project.demoUrl;
      demo.textContent = "Demo";
      demo.target = "_blank";
      links.appendChild(demo);
    }

    card.appendChild(title);
    card.appendChild(desc);
    card.appendChild(tags);
    card.appendChild(links);

    projectsList.appendChild(card);

  });
}

renderTagFilters();
renderProjects();