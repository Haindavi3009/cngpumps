
import React from "react";
import { useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { MapPin } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="text-center max-w-md px-4">
        <div className="bg-muted inline-flex rounded-full p-5 mb-4">
          <MapPin className="h-12 w-12 text-cng-600" />
        </div>
        <h1 className="text-4xl font-bold mb-3">Page Not Found</h1>
        <p className="text-xl text-muted-foreground mb-6">
          Sorry, we couldn't find the page you're looking for.
        </p>
        <div className="space-y-3">
          <Button className="bg-cng-600 hover:bg-cng-700" asChild>
            <a href="/">Back to Dashboard</a>
          </Button>
          <div>
            <Button variant="outline" asChild>
              <a href="/plan-route">Plan a Route</a>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
