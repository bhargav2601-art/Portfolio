const PORTFOLIO_CONTEXT = `
Bhargav K is an AI and Machine Learning enthusiast and engineering student at GMIT Davanagere.
He specializes in AI automation, workflow engineering, computer vision, Generative AI applications, data science, and modern web technologies.

Projects:
- AI-Based Sign Language Translator: real-time gesture recognition, computer vision, MediaPipe/OpenCV-style pipelines, speech/subtitle translation, accessibility-focused architecture.
- AI Workflow Automation Systems: n8n, OpenAI API, Telegram/WhatsApp-style automation, conversational AI workflows, multi-platform orchestration, adaptive agents.
- Loan Approval Prediction System: machine learning classification, preprocessing, feature engineering, explainable scoring, risk-aware finance analytics.

Experience:
- Data Science Intern at ECHO Brains Technologies Pvt Ltd, Bangalore, India in 2026.
- Worked on data preprocessing, cleaning, visualization, model development/testing, analytics, automation tasks, debugging, agile project discussions, and industry-level execution.

Skills:
- AI/ML: Python, TensorFlow, PyTorch, OpenCV, YOLOv8, Machine Learning, Computer Vision.
- Automation/APIs: n8n, OpenAI API, AI Agents, Workflow Automation.
- Frontend: HTML, CSS, JavaScript, React, Next.js.
- Data/tools: SQL, Databases, Git, GitHub, Pandas, Excel.
- Soft skills: problem solving, collaboration, creative thinking, fast learning, communication, project management, innovation and research mindset.

Certifications and achievements:
- Machine Learning Internship Certificate, CodeAlpha (2025).
- Tableau for Beginners, Udemy/Coursera (2024).
- Python for Data Science & Machine Learning Bootcamp, Udemy.
- Participated in Emerge inter-college hackathon and Ignitron 48-hour hackathon.
`;

const SYSTEM_PROMPT = `
You are Bhargav K's portfolio-trained AI assistant.
Answer recruiter, collaborator, and technical questions using the portfolio context.
Be concise, specific, confident, and engineering-focused.
Explain architectures and workflows clearly without inventing facts.
If asked for unavailable private details, say they are not listed in the portfolio.
Keep answers under 130 words unless the user asks for more detail.

Portfolio context:
${PORTFOLIO_CONTEXT}
`;

function fallbackAnswer(message: string) {
  const lower = message.toLowerCase();

  if (lower.includes("workflow") || lower.includes("automation") || lower.includes("n8n")) {
    return "Bhargav builds AI workflow systems using n8n, OpenAI APIs, messaging integrations, and agent-style routing logic. The architecture focuses on connecting triggers, LLM reasoning, platform actions, and automation nodes into practical systems that reduce repetitive manual work.";
  }

  if (lower.includes("computer vision") || lower.includes("sign") || lower.includes("opencv")) {
    return "Bhargav's computer vision work includes an AI-based sign language translator focused on real-time gesture inference, visual processing, and accessibility. The system direction combines OpenCV/MediaPipe-style tracking, recognition overlays, and speech or subtitle translation.";
  }

  if (lower.includes("loan") || lower.includes("ml") || lower.includes("machine learning")) {
    return "Bhargav's ML projects include a loan approval prediction system with preprocessing, feature engineering, classification, confidence scoring, and explainability. The goal is risk-aware decision support rather than a black-box prediction.";
  }

  if (lower.includes("skill") || lower.includes("technology") || lower.includes("tech")) {
    return "Bhargav specializes in Python, Machine Learning, Computer Vision, OpenAI APIs, n8n automation, React, Next.js, SQL, Git, and AI agent workflows. His strengths sit at the intersection of applied AI, automation, and usable product interfaces.";
  }

  return "Bhargav is an AI and Machine Learning enthusiast focused on real-world intelligent systems: computer vision, AI automation, workflow engineering, data science, and modern web apps. His portfolio highlights production-minded projects in accessibility, automation, and finance intelligence.";
}

function streamText(text: string) {
  const encoder = new TextEncoder();

  return new ReadableStream({
    async start(controller) {
      const words = text.split(" ");

      for (const word of words) {
        controller.enqueue(encoder.encode(`${word} `));
        await new Promise((resolve) => setTimeout(resolve, 22));
      }

      controller.close();
    },
  });
}

export async function POST(request: Request) {
  const { message } = (await request.json()) as { message?: string };
  const cleanMessage = message?.trim();

  if (!cleanMessage) {
    return new Response("Ask me something about Bhargav's AI portfolio.", {
      headers: { "Content-Type": "text/plain; charset=utf-8" },
    });
  }

  const apiKey = process.env.OPENAI_API_KEY;

  if (!apiKey) {
    return new Response(streamText(fallbackAnswer(cleanMessage)), {
      headers: { "Content-Type": "text/plain; charset=utf-8" },
    });
  }

  const openaiResponse = await fetch("https://api.openai.com/v1/responses", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: process.env.OPENAI_MODEL ?? "gpt-5",
      instructions: SYSTEM_PROMPT,
      input: [{ role: "user", content: cleanMessage }],
      stream: true,
    }),
  });

  if (!openaiResponse.ok || !openaiResponse.body) {
    return new Response(streamText(fallbackAnswer(cleanMessage)), {
      headers: { "Content-Type": "text/plain; charset=utf-8" },
    });
  }

  const encoder = new TextEncoder();
  const decoder = new TextDecoder();
  const reader = openaiResponse.body.getReader();
  let buffer = "";

  const stream = new ReadableStream({
    async start(controller) {
      while (true) {
        const { value, done } = await reader.read();
        if (done) break;

        buffer += decoder.decode(value, { stream: true });
        const lines = buffer.split("\n");
        buffer = lines.pop() ?? "";

        for (const line of lines) {
          if (!line.startsWith("data: ")) continue;

          const data = line.slice(6);
          if (data === "[DONE]") continue;

          try {
            const event = JSON.parse(data) as {
              type?: string;
              delta?: string;
              error?: { message?: string };
            };

            if (event.type === "response.output_text.delta" && event.delta) {
              controller.enqueue(encoder.encode(event.delta));
            }
          } catch {
            continue;
          }
        }
      }

      controller.close();
    },
  });

  return new Response(stream, {
    headers: {
      "Cache-Control": "no-cache",
      "Content-Type": "text/plain; charset=utf-8",
    },
  });
}
