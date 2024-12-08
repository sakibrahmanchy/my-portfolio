import AnimatedSection from "@/components/animated-section/animated-section";
import Card from "@/components/card/card";
import styles from "./portfolio.module.css";

export default function Portfolio() {
  const sections = [
    {
      id: 1,
      title: "About Me",
      content: (
        <>
          <p>
            Hi, I'm John Doe, a passionate web developer specializing in
            creating modern, user-friendly web applications. My journey started
            with curiosity and led to building amazing digital experiences.
          </p>
          <img
            src="https://via.placeholder.com/800x400"
            alt="About Me"
            className={styles.image}
          />
        </>
      ),
    },
    {
      id: 2,
      title: "Projects",
      content: (
        <>
          <p>Here are some of my recent projects:</p>
          <ul className={styles.list}>
            <li>
              <strong>Portfolio Website:</strong> A modern, responsive portfolio
              showcasing my work and skills.
            </li>
            <li>
              <strong>E-commerce Platform:</strong> A full-stack solution for
              online shopping.
            </li>
          </ul>
          <img
            src="https://via.placeholder.com/800x500"
            alt="Projects"
            className={styles.image}
          />
        </>
      ),
    },
    {
      id: 3,
      title: "Contact",
      content: (
        <>
          <p>Let's work together! Feel free to reach out at:</p>
          <ul>
            <li>
              <strong>Email:</strong> john.doe@example.com
            </li>
            <li>
              <strong>Phone:</strong> +1234567890
            </li>
          </ul>
        </>
      ),
    },
  ];

  return (
    <AnimatedSection>
      <div className={styles.sections}>
        {sections.map((section) => (
          <div key={section.id} className={styles.section}>
            <Card title={section.title} content={section.content} />
          </div>
        ))}
      </div>
    </AnimatedSection>
  );
}
