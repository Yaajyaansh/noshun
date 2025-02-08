import { Editor } from "@/components/Editor";
import { Building2 } from "lucide-react";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <header className="border-b">
        <div className="mx-auto max-w-3xl p-4">
          <div className="flex items-center gap-2">
            <Building2 className="h-6 w-6" />
            <h1 className="text-2xl font-bold">Noshun</h1>
          </div>
        </div>
      </header>
      <main>
        <Editor />
      </main>
    </div>
  );
};

export default Index;