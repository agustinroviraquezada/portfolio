(function () {
  const projectsList = document.getElementById("projects-list");

  if (!projectsList || !Array.isArray(projects)) {
    return;
  }

  function createProjectCard(project) {
    const article = document.createElement("article");
    article.className = "project-card";

    const title = document.createElement("h3");
    title.textContent = project.name;

    const description = document.createElement("p");
    description.textContent = project.description;

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

    article.appendChild(title);
    article.appendChild(description);
    article.appendChild(links);

    return article;
  }

  projects.forEach((project) => {
    projectsList.appendChild(createProjectCard(project));
  });
})();