(function () {
  const projectsList = document.getElementById("projects-list");
  const tagFilters = document.getElementById("tag-filters");

  if (!projectsList || !tagFilters || !Array.isArray(projects)) {
    return;
  }

  let activeTag = "All";

  function getAllTags() {
    const tagsSet = new Set();

    projects.forEach((project) => {
      if (Array.isArray(project.tags)) {
        project.tags.forEach((tag) => tagsSet.add(tag));
      }
    });

    return ["All", ...Array.from(tagsSet).sort()];
  }

  function createTagButton(tag) {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "tag-button";
    button.textContent = tag;

    if (tag === activeTag) {
      button.classList.add("active");
    }

    button.addEventListener("click", function () {
      activeTag = tag;
      renderTagFilters();
      renderProjects();
    });

    return button;
  }

  function renderTagFilters() {
    const tags = getAllTags();
    tagFilters.innerHTML = "";

    tags.forEach((tag) => {
      tagFilters.appendChild(createTagButton(tag));
    });
  }

  function createProjectCard(project) {
    const article = document.createElement("article");
    article.className = "project-card";

    const title = document.createElement("h3");
    title.textContent = project.name;

    const description = document.createElement("p");
    description.textContent = project.description;

    article.appendChild(title);
    article.appendChild(description);

    if (Array.isArray(project.tags) && project.tags.length > 0) {
      const tagsContainer = document.createElement("div");
      tagsContainer.className = "project-tags";

      project.tags.forEach((tag) => {
        const tagElement = document.createElement("span");
        tagElement.className = "tag";
        tagElement.textContent = tag;
        tagsContainer.appendChild(tagElement);
      });

      article.appendChild(tagsContainer);
    }

    const links = document.createElement("div");
    links.className = "project-links";

    if (project.repoUrl) {
      const repoLink = document.createElement("a");
      repoLink.href = project.repoUrl;
      repoLink.target = "_blank";
      repoLink.rel = "noopener noreferrer";
      repoLink.textContent = "Repositorio";
      links.appendChild(repoLink);
    }

    if (project.demoUrl) {
      const demoLink = document.createElement("a");
      demoLink.href = project.demoUrl;
      demoLink.target = "_blank";
      demoLink.rel = "noopener noreferrer";
      demoLink.textContent = "Demo";
      links.appendChild(demoLink);
    }

    article.appendChild(links);

    return article;
  }

  function renderProjects() {
    projectsList.innerHTML = "";

    const filteredProjects =
      activeTag === "All"
        ? projects
        : projects.filter((project) => {
            return Array.isArray(project.tags) && project.tags.includes(activeTag);
          });

    filteredProjects.forEach((project) => {
      projectsList.appendChild(createProjectCard(project));
    });
  }

  renderTagFilters();
  renderProjects();
})();