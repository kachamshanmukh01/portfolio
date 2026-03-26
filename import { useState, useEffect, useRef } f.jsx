import {
    useState,
    useEffect,
    useRef
}

    from "react";

const style = ` @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;0,900;1,400&family=DM+Mono:wght@300;400;500&display=swap');

*,
*::before,
*::after {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
}

:root {
    --cream: #F5F0E8;
    --ink: #1A1410;
    --rust: #C4441A;
    --gold: #D4A843;
    --sage: #6B8F6E;
    --slate: #3D4A5C;
    --light-ink: #4A3F35;
}

body {
    background: var(--cream);
    color: var(--ink);
    font-family: 'DM Mono', monospace;
    overflow-x: hidden;
    cursor: none;
}

.cursor {
    position: fixed;
    width: 12px;
    height: 12px;
    background: var(--rust);
    border-radius: 50%;
    pointer-events: none;
    z-index: 9999;
    transform: translate(-50%, -50%);
    transition: transform 0.1s ease, width 0.2s, height 0.2s, background 0.2s;
    mix-blend-mode: multiply;
}

.cursor-ring {
    position: fixed;
    width: 40px;
    height: 40px;
    border: 1.5px solid var(--rust);
    border-radius: 50%;
    pointer-events: none;
    z-index: 9998;
    transform: translate(-50%, -50%);
    transition: all 0.18s ease;
    opacity: 0.5;
}

.cursor.hover {
    width: 6px;
    height: 6px;
    background: var(--gold);
}

.cursor-ring.hover {
    width: 60px;
    height: 60px;
    border-color: var(--gold);
    opacity: 0.3;
}

/* NOISE TEXTURE */
body::before {
    content: '';
    position: fixed;
    inset: 0;
    background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.04'/%3E%3C/svg%3E");
    pointer-events: none;
    z-index: 0;
}

/* NAV */
nav {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 100;
    padding: 1.5rem 4rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    mix-blend-mode: multiply;
}

.nav-logo {
    font-family: 'Playfair Display', serif;
    font-size: 1.4rem;
    font-weight: 900;
    letter-spacing: -0.02em;
    color: var(--ink);
    text-decoration: none;
}

.nav-links {
    display: flex;
    gap: 2.5rem;
    list-style: none;
}

.nav-links a {
    font-size: 0.7rem;
    letter-spacing: 0.15em;
    text-transform: uppercase;
    color: var(--light-ink);
    text-decoration: none;
    transition: color 0.2s;
}

.nav-links a:hover {
    color: var(--rust);
}

/* HERO */
.hero {
    min-height: 100vh;
    display: grid;
    grid-template-columns: 1fr 1fr;
    padding: 0 4rem;
    padding-top: 6rem;
    position: relative;
    overflow: hidden;
}

.hero-left {
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding-right: 4rem;
    padding-bottom: 6rem;
}

.hero-tag {
    font-size: 0.65rem;
    letter-spacing: 0.2em;
    text-transform: uppercase;
    color: var(--rust);
    margin-bottom: 1.5rem;
    display: flex;
    align-items: center;
    gap: 0.75rem;
}

.hero-tag::before {
    content: '';
    display: inline-block;
    width: 2rem;
    height: 1px;
    background: var(--rust);
}

.hero-name {
    font-family: 'Playfair Display', serif;
    font-size: clamp(3.5rem, 7vw, 6rem);
    font-weight: 900;
    line-height: 0.9;
    letter-spacing: -0.03em;
    color: var(--ink);
    margin-bottom: 0.3rem;
}

.hero-name em {
    font-style: italic;
    color: var(--rust);
}

.hero-desc {
    font-size: 0.85rem;
    line-height: 1.8;
    color: var(--light-ink);
    max-width: 380px;
    margin-top: 2rem;
    margin-bottom: 3rem;
}

.hero-cta {
    display: flex;
    gap: 1.5rem;
    align-items: center;
}

.btn-primary {
    background: var(--ink);
    color: var(--cream);
    padding: 0.9rem 2.2rem;
    font-family: 'DM Mono', monospace;
    font-size: 0.7rem;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    border: none;
    cursor: none;
    transition: background 0.2s, transform 0.2s;
    text-decoration: none;
    display: inline-block;
}

.btn-primary:hover {
    background: var(--rust);
    transform: translateY(-2px);
}

.btn-ghost {
    font-size: 0.7rem;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    color: var(--ink);
    text-decoration: none;
    border-bottom: 1px solid var(--ink);
    padding-bottom: 2px;
    transition: color 0.2s, border-color 0.2s;
}

.btn-ghost:hover {
    color: var(--rust);
    border-color: var(--rust);
}

.hero-right {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
}

.hero-img-frame {
    position: relative;
    width: 340px;
    height: 420px;
}

.hero-img-bg {
    position: absolute;
    inset: 0;
    background: linear-gradient(135deg, var(--gold) 0%, var(--rust) 100%);
    transform: translate(16px, 16px);
}

.hero-img-main {
    position: relative;
    width: 100%;
    height: 100%;
    background: var(--slate);
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;
}

.hero-initials {
    font-family: 'Playfair Display', serif;
    font-size: 8rem;
    font-weight: 900;
    font-style: italic;
    color: rgba(230, 150, 21, 0.15);
    user-select: none;
}

.hero-stats {
    position: absolute;
    bottom: -2rem;
    left: -2rem;
    background: var(--cream);
    border: 1px solid rgba(26, 20, 16, 0.1);
    padding: 1.2rem 1.6rem;
    display: flex;
    gap: 2rem;
    box-shadow: 4px 4px 0 var(--gold);
}

.stat {
    text-align: center;
}

.stat-num {
    font-family: 'Playfair Display', serif;
    font-size: 1.8rem;
    font-weight: 900;
    color: var(--ink);
    display: block;
}

.stat-label {
    font-size: 0.6rem;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    color: var(--light-ink);
}

.hero-scroll {
    position: absolute;
    bottom: 3rem;
    left: 4rem;
    display: flex;
    align-items: center;
    gap: 0.75rem;
    font-size: 0.6rem;
    letter-spacing: 0.15em;
    text-transform: uppercase;
    color: var(--light-ink);
}

.scroll-line {
    width: 40px;
    height: 1px;
    background: var(--light-ink);
    animation: scrollPulse 2s ease-in-out infinite;
}

@keyframes scrollPulse {

    0%,
    100% {
        width: 40px;
        opacity: 1;
    }

    50% {
        width: 20px;
        opacity: 0.4;
    }
}

/* SECTION COMMON */
section {
    padding: 7rem 4rem;
    position: relative;
}

.section-header {
    display: flex;
    align-items: baseline;
    gap: 1.5rem;
    margin-bottom: 4rem;
}

.section-num {
    font-size: 0.6rem;
    letter-spacing: 0.15em;
    text-transform: uppercase;
    color: var(--rust);
    opacity: 0.7;
}

.section-title {
    font-family: 'Playfair Display', serif;
    font-size: clamp(2.2rem, 4vw, 3.2rem);
    font-weight: 900;
    line-height: 1;
    color: var(--ink);
    letter-spacing: -0.02em;
}

.section-line {
    flex: 1;
    height: 1px;
    background: rgba(26, 20, 16, 0.12);
}

/* ABOUT */
.about-grid {
    display: grid;
    grid-template-columns: 1.2fr 0.8fr;
    gap: 6rem;
    align-items: start;
}

.about-text p {
    font-size: 0.95rem;
    line-height: 1.9;
    color: var(--light-ink);
    margin-bottom: 1.2rem;
}

.about-text p strong {
    color: var(--ink);
    font-weight: 500;
}

.about-aside {}

.skills-block {
    margin-bottom: 2.5rem;
}

.skills-block-title {
    font-size: 0.6rem;
    letter-spacing: 0.18em;
    text-transform: uppercase;
    color: var(--rust);
    margin-bottom: 1rem;
}

.skill-tags {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
}

.skill-tag {
    padding: 0.35rem 0.8rem;
    border: 1px solid rgba(26, 20, 16, 0.2);
    font-size: 0.68rem;
    letter-spacing: 0.05em;
    color: var(--light-ink);
    transition: all 0.2s;
    cursor: none;
}

.skill-tag:hover {
    background: var(--ink);
    color: var(--cream);
    border-color: var(--ink);
    transform: translateY(-2px);
}

.skill-tag.accent {
    border-color: var(--rust);
    color: var(--rust);
}

.skill-tag.accent:hover {
    background: var(--rust);
    color: var(--cream);
}

/* PROJECTS */
.projects-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 2px;
    background: rgba(26, 20, 16, 0.08);
}

.project-card {
    background: var(--cream);
    padding: 2.5rem;
    position: relative;
    overflow: hidden;
    transition: background 0.3s;
    cursor: none;
}

.project-card::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 0;
    height: 3px;
    background: var(--rust);
    transition: width 0.4s ease;
}

.project-card:hover::before {
    width: 100%;
}

.project-card:hover {
    background: #EDE8DF;
}

.project-num {
    font-size: 0.55rem;
    letter-spacing: 0.2em;
    text-transform: uppercase;
    color: var(--gold);
    margin-bottom: 1.5rem;
}

.project-title {
    font-family: 'Playfair Display', serif;
    font-size: 1.5rem;
    font-weight: 700;
    line-height: 1.1;
    color: var(--ink);
    margin-bottom: 1rem;
    letter-spacing: -0.01em;
}

.project-desc {
    font-size: 0.78rem;
    line-height: 1.75;
    color: var(--light-ink);
    margin-bottom: 2rem;
}

.project-tech {
    display: flex;
    flex-wrap: wrap;
    gap: 0.4rem;
    margin-bottom: 2rem;
}

.tech-pill {
    background: rgba(26, 20, 16, 0.06);
    padding: 0.2rem 0.6rem;
    font-size: 0.6rem;
    letter-spacing: 0.08em;
    color: var(--light-ink);
}

.project-link {
    font-size: 0.65rem;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    color: var(--rust);
    text-decoration: none;
    display: flex;
    align-items: center;
    gap: 0.5rem;
    transition: gap 0.2s;
}

.project-link:hover {
    gap: 0.9rem;
}

.project-link .arrow {
    font-size: 0.9rem;
}

/* CONTACT */
.contact-inner {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 6rem;
    align-items: start;
}

.contact-left .big-text {
    font-family: 'Playfair Display', serif;
    font-size: clamp(2rem, 4vw, 3rem);
    font-weight: 900;
    line-height: 1.1;
    color: var(--ink);
    margin-bottom: 1.5rem;
    letter-spacing: -0.02em;
}

.contact-left p {
    font-size: 0.85rem;
    line-height: 1.8;
    color: var(--light-ink);
    max-width: 380px;
    margin-bottom: 2.5rem;
}

.contact-methods {
    display: flex;
    flex-direction: column;
    gap: 1rem;
}

.contact-method {
    display: flex;
    align-items: center;
    gap: 1rem;
    text-decoration: none;
    transition: transform 0.2s;
}

.contact-method:hover {
    transform: translateX(6px);
}

.contact-method-icon {
    width: 2.5rem;
    height: 2.5rem;
    border: 1px solid rgba(26, 20, 16, 0.15);
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 0.85rem;
}

.contact-method-info .label {
    font-size: 0.55rem;
    letter-spacing: 0.15em;
    text-transform: uppercase;
    color: var(--rust);
    display: block;
    margin-bottom: 0.15rem;
}

.contact-method-info .value {
    font-size: 0.8rem;
    color: var(--ink);
}

/* FORM */
.contact-form {
    display: flex;
    flex-direction: column;
    gap: 1.2rem;
}

.form-group {
    display: flex;
    flex-direction: column;
    gap: 0.4rem;
}

.form-label {
    font-size: 0.6rem;
    letter-spacing: 0.15em;
    text-transform: uppercase;
    color: var(--light-ink);
}

.form-input,
.form-textarea {
    background: transparent;
    border: none;
    border-bottom: 1px solid rgba(26, 20, 16, 0.2);
    padding: 0.6rem 0;
    font-family: 'DM Mono', monospace;
    font-size: 0.85rem;
    color: var(--ink);
    outline: none;
    transition: border-color 0.2s;
    cursor: none;
}

.form-input:focus,
.form-textarea:focus {
    border-color: var(--rust);
}

.form-textarea {
    resize: none;
    height: 120px;
}

.form-input::placeholder,
.form-textarea::placeholder {
    color: rgba(74, 63, 53, 0.4);
}

/* FOOTER */
footer {
    padding: 2rem 4rem;
    border-top: 1px solid rgba(26, 20, 16, 0.1);
    display: flex;
    justify-content: space-between;
    align-items: center;
}

footer p {
    font-size: 0.65rem;
    color: rgba(74, 63, 53, 0.5);
    letter-spacing: 0.05em;
}

.footer-socials {
    display: flex;
    gap: 1.5rem;
}

.footer-socials a {
    font-size: 0.65rem;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    color: rgba(74, 63, 53, 0.5);
    text-decoration: none;
    transition: color 0.2s;
}

.footer-socials a:hover {
    color: var(--rust);
}

/* ANIMATIONS */
.fade-in {
    opacity: 0;
    transform: translateY(24px);
    transition: opacity 0.7s ease, transform 0.7s ease;
}

.fade-in.visible {
    opacity: 1;
    transform: translateY(0);
}

/* DECORATIVE MARQUEE */
.marquee-wrap {
    overflow: hidden;
    border-top: 1px solid rgba(26, 20, 16, 0.08);
    border-bottom: 1px solid rgba(26, 20, 16, 0.08);
    padding: 0.7rem 0;
    background: var(--ink);
}

.marquee-track {
    display: flex;
    gap: 3rem;
    animation: marquee 18s linear infinite;
    white-space: nowrap;
}

.marquee-item {
    font-size: 0.65rem;
    letter-spacing: 0.2em;
    text-transform: uppercase;
    color: rgba(245, 240, 232, 0.3);
    flex-shrink: 0;
}

.marquee-dot {
    color: var(--gold);
    margin: 0 0.5rem;
}

@keyframes marquee {
    from {
        transform: translateX(0);
    }

    to {
        transform: translateX(-50%);
    }
}

@media (max-width: 900px) {
    nav {
        padding: 1.2rem 2rem;
    }

    .hero {
        grid-template-columns: 1fr;
        padding: 0 2rem;
        padding-top: 5rem;
        min-height: auto;
    }

    .hero-right {
        display: none;
    }

    .hero-left {
        padding-right: 0;
        padding-bottom: 4rem;
    }

    section {
        padding: 5rem 2rem;
    }

    .about-grid {
        grid-template-columns: 1fr;
        gap: 3rem;
    }

    .projects-grid {
        grid-template-columns: 1fr;
    }

    .contact-inner {
        grid-template-columns: 1fr;
        gap: 3rem;
    }

    footer {
        flex-direction: column;
        gap: 1rem;
        text-align: center;
        padding: 2rem;
    }

    .nav-links {
        display: none;
    }
}

`;

