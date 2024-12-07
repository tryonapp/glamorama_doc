import { useEffect, useRef, useState } from "react";
import { Link } from "react-scroll";
import "./App.css";

const App = () => {
  const sectionRefs = useRef({
    "docs-title": null,
    introduction: null,
    "quick-start-guide": null,
    "create-try-on-task": null,
    "check-task-status": null,
    support: null,
  });

  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [activeIndex, setActiveIndex] = useState(null);

  useEffect(() => {
    const handleScroll = () => {
      const currentSection = Object.keys(sectionRefs.current).find((key) => {
        const ref = sectionRefs.current[key];
        if (ref) {
          const rect = ref.getBoundingClientRect();
          return (
            (rect.top >= 0 && rect.top <= window.innerHeight / 2) ||
            (rect.bottom >= 0 && rect.bottom <= window.innerHeight)
          );
        }
        return false;
      });

      if (currentSection) {
        const index = getIndexById(currentSection);
        if (index !== null) {
          handleClick(index);
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const handleClick = (index) => {
    console.log(index);
    setActiveIndex(index);
  };

  const getIndexById = (id) => {
    switch (id) {
      case "docs-title":
        return 1;
      case "introduction":
        return 2;
      case "quick-start-guide":
        return 3;
      case "create-try-on-task":
        return 4;
      case "check-task-status":
        return 5;
      case "support":
        return 8;
      default:
        return null;
    }
  };

  return (
    <main className="docs">
      <button className="sidebar-toggle" onClick={toggleSidebar}>
        <div className="sidebar-toggle-button">
          <span></span>
          <span></span>
          <span></span>
        </div>
      </button>
      <aside className={`docs-sidebar ${sidebarOpen ? "open" : "closed"}`}>
        <div className="sidebar-nav">
          <ul>
            <li className={activeIndex === 1 ? "active" : ""}>
              <Link
                to="docs-title"
                smooth={true}
                duration={500}
                onClick={() => handleClick(1)}
              >
                Glamorama Try-On API
              </Link>
            </li>
            <ul>
              <li className={activeIndex === 2 ? "active" : ""}>
                <Link
                  to="introduction"
                  smooth={true}
                  duration={500}
                  onClick={() => handleClick(2)}
                >
                  Introduction
                </Link>
              </li>
              <li className={activeIndex === 3 ? "active" : ""}>
                <Link
                  to="quick-start-guide"
                  smooth={true}
                  duration={500}
                  onClick={() => handleClick(3)}
                >
                  Quick Start Guide
                </Link>
              </li>
              <ul>
                <li
                  className={activeIndex === 4 ? "active" : ""}
                  onClick={() => handleClick(4)}
                >
                  <Link to="create-tryon-task" smooth={true} duration={500}>
                    Create Try-On Task
                  </Link>
                </li>
                <li
                  className={activeIndex === 5 ? "active" : ""}
                  onClick={() => handleClick(5)}
                >
                  <Link to="check-task-status" smooth={true} duration={500}>
                    Check Task Status
                  </Link>
                </li>
              </ul>
              <li
                className={activeIndex === 8 ? "active" : ""}
                onClick={() => handleClick(8)}
              >
                <Link to="support" smooth={true} duration={500}>
                  Support
                </Link>
              </li>
            </ul>
          </ul>
        </div>
      </aside>
      <section className="docs-content">
        <article className="markdown-body">
          <h1
            id="docs-title"
            ref={(el) => (sectionRefs.current["docs-title"] = el)}
          >
            <Link>
              <span>Glamorama Try-On API</span>
            </Link>
          </h1>
          <h2
            id="introduction"
            ref={(el) => (sectionRefs.current["introduction"] = el)}
          >
            <Link>
              <span>Introduction</span>
            </Link>
          </h2>
          <p>
            The Glamorama Try-On API enables the development of virtual try-on
            solutions for apps, websites, browser extensions, and shopping
            tools.
          </p>
          <ul>
            <li>
              <code>Credits:</code> Each Try-On request consumes 1 credit.
            </li>
            <li>
              <code>API Key:</code> Retrieve your API key from the Glamorama API
              Keys page.
            </li>
          </ul>
          <h2
            id="quick-start-guide"
            ref={(el) => (sectionRefs.current["quick-start-guide"] = el)}
          >
            <Link>
              <span>Quick Start Guide</span>
            </Link>
          </h2>
          <h3
            id="create-tryon-task"
            ref={(el) => (sectionRefs.current["create-try-on-task"] = el)}
          >
            <Link>
              <span>Create Try-On Task</span>
            </Link>
          </h3>
          <ul>
            <li>
              <code>Endpoint:</code> POST https://api.glamorama.ai/tryon_full
            </li>
            <li>
              <code>Authorization:</code> Bearer $API_KEY
            </li>
            <li>
              <code>Content-Type:</code> multipart/form-data
            </li>
          </ul>
          <h3 id="request-parameters">
            <Link>
              <span>Request Parameters</span>
            </Link>
          </h3>
          <ul>
            <li>
              <code>required</code>person:Person's image file.
            </li>
            <li>
              <code>required</code>cloth: Clothing image file.
            </li>
            <li>
              <code>required</code>position: Options: upper, lower, dresses.
            </li>
            <li>
              <code>required</code>
              caption for lower and dresses: Description, e.g., mini, midi,
              maxi, knee-length
            </li>
            <li>
              <code>optional</code>logo : Defaults to yes.
            </li>
          </ul>
          <h4 id="request">
            <Link>
              <span>Request</span>
            </Link>
          </h4>
          <pre>
            <code className="lang-shell">
              {`
POST https://api.glamorama.ai/tryon_full
Authorization: Bearer $API_KEY
Content-Type: multipart/form-data

Form-Data:
{
  "person": "my_photo_1.jpg",
  "cloth": "cloth_1.jpg",
  "position": "upper",
  "logo": "yes",
  "caption": "midi"
}
      `}
            </code>
          </pre>
          <h4 id="success-response">
            <Link>
              <span>Succsess Response</span>
            </Link>
          </h4>
          <pre>
            <code className="lang-shell">
              {`
{
  "status": 200,
  "taskID": 1225
}
      `}
            </code>
          </pre>
          <h4 id="failure-response">
            <Link>
              <span>Failure Response</span>
            </Link>
          </h4>
          <pre>
            <code className="lang-shell">
              {`
{
  "status": 500,
  "message": "Validation failed: Missing required fields"
}
      `}
            </code>
          </pre>
          <h3
            id="check-task-status"
            ref={(el) => (sectionRefs.current["check-task-status"] = el)}
          >
            <Link>
              <span>Check Task Status</span>
            </Link>
          </h3>
          <ul>
            <li>
              <code>Endpoint:</code> POST https://api.glamorama.ai/get_task
            </li>
            <li>
              <code>Authorization:</code> Bearer $API_KEY
            </li>
            <li>
              <code>Content-Type:</code> application/json
            </li>
          </ul>
          <h4 id="request">
            <Link>
              <span>Request</span>
            </Link>
          </h4>
          <pre>
            <code className="lang-shell">
              {`
{
  "taskID": 1225
}

      `}
            </code>
          </pre>
          <h4 id="success-response">
            <Link>
              <span>Succsess Response</span>
            </Link>
          </h4>
          <pre>
            <code className="lang-shell">
              {`
{
  "status": 200,
  "tryon_img": "BASE64_ENCODED_IMAGE",
  "created_date": "2024-11-24T08:45:21Z",
  "taskID": 1225,
  "userID": 27,
  "person_img": "BASE64_ENCODED_PERSON_IMAGE",
  "cloth_img": "BASE64_ENCODED_CLOTH_IMAGE",
  "caption": "midi",
  "tryon_category": "lower"
}
      `}
            </code>
          </pre>
          <h4 id="failure-response">
            <Link>
              <span>Failure Response</span>
            </Link>
          </h4>
          <h5>Missing taskID</h5>
          <pre>
            <code className="lang-shell">
              {`
{
  "status": 500,
  "message": "Validation failed: Missing taskID field"
}
      `}
            </code>
          </pre>
          <h5>Task Not Found</h5>
          <pre>
            <code className="lang-shell">
              {`
{
  "status": 500,
  "message": "DataManager failed: Tryon task with {'userID': 27, 'taskID': 1225} not found"
}
      `}
            </code>
          </pre>
          <h2
            id="support"
            ref={(el) => (sectionRefs.current["support"] = el)}
            style={{ marginTop: "100px" }}
          >
            <Link>
              <span>Support</span>
            </Link>
          </h2>
          <p>For further assistance, contact our Support Team.</p>
          <ul className="support-list">
            <li>
              Linked:{" "}
              <a
                href="https://www.linkedin.com/company/glamorama-ai/"
                target="_blank"
                rel="noopener noreferrer"
              >
                https://www.linkedin.com/company/glamorama-ai
              </a>
            </li>
            <li>
              Instagram:{" "}
              <a
                href="https://www.instagram.com/glamorama_ai/"
                target="_blank"
                rel="noopener noreferrer"
              >
                glamorama.ai
              </a>
            </li>
            <li>
              Discord:{" "}
              <a
                href="https://discord.gg/aPUFmYYS"
                target="_blank"
                rel="noopener noreferrer"
              >
                https://discord.gg/aPUFmYYS
              </a>
            </li>
          </ul>
        </article>
      </section>
    </main>
  );
};

export default App;
