import { Button } from "./components/ui/button";
import { Loader2 } from "lucide-react";

export function App() {
  return (
    <div className="flex h-screen items-center justify-center">
      <Button variant={"default"}>
        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
        Please wait
      </Button>
    </div>
  );
}
