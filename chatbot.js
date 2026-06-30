// ----- INTERACTIVE AI CHATBOT SYSTEM -----
document.addEventListener("DOMContentLoaded", () => {
  const chatbotTrigger = document.getElementById("chatbotTrigger");
  const chatbotContainer = document.getElementById("chatbotContainer");
  const chatClose = document.getElementById("chatClose");
  const chatMessages = document.getElementById("chatMessages");
  const chatInputField = document.getElementById("chatInputField");
  const chatSendBtn = document.getElementById("chatSendBtn");
  const quickRepliesContainer = document.getElementById("quickReplies");

  // Knowledge base for custom matching
  const knowledgeBase = {
    greetings: {
      keywords: ["hello", "hi", "hey", "greetings", "good morning", "good afternoon", "start"],
      response: "Hello! I am **NeuroBot**, the AI assistant for Jilani's premium agency. I can tell you about our AI development, web services, pricing packages, case studies, or help you book a consultation. What are you looking to build today?",
      replies: ["AI & Web Services", "View Pricing Plans", "See Case Studies", "Book Consultation"]
    },
    services: {
      keywords: ["service", "services", "offer", "do you build", "capabilities", "skills", "web dev", "ai dev"],
      response: "We specialize in end-to-end AI and Web Development:\n\n* **AI Development**: Custom Agents, LangGraph pipelines, RAG systems (Vector databases, FAISS), Custom LLM applications, voice assistants, and model fine-tuning.\n* **Web Development**: Modern responsive applications, FastAPI & Node.js backends, React frontends, E-commerce, SaaS platforms, and Admin Dashboards.\n\nWhich area would you like to explore?",
      replies: ["AI Services", "Web Services", "View Pricing Plans", "See Case Studies"]
    },
    aiServices: {
      keywords: ["ai services", "ai dev", "agentic", "rag", "llm"],
      response: "Our premium AI services include:\n\n* **Agentic AI Solutions**: Autonomous agents using LangGraph & FastAPI.\n* **RAG Systems**: Grounding LLMs with your private documents using FAISS/Chroma.\n* **Custom LLMs**: Integration & fine-tuning for specific enterprise tasks.\n* **Voice Assistants**: Conversational audio bots deployed to cloud telephony.",
      replies: ["Web Services", "View Pricing Plans", "See Case Studies", "Book Consultation"]
    },
    webServices: {
      keywords: ["web services", "web dev", "website", "react", "fastapi"],
      response: "Our high-performance web engineering services cover:\n\n* **SaaS Development**: Scalable architectures built with React, Tailwind, and Node.js/Python.\n* **E-commerce & Business Hubs**: Converting traffic to conversions with secure checkouts.\n* **Admin Dashboards**: Real-time analytical control panels.\n* **SEO & Speed Tuning**: Maximizing Web Vitals.",
      replies: ["AI Services", "View Pricing Plans", "See Case Studies", "Book Consultation"]
    },
    pricing: {
      keywords: ["price", "pricing", "pricing plans", "packages", "cost", "how much", "basic", "standard", "premium", "enterprise"],
      response: "We offer four comprehensive plans designed for different stages:\n\n1. **Basic ($1,499)**: Landing pages, simple chatbot, bug fixes, 7 days support.\n2. **Standard ($3,499)**: Full business/E-commerce store, advanced chatbot, dashboard, SEO, 30 days support.\n3. **Premium ($6,999) [Recommended]**: Agentic AI solution, RAG system, custom LLM apps, cloud deployment, 90 days support.\n4. **Enterprise (Custom)**: Complete digital transformation, dedicated team, automation pipelines, priority consulting.\n\nWhich plan matches your current project scale?",
      replies: ["Basic Plan Details", "Standard Plan Details", "Premium Plan Details", "Enterprise Details"]
    },
    basicPlan: {
      keywords: ["basic plan details", "basic package", "basic plan"],
      response: "**Basic Package - Landing & Simple Automation ($1,499)**:\n- Deliverables: Single Landing Page, Portfolio site, Simple FAQ Chatbot, and CSS layout fixes.\n- Support: 7 Days post-launch maintenance.\n- Target: Solopreneurs and startups validating a proof of concept.",
      replies: ["Standard Plan Details", "Premium Plan Details", "Book Basic Plan"]
    },
    standardPlan: {
      keywords: ["standard plan details", "standard package", "standard plan"],
      response: "**Standard Package - Full Digital Business ($3,499)**:\n- Deliverables: Full Business Website or E-Commerce Store, Advanced Context Chatbot, Admin Dashboard, and Core SEO Setup.\n- Support: 30 Days support.\n- Target: Small businesses scaling their online footprint.",
      replies: ["Basic Plan Details", "Premium Plan Details", "Book Standard Plan"]
    },
    premiumPlan: {
      keywords: ["premium plan details", "premium package", "premium plan"],
      response: "**Premium Package - Advanced AI Integration ($6,999)**:\n- Deliverables: Fully autonomous Agentic AI flows, Custom RAG (Retrieval-Augmented Generation) document search systems, custom SaaS web apps, and Cloud deployment.\n- Support: 90 Days support.\n- Target: High-growth businesses adding deep AI value to their stack.",
      replies: ["Standard Plan Details", "Enterprise Details", "Book Premium Plan"]
    },
    enterprisePlan: {
      keywords: ["enterprise details", "enterprise package", "enterprise plan", "enterprise custom"],
      response: "**Enterprise Package - Custom Transformation (Custom Pricing)**:\n- Deliverables: Dedicated engineering support, complete business automation workflows, tailored third-party integrations, and long-term retainer options.\n- Support: Priority 24/7 consulting.\n- Target: Corporations requiring heavy custom-trained modeling and systems scaling.",
      replies: ["Book Enterprise Plan", "Other Inquiries", "AI & Web Services"]
    },
    cases: {
      keywords: ["cases", "case studies", "projects", "portfolio", "chatbot platform", "validator"],
      response: "Here are Jilani's featured engineering projects:\n\n* **Agentic Chatbot Platform**: A production-grade multi-agent pipeline built with LangGraph, FastAPI, and React. Deployed on Vercel/Render.\n* **AI Startup Validator**: A multi-agent framework checking startup potential against live competitor data utilizing Tavily Search & Groq models.\n* **AIAdvocate Legal RAG**: Legal assistant answering Indian Penal Code queries using FAISS index files.\n* **Data Speed Tester**: Web app displaying latency, upload, and download charts.",
      replies: ["View Pricing Plans", "Book Consultation", "About Jilani"]
    },
    about: {
      keywords: ["about", "about jilani", "founder", "who is", "jilani", "location"],
      response: "Jilani is a skilled **Data Scientist & AI/ML Engineer** specialized in generative AI, agentic workflows (LangGraph, CrewAI), vector databases (FAISS, Pinecone), and frontend/backend web stacks (FastAPI, Streamlit, React). He is based in Noida/Delhi, working globally with clients to automate processes and build production systems.",
      replies: ["View Pricing Plans", "See Case Studies", "Book Consultation"]
    },
    contact: {
      keywords: ["contact", "book", "consultation", "hire", "schedule", "work", "email", "form", "hire me", "let's connect", "book basic plan", "book standard plan", "book premium plan", "book enterprise plan"],
      response: "Excellent decision! To get started immediately, you can:\n\n1. Use the **Contact Form** on the screen to shoot an email directly.\n2. Email directly at: **jilanipasha1011@gmail.com**\n3. Connect via LinkedIn: **linkedin.com/in/jilani-pasha1011**\n\nIf you let us know your requirements in the form, Jilani will get back to you with a project draft within 12 hours. Would you like to check anything else?",
      replies: ["AI & Web Services", "View Pricing Plans", "About Jilani"]
    }
  };

  // Toggle Chatbot
  chatbotTrigger.addEventListener("click", () => {
    chatbotTrigger.classList.toggle("active");
    chatbotContainer.classList.toggle("active");
    if (chatbotContainer.classList.contains("active")) {
      // Focus input
      setTimeout(() => chatInputField.focus(), 300);
      // Send greeting if empty
      if (chatMessages.children.length === 0) {
        showBotResponse(knowledgeBase.greetings.response, knowledgeBase.greetings.replies);
      }
    }
  });

  chatClose.addEventListener("click", () => {
    chatbotTrigger.classList.remove("active");
    chatbotContainer.classList.remove("active");
  });

  // Handle Input send
  chatSendBtn.addEventListener("click", handleUserSend);
  chatInputField.addEventListener("keypress", (e) => {
    if (e.key === "Enter") handleUserSend();
  });

  function handleUserSend() {
    const text = chatInputField.value.trim();
    if (!text) return;

    // Append user message
    appendMessage(text, "user");
    chatInputField.value = "";

    // Clear quick replies
    quickRepliesContainer.innerHTML = "";

    // Show bot typing
    const typingIndicator = appendTypingIndicator();
    chatMessages.scrollTop = chatMessages.scrollHeight;

    setTimeout(() => {
      removeTypingIndicator(typingIndicator);
      processInput(text);
    }, 1000);
  }

  function processInput(userInput) {
    const text = userInput.toLowerCase();
    let bestMatch = null;

    // Simple keyword mapping
    for (const key in knowledgeBase) {
      const data = knowledgeBase[key];
      const match = data.keywords.some(keyword => text.includes(keyword));
      if (match) {
        bestMatch = data;
        break;
      }
    }

    if (bestMatch) {
      showBotResponse(bestMatch.response, bestMatch.replies);
    } else {
      // Fallback
      showBotResponse(
        "I'm not sure I understood that specific request. I am a chatbot specialized in Jilani's Agency packages. Please select one of the quick options below, or fill out the contact form to speak directly with him!",
        ["AI & Web Services", "View Pricing Plans", "See Case Studies", "Book Consultation"]
      );
    }
  }

  function appendMessage(text, sender) {
    const msg = document.createElement("div");
    msg.classList.add("chat-message", sender);
    
    // Format markdown-like simple links and bold text
    let formattedText = text
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      .replace(/\*(.*?)\*/g, '<em>$1</em>')
      .replace(/\n/g, '<br>');
      
    msg.innerHTML = formattedText;
    chatMessages.appendChild(msg);
    chatMessages.scrollTop = chatMessages.scrollHeight;
    return msg;
  }

  function appendTypingIndicator() {
    const indicator = document.createElement("div");
    indicator.classList.add("chat-message", "bot", "typing-indicator");
    indicator.innerHTML = "<span></span><span></span><span></span>";
    chatMessages.appendChild(indicator);
    return indicator;
  }

  function removeTypingIndicator(indicator) {
    if (indicator && indicator.parentNode) {
      indicator.parentNode.removeChild(indicator);
    }
  }

  function showBotResponse(botResponse, replies) {
    // Append bot message with typewriter effect
    const botMsgElement = appendMessage("", "bot");
    
    let formattedText = botResponse
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      .replace(/\n/g, '<br>');
      
    // Format bullet points
    formattedText = formattedText.replace(/^\*\s(.*)/gm, '• $1');

    let currentText = "";
    let i = 0;
    const typingInterval = setInterval(() => {
      if (i < formattedText.length) {
        // Handle HTML tag typing
        if (formattedText[i] === "<") {
          const endTagIdx = formattedText.indexOf(">", i);
          if (endTagIdx !== -1) {
            currentText += formattedText.substring(i, endTagIdx + 1);
            i = endTagIdx + 1;
          } else {
            currentText += formattedText[i];
            i++;
          }
        } else {
          currentText += formattedText[i];
          i++;
        }
        botMsgElement.innerHTML = currentText;
        chatMessages.scrollTop = chatMessages.scrollHeight;
      } else {
        clearInterval(typingInterval);
        // Render quick replies after text completes
        renderQuickReplies(replies);
      }
    }, 8);
  }

  function renderQuickReplies(replies) {
    quickRepliesContainer.innerHTML = "";
    if (!replies || replies.length === 0) return;

    replies.forEach(reply => {
      const btn = document.createElement("button");
      btn.classList.add("quick-reply-btn");
      btn.textContent = reply;
      btn.addEventListener("click", () => {
        // Clear old replies
        quickRepliesContainer.innerHTML = "";
        // Append user response
        appendMessage(reply, "user");
        
        // Show typing
        const indicator = appendTypingIndicator();
        chatMessages.scrollTop = chatMessages.scrollHeight;

        setTimeout(() => {
          removeTypingIndicator(indicator);
          processInput(reply);
        }, 800);
      });
      quickRepliesContainer.appendChild(btn);
    });
    chatMessages.scrollTop = chatMessages.scrollHeight;
  }
});
