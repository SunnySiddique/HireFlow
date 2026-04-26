import { Zap } from "lucide-react";

const Footer = () => {
  return (
    <>
      <footer className="bg-background text-foreground-content py-16 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-8 mb-12">
            <div className="md:col-span-1">
              <div className={`flex items-center justify-between`}>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-sidebar-primary text-sidebar-primary-foreground rounded flex items-center justify-center flex-shrink-0">
                    <Zap className="w-5 h-5" />
                  </div>
                  <span className="font-bold text-lg font-sans text-foreground">
                    HireFlow
                  </span>
                </div>
              </div>
              <p className="text-sm font-medium text-muted-foreground">
                Your career journey starts here
              </p>
            </div>
            <div>
              <h4 className="font-bold mb-4 text-sm text-foreground">
                For Candidates
              </h4>
              <div className="space-y-2 text-muted-foreground text-sm">
                <p className="hover:text-primary cursor-pointer transition-colors font-medium">
                  Browse Jobs
                </p>
                <p className="hover:text-primary cursor-pointer transition-colors font-medium">
                  Career Guide
                </p>
                <p className="hover:text-primary cursor-pointer transition-colors font-medium">
                  Salary Data
                </p>
              </div>
            </div>
            <div>
              <h4 className="font-bold mb-4 text-sm text-foreground">
                For Companies
              </h4>
              <div className="space-y-2 text-muted-foreground text-sm">
                <p className="hover:text-primary cursor-pointer transition-colors font-medium">
                  Post Jobs
                </p>
                <p className="hover:text-primary cursor-pointer transition-colors font-medium">
                  Pricing
                </p>
                <p className="hover:text-primary cursor-pointer transition-colors font-medium">
                  Recruiters
                </p>
              </div>
            </div>
            <div>
              <h4 className="font-bold mb-4 text-sm text-foreground">
                Company
              </h4>
              <div className="space-y-2 text-muted-foreground text-sm">
                <p className="hover:text-primary cursor-pointer transition-colors font-medium">
                  About
                </p>
                <p className="hover:text-primary cursor-pointer transition-colors font-medium">
                  Blog
                </p>
                <p className="hover:text-primary cursor-pointer transition-colors font-medium">
                  Contact
                </p>
              </div>
            </div>
            <div>
              <h4 className="font-bold mb-4 text-sm text-foreground">Legal</h4>
              <div className="space-y-2 text-muted-foreground text-sm">
                <p className="hover:text-primary cursor-pointer transition-colors font-medium">
                  Privacy
                </p>
                <p className="hover:text-primary cursor-pointer transition-colors font-medium">
                  Terms
                </p>
                <p className="hover:text-primary cursor-pointer transition-colors font-medium">
                  Cookies
                </p>
              </div>
            </div>
          </div>
          <div className="border-t border-border pt-8 flex flex-col sm:flex-row items-center justify-between">
            <p className="text-muted-foreground text-sm font-medium">
              © 2026 HireFlow. All rights reserved.
            </p>
            <div className="flex gap-6 mt-4 sm:mt-0 text-muted-foreground">
              <p className="hover:text-primary cursor-pointer text-sm transition-colors font-medium">
                Twitter
              </p>
              <p className="hover:text-primary cursor-pointer text-sm transition-colors font-medium">
                LinkedIn
              </p>
              <p className="hover:text-primary cursor-pointer text-sm transition-colors font-medium">
                GitHub
              </p>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
