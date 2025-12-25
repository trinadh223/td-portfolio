import { About, Blog, Gallery, Home, Newsletter, Person, Social, Work } from "@/types";
import { Line, Row, Text } from "@once-ui-system/core";

const person: Person = {
  firstName: "Trinadh",
  lastName: "Divvela",
  name: `Trinadh Divvela`,
  role: "Product Manager",
  avatar: "/images/avatar.jpg",
  email: "trinadh.divvela@gmail.com",
  location: "Bengaluru, India", // Display location
  timezone: "Asia/Kolkata", // For time display in header
  languages: ["English", "Hindi", "Telugu"], // optional: Leave the array empty if you don't want to display languages
};

const newsletter: Newsletter = {
  display: false,
  title: <>Subscribe to {person.firstName}'s Newsletter</>,
  description: <>Updates on product management insights and projects</>,
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
  description: `Portfolio website showcasing my work as a ${person.role}`,
  headline: <>Hi, I am Trinadh Divvela</>,
  featured: {
    display: true,
    title: (
      <Row gap="12" vertical="center">
        <strong className="ml-4">Product Manager & Entrepreneur</strong>{" "}
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
      Building AI-native products. Passionate about creating innovative, user-centric solutions through data-driven decision making.
    </>
  ),
};

const about: About = {
  path: "/about",
  label: "Experience",
  title: `About – ${person.name}`,
  description: `Meet ${person.name}, ${person.role} from Hyderabad`,
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
        Product Manager and Entrepreneur with a passion for building AI-native products.
        Currently exploring the intersection of AI and user experience to create innovative solutions.
        <br /><br />
        By day, I serve as Senior Technical Manager at ICICI Bank. My journey includes leading cross-functional teams, executing large-scale digital transformations,
        and driving significant improvements in user engagement and conversion rates.
      </>
    ),
  },
  work: {
    display: true, // set to false to hide this section
    title: "Work Experience",
    experiences: [
      {
        company: "ICICI Bank",
        timeframe: "May 2022 - Present",
        role: "Senior Technical Manager (M2)",
        achievements: [
          <>
            Owned and executed the migration of the primary website of ICICI Bank to Adobe Experience Manager (CMS) as per planned timelines.
          </>,
          <>
            Led a cross-functional team to enhance ICICI Bank's primary website for non-logged-in users, utilizing Adobe Analytics and Adobe Target to achieve a 20% increase in user engagement.
          </>,
          <>
            Spearheaded the transition to the Martech project, taking ownership of onboarding 6 channels and integrating the Adobe suite of solutions, resulting in a 6% increase in conversion rates through enhanced tracking, retargeting and real-time customer profiling.
          </>,
          <>
            Developed and orchestrated comprehensive strategic and tactical plans for 18 months ensuring seamless execution through effective cross-functional team collaboration.
          </>,
          <>
            Responsible for overseeing governance and security throughout the entire digital transformation project.
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
            Recognized by senior product leaders from Mastercard, CRED, PayTM, and Myntra in the cohort.
          </>,
          <>
            Authored industry-grade PRDs, vetted and approved by a Senior PM from CRED.
          </>,
          <>
            Evaluated Rapido's switching issue, securing a top 2 ranking in the entire cohort of more than 80 people.
          </>,
          <>
            Conducted in-depth product teardowns and observations during a rigorous 16-week program.
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
            Integrated external systems with Salesforce via Mule for customer credit history assessment.
          </>,
          <>
            Developed a consent management site for Business and Personal Banking products through SMS and email links.
          </>,
          <>
            Created a Global Search feature for cross-sell functionality, enabling case searches by Loan Number and Name.
          </>,
          <>
            Implemented Aadhar Vault Integration to mask Aadhar Numbers using Salesforce's Outbound Messages SOAP API.
          </>,
        ],
        images: [],
      },
      {
        company: "Perpule",
        timeframe: "May 2019 - Jul 2019",
        role: "Software Development Intern",
        achievements: [
          <>
            Engineered a payment microservice using Rest APIs, Spring Boot, Cloud SQL, and Google App Engine.
          </>,
          <>
            Designed and developed BO and DAO classes for Amazon Pay, Paytm Auto Debit, PhonePe, and Paytm UPI.
          </>,
          <>
            Enhanced payment methods, refactored code, and optimized components, reducing transaction latency by 83%.
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
        name: "Sri Chaitanya Educational Institutions, Gudavalli",
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
        title: "Product Skills",
        description: (
          <>Core product management competencies for building user-centric solutions.</>
        ),
        tags: [
          { name: "Market Research" },
          { name: "Structured Thinking" },
          { name: "Stakeholder Management" },
          { name: "Data-driven Decision Making" },
          { name: "Ownership" },
          { name: "Project Management" },
          { name: "User Journeys" },
          { name: "Product Roadmap" },
          { name: "Root Cause Analysis" },
          { name: "First Principle Thinking" },
        ],
        images: [],
      },
      {
        title: "Technical Skills",
        description: (
          <>Technologies and platforms I work with.</>
        ),
        tags: [
          { name: "Adobe Analytics" },
          { name: "Adobe Target" },
          { name: "API Integration" },
          { name: "SQL" },
          { name: "Salesforce" },
          { name: "Adobe Experience Manager" },
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
  title: "Writing about product and tech...",
  description: `Read what ${person.name} has been up to recently`,
  // Create new blog posts by adding a new .mdx file to app/blog/posts
  // All posts will be listed on the /blog route
};

const work: Work = {
  path: "/work",
  label: "Projects",
  title: `Projects – ${person.name}`,
  description: `Product case studies and projects by ${person.name}`,
  // Create new project pages by adding a new .mdx file to app/work/projects
  // All projects will be listed on the /home and /work routes
};

const gallery: Gallery = {
  path: "/gallery",
  label: "Gallery",
  title: `Photo gallery – ${person.name}`,
  description: `A photo collection by ${person.name}`,
  // Images by https://lorant.one
  // These are placeholder images, replace with your own
  images: [
    {
      src: "/images/gallery/horizontal-1.jpg",
      alt: "image",
      orientation: "horizontal",
    },
    {
      src: "/images/gallery/vertical-4.jpg",
      alt: "image",
      orientation: "vertical",
    },
    {
      src: "/images/gallery/horizontal-3.jpg",
      alt: "image",
      orientation: "horizontal",
    },
    {
      src: "/images/gallery/vertical-1.jpg",
      alt: "image",
      orientation: "vertical",
    },
    {
      src: "/images/gallery/vertical-2.jpg",
      alt: "image",
      orientation: "vertical",
    },
    {
      src: "/images/gallery/horizontal-2.jpg",
      alt: "image",
      orientation: "horizontal",
    },
    {
      src: "/images/gallery/horizontal-4.jpg",
      alt: "image",
      orientation: "horizontal",
    },
    {
      src: "/images/gallery/vertical-3.jpg",
      alt: "image",
      orientation: "vertical",
    },
  ],
};

export { person, social, newsletter, home, about, blog, work, gallery };