const projects = [{
    num: "01",
    title: "TaskFlow",
    desc: "A productivity app for managing tasks and workflows with drag-and-drop interface, real-time collaboration, and smart reminders.",
    tech: ["React", "Node.js", "Socket.io", "MongoDB"],
    link: "#",
}

    ,
{
    num: "02",
    title: "WeatherNow",
    desc: "A beautifully designed weather dashboard that aggregates data from multiple APIs and presents 7-day forecasts with animated icons.",
    tech: ["Next.js", "OpenWeather API", "Chart.js", "Tailwind"],
    link: "#",
}

    ,
{
    num: "03",
    title: "DevBlog CMS",
    desc: "A headless CMS built for developers to write and publish technical articles with Markdown support, syntax highlighting, and SEO tools.",
    tech: ["TypeScript", "Prisma", "PostgreSQL", "Vercel"],
    link: "#",
}

    ,
];

const skills = {
    Frontend: ["React.js", "Next.js", "TypeScript", "Tailwind CSS", "GSAP"],
    Backend: ["Node.js", "Express", "PostgreSQL", "MongoDB", "REST APIs"],
    Tooling: ["Git", "Docker", "Vercel", "Figma", "VS Code"],
}

    ;

export default function Portfolio() {

    const [cursorPos,
        setCursorPos] = useState({
            x: -100, y: -100
        });
    const [isHovering,
        setIsHovering] = useState(false);

    const [formData,
        setFormData] = useState({
            name: "", email: "", message: ""
        });
    const [submitted,
        setSubmitted] = useState(false);
    const observerRef = useRef(null);

    useEffect(() => {
        const move = (e) => setCursorPos({
            x: e.clientX, y: e.clientY
        });
        window.addEventListener("mousemove", move);
        return () => window.removeEventListener("mousemove", move);
    }

        , []);

    useEffect(() => {
        const handleHover = () => {
            document.querySelectorAll("a, button, .skill-tag, .project-card, .form-input, .form-textarea, .contact-method").forEach(el => {
                el.addEventListener("mouseenter", () => setIsHovering(true));
                el.addEventListener("mouseleave", () => setIsHovering(false));
            });
        }

            ;
        handleHover();
        const timer = setTimeout(handleHover, 500);
        return () => clearTimeout(timer);
    }

        , []);

    useEffect(() => {

        observerRef.current = new IntersectionObserver((entries) => entries.forEach(e => e.isIntersecting && e.target.classList.add("visible")),
            {
                threshold: 0.12
            });
        document.querySelectorAll(".fade-in").forEach(el => observerRef.current.observe(el));
        return () => observerRef.current?.disconnect();
    }

        , []);

    const handleSubmit = (e) => {
        e.preventDefault();
        setSubmitted(true);
    }

        ;

    const marqueeItems = ["React",
        "Next.js",
        "TypeScript",
        "Node.js",
        "UI/UX",
        "PostgreSQL",
        "REST APIs",
        "Figma",
        "Docker",
        "Vercel"];

    return (<> <style> {
        style
    }

    </style> <div className="cursor" style={
        {
            left: cursorPos.x, top: cursorPos.y, ...(isHovering ? {
                width: 6, height: 6, background: 'var(--gold)'
            }

                : {})
        }
    }

        /> <div className="cursor-ring" style={
            {
                left: cursorPos.x, top: cursorPos.y, ...(isHovering ? {
                    width: 60, height: 60, borderColor: 'var(--gold)', opacity: 0.3
                }

                    : {})
            }
        }

        /> {
            /* NAV */
        }

        <nav> <a href="#" className="nav-logo" >Alex.dev</a> <ul className="nav-links" > {
            ["About", "Projects", "Contact"].map(l => (<li key={
                l
            }

            ><a href={
                `#$ {
                        l.toLowerCase()
                    }

                    `
            }

            > {
                        l
                    }

                </a></li>))
        }

        </ul> </nav> {
            /* HERO */
        }

        <section className="hero" > <div className="hero-left" > <div className="hero-tag" >Available for work</div> <h1 className="hero-name" > Alex<br /><em>Rivera</em> </h1> <p className="hero-desc" > Full-stack developer crafting thoughtful digital experiences. I turn complex problems into elegant, performant web applications. </p> <div className="hero-cta" > <a href="#projects" className="btn-primary" >View Work</a> <a href="#contact" className="btn-ghost" >Get in Touch</a> </div> </div> <div className="hero-right" > <div className="hero-img-frame" > <div className="hero-img-bg" /> <div className="hero-img-main" > <span className="hero-initials" >AR</span> </div> <div className="hero-stats" > <div className="stat" > <span className="stat-num" >3+</span> <span className="stat-label" >Yrs Exp</span> </div> <div className="stat" > <span className="stat-num" >20+</span> <span className="stat-label" >Projects</span> </div> <div className="stat" > <span className="stat-num" >12+</span> <span className="stat-label" >Clients</span> </div> </div> </div> </div> <div className="hero-scroll" > <div className="scroll-line" /> Scroll to explore </div> </section> {
            /* MARQUEE */
        }

        <div className="marquee-wrap" > <div className="marquee-track" > {
            [...marqueeItems, ...marqueeItems].map((item, i) => (<span key={
                i
            }

                className="marquee-item" > {
                    item
                }

                <span className="marquee-dot" >◆</span> </span>))
        }

        </div> </div> {
            /* ABOUT */
        }

        <section id="about" > <div className="section-header fade-in" > <span className="section-num" >01 —</span> <h2 className="section-title" >About Me</h2> <div className="section-line" /> </div> <div className="about-grid" > <div className="about-text fade-in" > <p>I'm a <strong>full-stack developer</strong> based in San Francisco, passionate about building products that sit at the intersection of great engineering and great design. I believe software should be fast, accessible, and a pleasure to use.</p>
            <p>My journey into tech started with a curiosity for how websites worked — that curiosity evolved into a craft. I've worked with startups and agencies, shipping everything from internal tools to customer-facing SaaS platforms.</p>
            <p>When I'm not coding, you' ll find me hiking, sketching UI concepts in notebooks, or deep in a good book on systems design.</p> </div> <div className="about-aside fade-in" > {
                Object.entries(skills).map(([category, tags]) => (<div key={
                    category
                }

                    className="skills-block" > <div className="skills-block-title" > {
                        category
                    }

                    </div> <div className="skill-tags" > {
                        tags.map((t, i) => (<span key={
                            t
                        }

                            className={
                                `skill-tag $ {
                                    i===0 ? "accent" : ""
                                }

                                `
                            }

                        > {
                                t
                            }

                        </span>))
                    }

                    </div> </div>))
            }

            </div> </div> </section> {
            /* PROJECTS */
        }

        <section id="projects" style={
            {
                paddingTop: 0
            }
        }

        > <div className="section-header fade-in" > <span className="section-num" >02 —</span> <h2 className="section-title" >Selected Work</h2> <div className="section-line" /> </div> <div className="projects-grid fade-in" > {
            projects.map((p) => (<div key={
                p.num
            }

                className="project-card" > <div className="project-num" >Project {
                    p.num
                }

                </div> <h3 className="project-title" > {
                    p.title
                }

                </h3> <p className="project-desc" > {
                    p.desc
                }

                </p> <div className="project-tech" > {
                    p.tech.map(t => <span key={
                        t
                    }

                        className="tech-pill" > {
                            t
                        }

                    </span>)
                }

                </div> <a href={
                    p.link
                }

                    className="project-link" > View Project <span className="arrow" >→</span> </a> </div>))
        }

            </div> </section> {
            /* CONTACT */
        }

        <section id="contact" > <div className="section-header fade-in" > <span className="section-num" >03 —</span> <h2 className="section-title" >Contact</h2> <div className="section-line" /> </div> <div className="contact-inner" > <div className="contact-left fade-in" > <p className="big-text" >Let's build something together.</p>
            <p>Whether you have a project in mind, a role to fill, or just want to say hi — my inbox is always open.</p> <div className="contact-methods" > {
                [{
                    icon: "✉", label: "Email", value: "alex@example.com", href: "mailto:alex@example.com"
                }

                    ,
                {
                    icon: "💼", label: "LinkedIn", value: "linkedin.com/in/alexrivera", href: "#"
                }

                    ,
                {
                    icon: "⚙", label: "GitHub", value: "github.com/alexrivera", href: "#"
                }

                    ,
                ].map(m => (<a key={
                    m.label
                }

                    href={
                        m.href
                    }

                    className="contact-method" > <div className="contact-method-icon" > {
                        m.icon
                    }

                    </div> <div className="contact-method-info" > <span className="label" > {
                        m.label
                    }

                    </span> <span className="value" > {
                        m.value
                    }

                        </span> </div> </a>))
            }

            </div> </div> <div className="fade-in" > {
                submitted ? (<div style={
                    {
                        paddingTop: "2rem"
                    }
                }

                > <p style={
                    {
                        fontFamily: "'Playfair Display', serif", fontSize: "1.4rem", color: "var(--sage)", marginBottom: "0.5rem"
                    }
                }

                >Message sent !</p> <p style={
                    {
                        fontSize: "0.8rem", color: "var(--light-ink)", lineHeight: 1.7
                    }
                }

                >Thanks for reaching out. I'll get back to you within 24–48 hours.</p>
                </div>) : (<form className="contact-form" onSubmit={
                    handleSubmit
                }

                > {
                        [{
                            id: "name", label: "Your Name", type: "text", placeholder: "Jane Smith"
                        }

                            ,
                        {
                            id: "email", label: "Email Address", type: "email", placeholder: "jane@example.com"
                        }

                            ,
                        ].map(f => (<div key={
                            f.id
                        }

                            className="form-group" > <label className="form-label" htmlFor={
                                f.id
                            }

                            > {
                                    f.label
                                }

                            </label> <input className="form-input" id={
                                f.id
                            }

                                type={
                                    f.type
                                }

                                placeholder={
                                    f.placeholder
                                }

                                required value={
                                    formData[f.id]
                                }

                                onChange={
                                    e => setFormData(prev => ({
                                        ...prev, [f.id]: e.target.value
                                    }))
                                }

                            /> </div>))
                    }

                    <div className="form-group" > <label className="form-label" htmlFor="message" >Message</label> <textarea className="form-textarea" id="message"
                        placeholder="Tell me about your project..."

                        required value={
                            formData.message
                        }

                        onChange={
                            e => setFormData(prev => ({
                                ...prev, message: e.target.value
                            }))
                        }

                    /> </div> <button type="submit" className="btn-primary" style={
                        {
                            width: "100%", textAlign: "center"
                        }
                    }

                    > Send Message </button> </form>)
            }

            </div> </div> </section> <footer> <p>© 2026 Alex Rivera — Built with React.js</p> <div className="footer-socials" > <a href="#" >GitHub</a> <a href="#" >LinkedIn</a> <a href="#" >Twitter</a> </div> </footer> </>);
}