export const getQuestionById = async (id: string) => {
    try {
      console.log("uiSDiugasdfiai")
      const response = await fetch(`${import.meta.env.VITE_NEXTAUTH_URL}/${id}`);
      if (!response.ok) throw new Error('Error fetching question');
      return await response.json();
    } catch (error) {
      console.error(error);
      throw error;
    }
  };
  