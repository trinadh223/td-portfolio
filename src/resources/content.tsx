import { About, Blog, Home, Newsletter, Person, Social, Work } from "@/types";
import { Line, Row, Text } from "@once-ui-system/core";

const person: Person = {
  firstName: "Trinadh",
  lastName: "Divvela",
  name: `Trinadh Divvela`,
  role: "AI Product Manager & Builder",
  avatar: "/images/avatar.jpg",
  email: "trinadh.divvela@gmail.com",
  location: "Bengaluru, India", // Display location
  timezone: "Asia/Kolkata", // For time display in header
  languages: ["English", "Hindi", "Telugu"], // optional: Leave the array empty if you don't want to display languages
};

const newsletter: Newsletter = {
  display: false,
  title: <>Subscribe to {person.firstName}'s Newsletter</>,
  description: <>Updates on AI product building and product management insights</>,
};

const social: Social = [
  // Links are automatically displayed.
  // Import new icons in /once-ui/icons.ts
  // Set essentials: true for links you want to show on the about page
  {
    name: "LinkedIn",
    icon: "linkedin",
    link: "https://www.linkedin.com/in/trinadhdivvela",
    essential: true,
  },
  {
    name: "GitHub",
    icon: "github",
    link: "https://github.com/trinadh223",
    essential: true,
  },
  {
    name: "X",
    icon: "x",
    link: "https://x.com/trinadh_divvela",
    essential: true,
  },
  {
    name: "Medium",
    icon: "medium",
    link: "https://medium.com/@trinadhdivvela",
    essential: true,
  },
  {
    name: "Instagram",
    icon: "instagram",
    link: "https://instagram.com/trinadh_223",
    essential: false,
  },
  {
    name: "Facebook",
    icon: "facebook",
    link: "https://facebook.com/trinadhdivvela",
    essential: false,
  },
  {
    name: "Email",
    icon: "email",
    link: `mailto:${person.email}`,
    essential: true,
  },
];

const home: Home = {
  path: "/",
  image: "/images/og/home.jpg",
  label: "Home",
  title: `${person.name}'s Portfolio`,
  description: `Portfolio website showcasing my work as an ${person.role}`,
  headline: <>Hi, I am Trinadh Divvela</>,
  featured: {
    display: true,
    title: (
      <Row gap="12" vertical="center">
        <strong className="ml-4">AI Product Manager & Co-Founder</strong>{" "}
        <Line background="brand-alpha-strong" vert height="20" />
        <Text marginRight="4" onBackground="brand-medium">
          IIT Kharagpur
        </Text>
      </Row>
    ),
    href: "/work",
  },
  subline: (
    <>
      I build AI-native products end to end — from voice AI agents to execution
      intelligence platforms powered by AI agents and automation.
    </>
  ),
};

