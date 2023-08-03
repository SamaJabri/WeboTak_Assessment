import { create } from "zustand";
import { persist } from "zustand/middleware";

import axios from "axios";

const useWeboTakStore = create(
  persist(
    (set, get) => ({
      currentUser: {},
      //questions: [],

      addUser: async (name) => {
        let response;

        try {
          response = await axios.post("http://localhost:3000/user", {
            name,
          });
          console.log(response.data);

          set({
            currentUser: response.data,
          });

          return response;
        } catch (error) {
          console.error("Error submitting name:", error);
          return error;
        }
      },

      getQuestionsForUser: async () => {
        let response;

        try {
          response = await axios.get(
            `http://localhost:3000/questions/${get().currentUser.id}`
          );
          console.log(response.data);

          return response.data;
        } catch (error) {
          console.error("Error submitting name:", error);
          return error;
        }
      },

      answerQuestion: async (questionId, optionId) => {
        let response;

        try {
          response = await axios.post("http://localhost:3000/answer", {
            userId: get().currentUser.id,
            questionId,
            optionId,
          });

          set({
            questions: get().questions.filter(({ id }) => id !== questionId),
          });
          console.log(response.data);

          return response;
        } catch (error) {
          console.error("Error submitting name:", error);
          return error;
        }
      },

      checkDuplicateQuestion: async (question) => {
        let response;

        try {
          response = await axios.post("http://localhost:3000/question", {
            question,
          });
          console.log(response.data);

          return response;
        } catch (error) {
          console.error("Error submitting name:", error);
          return error;
        }
      },

      addQuestion: async (question, answerOptions) => {
        let response;

        try {
          response = await axios.post("http://localhost:3000/full-question", {
            question,
            answerOptions,
          });
          console.log(response.data);

          return response;
        } catch (error) {
          console.error("Error submitting name:", error);
          return error;
        }
      },

      getAnalysis: async () => {
        let response;

        try {
          response = await axios.get(`http://localhost:3000/questions-info`);
          console.log(response.data);

          return response.data;
        } catch (error) {
          console.error("Error fetching data:", error);
          return error;
        }
      },
    }),
    { name: "data" }
  )
);

export default useWeboTakStore;
