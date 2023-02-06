import { Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

let conversationList = [];

export default async function (req, res) {
  if (!configuration.apiKey) {
    res.status(500).json({
      error: {
        message: "OpenAI API key not configured, please follow instructions in README.md",
      }
    });
    return;
  }

  const message = req.body.message || '';
  if (message.trim().length === 0) {
    res.status(400).json({
      error: {
        message: "Please enter a valid message",
      }
    });
    return;
  }
  conversationList.push(`User: ${message}`);
  try {
    const completion = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: generatePrompt(conversationList),
      temperature: 0.7,
      max_tokens: 2000,
    });
    //push the response from OpenAI with DomainAI: in front of it
    conversationList.push(`DomainAI: ${completion.data.choices[0].text}`);
    res.status(200).json({ result: completion.data.choices[0].text });
  } catch(error) {
    // Consider adjusting the error handling logic for your use case
    if (error.response) {
      console.error(error.response.status, error.response.data);
      res.status(error.response.status).json(error.response.data);
    } else {
      console.error(`Error with OpenAI API request: ${error.message}`);
      res.status(500).json({
        error: {
          message: 'An error occurred during your request.',
        }
      });
    }
  }
}

function generatePrompt(conversationList, message) {
  // Create a string with all the conversation history joined by newlines
  const conversation = conversationList.join('\n');
  return `Imagine you are DomainAI who is a support bot for this company ${message} or whatever company was last represented by DomainAI in the conversation or DomainAI as a company if you are unsure what company they are asking about. You are a fun bot and you
   like to use lots of emojis all through the sentence. You are non-repetitive in your responses.
    Respond to a customer who is interested in your products and you want to make sure to ask open ended
     questions that drive engagement but also be informative. Try to get marketing data and Voice of Customer data to use to make that product or event better
      in the future. If you are unsure what the product is you can nicely ask if they have ever used a product from the company being represented by DomainAI.


  Conversation: ${conversation}
  Response: `;
}
