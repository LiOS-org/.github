import { liosVirtualDom } from "../../LiOS-Open/liosOpen.js";
const projects = await fetch("./../data/allProjects.json")
const projectsList = await projects.json()

export const navigation = async () => {
    const navigationBar = document.querySelector(".lios-header-nav-2");
    const productsButton = document.querySelector(".products-button");
    const navigationContainer = document.querySelector(".navigation-container")
    const navigationPanel = document.querySelector(".navigation-panel");

    const rollUpNavigation = () => {
        navigationContainer.style.height = "53px";
        productsButton.querySelector("svg").style.transform = "rotate(0deg)";
        productsButton.removeEventListener("click", rollUpNavigation);
        productsButton.addEventListener("click", rollDownNavigation);
        navigationPanel.style.display = "none";
    }
    const rollDownNavigation = () => {
        navigationContainer.style.height = "500px";
        productsButton.querySelector("svg").style.transform = "rotate(180deg)";
        productsButton.removeEventListener("click", rollDownNavigation);
        productsButton.addEventListener("click", rollUpNavigation);
        navigationPanel.style.display = "flex";
    };
    productsButton.addEventListener("click", rollDownNavigation);
    // Navigation Map
    // 
    // vDOM for navigation-panel-view
    const navViewPanel = await liosVirtualDom.new();
    navViewPanel.select(".navigation-panel-view");
    navViewPanel.classList(["navigation-panel-view"]);
    for (const project of projectsList.educational) {
        const projectFile = await fetch(project);
        const projectData = await projectFile.json();
        const projectCard = await navViewPanel.newChild();
        projectCard.classList(["lios-card", "navigation-panel-project-card", "lios-frosted-glass"]);

        const logoContainer = await navViewPanel.newChild("div");
        logoContainer.classList(["project-logo", "lios-frosted-glass"]);

        const logo = await navViewPanel.newChild("img");
        logo.attributes({
            src: `${projectData.baseUrl}${projectData.favicon}`,
            alt: `${projectData.projectName} Logo`
        });

        logo.appendTo(logoContainer);
        logoContainer.appendTo(projectCard);

        const divider = await navViewPanel.newChild("hr");
        divider.appendTo(projectCard);
        divider.attributes({
            width: "100%"
        });

        const label = await navViewPanel.newChild("h3");
        label.textContent(projectData.projectName);
        label.appendTo(projectCard);

        const projectPage = projectData.projectName.toLowerCase().replace(/ /g, "-");
        const projectPageButton = await navViewPanel.newChild("a");
        projectPageButton.classList(["lios-action-button", "nav-project-card-button"]);
        projectPageButton.attributes({
            href: `/projects/${projectPage}`
        });
        projectPageButton.textContent("Learn More");
        projectPageButton.appendTo(projectCard);

        projectCard.appendTo("root");
    };

    const navStateManager = navViewPanel.enableMultiState();
    const navViewUiProjects = navStateManager.newState("navViewUiProjects");
    const navViewMedia = navStateManager.newState("navViewMedia");
    
    for (const project of projectsList.ui) {

        const projectFile = await fetch(project);
        const projectData = await projectFile.json();
        const projectCard = await navViewUiProjects.newChild();
        projectCard.classList(["lios-card", "navigation-panel-project-card", "lios-frosted-glass"]);

        const logoContainer = await navViewUiProjects.newChild("div");
        logoContainer.classList(["project-logo", "lios-frosted-glass"]);

        const logo = await navViewUiProjects.newChild("img");
        logo.attributes({
            src: `${projectData.baseUrl}${projectData.favicon}`,
            alt: `${projectData.projectName} Logo`
        });

        logo.appendTo(logoContainer);
        logoContainer.appendTo(projectCard);

        const divider = await navViewUiProjects.newChild("hr");
        divider.appendTo(projectCard);
        divider.attributes({
            width: "100%"
        });

        const label = await navViewUiProjects.newChild("h3");
        label.textContent(projectData.projectName);
        label.appendTo(projectCard);

        const projectPage = projectData.projectName.toLowerCase().replace(/ /g, "-");
        const projectPageButton = await navViewPanel.newChild("a");
        projectPageButton.classList(["lios-action-button", "nav-project-card-button"]);
        projectPageButton.attributes({
            href: `/projects/${projectPage}`
        });
        projectPageButton.textContent("Learn More");
        projectPageButton.appendTo(projectCard);

        projectCard.appendTo("root");
    
    };

    for (const project of projectsList.media) {

        const projectFile = await fetch(project);
        const projectData = await projectFile.json();
        const projectCard = await navViewMedia.newChild();
        projectCard.classList(["lios-card", "navigation-panel-project-card", "lios-frosted-glass"]);

        const logoContainer = await navViewMedia.newChild("div");
        logoContainer.classList(["project-logo", "lios-frosted-glass"]);

        const logo = await navViewMedia.newChild("img");
        logo.attributes({
            src: `${projectData.baseUrl}${projectData.favicon}`,
            alt: `${projectData.projectName} Logo`
        });

        logo.appendTo(logoContainer);
        logoContainer.appendTo(projectCard);

        const divider = await navViewMedia.newChild("hr");
        divider.appendTo(projectCard);
        divider.attributes({
            width: "100%"
        });

        const label = await navViewMedia.newChild("h3");
        label.textContent(projectData.projectName);
        label.appendTo(projectCard);

        const projectPage = projectData.projectName.toLowerCase().replace(/ /g, "-");
        const projectPageButton = await navViewPanel.newChild("a");
        projectPageButton.classList(["lios-action-button", "nav-project-card-button"]);
        projectPageButton.attributes({
            href: `/projects/${projectPage}`
        });
        projectPageButton.textContent("Learn More");
        projectPageButton.appendTo(projectCard);

        projectCard.appendTo("root");
    
    };

    navViewPanel.render();

    // Small function to change states of nav panel buttons
    const buttonChangeState = (button) => {
        document.querySelector(".navigation-panel-button.active").classList.remove("active");
        document.querySelector(`.navigation-panel-button.${button}`).classList.add("active");
    }
    // Event listners to change pages in navigation
    document.querySelector(".navigation-panel-button.user-interface").addEventListener("click", async () => {
        // Event listner to switch to UI/UX panel
        await navStateManager.switchState("navViewUiProjects");
        buttonChangeState("user-interface");
        navViewPanel.render();
    });
    document.querySelector(".navigation-panel-button.educational").addEventListener("click", async () => {
        // Event listner to switch back to educational panel
        await navStateManager.switchState("default");
        buttonChangeState("educational");
        navViewPanel.render();
    });
    document.querySelector(".navigation-panel-button.media").addEventListener("click", async () => {
        // Event listner to switch back to Media panel
        await navStateManager.switchState("navViewMedia");
        buttonChangeState("media");
        navViewPanel.render();
    });
    // 
};