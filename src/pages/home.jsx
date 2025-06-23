import { useContext } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  ArrowRight,
  Play,
  Moon,
  Sun,
  CheckCircle,
  Zap,
  Users,
  Move,
} from "lucide-react";
import { useTheme } from "next-themes";
import { Link } from "react-router-dom";
import { AuthContext } from "@/contexts/auth-context";
import { cn } from "@/lib/utils";

const Home = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20 ">
      <Header />

      <div className="container grid lg:grid-cols-2 gap-12 items-center py-12 md:py-24">
        <LeftHeroContent />
        <RightVisualContent />
      </div>

      <Footer />
    </div>
  );
};

const Header = () => {
  const { user } = useContext(AuthContext);
  const { theme, setTheme } = useTheme();
  return (
    <nav className="container relative z-50 border-b bg-background/80 backdrop-blur-sm">
      <div>
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <h1 className="text-xl font-bold bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent">
                TaskFlow
              </h1>
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="flex items-center space-x-4">
            <Button
              variant="outline"
              size="icon"
              onClick={() => setTheme(theme === "light" ? "dark" : "light")}
            >
              {theme === "light" ? <Sun /> : <Moon />}
            </Button>
            {user ? (
              <Link to="/">
                <Button>Your Boards</Button>
              </Link>
            ) : (
              <>
                <Link to="/login">
                  <Button variant="ghost">Sign In</Button>
                </Link>
                <Link to="/register" className="hidden sm:block">
                  <Button>Register</Button>
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

const LeftHeroContent = () => {
  const features = [
    { icon: CheckCircle, color: "text-green-500", text: "Unlimited boards" },
    { icon: Move, color: "text-blue-500", text: "Drag & drop tasks" },
    { icon: Zap, color: "text-yellow-500", text: "Real-time updates" },
  ];

  return (
    <div className="text-center lg:text-left space-y-8">
      <div className="space-y-4">
        <Badge variant="secondary" className="inline-flex items-center gap-2">
          <Zap className="h-3 w-3" />
          New Release
        </Badge>

        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight">
          Organize Work,{" "}
          <span className="bg-gradient-to-r from-primary via-blue-600 to-purple-600 bg-clip-text text-transparent">
            Amplify Impact
          </span>
        </h1>

        <p className="text-xl text-muted-foreground max-w-2xl mx-auto lg:mx-0 leading-relaxed">
          The most intuitive Kanban board for those who want to get things done.
          Drag, drop, and deliver with TaskFlow.
        </p>
      </div>

      {/* Features */}
      <div className="flex flex-wrap justify-center lg:justify-start gap-6 text-sm">
        {features.map((feature, index) => {
          const Icon = feature.icon;
          return (
            <div key={index} className="flex items-center gap-2">
              <Icon className={cn("size-4", feature.color)} />
              <span>{feature.text}</span>
            </div>
          );
        })}
      </div>

      {/* CTA Section */}
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
          <Link to="/register">
            <Button
              size="lg"
              className="text-lg px-8 h-12 shadow-lg hover:shadow-xl transition-all w-full"
            >
              Start For Free
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
          <Link to="/register">
            <Button
              variant="outline"
              size="lg"
              className="text-lg px-8 h-12 w-full"
            >
              <Play className="mr-2 h-5 w-5" />
              Watch Demo
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

const RightVisualContent = () => {
  return (
    <div className="relative lg:block hidden">
      <div className="relative">
        {/* Background Decoration */}
        <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-blue-600/20 rounded-3xl blur-3xl transform rotate-6"></div>

        {/* Main Visual */}
        <div className="relative bg-background/80 backdrop-blur-sm rounded-2xl p-6 shadow-2xl border">
          <div className="space-y-4">
            {/* Mock Kanban Board */}
            <div className="flex justify-between items-center">
              <h3 className="font-semibold">Project Dashboard</h3>
              <div className="flex gap-2">
                <div className="w-3 h-3 bg-red-400 rounded-full"></div>
                <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
                <div className="w-3 h-3 bg-green-400 rounded-full"></div>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4">
              {/* To Do Column */}
              <div className="space-y-2">
                <div className="text-xs font-medium text-muted-foreground">
                  TO DO
                </div>
                <div className="bg-muted/50 rounded-lg p-3 space-y-2">
                  <div className="bg-background rounded p-2 shadow-sm">
                    <div className="h-2 bg-muted rounded mb-1"></div>
                    <div className="h-1 bg-muted rounded w-2/3"></div>
                  </div>
                  <div className="bg-background rounded p-2 shadow-sm">
                    <div className="h-2 bg-muted rounded mb-1"></div>
                    <div className="h-1 bg-muted rounded w-1/2"></div>
                  </div>
                </div>
              </div>

              {/* In Progress Column */}
              <div className="space-y-2">
                <div className="text-xs font-medium text-muted-foreground">
                  IN PROGRESS
                </div>
                <div className="bg-blue-100/50 dark:bg-blue-900/20 rounded-lg p-3 space-y-2">
                  <div className="bg-background rounded p-2 shadow-sm">
                    <div className="h-2 bg-blue-200 dark:bg-blue-800 rounded mb-1"></div>
                    <div className="h-1 bg-muted rounded w-3/4"></div>
                  </div>
                </div>
              </div>

              {/* Done Column */}
              <div className="space-y-2">
                <div className="text-xs font-medium text-muted-foreground">
                  DONE
                </div>
                <div className="bg-green-100/50 dark:bg-green-900/20 rounded-lg p-3 space-y-2">
                  <div className="bg-background rounded p-2 shadow-sm">
                    <div className="h-2 bg-green-200 dark:bg-green-800 rounded mb-1"></div>
                    <div className="h-1 bg-muted rounded w-1/3"></div>
                  </div>
                  <div className="bg-background rounded p-2 shadow-sm">
                    <div className="h-2 bg-green-200 dark:bg-green-800 rounded mb-1"></div>
                    <div className="h-1 bg-muted rounded w-2/3"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Floating Elements */}
        <div className="absolute -top-4 -right-4 bg-primary text-primary-foreground rounded-full p-3 shadow-lg">
          <CheckCircle className="h-6 w-6" />
        </div>
        <div className="absolute -bottom-4 -left-4 bg-blue-600 text-white rounded-full p-3 shadow-lg">
          <Users className="h-6 w-6" />
        </div>
      </div>
    </div>
  );
};

const Footer = () => {
  return (
    <div className="text-center space-y-3 pb-8">
      <span className="uppercase">Submitted By:</span>
      <h3 className="font-bold text-xl">Mr. Chann Kimlong</h3>
    </div>
  );
};
export default Home;
