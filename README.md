# 🤖 Multi-AI Chat Platform 

This project is a fully frontend-based **Multi-AI Chat** application that provides access to multiple artificial intelligence (AI) models through a single interface.  
Users can select the AI model they want to interact with, send queries, and instantly view responses.  
**No backend is used** – all API calls are made directly from the frontend.

> 👨‍💻 **Developer**: [Onur Yerlikaya](https://github.com/onuryerlikaya)

---

## 🚀 Features

- 🌐 Access to multiple AI models
- 🤖 Selectable AI list (OpenAI, HuggingFace, Mistral, etc.)
- 💬 Dedicated chat panels for each AI
- 🔐 Support for any AI that accepts API key input
- ⚡ Real-time messaging and response viewing

---

## 🛠️ Technologies Used

- React (Vite or CRA based)
- TailwindCSS (optional)
- Fetch API
- OpenAI GPT (Chat API)
- HuggingFace Inference API
- .env for API key management

---

## 📷 Screenshots

Soon.

---

## ⚙️ Installation

```bash
git clone https://github.com/onuryerlikaya/multi-ai-chat.git
cd multi-ai-chat
npm install
npm run dev
```

---

## 🔑 API Keys (.env)

Create a `.env` file like the following:

```
VITE_OPENAI_API_KEY=sk-xxxx
VITE_HUGGINGFACE_TOKEN=hf_xxxx
VITE_MISTRAL_API_KEY=your_key
VITE_CUSTOM_AI_KEY=optional
```

> This platform **supports any AI model for which an API key is provided**.  
Only AI APIs with CORS permission will work directly in the frontend.

---

## 🤖 Supported AI Models

| AI Platform        | Status     | Description                                   |
|--------------------|------------|-----------------------------------------------|
| OpenAI GPT         | ✅ Active with API key | GPT-3.5, GPT-4, DALL·E 3                 |
| HuggingFace        | ✅ Active with API key | gpt2, mistral-7b, etc.                   |
| Mistral            | ✅ Active with API key | Mistral models (inference API)          |
| Claude / Anthropic | 🔐 May work via proxy with API key |
| Gemini / Google    | 🔐 No public API yet, may be added later |
| Poe, Grok, XAI     | ❌ Platform-specific only               |

> ✅ The list can be extended with any supported model via API key.

---

## 🧠 How It Works

1. User selects an AI model from the interface.
2. Types a message and sends it.
3. The frontend makes a `fetch()` request to the appropriate AI API.
4. The response is displayed instantly in the chat panel.

---

## 👤 Developer

> Project developed by [Onur Yerlikaya](https://github.com/onuryerlikaya).

---

## 📜 License

This project is released under the [MIT License](./LICENSE). Commercial use is allowed with attribution.

---

> ⚠️ This is a demo project. API key security should be handled carefully when used in the frontend. For production use, it is recommended to implement a backend or proxy server.
