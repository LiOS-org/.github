import { liosVirtualDom } from "./../../LiOS-Open/liosOpen.js";
const main = async () => {
    const projectsFile = await fetch("./data/projects.json");
    const projectsData = await projectsFile.json();
    const showcaseProjectsData = projectsData.showcaseProjects;

    // Showcase projects vDOM
    const showcaseProjects = await liosVirtualDom.new();
    showcaseProjects.select(".home-showcase-projects");
    showcaseProjects.classList(["lios-card-container", "card-container-1"]);
    showcaseProjects.id("home-showcase-projects");
    
    for (const project of showcaseProjectsData) {
        const projectMetaFile = await fetch(project);
        const projectMetaData = await projectMetaFile.json();
        
        const projectCard = await showcaseProjects.newChild("div");
        projectCard.classList(["lios-card"]);

        // Project Logo
        const projectLogo = await showcaseProjects.newChild("img");
        projectLogo.attributes({
            src: `${projectMetaData.baseUrl}${projectMetaData.favicon}`,
            alt: `${projectMetaData.projectName} Logo`
        });
        projectLogo.classList(["favicon"]);
        projectLogo.appendTo(projectCard);
        // 

        // Title
        const title = await showcaseProjects.newChild("h3");
        title.textContent(`${projectMetaData.projectName}`);
        title.appendTo(projectCard);
        // 

        // Hr tag
        const divider = await showcaseProjects.newChild("hr");
        divider.appendTo(projectCard);

        // 

        // Project Description
        const description = await showcaseProjects.newChild("p");
        description.textContent(projectMetaData.projectDescription);
        description.appendTo(projectCard);
        // 

        // Cta buttons
        const buttons = await showcaseProjects.newChild("div");
        buttons.classList(["lios-button-group"]);
        const ctas = projectMetaData.cta;
        for (const [label, url] of Object.entries(ctas)) {
            const ctaButton = await showcaseProjects.newChild("a");
            ctaButton.classList(["lios-button"]);
            ctaButton.attributes({
                href:url
            });
            const ctaButtonText = await showcaseProjects.newChild("span");
            ctaButtonText.textContent(label)
            ctaButtonText.appendTo(ctaButton);
            ctaButton.appendTo(buttons);
        };
        buttons.appendTo(projectCard);
        // 

        projectCard.appendTo("root");
    };
    
    showcaseProjects.render();
    // 
};
await main();