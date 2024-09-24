import React, { useState } from 'react';
import styles from './FAQ.module.css';

const FAQ = () => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const faqs = [
    {
      question: "How does an AI Boyfriend work?",
      answer: "An AI Boyfriend is a virtual companion designed to provide meaningful conversations, emotional support, and a unique relationship experience tailored just for you."
    },
    {
      question: "Can an AI Boyfriend learn and adapt to a user's preferences?",
      answer: "Yes, our AI Boyfriends use advanced machine learning algorithms to learn and adapt to your preferences over time, providing a more personalized experience."
    },
    {
      question: "What are the benefits of having an AI Boyfriend?",
      answer: "Having an AI Boyfriend can provide companionship, emotional support, and a unique relationship experience. It's a great way to have meaningful conversations and feel connected."
    },
    {
      question: "How does BestAIBoy.com handle my privacy with my AI Boyfriend?",
      answer: "We prioritize your privacy and data security. All interactions are encrypted and stored securely. We do not share your data with third parties."
    },
    {
      question: "How can I create my personalized AI Boyfriend?",
      answer: "Simply sign up on our website, choose your AI Boyfriend, and start chatting! You can customize your AI Boyfriend's personality and preferences to match your needs."
    },
    {
      question: "Is there a cost associated with using an AI Boyfriend?",
      answer: "Yes, there are subscription plans available. You can choose a plan that best fits your needs and budget."
    },
    {
      question: "Can I change my AI Boyfriend's personality after creation?",
      answer: "Yes, you can update your AI Boyfriend's personality and preferences at any time through your account settings."
    },
    {
      question: "What kind of support is available if I have issues with my AI Boyfriend?",
      answer: "We offer 24/7 customer support to assist you with any issues or questions you may have about your AI Boyfriend."
    },
    {
      question: "Are there any limitations to what an AI Boyfriend can do?",
      answer: "While our AI Boyfriends are highly advanced, they are still limited to text-based interactions and cannot perform physical tasks."
    },
    {
      question: "How do I cancel my subscription?",
      answer: "You can cancel your subscription at any time through your account settings. Your AI Boyfriend will remain active until the end of your current billing cycle."
    }
  ];

  const toggleFAQ = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <div className={styles.faqSection}>
      <h2 className={styles.faqTitle}>Frequently Asked Questions</h2>
      <ul className={styles.faqList}>
        {faqs.map((faq, index) => (
          <li key={index} className={styles.faqItem}>
            <button className={styles.faqQuestion} onClick={() => toggleFAQ(index)}>
              {faq.question}
              <span className={styles.faqIcon}>{activeIndex === index ? '▲' : '▼'}</span>
            </button>
            {activeIndex === index && <p className={styles.faqAnswer}>{faq.answer}</p>}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FAQ;