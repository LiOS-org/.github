const constructShowcaseProjects = async () => {
    const projectsFile = await fetch("./data/projects.json");
    const projectsData = await projectsFile.json();
    const showcaseProjects = projectsData.showcaseProjects;
    const showcaseProjectsContainer = document.querySelector(".card-container-1");

    showcaseProjects.forEach(async metadata => {
        const projectDataFetch = await fetch(metadata);
        const projectData = await projectDataFetch.json();  

        const projectName = projectData.projectName;
        const projectDescription = projectData.projectDescription;
        const projectBaseUrl = projectData.baseUrl;
        const projectFavicon = projectData.favicon;
        const projectFaviconUrl = projectBaseUrl + projectFavicon;

        const projectCard = document.createElement("div");
        projectCard.classList.add("lios-card");
        
        projectCard.innerHTML = //html
            `
            <img src="${projectFaviconUrl}" alt="${projectName}"   class="favicon"/>
            <h3>${projectName}</h3>
            <hr />
            <p>${projectDescription}</p>
            <div class="lios-button-group"></div>
            `
            ;
        const ctaContainer = projectCard.querySelector(".lios-button-group");
        const ctas = projectData.cta;
        for (const [label, url] of Object.entries(ctas)) {
            const ctaButton = document.createElement("a");
            ctaButton.classList.add("lios-button");
            ctaButton.href = url;
            ctaButton.innerHTML = `<span>${label}</span>`;
            ctaContainer.appendChild(ctaButton);

        }
        showcaseProjectsContainer.appendChild(projectCard);
    });
};
constructShowcaseProjects();