const about: About = {
  path: "/about",
  label: "Experience",
  title: `About – ${person.name}`,
  description: `Meet ${person.name}, ${person.role} from Bengaluru`,
  tableOfContent: {
    display: true,
    subItems: false,
  },
  avatar: {
    display: true,
  },
  calendar: {
    display: true,
    link: "https://calendly.com/trinadhdivvela/30min-discussion",
  },
  intro: {
    display: true,
    title: "Introduction",
    description: (
      <>
        AI-focused Product Manager with 5+ years of experience spanning enterprise digital
        transformation at ICICI Bank and hands-on AI product building. Shipped a voice AI
        platform achieving sub-1.5s latency and 94% data extraction accuracy. Led multiple
        cross-functional teams to deliver a bank-wide website migration on schedule, then
        drove Martech integration resulting in a 6% conversion lift.
        <br />
        <br />
        Most recently built an AI-native execution intelligence tool that gives engineering
        teams real-time visibility into work progress. Graduated from IIT Kharagpur.
      </>
    ),
  },
  work: {
    display: true, // set to false to hide this section
    title: "Work Experience",
    experiences: [
      {
        company: "Omni AI",
        timeframe: "Nov 2025 - Apr 2026",
        role: "Co-Founder & Product Lead",
        achievements: [
          <>
            Built an AI-native execution intelligence platform giving engineering teams
            real-time visibility into work progress without manual updates — owning product
            strategy, technical architecture, and GTM planning.
          </>,
          <>
            Identified the core problem through 15+ user interviews with PMs and Tech Leads:
            engineering teams spend 3-5 hrs/week compiling status updates manually. Designed a
            signals-based approach — watch what happens (GitHub, CI/CD) instead of asking
            engineers to update tools.
          </>,
          <>
            Designed system architecture integrating GitHub webhooks, an AI summarization
            layer, and Slack delivery. Built n8n automation workflows for real-time alerts,
            daily digest generation, and risk detection (stale PRs, stuck tickets).
          </>,
          <>
            Completed the core task management system, GitHub integration, and AI
            summarization module. Defined MVP success criteria: 10 active teams and 70%+
            digest view rate within 4 weeks of launch.
          </>,
        ],
        images: [],
      },
      {
        company: "Vachas AI",
        timeframe: "Jun 2025 - Oct 2025",
        role: "Co-Founder & Product Strategy",
        achievements: [
          <>
            Built an enterprise voice AI platform automating outbound calls (NPS surveys,
            feedback collection, follow-ups), replacing expensive and inconsistent manual BPO
            operations.
          </>,
          <>
            Architected an end-to-end voice AI pipeline — STT (Deepgram), LLM response
            generation (GPT-4o/3.5), TTS (Cartesia) — achieving sub-1.5s response latency for
            natural conversations.
          </>,
          <>
            Achieved 94% data extraction accuracy for structured outputs (NPS scores,
            sentiment, issue categorization) and implemented dynamic LLM routing, reducing API
            costs by 40% by matching model complexity to call requirements.
          </>,
          <>
            Integrated Exotel (telephony), Pinecone (vector DB for knowledge base), and
            multiple LLM providers. Built n8n workflows for automated post-call processing —
            transcription, extraction, and report delivery via Slack.
          </>,
          <>
            Implemented a Voice Activity Detection (VAD) system to handle interruptions and
            background noise, reducing the false interruption rate from 23% to 8%.
          </>,
        ],
        images: [],
      },
      {
        company: "ICICI Bank",
        timeframe: "May 2022 - Nov 2024",
        role: "Senior Technical Manager",
        achievements: [
          <>
            Led website migration and digital transformation across multiple digital channels,
            coordinating cross-functional teams and presenting progress to the CTO weekly.
            Promoted to Senior Technical Manager within 2 years.
          </>,
          <>
            Owned end-to-end delivery of the NLI website migration project — requirements
            gathering, sprint planning, vendor coordination, UAT, and production deployment —
            ensuring on-time delivery.
          </>,
          <>
            Reduced "Nearby Offers" page load time from 12 seconds to 0.8 seconds (15x
            improvement) by redesigning the architecture with client-side pagination and
            viewport-based lazy loading.
          </>,
          <>
            Owned the roadmap and implementation of Adobe Experience Cloud (Analytics, Target)
            and ran a personalization pilot for the credit card section achieving a 4%
            conversion improvement.
          </>,
          <>
            Built a Jira workflow from scratch and established team rituals (Monday planning,
            daily standups, Friday demos) that became templates for other projects.
          </>,
          <>
            Coordinated security audits, penetration testing, and user access governance
            including SAML integration for enterprise SSO.
          </>,
        ],
        images: [],
      },
      {
        company: "Upraised",
        timeframe: "Nov 2022 - Mar 2023",
        role: "Product Management Fellow",
        achievements: [
          <>
            Recognized by senior product leaders from Mastercard, CRED, PayTM, and Myntra in
            the cohort.
          </>,
          <>
            Authored industry-grade PRDs, vetted and approved by a Senior PM from CRED.
          </>,
          <>
            Evaluated Rapido's switching issue, securing a top 2 ranking in a cohort of more
            than 80 people.
          </>,
          <>
            Conducted in-depth product teardowns and observations during a rigorous 16-week
            program.
          </>,
        ],
        images: [],
      },
      {
        company: "Persistent Systems",
        timeframe: "Oct 2020 - May 2022",
        role: "Software Engineer",
        achievements: [
          <>
            Engineered enterprise-scale Salesforce integrations for banking clients, enhancing
            credit assessment accuracy by integrating with external banking systems (POSIDEX,
            NSDL, MDM, FICO, CBS) for loan processing.
          </>,
          <>
            Implemented Aadhaar Vault integration to mask sensitive customer identification
            numbers and developed a consent management portal using Salesforce custom domains
            to streamline compliance audits.
          </>,
          <>
            Architected and deployed a Global Search feature for the entire loan application
            system, significantly reducing case retrieval time for operational teams.
          </>,
        ],
        images: [],
      },
      {
        company: "Perpule (Acquired by Amazon)",
        timeframe: "May 2019 - Jul 2019",
        role: "Software Development Intern",
        achievements: [
          <>
            Built high-performance payment infrastructure for a retail-tech startup later
            acquired by Amazon, using REST APIs, Spring Boot, Cloud SQL, and Google App Engine.
          </>,
          <>
            Led code refactoring and component optimization resulting in an 83% reduction in
            payment transaction latency through microservice optimization.
          </>,
          <>
            Designed and implemented DAO and BO layers for multiple payment providers including
            Amazon Pay, Paytm UPI/Auto Debit, and PhonePe, ensuring reliable transaction
            routing.
          </>,
        ],
        images: [],
      },
    ],
  },
  studies: {
    display: true, // set to false to hide this section
    title: "Education",
    institutions: [
      {
        name: "Indian Institute of Technology, Kharagpur",
        description: <>B.Tech, Civil Engineering (2016 - 2020)</>,
      },
      {
        name: "Sri Chaitanya Educational Institutions, Vijayawada",
        description: <>Intermediate Education - MPC (2014 - 2016)</>,
      },
      {
        name: "DR. K.K.R's Gowtham Concept School, Tenali",
        description: <>Secondary School Education (2013 - 2014)</>,
      },
    ],
  },
  technical: {
    display: true, // set to false to hide this section
    title: "Skills",
    skills: [
      {
        title: "AI Product Building",
        description: (
          <>Hands-on experience shipping AI-native products end to end.</>
        ),
        tags: [
          { name: "Gen AI" },
          { name: "Voice AI Pipelines (STT/LLM/TTS)" },
          { name: "LLM Routing & Cost Optimization" },
          { name: "RAG & Vector DBs (Pinecone)" },
          { name: "n8n Automation" },
          { name: "Claude Code" },
          { name: "Cursor" },
          { name: "AI Summarization" },
          { name: "Prompt Engineering" },
        ],
        images: [],
      },
      {
        title: "Product Skills",
        description: (
          <>Core product management competencies for building user-centric solutions.</>
        ),
        tags: [
          { name: "Product Discovery" },
          { name: "PRD Writing" },
          { name: "Prioritization" },
          { name: "User Interviews" },
          { name: "Product Roadmap" },
          { name: "GTM Planning" },
          { name: "Stakeholder Management" },
          { name: "Agile Project Management" },
          { name: "Data-driven Decision Making" },
        ],
        images: [],
      },
      {
        title: "Technical Skills",
        description: (
          <>Technologies and platforms I work with.</>
        ),
        tags: [
          { name: "SQL" },
          { name: "Adobe Analytics" },
          { name: "Adobe Target" },
          { name: "Adobe Experience Manager" },
          { name: "Salesforce" },
          { name: "API Integration" },
        ],
        images: [],
      },
      {
        title: "Tools",
        description: (
          <>Design and productivity tools in my workflow.</>
        ),
        tags: [
          { name: "Figma", icon: "figma" },
          { name: "Whimsical" },
          { name: "Miro" },
          { name: "JIRA" },
          { name: "Google Analytics" },
          { name: "Notion" },
        ],
        images: [],
      },
    ],
  },
};

const blog: Blog = {
  path: "/blog",
  label: "Blog",
  title: "Writing about AI, product, and tech...",
  description: `Read what ${person.name} has been up to recently`,
  // Create new blog posts by adding a new .mdx file to app/blog/posts
  // All posts will be listed on the /blog route
};

const work: Work = {
  path: "/work",
  label: "Projects",
  title: `Projects – ${person.name}`,
  description: `AI products and case studies by ${person.name}`,
  // Create new project pages by adding a new .mdx file to app/work/projects
  // All projects will be listed on the /home and /work routes
};

export { person, social, newsletter, home, about, blog, work };
