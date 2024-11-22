export const deleteQuestion = async (id: string) => {
    try {
      const response = await fetch(`${import.meta.env.VITE_NEXTAUTH_URL}/delete/${id}`, {
        method: 'DELETE',
      });
  
      if (!response.ok) throw new Error('Error deleting question');
      return await response.json();
    } catch (error) {
      console.error(error);
      throw error;
    }
  };
  