export const updateQuestion = async (id: string, answer: string) => {
  try {
    const response = await fetch(`${import.meta.env.VITE_NEXTAUTH_URL}/update/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ answer }), // Fix here
    });

    const data = await response.json();
    console.log("res on api", data);

    if (!response.ok) throw new Error('Error updating question');
    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
