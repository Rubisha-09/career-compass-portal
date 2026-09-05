import {
  Outlet,
  RouterProvider,
  createRootRoute,
  createRoute,
  createRouter,
  redirect,
} from "@tanstack/react-router";
import CareerDetailPage from "./pages/CareerDetailPage";
import HomePage from "./pages/HomePage";
import LinkedInPage from "./pages/LinkedInPage";
import LoginPage from "./pages/LoginPage";
import QuizPage from "./pages/QuizPage";
import ResultsPage from "./pages/ResultsPage";
import ResumePage from "./pages/ResumePage";
import RoadmapPage from "./pages/RoadmapPage";
import TechQuestPage from "./pages/TechQuestPage";
import type { CareerScore } from "./utils/scoring";

function isLoggedIn(): boolean {
  try {
    const raw = localStorage.getItem("careerCompassUser");
    if (!raw) return false;
    const user = JSON.parse(raw);
    return user?.isLoggedIn === true;
  } catch {
    return false;
  }
}

const rootRoute = createRootRoute({
  component: () => <Outlet />,
});

const loginRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/login",
  component: LoginPage,
});

const homeRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/",
  beforeLoad: () => {
    if (!isLoggedIn()) throw redirect({ to: "/login" });
  },
  component: HomePage,
});

const quizRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/quiz",
  beforeLoad: () => {
    if (!isLoggedIn()) throw redirect({ to: "/login" });
  },
  component: QuizPage,
});

const resultsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/results",
  beforeLoad: () => {
    if (!isLoggedIn()) throw redirect({ to: "/login" });
  },
  component: ResultsPage,
});

const careerRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/career/$id",
  beforeLoad: () => {
    if (!isLoggedIn()) throw redirect({ to: "/login" });
  },
  component: CareerDetailPage,
});

const roadmapRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/career/$id/roadmap",
  beforeLoad: () => {
    if (!isLoggedIn()) throw redirect({ to: "/login" });
  },
  component: RoadmapPage,
});

const resumeRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/career/$id/resume",
  beforeLoad: () => {
    if (!isLoggedIn()) throw redirect({ to: "/login" });
  },
  component: ResumePage,
});

const linkedInRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/career/$id/linkedin",
  beforeLoad: () => {
    if (!isLoggedIn()) throw redirect({ to: "/login" });
  },
  component: LinkedInPage,
});

const techQuestRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/techquest",
  beforeLoad: () => {
    if (!isLoggedIn()) throw redirect({ to: "/login" });
  },
  component: TechQuestPage,
});

const routeTree = rootRoute.addChildren([
  loginRoute,
  homeRoute,
  quizRoute,
  resultsRoute,
  careerRoute,
  roadmapRoute,
  resumeRoute,
  linkedInRoute,
  techQuestRoute,
]);

// Shared state for passing quiz results
export const quizResults: { scores: CareerScore[] | null } = { scores: null };

const router = createRouter({ routeTree });

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

export default function App() {
  return <RouterProvider router={router} />;
}
