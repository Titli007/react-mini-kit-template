export const createQuestion = async (questionText: string) => {
    try {
      console.log(questionText)
      console.log(import.meta.env.VITE_NEXTAUTH_URL)
      console.log(({ question: questionText }))
      console.log(`${import.meta.env.VITE_NEXTAUTH_URL}/create`)
      const response = await fetch(`${import.meta.env.VITE_NEXTAUTH_URL}/create`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ question: questionText }),
      });
      console.log("adadasdASdASD",response)
      if (!response.ok) throw new Error('Error creating question');
      return await response.json();
    } catch (error) {
      console.error(error);
      throw error;
    }
  };
  