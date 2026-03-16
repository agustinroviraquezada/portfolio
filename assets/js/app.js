(function () {
  const projectsList = document.getElementById("projects-list");
  const searchInput = document.getElementById("search-input");
  const tagsFilter = document.getElementById("tags-filter");
  const clearFiltersBtn = document.getElementById("clear-filters-btn");
  const resultsInfo = document.getElementById("results-info");

  if (
    !projectsList ||
    !searchInput ||
    !tagsFilter ||
    !clearFiltersBtn ||
    !resultsInfo ||
    !Array.isArray(projects)
  ) {
    return;
  }

  let selectedTag = "";
  let searchTerm = "";

  function normalizeText(value) {
    return String(value || "").trim().toLowerCase();
  }

  function getAllTags(items) {
    const tags = [];

    items.forEach(function (project) {
      if (Array.isArray(project.tags)) {
        project.tags.forEach(function (tag) {
          if (!tags.includes(tag)) {
            tags.push(tag);
          }
        });
      }
    });

    return tags.sort(function (a, b) {
      return a.localeCompare(b);
    });
  }

  function projectMatches(project, term, tag) {
    const normalizedTerm = normalizeText(term);
    const normalizedTag = normalizeText(tag);

    const matchesTag =
      !normalizedTag ||
      (Array.isArray(project.tags) &&
        project.tags.some(function (projectTag) {
          return normalizeText(projectTag) === normalizedTag;
        }));

    const searchableText = [
      project.name,
      project.description,
      Array.isArray(project.tags) ? project.tags.join(" ") : ""
    ]
      .join(" ")
      .toLowerCase();

    const matchesSearch =
      !normalizedTerm || searchableText.includes(normalizedTerm);

    return matchesTag && matchesSearch;
  }

  function createLink(url, text) {
    const link = document.createElement("a");
    link.href = url;
    link.target = "_blank";
    link.rel = "noopener noreferrer";
    link.textContent = text;
    return link;
  }

  function createTagElement(tag) {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "project-tag";
    button.textContent = tag;

    button.addEventListener("click", function () {
      selectedTag = selectedTag === tag ? "" : tag;
      renderTagFilters();
      renderProjects();
    });

    return button;
  }

  function createProjectCard(project) {
    const article = document.createElement("article");
    article.className = "project-card";

    const title = document.createElement("h3");
    title.textContent = project.name;

    const description = document.createElement("p");
    description.textContent = project.description;

    const tagsContainer = document.createElement("div");
    tagsContainer.className = "project-tags";

    if (Array.isArray(project.tags)) {
      project.tags.forEach(function (tag) {
        tagsContainer.appendChild(createTagElement(tag));
      });
    }

    const links = document.createElement("div");
    links.className = "project-links";

    if (project.repoUrl) {
      links.appendChild(createLink(project.repoUrl, "Repositorio"));
    }

    if (project.demoUrl) {
      links.appendChild(createLink(project.demoUrl, "View"));
    }

    article.appendChild(title);
    article.appendChild(description);
    article.appendChild(tagsContainer);
    article.appendChild(links);

    return article;
  }

  function renderTagFilters() {
    const allTags = getAllTags(projects);
    tagsFilter.innerHTML = "";

    allTags.forEach(function (tag) {
      const button = document.createElement("button");
      button.type = "button";
      button.className = "tag-button";
      button.textContent = tag;

      if (normalizeText(selectedTag) === normalizeText(tag)) {
        button.classList.add("active");
      }

      button.addEventListener("click", function () {
        selectedTag = selectedTag === tag ? "" : tag;
        renderTagFilters();
        renderProjects();
      });

      tagsFilter.appendChild(button);
    });
  }

  function renderProjects() {
    const filteredProjects = projects.filter(function (project) {
      return projectMatches(project, searchTerm, selectedTag);
    });

    projectsList.innerHTML = "";

    if (filteredProjects.length === 0) {
      const emptyState = document.createElement("div");
      emptyState.className = "empty-state";
      emptyState.textContent = "No se han encontrado proyectos con esos filtros.";
      projectsList.appendChild(emptyState);
    } else {
      filteredProjects.forEach(function (project) {
        projectsList.appendChild(createProjectCard(project));
      });
    }

    const filters = [];
    if (searchTerm.trim()) {
      filters.push('texto: "' + searchTerm.trim() + '"');
    }
    if (selectedTag) {
      filters.push('tag: "' + selectedTag + '"');
    }

    resultsInfo.textContent =
      filteredProjects.length +
      " proyecto(s) mostrado(s)" +
      (filters.length ? " | Filtros activos: " + filters.join(" · ") : "");
  }

  searchInput.addEventListener("input", function (event) {
    searchTerm = event.target.value || "";
    renderProjects();
  });

  clearFiltersBtn.addEventListener("click", function () {
    selectedTag = "";
    searchTerm = "";
    searchInput.value = "";
    renderTagFilters();
    renderProjects();
  });

  renderTagFilters();
  renderProjects();
})();
