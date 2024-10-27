import { useEffect, useState } from "react";
import classes from "./css/postAnswer.module.css";
import { IoArrowForwardCircle } from "react-icons/io5";
import { useParams } from "react-router-dom";
import axiosInstance from "../../axios/axiosConfig";
import AnswerCard from "../AnswerCard/AnswerCard";
import { BeatLoader } from "react-spinners";

const MAX_ANSWER_LENGTH = 500;

const AnswerPage = () => {
  const { question_id } = useParams();
  const [question, setQuestion] = useState(null);
  const [answers, setAnswers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [answer, setAnswer] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [posted, setPosted] = useState(false);

  const title = question?.title;
  const content = question?.content;

  const fetchData = async () => {
    setError("");
    setIsLoading(true); // Start loading state
    try {
      const response = await axiosInstance.get(`/questions/${question_id}`, {
        // Fixed template literal syntax
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`, // Fixed template literal syntax
        },
      });
      setQuestion(response.data);
    } catch (error) {
      console.error("Error fetching the question:", error);
      setError("Failed to load question. Please try again later.");
    }

    try {
      const response = await axiosInstance.get(`/answer/${question_id}`, {
        // Fixed template literal syntax
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`, // Fixed template literal syntax
        },
      });
      setAnswers(response.data.answers);
    } catch (error) {
      console.error("Error fetching answers:", error);
    } finally {
      setIsLoading(false); // End loading state
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");
    if (answer.length === 0) {
      // Use strict equality for comparison
      setError("Please provide an answer before submitting.");
      return;
    }

    setIsSubmitting(true);

    try {
      await axiosInstance.post(
        "/answer",
        { answer, question_id },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`, // Fixed template literal syntax
          },
        }
      );

      fetchData();
      setAnswer("");
      setPosted(true);
      setTimeout(() => {
        setPosted(false);
      }, 800);
    } catch (error) {
      console.error(error);
      setError("Failed to post your answer. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [question_id]);

  const handleInputChange = (e) => {
    setAnswer(e.target.value);
    if (error) setError("");
  };

  return (
    <div className={classes.postPageContainer}>
      <div className={classes.steps}>
        <h2>QUESTION</h2>
        <div className={classes.flex_container}>
          <div className={classes.icon_container}>
            <IoArrowForwardCircle color={"#516CEF"} size={34} />
          </div>
          <div>
            <div className={classes.title}>
              <h1>{title || "Loading..."}</h1>
            </div>
            <div className={classes.underline}></div>
            <div className={classes.content_container}>
              {content || "Loading..."}
            </div>
          </div>
        </div>
      </div>
      <hr />
      <h3 className={classes.postTitle}>Answer From The Community</h3>
      <hr />

      <div>
        {answers.length !== 0 ? (
          answers.map((answer) => (
            <AnswerCard key={answer.id} answer={answer} />
          ))
        ) : (
          <div className={classes.noAnswer}>No answers yet.</div> // Capitalized for consistency
        )}
      </div>

      {error && <div className={classes.errorAlert}>{error}</div>}

      <div className={classes.spinner}>
        {isLoading && <BeatLoader color="orange" size={40} />}{" "}
        {/* Conditional rendering */}
      </div>

      {posted && (
        <p className={classes.submissionAlert}> Answer posted successfully.</p>
      )}

      <form onSubmit={handleSubmit}>
        <textarea
          name="answer"
          className={classes.textarea}
          placeholder="Your answer ..."
          value={answer}
          onChange={handleInputChange}
        />
        <div>
          {answer.length}/{MAX_ANSWER_LENGTH} characters
        </div>
        <button
          className={classes.button}
          type="submit"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Posting..." : "Post Answer"}
        </button>
      </form>
    </div>
  );
};

export default AnswerPage;
