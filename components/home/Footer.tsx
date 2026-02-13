const Footer = () => {
  return (
    <>
      <footer className=" text-foreground-content py-16 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-8 mb-12">
            <div className="md:col-span-1">
              <div className="flex items-center gap-2 mb-3">
                <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
                  <span className="text-primary-foreground font-black text-sm">
                    TH
                  </span>
                </div>
                <span className="font-bold text-lg text-white">TalentHub</span>
              </div>
              <p className="text-white/60 text-sm font-medium">
                Your career journey starts here
              </p>
            </div>
            <div>
              <h4 className="font-bold mb-4 text-sm text-white">
                For Candidates
              </h4>
              <div className="space-y-2 text-white/60 text-sm">
                <p className="hover:text-white cursor-pointer transition-colors font-medium">
                  Browse Jobs
                </p>
                <p className="hover:text-white cursor-pointer transition-colors font-medium">
                  Career Guide
                </p>
                <p className="hover:text-white cursor-pointer transition-colors font-medium">
                  Salary Data
                </p>
              </div>
            </div>
            <div>
              <h4 className="font-bold mb-4 text-sm text-white">
                For Companies
              </h4>
              <div className="space-y-2 text-white/60 text-sm">
                <p className="hover:text-white cursor-pointer transition-colors font-medium">
                  Post Jobs
                </p>
                <p className="hover:text-white cursor-pointer transition-colors font-medium">
                  Pricing
                </p>
                <p className="hover:text-white cursor-pointer transition-colors font-medium">
                  Recruiters
                </p>
              </div>
            </div>
            <div>
              <h4 className="font-bold mb-4 text-sm text-white">Company</h4>
              <div className="space-y-2 text-white/60 text-sm">
                <p className="hover:text-white cursor-pointer transition-colors font-medium">
                  About
                </p>
                <p className="hover:text-white cursor-pointer transition-colors font-medium">
                  Blog
                </p>
                <p className="hover:text-white cursor-pointer transition-colors font-medium">
                  Contact
                </p>
              </div>
            </div>
            <div>
              <h4 className="font-bold mb-4 text-sm text-white">Legal</h4>
              <div className="space-y-2 text-white/60 text-sm">
                <p className="hover:text-white cursor-pointer transition-colors font-medium">
                  Privacy
                </p>
                <p className="hover:text-white cursor-pointer transition-colors font-medium">
                  Terms
                </p>
                <p className="hover:text-white cursor-pointer transition-colors font-medium">
                  Cookies
                </p>
              </div>
            </div>
          </div>
          <div className="border-t border-white/10 pt-8 flex flex-col sm:flex-row items-center justify-between">
            <p className="text-white/60 text-sm font-medium">
              © 2026 TalentHub. All rights reserved.
            </p>
            <div className="flex gap-6 mt-4 sm:mt-0 text-white/60">
              <p className="hover:text-white cursor-pointer text-sm transition-colors font-medium">
                Twitter
              </p>
              <p className="hover:text-white cursor-pointer text-sm transition-colors font-medium">
                LinkedIn
              </p>
              <p className="hover:text-white cursor-pointer text-sm transition-colors font-medium">
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
