export type FAQ = {
  question: string;
  answer: string;
};

export type FAQCategory = {
  title: string;
  faqs: FAQ[];
};

export const faqData: FAQCategory[] = [
  {
    title: "General",
    faqs: [
      {
        question: "What age groups do you accept?",
        answer:
          "We provide childcare services for infants, toddlers, and preschool-aged children.",
      },
      {
        question: "What are your operating hours?",
        answer:
          "Our centers are open Monday to Friday from 7:00 AM to 6:00 PM.",
      },
    ],
  },
  {
    title: "Enrollment",
    faqs: [
      {
        question: "How do I enroll my child?",
        answer:
          "You can enroll through our website by filling out the registration form or contacting us directly.",
      },
      {
        question: "Is there a waitlist?",
        answer:
          "Yes, depending on availability. We recommend applying early to secure a spot.",
      },
    ],
  },
  {
    title: "Programs & Safety",
    faqs: [
      {
        question: "What curriculum do you follow?",
        answer:
          "We follow a play-based learning approach that encourages creativity, exploration, and social development.",
      },
      {
        question: "How do you ensure child safety?",
        answer:
          "Our staff are certified, facilities are secure, and we follow strict safety protocols and regular monitoring.",
      },
    ],
  },
  {
    title: "Billing & Policies",
    faqs: [
      {
        question: "What are your fees?",
        answer:
          "Fees vary depending on the program and schedule. Please visit our pricing page for details.",
      },
      {
        question: "Do you offer refunds?",
        answer:
          "Refund policies depend on the enrollment agreement. Please contact us for specific details.",
      },
    ],
  },
];