export interface Language {
    navbar: {
        home: String;
        about: String;
        projectsTechnologies: String;
        language: String;
    };
    homeWindow: {
        windowName: String;
        title: String;
        presentation: String;
        curiosities: String[];
        optionsTitleText: String;
        options: String[];
    }
}

export const languages: { english: Language, portuguese: Language } = {
    english: {
        navbar: {
            home: "LeterioSystem2000",
            about: "About Me",
            projectsTechnologies: "Projects & Technologies",
            language: "Language",
        },
        homeWindow: {
            windowName: "Home Page",
            title: "Full-Stack Developer",
            presentation: "Yeah, you just found what you were looking for, your brand-new, creative, dedicated, and most beautiful Full-Stack dev!",
            curiosities: ["Learning coding skills since 2018",
                "Higher Degree as a System’s Analyst and Developer",
                "Interested both in front and back",
                "Loves gym, music, coding, and self-improvement"],
            optionsTitleText: "You may find something cool here!",
            options: ["About Me", "Projects & Technologies"],
        }
    },
    portuguese: {
        navbar: {
            home: "LeterioSystem2000",
            about: "Sobre Mim",
            projectsTechnologies: "Tecnologias & Projetos",
            language: "Linguagem",
        },
        homeWindow: {
            windowName: "Página Inicial",
            title: "Full-Stack Developer",
            presentation: "Sim, você acabou de achar o que estava procurando, seu mais novo, criativo, dedicado e mais lindo full-stack dev!",
            curiosities: ["Treinando programação desde 2018",
                "Formado em Análise e Desenvolvimento de Sistemas",
                "Interessado tanto em front quanto back",
                "Ama academia, música, código e desenvolvimento pessoal"],
            optionsTitleText: "Você vai achar algo legal aqui!",
            options: ["Sobre Mim", "Tecnologias & Projetos"],
        }
    },
}