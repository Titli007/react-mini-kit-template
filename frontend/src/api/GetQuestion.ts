export const getQuestions = async () => {
  try {
    console.log("Fetching questions...");
    
    const url = `${import.meta.env.VITE_NEXTAUTH_URL}`; // Update path if needed
    const response = await fetch(url, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' }
    });
    
    console.log("Response received:", response);

    // Check if the response is successful
    if (!response.ok) {
      throw new Error(`Error fetching questions: ${response.status} ${response.statusText}`);
    }

    // Parse and return the JSON data
    const data = await response.json();
    console.log("Questions data:", data);
    return data;

  } catch (error) {
    console.error("Error in getQuestions:", error);
    throw error;
  }
};
