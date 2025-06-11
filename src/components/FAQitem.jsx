'use client'; 

import { useState, useRef, useEffect } from 'react'; 

const FaqItem = ({ question, answer, index }) => {
  const [isOpen, setIsOpen] = useState(false); 
  const answerRef = useRef(null); 
  const toggleAnswer = () => {
    setIsOpen(!isOpen);
  };
  useEffect(() => {
  }, []);

  return (
    <div className="faq-item"> { }
      <div className="faq-question" onClick={toggleAnswer}>
        <span>{question}</span>
        { }
        <span className="faq-toggle">{isOpen ? '−' : '+'}</span>
      </div>
      { }
      <div className={`faq-answer ${isOpen ? 'active' : ''}`}>
        { }
        {answer.map((p, i) => (
          <p key={i}>{p}</p>
        ))}
      </div>
    </div>
  );
};

export default FaqItem;