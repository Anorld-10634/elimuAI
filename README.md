# ElimuAI: Adaptive STEM Tutoring for East Africa

ElimuAI is an AI-powered educational platform specifically designed to empower East African students in STEM (Science, Technology, Engineering, and Mathematics). By leveraging advanced AI models and localized pedagogical strategies, ElimuAI makes complex concepts accessible through familar analogies and adaptive learning paths.

## 🚀 Key Features

- **Localized STEM Logic**: Explains complex Physics, Biology, and Math concepts using analogies and code-switching (Sheng/Swahili/English) that resonate with the East African context.
- **Adaptive Chat Tutor**: An intelligent AI tutor that adjusts its teaching style (Visual, Auditory, Reading, Kinesthetic) based on the student's unique profile.
- **Interactive Assessments**: Dynamic quiz generation powered by Gemini 1.5 Flash to test understanding and reinforce learning.
- **Real-time Progress Tracking**: A visual dashboard where students monitor their mastery of different concepts. Progress starts at 0% and grows dynamically through interaction and successful assessments.
- **Secure Email Sign-In**: A professional, distraction-free entry point for students to resume their learning journey.
- **Collaborative Hub**: A dedicated space for remote student collaboration and group study sessions.

## 🛠️ Technology Stack

- **Frontend**: React 18+ with Vite
- **Styling**: Tailwind CSS for responsive, modern UI
- **AI Engine**: Google Gemini 1.5 Flash (via @google/genai SDK)
- **Animations**: Framer Motion (motion/react)
- **Icons**: Lucide React
- **Persistence**: LocalStorage for user profiles and progress synchronization

## 📂 Project Structure

```text
├── src/
│   ├── components/       # Reusable UI components (Tutor, Lessons, Progress, etc.)
│   ├── lib/              # Core logic and AI service integration
│   ├── constants.ts      # STEM curriculum and educational data
│   ├── types.ts          # TypeScript interfaces for users and lessons
│   └── App.tsx           # Main routing and authentication logic
├── public/               # Static assets
└── README.md             # Project documentation
```

## 🚦 Getting Started

1. **Authentication**: Enter your school or personal email on the login screen to initialize your profile.
2. **Personalization**: Visit the Settings tab to choose your preferred learning style (e.g., "Auditory" for story-based explanations).
3. **Learn**: Browse the Lesson Explorer and click "Learn with Elimu" to start a chat session.
4. **Master**: Take quizzes to significantly boost your progress percentage for each concept.

## 🔒 Privacy & Security

ElimuAI prioritizes student privacy. All progress data is stored locally on the user's device, ensuring that learning journeys remain private and secure.

---
*Elimu ni Nguvu — Knowledge is Power.*
