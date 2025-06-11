// src/app/faq/page.jsx
'use client'; // This page uses useState and imports client components

import { useState, useEffect } from 'react';
import MainLayout from '../../components/MainLayout'; // Import your custom layout
import FaqItem from '../../components/FAQitem';     // Import the FaqItem component
// Dummy FAQ data (replace with actual data from faq.html)
// In a real application, this might come from a JSON file or API.
const allFaqData = [
  {
    id: 'fl-role',
    question: "What is FL and what do they do?",
    answer: [
      "Freshmen leader (FL) is one of the roles in the whole fyp series. FLs are basically the first people freshmen will interact with during orientation. For about a week, FLs will help guide and lead freshmen to adjust to college life, understand and apply binus core values (like BGA, SPIRIT, etc.), and make sure everything runs smoothly during orientation."
    ]
  },
  {
    id: 'benefits',
    question: "What are the benefits of being an FL or FP?",
    answer: [
      "There's a bunch of perks you get if you join as an FL or FP. Things like certificates, SAT points (for FL), community service points (for FP), and of course a lot of soft skills you'll develop from the experience. you'll also get a lanyard, t-shirt (for FL), and exclusive apparel (for FP) that looks super cool. That's it? Nopeee, you'll also get free parking during your time as an FL or FP. Pretty nice right?"
    ]
  },
  {
    id: 'sign-up',
    question: "How to sign up as FL or FP?",
    answer: [
      "If you wanna sign up, just go to freshmen.apps.binus.ac.id (if it's slow or error try incognito or a different browser). Then go to 'student registration' and make sure the role at the top is set to 'freshmen chaperone'. Don't forget to click 'search'. Scroll down and you'll see the open recruitment poster for FL and FP, read it to check the requirements. Then scroll a bit more and you'll see the personal info form. Fill that honestly, choose the role you want (FL or FP), and upload your CV.",
      "Once everything's filled, double-check and just hit submit. Don't forget to pick your interview schedule in the 'schedule selection' menu. If you're applying for both FL and FP, choose the same schedule twice and don't forget to change the role each time to FL and FP. You can still reschedule later if needed. After that, you'll be contacted or added to a candidate group by your department's FYPL."
    ]
  },
  {
    id: 'selection-process',
    question: "How's the selection process for FL and FP?",
    answer: [
      "The selection usually starts about a week after registration opens. Once you've signed up, you'll be invited to a group by your department's FYPL, and they'll give you all the details about the interview schedule, room, and technical stuff. If you've chosen your interview slot, just show up on time and at the right place. after the interview, you'll need to wait for the results which will be reviewed by SSO and your department—it might take about 1-2 months. the results will be sent to your BINUS email, so keep checking it!"
    ]
  },
  {
    id: 'mentor-question',
    question: "On the freshmen apps, there's a question “do you want to be a mentor?” what's that about?",
    answer: [
      "The “mentor” here is a different role that offered by BINUS, usually for 1 semester. you can read more about it at: support.binus.ac.id/article/mentor-tutor-duta-binusian if you're interested in that too, you can click 'yes'. don't worry, it won't affect your fl/fp interview result. we're just curious hehe."
    ]
  },
  {
    id: '4th-semester-internship',
    question: "Can 4th semester students still apply as FP even if they'll be doing internships?",
    answer: [
      "Yup, totally can. Even if you're interning, you still need to lead the eese 2 sessions (which happens while you're interning), but eese 2 meetings are not as intense or frequent as EESE 1. As for example, you might only need to do a session once every 1-3 weeks, compared to weekly meetings in EESE 1. You'll just need to come to campus to check in manually for each session."
    ]
  },
  {
    id: 'fl-fp-diff',
    question: "What's the difference between FL and FP?",
    answer: [
      "The main difference is the timing of your duties. FL works during orientation until inauguration, while FP is active throughout the excellent program—around a year during the freshmen's 1st and 2nd semesters. the job is different too—FLs help manage freshmen and make sure the orientation events run well. Usually, you'll be assigned to a class along with other FLs and help guide freshmen during that week. FPs, on the other hand, are more like mentors during the whole academic year. You'll help your class throughout the excellent program, guide them during uni life, and be their go-to person. Benefits are also different—FPs get community service points, while fls get sat points."
    ]
  },
  {
    id: 'next-b29-start',
    question: "When does next B29 start?",
    answer: [
      "New student experience & transition (NEXT), which used to be called 'otp', will be held from August 18 to 27, then followed by academic experience and inauguration on september 4. So only one batch of next this year? yup, next is gonna be held in just one batch, but don't worry it's still gonna be super fun and full of experience. FLs will be the ones leading it, so if you're planning to be an FL, make sure your schedule is free from august to September, okay?"
    ]
  }
];

const FaqPage = () => {
  const [searchTerm, setSearchTerm] = useState(''); // State for the search input value
  const [filteredFaqs, setFilteredFaqs] = useState(allFaqData); // State for the displayed FAQ items

  // useEffect to filter FAQs whenever searchTerm changes
  useEffect(() => {
    const lowerCaseSearchTerm = searchTerm.toLowerCase();
    const newFilteredFaqs = allFaqData.filter(item =>
      // Check if question includes search term
      item.question.toLowerCase().includes(lowerCaseSearchTerm) ||
      // Check if any part of the answer includes search term
      item.answer.some(p => p.toLowerCase().includes(lowerCaseSearchTerm))
    );
    setFilteredFaqs(newFilteredFaqs);
  }, [searchTerm]); // Dependency array: re-run this effect when searchTerm changes

  return (
    <MainLayout> {/* Wrap the content with MainLayout for Navbar/Footer */}
      <div className="faq-wrapper">
        <h1>Frequently Asked Question</h1>
        <p className="email-contact">
          For any other questions, e-mail us at{' '}
          <a href="mailto:sso.alamsutera@binus.edu">sso.alamsutera@binus.edu</a>
        </p>

        <div className="search-container">
          <input
            type="text"
            className="search-input"
            placeholder="Search for questions..."
            id="searchFAQ" // Keep ID for potential CSS targeting
            value={searchTerm} // Controlled component: input value tied to state
            onChange={(e) => setSearchTerm(e.target.value)} // Update state on change
          />
        </div>

        <div className="faq-container">
          {filteredFaqs.length > 0 ? (
            // Map over filtered FAQs and render FaqItem for each
            filteredFaqs.map((faq, index) => (
              <FaqItem key={faq.id} question={faq.question} answer={faq.answer} index={index} />
            ))
          ) : (
            // Display message if no results found
            <p style={{ textAlign: 'center', padding: '20px', color: '#666' }}>
              No matching FAQs found.
            </p>
          )}
        </div>
      </div>

      <div id="faq-button">
        <a href="https://www.instagram.com/efwaipiel.alsut?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==" target="_blank" rel="noopener noreferrer">
          DM for another question
        </a>
      </div>

      <div className="register-card">
        <h1>Register Now!</h1>
        <a href="https://freshmen.apps.binus.ac.id" target="_blank" rel="noopener noreferrer">Go to Freshmen Apps</a>
      </div>
    </MainLayout>
  );
};

export default FaqPage;