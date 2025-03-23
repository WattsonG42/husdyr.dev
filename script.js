document.addEventListener("DOMContentLoaded", () => {
    const sections = ["home", "experience", "projects", "skills"];
    let currentSectionIndex = 0;
  
    const currentSelections = {
      experience: 0,
      projects: 0,
      skills: 0
    };
  
    const experienceInfo = {
      exp1: "As an SOC Apperentice Exorcist i basically spend my shifts finding and fighting digital demons from customer networks. Most of them are of the type 'advanced user behaviour' ",
      exp2: "Stared at technology until it obeyed. Enough said."
    };
  
    const projectInfo = {
      proj1: `
    The very site you’re browsing—handcrafted with nothing but HTML/CSS/JS.
    Heavily inspired by the “Terminator Terminal” concept from Chris Jones (2007). I also use Terminator Terminal at work.
  `,
      proj2: `
    A CLI health-check tool written in Go for a [REDACTED] firm.
    The initial request basically went like this:
  
    1) "Useless talk about failing Windows services..."
    2) "So yeah, it's kinda annoying we never get warnings about them going down."
    3) "I'll build you something for a case of beer."
    4) "Deal."
  
  ...and so this scrappy tool was born.
  It checks critical services, logs results, and yells at devs if something's down. Cant share it yet unfortunately, no worries you arent missing out on the next generation health check tool

  
  `,
  proj3: `
    Picture your uncle cornering you at a family gathering with “an idea for the next Facebook, 
    but better.” Now imagine you’re both that uncle AND the poor dev roped into building it. 
    That’s this project. It’s entirely written in Kotlin (so far), and i havent actually seen the idea manifest anywhere else. This just might be a good idea.
  `
  
    };
  
    const skillInfo = {
        go: `
        A while back, a Cisco recruiter basically told me, "Go learn Go," 
        and who was I to argue? So I did, and I ended up loving it—now 
        it’s my go-to comfort language. I’ve dabbled in full-stack 
        development with Go using Gin for routing, GORM for 
        ORM-driven database ops, and PostgreSQL on the backend. 
        Throw in Docker, microservices, or whatever else you like, 
        and Go can handle it. I’ve got some experience across that 
        stack.
        `,
        hmcssjs: `
        I built this very site with plain HTML, CSS, and JavaScript. 
        I wouldn’t call myself *the* frontend guy, but I can definitely 
        make things work (and sometimes even look decent). It’s not 
        always pixel-perfect, but hey—it runs, it scrolls, it’s kinda cool.
        `,
        python: `
        Python was one of the first languages I picked up—way back in my first year of middle school. 
        Since then, it's been my go-to for almost everything CTF-related: cryptography, scripts, pwn automation, 
        data wrangling—you name it. Great tool to have in your toolbox
        `,
        svelte: `
        Svelte was introduced to me during IT2 in high school, and I kinda just stuck with it. 
        Not because I’m a die-hard frontend guy or anything—but more like a "toolbox" thing. 
        It’s lightweight, intuitive, and gets out of the way. As of now, it’s the main framework 
        I reach for when I *have* to build something with a UI.
        `,
        
        postgres: `
        PostgreSQL is one of those tools I’ve kept in my back pocket. 
        Haven’t used it in any large-scale production stuff yet, but I’ve played around 
        with it in smaller practice projects and tasks—just enough to get comfortable 
        with the syntax, structure, and how it fits into a full stack setup.
        `,
        bash: `
        Bash is one of those things you pick up naturally just by living in a Linux environment long enough. 
        Not something I sat down to formally learn, but through everyday terminal use, scripting, and CTF tooling, it’s become a quiet part of the workflow.`,
        git: `
        Git is the backbone of any coding project I touch. From solo experiments to collaborative work, 
        and its good at making me look more organized than I really am. 
        Comfortable with the basics, branching, rebasing, and undoing my mistakes like a pro. I often find myself git blaming myself in solo projects!
        `,
        linux: `
        I went against all advice and jumped straight into bare-bones Arch Linux — broke it a dozen times, fixed it a dozen more, and daily drove it until I got comfortable. 
        Eventually I switched to EndeavourOS for a bit more convenience.
        
        At work, I use CentOS, and I’ve gained solid experience managing Ubuntu servers as well. 
        Taught myself Fedora and CentOS too — figured I should learn what Norwegian companies actually use. 
        It’s been a wild, enlightening ride in the world of penguins.
        `,
        dota2: `
        I play a lot of Dota 2 - And not just casually. I'm Immortal rated, which puts me close to the very top

        My go-to? Earthshaker.

        It's more than a game - it's where i learned a lot about decision making, diplomacy, self betterment, pressure handling, team dynamics and A1 Russian.... or at least that's what i keep telling myself
        `,
        chess: `
        I often find myself playing chess, at the buss, when queuing up for DotA, when doing nothing in particular.
        
        Im about 1700 rated +-, my favorite openings are Pirc Defense, Guccio piano game, Benko gambit, Danish Gambit
        
        Ive found myself playing Freestyle chess more and more recently, i reccomend you do the same if you havent tried yet
        `,
        books: `
        I also like reading here are some books i highly reccomend in no particular order

        The Vegetarian | Han Kang
        Metamorphosis | Franz Kafka
        Geometry for Ocelots | Exurb1a
        The Fifth Science | Exurb1a
        The Prince of Milk | Exurb1a
        The Anatomy of Evil | Michael H. Stone
        Crime and Punishment | Fjodor Dostojevskij

        Prelude to Foundation | Issac Asimov
        Foundation | Isaac Asimov
        Foundation and Earth | Isaac Asimov 

        Diplomacy | Henry Kissinger
        On China | Henry Kissinger
        `
    };
  
    function clearContainerSelection() {
      sections.forEach((sec) => {
        document.getElementById(sec)?.classList.remove("selected-frame");
      });
    }
  
    function activateContainer(index) {
      clearContainerSelection();
      document.getElementById(sections[index])?.classList.add("selected-frame");
    }
  
    function clearItemSelection(listElem) {
      listElem.forEach((item) => {
        item.classList.remove("selected-item");
      });
    }
  
    function updateMainContent(title, content) {
      const mainContentArea = document.getElementById("main-content-area");
      mainContentArea.innerHTML = `<h1>${title}</h1><p style="white-space:pre-line;">${content}</p>`;
    }
  
    function scrollMainContent(direction = "down") {
      const mainContentArea = document.getElementById("main-content-area");
      const distance =
        direction === "down"
          ? mainContentArea.clientHeight / 2
          : -mainContentArea.clientHeight / 2;
      mainContentArea.scrollBy({
        top: distance,
        behavior: "smooth"
      });
    }
  
    function highlightItemInSection(sectionKey, itemIndex) {
      const listId = `${sectionKey}-list`;
      const listElem = document.getElementById(listId);
      if (!listElem) return;
  
      const items = listElem.querySelectorAll("li");
      clearItemSelection(items);
      items[itemIndex]?.classList.add("selected-item");
      items[itemIndex]?.scrollIntoView({ behavior: "smooth", block: "nearest" });
  
      let infoObject, dataAttr, titlePrefix;
      switch (sectionKey) {
        case "experience":
          infoObject = experienceInfo;
          dataAttr = "data-exp";
          titlePrefix = "Experience";
          break;
        case "projects":
          infoObject = projectInfo;
          dataAttr = "data-proj";
          titlePrefix = "Project";
          break;
        case "skills":
          infoObject = skillInfo;
          dataAttr = "data-skill";
          titlePrefix = "Skill";
          break;
        default:
          return;
      }
      const keyVal = items[itemIndex]?.getAttribute(dataAttr) || "";
      const info = infoObject[keyVal] || "No additional info available.";
  
      updateMainContent(`${titlePrefix}: ${items[itemIndex]?.textContent}`, info);
    }
  
    function clearAllItemSelections() {
      ["experience-list", "projects-list", "skills-list"].forEach((listId) => {
        const listElem = document.getElementById(listId);
        if (listElem) {
          clearItemSelection(listElem.querySelectorAll("li"));
        }
      });
    }
  
    sections.forEach((sec, idx) => {
      const container = document.getElementById(sec);
      if (!container) return;
      container.addEventListener("click", (e) => {
        if (e.target.tagName.toLowerCase() === "li") return; 
        currentSectionIndex = idx;
        activateContainer(currentSectionIndex);
      });
    });
  
    function setupListClicks(listId, sectionKey) {
      const listElem = document.getElementById(listId);
      if (!listElem) return;
  
      const items = listElem.querySelectorAll("li");
      items.forEach((item, idx) => {
        item.addEventListener("click", (e) => {
          e.stopPropagation();
          currentSectionIndex = sections.indexOf(sectionKey);
          activateContainer(currentSectionIndex);
          clearAllItemSelections();
          currentSelections[sectionKey] = idx;
          highlightItemInSection(sectionKey, idx);
        });
      });
    }
  
    setupListClicks("experience-list", "experience");
    setupListClicks("projects-list", "projects");
    setupListClicks("skills-list", "skills");
  
    document.addEventListener("keydown", (e) => {
      const { key, ctrlKey } = e;
  
      if (
        [
          "ArrowLeft",
          "ArrowRight",
          "ArrowUp",
          "ArrowDown",
          "PageUp",
          "PageDown"
        ].includes(key)
      ) {
        e.preventDefault();
      }
  
      if (key === "PageDown" || (ctrlKey && key === "d")) {
        scrollMainContent("down");
        return;
      }
      if (key === "PageUp" || (ctrlKey && key === "u")) {
        scrollMainContent("up");
        return;
      }
  
      if (key === "ArrowLeft") {
        currentSectionIndex = Math.max(0, currentSectionIndex - 1);
        activateContainer(currentSectionIndex);
        return;
      }
      if (key === "ArrowRight") {
        currentSectionIndex = Math.min(
          sections.length - 1,
          currentSectionIndex + 1
        );
        activateContainer(currentSectionIndex);
        return;
      }
  
      if (key === "ArrowUp" || key === "ArrowDown") {
        const activeSec = sections[currentSectionIndex];
        if (["experience", "projects", "skills"].includes(activeSec)) {
          const listId = `${activeSec}-list`;
          const listElem = document.getElementById(listId);
          if (!listElem) return;
  
          const items = listElem.querySelectorAll("li");
          let idx = currentSelections[activeSec];
  
          if (key === "ArrowUp") {
            idx = Math.max(0, idx - 1);
          } else {
            idx = Math.min(items.length - 1, idx + 1);
          }
  
          clearAllItemSelections();
          currentSelections[activeSec] = idx;
          highlightItemInSection(activeSec, idx);
        }
      }
  
      if (/^[1-4]$/.test(key)) {
        const sectionIndex = parseInt(key, 10) - 1;
        if (sectionIndex < sections.length) {
          currentSectionIndex = sectionIndex;
          activateContainer(currentSectionIndex);
        }
      }
    });
  
    activateContainer(currentSectionIndex);
  });
  